# todo: use external i2c rtc instead of internal: https://github.com/mcauser/micropython-tinyrtc-i2c
from machine import RTC

rtc = RTC()
rtc_datetime = rtc.datetime()

formatted_date = f"{rtc_datetime[0]:04d}-{rtc_datetime[1]:02d}-{rtc_datetime[2]:02d}"
formatted_time = f"{rtc_datetime[4]:02d}:{rtc_datetime[5]:02d}:{rtc_datetime[6]:02d}"

iso_string = f"{formatted_date}T{formatted_time}"

print(iso_string)

print("RTC datetime: ", rtc_datetime)
print("ISO format: ", iso_string)
