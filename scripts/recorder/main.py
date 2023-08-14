import os
from datetime import datetime, time
import requests
import socketio
import cv2
import numpy as np
import dailymotion
from dotenv import load_dotenv
from time import sleep


CORE_BASE_URL = 'https://aquadynamics-core.onrender.com'
SOCKET_IO_PORT = 443
SOCKET_IO_AQUARIUM_CAMERAS_STREAM_NAMESPACE = '/streaming'
PHOTOPERIODS = [
    (8, 9),
    (13, 14),
    (16, 17)
]

load_dotenv()

DAILYMOTION_API_KEY = os.environ['DAILYMOTION_API_KEY']
DAILYMOTION_API_SECRET = os.environ['DAILYMOTION_API_SECRET']
DAILYMOTION_USERNAME = os.environ['DAILYMOTION_USERNAME']
DAILYMOTION_PASSWORD = os.environ['DAILYMOTION_PASSWORD']

image_frames = {}

d = dailymotion.Dailymotion()
d.set_grant_type('password',
                 api_key=DAILYMOTION_API_KEY,
                 api_secret=DAILYMOTION_API_SECRET,
                 scope=['manage_videos'],
                 info={
                     'username': DAILYMOTION_USERNAME,
                     'password': DAILYMOTION_PASSWORD
                 })


def get_aquariums():
    response = requests.get(f'{CORE_BASE_URL}/api/aquariums')
    data = response.json()
    return data


def on_aquarium_camera_stream_frame(aquarium_id, aquarium_camera_stream_frame):
    try:
        image_buffer = np.frombuffer(aquarium_camera_stream_frame, np.uint8)
        encoded_image = cv2.imdecode(image_buffer, cv2.IMREAD_COLOR)

        if aquarium_id not in image_frames:
            image_frames[aquarium_id] = []

        image_frames[aquarium_id].append(encoded_image)

        print(
            f'[LOG] Received and processed aquarium camera stream frame from aquarium {aquarium_id}')
    except Exception as error:
        print('[ERROR] Error processing the image frame:', error)


def create_mp4_video(aquarium_id):
    try:
        if aquarium_id not in image_frames or not image_frames[aquarium_id]:
            print(
                f'[ERROR] No image frames for aquarium {aquarium_id} to create video')
            return

        height, width, _ = image_frames[aquarium_id][0].shape

        video_filename = os.path.join('videos', f'{aquarium_id}.mp4')
        fourcc = cv2.VideoWriter_fourcc(*'mp4v')
        video_writer = cv2.VideoWriter(
            video_filename, fourcc, 10.0, (width, height))

        for frame in image_frames[aquarium_id]:
            video_writer.write(frame)

        video_writer.release()

        print(f'[LOG] {aquarium_id} MP4 video created successfully')
    except Exception as error:
        print('[ERROR] Error creating the MP4 video:', error)


def is_within_photoperiod():
    now = datetime.now().time()
    for start_hour, end_hour in PHOTOPERIODS:
        start_time = datetime.now().replace(hour=start_hour, minute=0).time()
        end_time = datetime.now().replace(hour=end_hour, minute=0).time()
        if start_time <= now <= end_time:
            return True, start_hour, end_hour
    return False


def record_and_upload_videos():
    while True:
        if is_within_photoperiod():
            print('[LOG] Service is running...')
            aquariums = get_aquariums()

            for start_time, end_time in PHOTOPERIODS:
                if start_time <= current_time <= end_time:
                    start_time_dt = datetime.combine(
                        datetime.today(), time(start_time))
                    end_time_dt = datetime.combine(
                        datetime.today(), time(end_time))
                    duration = (end_time_dt - start_time_dt).seconds
                    record_videos(aquariums, duration)

                    print(
                        f'[LOG] Sleeping until end of photoperiod: {end_time}')
                    sleep((end_time_dt - datetime.now()).seconds)

            compile_and_upload_videos(aquariums)
        else:
            print('[LOG] Service is sleeping...')
            sleep(60)


def record_videos(aquariums, duration):
    start_time = datetime.now()

    sio = socketio.Client()

    @sio.on('connect', namespace=SOCKET_IO_AQUARIUM_CAMERAS_STREAM_NAMESPACE)
    def on_connect():
        print(
            f'[LOG] Connected to Socket.IO server with namespace `{SOCKET_IO_AQUARIUM_CAMERAS_STREAM_NAMESPACE}`!')

    @sio.on('disconnect', namespace=SOCKET_IO_AQUARIUM_CAMERAS_STREAM_NAMESPACE)
    def on_disconnect():
        print('[LOG] Disconnected from Socket.IO server!')

    print('[LOG] Registering handlers for aquariums:')
    for aquarium in aquariums:
        aquarium_id = aquarium['id']
        print('- ' + aquarium_id)

        sio.on(aquarium_id, namespace=SOCKET_IO_AQUARIUM_CAMERAS_STREAM_NAMESPACE)(
            lambda data, aquarium_id=aquarium_id: on_aquarium_camera_stream_frame(aquarium_id, data))

    sio.connect(f'{CORE_BASE_URL}:{SOCKET_IO_PORT}',
                namespaces=[SOCKET_IO_AQUARIUM_CAMERAS_STREAM_NAMESPACE])

    sleep(duration)

    sio.disconnect()

    for aquarium_id in image_frames:
        create_mp4_video(aquarium_id)

    image_frames.clear()

    end_time = datetime.now()
    return start_time, end_time


def compile_and_upload_videos(aquariums):
    for aquarium in aquariums:
        aquarium_id = aquarium['id']
        video_files = [f for f in os.listdir('videos') if f.startswith(
            aquarium_id) and f.endswith('.mp4')]

        if video_files:
            video_clips = [os.path.join('videos', f) for f in video_files]
            compiled_video_path = os.path.join(
                'videos', f'compiled_{aquarium_id}.mp4')

            print(f'[LOG] Compiling video clips for aquarium {aquarium_id}')
            compile_videos(video_clips, compiled_video_path)

            upload_video(compiled_video_path, aquarium)

            for video_clip in video_clips:
                os.remove(video_clip)
            os.remove(compiled_video_path)
        else:
            print(
                f'[LOG] No video clips to compile and upload for aquarium {aquarium_id}')


def compile_videos(video_paths, output_path):
    if len(video_paths) == 1:
        os.rename(video_paths[0], output_path)
    else:
        videos = [cv2.VideoCapture(video) for video in video_paths]
        fourcc = cv2.VideoWriter_fourcc(*'mp4v')
        width, height = int(videos[0].get(3)), int(videos[0].get(4))
        out = cv2.VideoWriter(output_path, fourcc, 10.0, (width, height))

        for video in videos:
            while video.isOpened():
                ret, frame = video.read()
                if not ret:
                    break
                out.write(frame)

        for video in videos:
            video.release()

        out.release()


def upload_video(video_path, aquarium_data):
    try:
        title = f'{aquarium_data["name"]}: Compiled Video'

        print(
            f'[LOG] Uploading compiled video {video_path} with title {title}')

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

        print(f'[LOG] Uploaded video {video.get("id")}')
        print(
            f'[LOG] Connecting compiled video {video_path} to playlist {playlist_id}')

        d.post(f'/playlist/{playlist_id}/videos/{video.get("id")}')

        print(
            f'[LOG] Connected video {video.get("id")} to playlist {playlist_id}')
    except Exception as error:
        print('[ERROR] Error uploading video:', error)


if __name__ == '__main__':
    record_and_upload_videos()
