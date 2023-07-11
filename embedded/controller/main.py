# aquadynamics/embedded/aquarium
from machine import Pin, ADC
from ds18x20 import DS18X20
from onewire import OneWire
from time import sleep
import network
import urequests
from json import dumps
import ubinascii


# constants
API_URL = 'https://aquabotics-core-api.onrender.com/api'

NETWORK_SSID = 'AquaDynamics'
NETWORK_PASSWORD = 'AquaDynamics'

TEMPERATURE_SENSORS_PIN = 26
LDR_PIN = 27

sta_if = network.WLAN(network.STA_IF)
if not sta_if.isconnected():
    print(f'Connecting to {NETWORK_SSID}...', end='')

    sta_if.active(True)
    sta_if.connect(NETWORK_SSID, NETWORK_PASSWORD)

    while not sta_if.isconnected():
        print('.', end='')
        sleep(0.25)

print(f'\nConnected to {NETWORK_SSID} successfully!')


def make_request(endpoint, method='get', data=None):
    headers = {'address': ubinascii.hexlify(sta_if.config(
        'mac')).decode().lower(), 'content-type': 'application/json'}

    data = (dumps(data)).encode()

    response = urequests.request(
        method, API_URL + endpoint, headers=headers, data=data)

    print(response.text)


try:
    # register the controller to the server
    make_request('/controllers', 'post', data={'aquarium': '1'})
    # set the controller status in the server as booting
    make_request('/controllers?state=booting', 'patch')

    # set the temperature sensors pin
    temperature_sensors_pin = Pin(TEMPERATURE_SENSORS_PIN)
    # initialiaze the temperature sensor through one wire
    temperature_sensors = DS18X20(OneWire(temperature_sensors_pin))

    # scan the available temperature sensors (since we are able to work with two combined, averaging the readings)
    roms = temperature_sensors.scan()
    print('[LOG] Found DS devices: ', roms)

    # after the booting procedure is complete, the controller status is set to logging
    make_request('/controllers?state=logging', 'patch')

    while True:
        temperature_sensors.convert_temp()
        sleep(1)

        data = {
            'type': 'temperature-sensor-reading',
        }
        temperature_avarage = 0

        for rom in roms:
            data = {
                **data, 'reading': {**{ubinascii.hexlify(rom).decode().lower(): temperature_sensors.read_temp(rom)}}}

            temperature_avarage += temperature_sensors.read_temp(rom)

        # TODO: properly set data/data and data/reading according to temperature sensor data

        make_request('/logs', 'post', data=data)

        sleep(1 * 5 * 60 - 1)  # sleep for 5 minutes

except Exception as error:
    print(error)
    make_request('/controllers?state=crashed', 'patch')