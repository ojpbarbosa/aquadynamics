from machine import Pin
from ds18x20 import DS18X20
from onewire import OneWire
from time import sleep


TEMPERATURE_SENSORS_PIN = 26


# set the temperature sensors pin
temperature_sensors_pin = Pin(TEMPERATURE_SENSORS_PIN)
# initialiaze the temperature sensor through one wire
temperature_sensors = DS18X20(OneWire(temperature_sensors_pin))

# scan the available temperature sensors (since we are able to work with two combined, averaging the readings)
roms = temperature_sensors.scan()
print('[LOG] Found DS devices: ', roms)


def get_temperature():
    temperature_sensors.convert_temp()
    sleep(1)

    temperature_sum = 0.0

    for rom in roms:
        temperature_sum += temperature_sensors.read_temp(rom)

    return temperature_sum / len(roms)
