import network
import ubinascii
from time import sleep


NETWORK_SSID = 'AquaDynamics'
NETWORK_PASSWORD = 'AquaDynamics'


def get_mac_address(sta_if):
    return ubinascii.hexlify(sta_if.config('mac')).decode().lower()


if __name__ == '__main__':
    sta_if = network.WLAN(network.STA_IF)
    if not sta_if.isconnected():
        print(f'Connecting to {NETWORK_SSID}...', end='')

        sta_if.active(True)
        sta_if.connect(NETWORK_SSID, NETWORK_PASSWORD)

        while not sta_if.isconnected():
            print('.', end='')
            sleep(0.25)

        get_mac_address(sta_if)
