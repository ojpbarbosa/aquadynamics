# aquadynamics/embedded/aquarium
from machine import Pin
from ds18x20 import DS18X20
from onewire import OneWire
from time import sleep
import network
import urequests
from json import dumps
import ubinascii


NETWORK_SSID = 'AquaDynamics'
NETWORK_PASSWORD = 'peixes23'

sta_if = network.WLAN(network.STA_IF)
if not sta_if.isconnected():
    print(f'Connecting to {NETWORK_SSID}...', end='')

    sta_if.active(True)
    sta_if.connect(NETWORK_SSID, NETWORK_PASSWORD)

    while not sta_if.isconnected():
        print('.', end='')
        sleep(0.25)

print(f'\nConnected to {NETWORK_SSID} successfully!')

headers = {"address": ubinascii.hexlify(sta_if.config(
    'mac')).decode().lower(), "content-type": "application/json"}
data = (dumps({"name": "temperature1"})).encode()

print(headers, data)

res = urequests.post(
    "https://aquabotics-core-api.onrender.com/devices", headers=headers, data=data)
print(res.text)

ds_pin = Pin(4)
ds_sensor = DS18X20(OneWire(ds_pin))

roms = ds_sensor.scan()
print('Found DS devices: ', roms)

while True:
    ds_sensor.convert_temp()
    sleep(0.75)
    for rom in roms:
        data = {"sensor": {"model": "ds18b20", "details": "temperature"},
                "reading": ds_sensor.read_temp(rom)}
        data = (dumps(data)).encode()
        headers = {"address": ubinascii.hexlify(sta_if.config(
            'mac')).decode().lower(), "content-type": "application/json"}
        res = urequests.post(
            "https://aquabotics-core-api.onrender.com/logs", headers=headers, data=data)
        print(res)
    sleep(10)
