from machine import RTC


TIMEZONE_OFFSET = -180  # 3 hours - america/sao_paulo


rtc = RTC()


def get_timestamp():
    rtc_datetime = rtc.datetime()

    formatted_date = f'{rtc_datetime[0]:04d}-{rtc_datetime[1]:02d}-{rtc_datetime[2]:02d}'
    formatted_time = f'{rtc_datetime[4]:02d}:{rtc_datetime[5]:02d}:{rtc_datetime[6]:02d}'

    # adjusting the time based on the timezone offset
    if TIMEZONE_OFFSET >= 0:
        timezone_sign = '+'
    else:
        timezone_sign = '-'

    # getting the absolute timezone offset
    abs_timezone_offset = abs(TIMEZONE_OFFSET)
    # calculating the hours and minutes
    timezone_hours = abs_timezone_offset // 60
    timezone_minutes = abs_timezone_offset % 60

    # formatting the timezone
    formatted_timezone = f'{timezone_sign}{timezone_hours:02d}:{timezone_minutes:02d}'

    return f'{formatted_date}T{formatted_time}{formatted_timezone}'


if __name__ == '__main__':
    print(get_timestamp())
