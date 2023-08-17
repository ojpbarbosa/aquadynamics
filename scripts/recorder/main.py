import os
from datetime import datetime
import requests
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont
from time import sleep
import dailymotion
import socketio
from dotenv import load_dotenv
from collections import defaultdict


CORE_BASE_URL = 'https://aquadynamics-core.onrender.com'
SOCKET_IO_PORT = 443
SOCKET_IO_AQUARIUM_CAMERAS_STREAM_NAMESPACE = '/streaming'

PHOTOPERIODS = [
    # (8, 9),
    # (13, 14),
    (17, 17, 17, 18),
    (17, 18, 17, 19),
]

load_dotenv()

DAILYMOTION_API_KEY = os.environ['DAILYMOTION_API_KEY']
DAILYMOTION_API_SECRET = os.environ['DAILYMOTION_API_SECRET']
DAILYMOTION_USERNAME = os.environ['DAILYMOTION_USERNAME']
DAILYMOTION_PASSWORD = os.environ['DAILYMOTION_PASSWORD']

image_frames = defaultdict(list)

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


def get_aquarium(aquarium_id):
    response = requests.get(f'{CORE_BASE_URL}/api/aquariums/{aquarium_id}')
    data = response.json()
    return data


def on_aquarium_camera_stream_frame(aquarium_id, aquarium_camera_stream_frame):
    try:
        image_buffer = np.frombuffer(aquarium_camera_stream_frame, np.uint8)
        encoded_image = cv2.imdecode(image_buffer, cv2.IMREAD_COLOR)

        image_frames[aquarium_id].append(encoded_image)

        print(
            f'[LOG] Received and processed aquarium camera stream frame from aquarium {aquarium_id}')
    except Exception as error:
        print('[ERROR] Error processing the image frame:', error)


def create_mp4_video(aquarium_id, start_time, end_time):
    try:
        if aquarium_id not in image_frames or not image_frames[aquarium_id]:
            print(
                f'[ERROR] No image frames for aquarium {aquarium_id} to create video')
            return

        start_time_str = f'{start_time.hour:02d}h{start_time.minute:02d}'
        end_time_str = f'{end_time.hour:02d}h{end_time.minute:02d}'

        video_filename = os.path.join('videos', f'{aquarium_id}_{start_time_str}_{end_time_str}.mp4')
        height, width, _ = image_frames[aquarium_id][0].shape

        fourcc = cv2.VideoWriter_fourcc(*'mp4v')
        video_writer = cv2.VideoWriter(
            video_filename, fourcc, 10.0, (width, height))

        for frame in image_frames[aquarium_id]:
            video_writer.write(frame)

        video_writer.release()

        print(f'[LOG] {aquarium_id} MP4 video created successfully')
    except Exception as error:
        print('[ERROR] Error creating the MP4 video:', error)


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


def record_and_upload_videos():
    while True:
        now = datetime.now().time()

        for start_hour, start_minute, end_hour, end_minute in PHOTOPERIODS:
            start_time = datetime.now().replace(hour=start_hour, minute=start_minute).time()
            end_time = datetime.now().replace(hour=end_hour, minute=end_minute).time()

            if start_time <= now <= end_time:
                print('[LOG] Service is running...')
                aquariums = get_aquariums()

                record_videos(aquariums, start_time, end_time)

                sleep(1)

                if (start_hour, start_minute, end_hour, end_minute) in PHOTOPERIODS[:-1]:
                    compile_and_upload_videos()

        print('[LOG] Service is sleeping...')
        sleep(15)


def record_videos(aquariums, start_time, end_time):
    sio = socketio.Client()

    @sio.on('connect', namespace=SOCKET_IO_AQUARIUM_CAMERAS_STREAM_NAMESPACE)
    def on_connect():
        print(
            f'[LOG] Connected to Socket.IO server with namespace `{SOCKET_IO_AQUARIUM_CAMERAS_STREAM_NAMESPACE}`!')

    @sio.on('disconnect', namespace=SOCKET_IO_AQUARIUM_CAMERAS_STREAM_NAMESPACE)
    def on_disconnect():
        print('[LOG] Disconnected from Socket.IO server!')

    for aquarium in aquariums:
        aquarium_id = aquarium['id']
        print(f'[LOG] Registering handler for aquarium: {aquarium_id}')

        sio.on(aquarium_id, namespace=SOCKET_IO_AQUARIUM_CAMERAS_STREAM_NAMESPACE)(
            lambda data, aquarium_id=aquarium_id: on_aquarium_camera_stream_frame(aquarium_id, data))

    sio.connect(f'{CORE_BASE_URL}:{SOCKET_IO_PORT}',
                namespaces=[SOCKET_IO_AQUARIUM_CAMERAS_STREAM_NAMESPACE])

    while datetime.now().time() <= end_time:
        sleep(1)

    sio.disconnect()

    for aquarium_id in image_frames:
        create_mp4_video(aquarium_id, start_time, end_time)
        image_frames[aquarium_id].clear()
        generate_and_insert_photoperiod_images(aquarium_id, start_time, end_time)


def generate_and_insert_photoperiod_images(aquarium_id, start_time, end_time):
    photoperiods = []
    for start_hour, start_minute, end_hour, end_minute in PHOTOPERIODS:
        start_time = datetime.now().replace(
            hour=start_hour, minute=start_minute).time()
        end_time = datetime.now().replace(
            hour=end_hour, minute=end_minute).time()
        photoperiods.append((start_time, end_time))

    video_path = os.path.join(
        'videos', f'compiled_{aquarium_id}.mp4')

    if os.path.exists(video_path):
        generate_photoperiod_images(video_path, photoperiods)
        compile_and_insert_photoperiod_images(
            video_path, aquarium_id, photoperiods)


def compile_and_insert_photoperiod_images(video_path, aquarium_id, photoperiods):
    video_clips = [f for f in os.listdir(os.path.join(os.getcwd(), 'videos')) if f.startswith(aquarium_id)]

    if video_clips:
        video_clips.sort()
        compiled_video_path = os.path.join('videos', f'compiled_{aquarium_id}.mp4')

        compile_videos([os.path.join('videos', clip) for clip in video_clips], compiled_video_path)

        for clip in video_clips:
            os.remove(os.path.join('videos', clip))

        insert_photoperiod_images(compiled_video_path, photoperiods)

        upload_video(compiled_video_path, aquarium_id)

        os.remove(compiled_video_path)
    else:
        print(
            f'[LOG] No video clips to compile and insert photoperiod images for aquarium {aquarium_id}')


def insert_photoperiod_images(video_path, photoperiods):
    video = cv2.VideoCapture(video_path)
    frame_rate = int(video.get(cv2.CAP_PROP_FPS))
    frame_width = int(video.get(cv2.CAP_PROP_FRAME_WIDTH))
    frame_height = int(video.get(cv2.CAP_PROP_FRAME_HEIGHT))
    frames_per_photoperiod = frame_rate * 10  # 10 seconds per photoperiod

    output_frames = []
    current_photoperiod_index = 0
    current_photoperiod_frame = 0

    while True:
        ret, frame = video.read()
        if not ret:
            break

        output_frames.append(frame)

        if current_photoperiod_frame < frames_per_photoperiod:
            current_photoperiod_frame += 1
        else:
            current_photoperiod_index += 1
            current_photoperiod_frame = 0

            if current_photoperiod_index < len(photoperiods):
                photoperiod_image_path = os.path.join('images', f'photoperiod_{current_photoperiod_index}.png')
                photoperiod_image = cv2.imread(photoperiod_image_path)

                for _ in range(frames_per_photoperiod):
                    output_frames.append(photoperiod_image)

    video.release()

    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    video_writer = cv2.VideoWriter(
        video_path, fourcc, frame_rate, (frame_width, frame_height))

    for frame in output_frames:
        video_writer.write(frame)

    video_writer.release()


def compile_and_upload_videos():
    for aquarium_id in image_frames:
        photoperiods = []
        for start_hour, start_minute, end_hour, end_minute in PHOTOPERIODS:
            start_time = datetime.now().replace(hour=start_hour, minute=start_minute).time()
            end_time = datetime.now().replace(hour=end_hour, minute=end_minute).time()
            photoperiods.append((start_time, end_time))

        compile_video_and_upload(aquarium_id, photoperiods)


def compile_video_and_upload(aquarium_id, photoperiods):
    video_clips = [f for f in os.listdir(os.path.join(os.getcwd(), 'videos')) if f.startswith(aquarium_id)]

    if video_clips:
        video_clips.sort()
        compiled_video_path = os.path.join('videos', f'compiled_{aquarium_id}.mp4')

        print(f'[LOG] Compiling video clips for aquarium {aquarium_id}')
        compile_videos([os.path.join('videos', clip) for clip in video_clips], compiled_video_path)

        for clip in video_clips:
            os.remove(os.path.join('videos', clip))

        generate_photoperiod_images(compiled_video_path, photoperiods)

        upload_video(compiled_video_path, aquarium_id)

        os.remove(compiled_video_path)
    else:
        print(
            f'[LOG] No video clips to compile and upload for aquarium {aquarium_id}')


def generate_photoperiod_images(video_path, photoperiods):
    video = cv2.VideoCapture(video_path)
    frame_rate = int(video.get(cv2.CAP_PROP_FPS))
    frame_width = int(video.get(cv2.CAP_PROP_FRAME_WIDTH))
    frame_height = int(video.get(cv2.CAP_PROP_FRAME_HEIGHT))
    frames_per_photoperiod = frame_rate * 10  # 10 seconds per photoperiod

    for i, (start_time, end_time) in enumerate(photoperiods):
        start_frame = i * frames_per_photoperiod
        end_frame = (i + 1) * frames_per_photoperiod

        start_time_str = f'{start_time.hour:02d}h{start_time.minute:02d}'
        end_time_str = f'{end_time.hour:02d}h{end_time.minute:02d}'
        base_path = f'photoperiod_{start_time_str}_{end_time_str}'
        output_image_path = os.path.join('images', base_path + '.png')
        output_video_path = os.path.join('videos', base_path + '.mp4')

        generate_image_with_text(output_image_path, start_time, end_time)

        output_frames = []

        for frame_num in range(start_frame, end_frame):
            video.set(cv2.CAP_PROP_POS_FRAMES, frame_num)
            ret, frame = video.read()
            if ret:
                output_frames.append(frame)

        fourcc = cv2.VideoWriter_fourcc(*'mp4v')
        video_writer = cv2.VideoWriter(
            output_video_path, fourcc, frame_rate, (frame_width, frame_height))

        for frame in output_frames:
            video_writer.write(frame)

        video_writer.release()

    video.release()


def generate_image_with_text(output_path, start_time, end_time):
    image = Image.new('RGB', (640, 80), color=(0, 0, 0))
    draw = ImageDraw.Draw(image)
    font = ImageFont.load_default()
    text = f'Fotoperíodo: {start_time.strftime("%I:%M %p")} - {end_time.strftime("%I:%M %p")}'
    draw.text((10, 10), text, fill=(255, 255, 255), font=font)
    image.save(output_path)


def upload_video(video_path, aquarium_id):
    try:
        aquarium = get_aquarium(aquarium_id)

        title = f'Gravação {aquarium["name"]}: {datetime.now().strftime("%d/%m/%Y")}'

        url = d.upload(video_path)
        video = d.post('/me/videos',
            {
                'url': url,
                'title': title,
                'published': 'true',
                'channel': 'animals',
                'is_created_for_kids': 'false',
            }
        )

        video_id = video.get('id')
        playlist_id = aquarium['playlistId']

        print(f'[LOG] Uploaded video {video_id}')
        print(
            f'[LOG] Connecting compiled video {video_path} to playlist {playlist_id}')

        d.post(f'/playlist/{playlist_id}/videos/{video_id}')

        print(
            f'[LOG] Connected video {video_id} to playlist {playlist_id}')
    except Exception as error:
        print('[ERROR] Error uploading video:', error)


if __name__ == '__main__':
    for dir in ['videos', 'images']:
        if not os.path.exists(dir):
            os.mkdir(dir)

    # record_and_upload_videos()
