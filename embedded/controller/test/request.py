# todo: split program into separate files
# aquadynamics/embedded/aquarium
from time import sleep
import urequests as requests
from json import dumps
import network
import ubinascii


# constants
API_URL = 'https://aquadynamics-core.onrender.com/api'
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

sta_if = connect()

# def get_mac_address(interface):
#     return ubinascii.hexlify(interface.config('mac'),':').decode()


# def make_request(endpoint, method='get', data=None):
#     headers = {'address': get_mac_address(sta_if), 'content-type': 'application/json'}

#     data = (dumps(data)).encode()

#     response = urequests.request(
#         method, API_URL + endpoint, headers=headers, data=data)

#     print(response.text)


# def update_controller_status(status):
#     try:
#         make_request('/controllers?status=' + status, 'patch')
#     except Exception as error:
#         print(error)



# update_controller_status('booting')

r = requests.get(API_URL + '/controllers')

print(r.text)
