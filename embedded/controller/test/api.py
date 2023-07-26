import network
from time import sleep
import urequests as requests
import ubinascii


API_URL = 'https://aquadynamics-core.onrender.com/api'
NETWORK_SSID = 'AquaDynamics'
NETWORK_PASSWORD = 'DynamicsAqua'


station_interface = network.WLAN(network.STA_IF)
if not station_interface.isconnected():
    print(f'Connecting to {NETWORK_SSID}...', end='')

    station_interface.active(True)
    station_interface.connect(NETWORK_SSID, NETWORK_PASSWORD)

    while not station_interface.isconnected():
        print('.', end='')
        sleep(0.25)

    print(f'\nConnected to {NETWORK_SSID} successfully!')


headers = {
    'address': ubinascii.hexlify(station_interface.config('mac'), ':').decode()
}

response = requests.request(
    'PATCH', API_URL + '/controllers?status=idling', headers=headers)

print(response.text)
