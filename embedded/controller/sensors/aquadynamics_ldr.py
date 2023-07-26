from machine import ADC, Pin


LDR_PIN = 32
LDR_TRESHOLD = 500


ldr = ADC(Pin(LDR_PIN))
ldr.atten(ADC.ATTN_11DB)


def is_lightning_on():
    return ldr.read() < LDR_TRESHOLD


if __name__ == '__main__':
    print(is_lightning_on())
