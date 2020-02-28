import RPi.GPIO as GPIO
import time
import os
GPIO.setmode(GPIO.BCM)

tout = 0.5

#TRIG_A = 9
#ECHO_A = 10
TRIG_A = 23
ECHO_A = 24

GPIO.setup(TRIG_A,GPIO.OUT)
GPIO.setup(ECHO_A,GPIO.IN)

GPIO.output(TRIG_A, False)

print "Waiting..."
time.sleep(2)

try :
	while True :
		GPIO.output(TRIG_A, False)
		time.sleep(0.005)
		GPIO.output(TRIG_A, True)
		time.sleep(0.00001)
		GPIO.output(TRIG_A, False)
		temp_t = time.time()
		while GPIO.input(ECHO_A) == 0 :
			pulse_start_A = time.time()
			if (pulse_start_A - temp_t > tout) :
				break
		while GPIO.input(ECHO_A) == 1 :
			pulse_end_A = time.time()
			if (pulse_end_A - temp_t > tout) :
				break

		pulse_duration_A = pulse_end_A - pulse_start_A
		distance_A = pulse_duration_A * 17150
##		distance_A = round(distance_A, 2)

		os.system('clear')		
		print "distance A : %d cm" %(distance_A)
		time.sleep(0.1)

except KeyboardInterrupt:
        GPIO.cleanup()
