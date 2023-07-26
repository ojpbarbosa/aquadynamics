import urequests as requests
from ujson import dumps

from aquadynamics_network import connect_to_wifi, get_mac_address


API_URL = 'https://aquadynamics-core.onrender.com/api'


def _headers():
    return {
        'address': get_mac_address(connect_to_wifi()),
        'content-type': 'application/json'
    }


def update_controller_status(status: str):
    try:
        response = requests.patch(API_URL + '/controllers?status=' + status,
                                  headers=_headers())

        print(response.text)
    except Exception as error:
        print(error)


def log(data: dict):
    try:
        response = requests.post(API_URL + '/logs',
                                  headers=_headers(), data=dumps(data))

        print(response.text)
    except Exception as error:
        print(error)
