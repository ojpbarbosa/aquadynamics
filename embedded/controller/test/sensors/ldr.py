from machine import ADC, Pin
from time import sleep


ldr = ADC(Pin(32))
ldr.atten(ADC.ATTN_11DB)

for _ in range(10):
    print(ldr.read())
    sleep(1)
