import network
import ubinascii
from time import sleep


NETWORK_SSID = 'AquaDynamics'
NETWORK_PASSWORD = 'DynamicsAqua'


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
    return ubinascii.hexlify(interface.config('mac'),':').decode()

if __name__ == '__main__':
    sta_if = connect()

    print(get_mac_address(sta_if))
