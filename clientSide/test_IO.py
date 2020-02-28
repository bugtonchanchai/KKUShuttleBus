import RPi.GPIO as GPIO
import time


PINTEST = 9
delay = 0.5
GPIO.setmode(GPIO.BCM)
GPIO.setup(PINTEST, GPIO.OUT)
print ("running...")

try:
	while True:
		GPIO.output(PINTEST, True)	#0.0V >> ref.GND
		time.sleep(delay)
		GPIO.output(PINTEST, True)	#3.3V >> ref.GND
		time.sleep(delay)

except KeyboardInterrupt:
	GPIO.cleanup()
