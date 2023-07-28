# aquadynamics/scripts/recorder
# this utility script aims to record the live streams from the aquariums' cameras
# and upload the recorded videos to a youtube channel

import os
from time import sleep
from datetime import datetime

from dotenv import load_dotenv
import requests
import socketio
import cv2
import numpy as np
import dailymotion


CORE_BASE_URL = 'https://aquadynamics-core.onrender.com'
SOCKET_IO_PORT = 443
SOCKET_IO_AQUARIUM_CAMERAS_STREAM_NAMESPACE = '/streaming'

load_dotenv()

DAILYMOTION_API_KEY = os.environ['DAILYMOTION_API_KEY']
DAILYMOTION_API_SECRET= os.environ['DAILYMOTION_API_SECRET']
DAILYMOTION_USERNAME = os.environ['DAILYMOTION_USERNAME']
DAILYMOTION_PASSWORD = os.environ['DAILYMOTION_PASSWORD']

VIDEO_RECORDING_DURATION = 1 * 60 * 60  # 1 hour

LIGHTNING_START_HOUR = 8
LIGHTNING_START_MINUTE = 0
LIGHTNING_END_HOUR = 17
LIGHTNING_END_MINUTE = 0


def get_aquariums():
    response = requests.get(f'{CORE_BASE_URL}/api/aquariums')
    data = response.json()
    return data


image_frames = {}


def on_aquarium_camera_stream_frame(aquarium_id, aquarium_camera_stream_frame):
    try:
        nparr = np.frombuffer(aquarium_camera_stream_frame, np.uint8)
        cv_image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if aquarium_id not in image_frames:
            image_frames[aquarium_id] = []

        image_frames[aquarium_id].append(cv_image)

        print(
            '[LOG] Received and processed aquarium camera stream frame from aquarium ', aquarium_id)
    except Exception as error:
        print('[ERROR] Error processing the image frame:', error)


def create_mp4_video(aquarium_id):
    try:
        if not image_frames:
            print('[ERROR] No image frames to create video')
            return

        height, width, _ = image_frames[aquarium_id][0].shape

        video_filename = os.path.join('videos', aquarium_id + '.mp4')
        fourcc = cv2.VideoWriter_fourcc(*'mp4v')
        video_writer = cv2.VideoWriter(
            video_filename, fourcc, 10.0, (width, height))

        for frame in image_frames[aquarium_id]:
            video_writer.write(frame)

        video_writer.release()

        print(f'[LOG] {aquarium_id} MP4 video created successfully')
    except Exception as error:
        print('[ERROR] Error creating the MP4 video:', error)


def delete_old_videos():
    if not os.path.exists('videos'):
        os.makedirs('videos')
    else:
        for file in os.listdir('videos'):
            if file.endswith('.mp4'):
                os.remove(os.path.join('videos', file))
                print('[LOG] Deleted old video:', file)


def record_videos():
    aquariums = get_aquariums()

    start_time = datetime.now()

    sio = socketio.Client()

    @sio.on('connect', namespace=SOCKET_IO_AQUARIUM_CAMERAS_STREAM_NAMESPACE)
    def on_connect():
        print(
            f'[LOG] Connected to Socket.IO server with namespace `{SOCKET_IO_AQUARIUM_CAMERAS_STREAM_NAMESPACE}`!')

    @sio.on('disconenct', namespace=SOCKET_IO_AQUARIUM_CAMERAS_STREAM_NAMESPACE)
    def on_disconnect():
        print('[LOG] Disconnected from Socket.IO server!')

    print('[LOG] Registering handlers for aquariums:')
    for aquarium in aquariums:
        print('- ' + aquarium['id'])

        sio.on(aquarium['id'], namespace=SOCKET_IO_AQUARIUM_CAMERAS_STREAM_NAMESPACE)(
            lambda data,
            aquarium_id=aquarium['id']: on_aquarium_camera_stream_frame(aquarium_id, data))

    sio.connect(f'{CORE_BASE_URL}:{SOCKET_IO_PORT}',
                namespaces=[SOCKET_IO_AQUARIUM_CAMERAS_STREAM_NAMESPACE])

    sleep(VIDEO_RECORDING_DURATION)

    sio.disconnect()

    end_time = datetime.now()

    for aquarium_id in image_frames:
        create_mp4_video(aquarium_id)

    image_frames.clear()

    return start_time, end_time


def is_within_lightning_time():
    now = datetime.now().time()
    lightning_start_time = datetime.now().replace(hour=LIGHTNING_START_HOUR,
                                                  minute=LIGHTNING_START_MINUTE).time()
    lightning_end_time = datetime.now().replace(
        hour=LIGHTNING_END_HOUR, minute=LIGHTNING_END_MINUTE).time()

    return lightning_start_time <= now <= lightning_end_time


def upload_videos(start_time, end_time):
    if not os.path.exists('videos'):
        print('[LOG] No videos to upload')
        return

    aquariums = get_aquariums()

    d = dailymotion.Dailymotion()
    d.set_grant_type('password',
                     api_key=DAILYMOTION_API_KEY,
                     api_secret=DAILYMOTION_API_SECRET,
                     scope=['manage_videos'],
                     info={'username': DAILYMOTION_USERNAME, 'password': DAILYMOTION_PASSWORD})

    for video_file in os.listdir('videos'):
        if video_file.endswith('.mp4'):
            video_path = os.path.join('videos', video_file)

            aquarium_data = {}
            for aquarium in aquariums:
                if aquarium['id'] in video_file:
                    aquarium_data = aquarium
                    break

            title = f'{aquarium_data["name"]}: Gravação {start_time.strftime("%Y/%m/%d %H:%M")} - {end_time.strftime("%H:%M")}'

            print(f'[LOG] Uploading video {video_path} with title {title}')

            playlist_id = aquarium_data['playlistId']

            url = d.upload(video_path)
            video = d.post(
                '/me/videos',
                {
                    'url': url,
                    'title': title,
                    'published': 'true',
                    'channel': 'animals',
                    'is_created_for_kids': 'false',
                },
            )

            print(f'[LOG] Uploaded video {video.get("id")} in ')
            print(f'[LOG] Connecting video {video_path} to playlist {aquarium_data["playlistId"]}')

            d.post(f'/playlist/{playlist_id}/videos/{video.get("id")}')

            print(f'[LOG] Connected video {video.get("id")} to playlist {playlist_id}')


if __name__ == '__main__':
    while True:
        if is_within_lightning_time():
            print('[LOG] Service is running...')
            # delete_old_videos()
            # start_time, end_time = record_videos()
            # print(start_time, end_time)
            upload_videos(datetime.now(), datetime.now())
            sleep(1 * 60 * 60)  # sleep for 1 hour

        else:
            print('[LOG] Service is sleeping...')
            sleep(1 * 60)  # sleep for 1 minute
