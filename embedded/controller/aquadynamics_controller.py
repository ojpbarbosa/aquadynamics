# aquadynamics/embedded/aquarium
from machine import reset
from time import sleep
import random
import gc

import aquadynamics_api
from sensors import aquadynamics_ds18x20, aquadynamics_ldr, aquadynamics_rtc


gc.collect()

try:
    # set the controller status in the server as booting
    aquadynamics_api.update_controller_status('booting')

    while True:
        try:
            aquadynamics_api.update_controller_status('logging')

            data = {
                'temperature': aquadynamics_ds18x20.get_temperature(),
                'ph': random.uniform(6.5, 7.5),
                'lightning': aquadynamics_ldr.is_lightning_on(),
                'timestamp': aquadynamics_rtc.get_timestamp()
            }

            aquadynamics_api.log(data)

            aquadynamics_api.update_controller_status('idling')

            sleep(1 * 60 - 1)  # sleep for 5 minutes
        except Exception as error:
            print('[ERROR] ', error)

except Exception as error:
    print('[ERROR] ', error)
    print('[LOG] Resetting the controller...')

    aquadynamics_api.update_controller_status('crashed')
    sleep(1 * 60)  # sleep for 1 minute
    aquadynamics_api.update_controller_status('restarting')

    reset()
