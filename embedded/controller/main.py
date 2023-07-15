# todo: split program into separate files
# aquadynamics/embedded/aquarium
from machine import ADC, Pin, RTC, reset
from ds18x20 import DS18X20
from onewire import OneWire
from time import sleep
import urequests as requests
from json import dumps
# from aquadynamics_network import connect
import network
import ubinascii
import gc


gc.collect()


# constants
API_URL = 'https://aquadynamics-core.onrender.com/api'

TEMPERATURE_SENSORS_PIN = 26
LDR_PIN = 27

NETWORK_SSID = 'AquaDynamics'
NETWORK_PASSWORD = 'DynamicsAqua'

LDR_TRESHOLD = 500


def connect():
    sta_if = network.WLAN(network.STA_IF)
    if not sta_if.isconnected():
        print(f'Connecting to {NETWORK_SSID}...', end='')

        sta_if.active(True)
        sta_if.connect(NETWORK_SSID, NETWORK_PASSWORD)

        while not sta_if.isconnected():
            print('.', end='')
            sleep(0.25)

        print(f'\nConnected to {NETWORK_SSID} successfully!')

    return sta_if


def get_mac_address(interface):
    return ubinascii.hexlify(interface.config('mac'), ':').decode()


rtc = RTC()

ldr = ADC(Pin(LDR_PIN))
ldr.atten(ADC.ATTN_11DB)

sta_if = connect()


def get_timestamp():
    rtc_datetime = rtc.datetime()

    formatted_date = f"{rtc_datetime[0]:04d}-{rtc_datetime[1]:02d}-{rtc_datetime[2]:02d}"
    formatted_time = f"{rtc_datetime[4]:02d}:{rtc_datetime[5]:02d}:{rtc_datetime[6]:02d}"

    return f"{formatted_date}T{formatted_time}"


def make_request(endpoint: str, method = 'get', data: dict = None):
    headers = {'address': get_mac_address(sta_if), 'content-type': 'application/json'}

    data = (dumps(data)).encode()

    response = requests.request(
        method, API_URL + endpoint, headers=headers, data=data)

    print(response.text)


def update_controller_status(status: str):
    try:
        make_request('/controllers?status=' + status, 'patch')
    except Exception as error:
        print(error)


def lightning():
    return ldr.read() < LDR_TRESHOLD


def log(data):
    try:
        make_request('/logs', 'post', data)
    except Exception as error:
        print(error)

try:
    # set the controller status in the server as booting
    # update_controller_status('booting')

    # set the temperature sensors pin
    temperature_sensors_pin = Pin(TEMPERATURE_SENSORS_PIN)
    # initialiaze the temperature sensor through one wire
    temperature_sensors = DS18X20(OneWire(temperature_sensors_pin))

    # scan the available temperature sensors (since we are able to work with two combined, averaging the readings)
    roms = temperature_sensors.scan()
    print('[LOG] Found DS devices: ', roms)

    # after the booting procedure is complete, the controller status is set to idling
    # update_controller_status('idling')

    while True:
        # update_controller_status('logging')

        temperature_sensors.convert_temp()
        sleep(1)

        data = {}
        temperature_sum = 0

        for rom in roms:
            temperature_sum += temperature_sensors.read_temp(rom)

        # todo: properly set data/data and data/reading according to temperature sensor data

        data = {
          'temperature': temperature_avarage / len(roms),
          'pH': 0, # pH sensor reading
          'ligthning': lightning(), # lighning sensor reading
          'timestamp': get_timestamp()
        }

        print(data)
        log(data)
        # update_controller_status('idling')

        sleep(1 * 5 * 60 - 1)  # sleep for 5 minutes

except Exception as error:
    print(error)
    update_controller_status('crashed')
    sleep(1 * 60) # sleep for 1 minute
    update_controller_status('restarting')
    reset() # restart

