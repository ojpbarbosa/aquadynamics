import network
from time import sleep
import ubinascii


NETWORK_SSID = 'AquaDynamics'
NETWORK_PASSWORD = 'DynamicsAqua'


def connect_to_wifi():
    station_interface = network.WLAN(network.STA_IF)
    if not station_interface.isconnected():
        print(f'Connecting to {NETWORK_SSID}...', end='')

        station_interface.active(True)
        station_interface.connect(NETWORK_SSID, NETWORK_PASSWORD)

        while not station_interface.isconnected():
            print('.', end='')
            sleep(0.25)

        print(f'\nConnected to {NETWORK_SSID} successfully!')
        print(f'MAC: {get_mac_address(station_interface)}')

    return station_interface


def get_mac_address(interface):
    return ubinascii.hexlify(interface.config('mac'), ':').decode().upper()


if __name__ == '__main__':
    station_interface = connect_to_wifi()

    print(get_mac_address(station_interface))
