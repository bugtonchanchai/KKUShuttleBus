import RPi.GPIO as GPIO
import time
import os
GPIO.setmode(GPIO.BCM)

threshold = 50	# middle point
timeout = 2
peocount = 0
state = 0
ch_time_begin = 0
ch_time_finish = 0

TRIG_A = 9
ECHO_A = 10
TRIG_B = 23
ECHO_B = 24

GPIO.setup(TRIG_A,GPIO.OUT)
GPIO.setup(TRIG_B,GPIO.OUT)
GPIO.setup(ECHO_A,GPIO.IN)
GPIO.setup(ECHO_B,GPIO.IN)

GPIO.output(TRIG_A, False)
GPIO.output(TRIG_B, False)

print "Waiting..."
time.sleep(2)

def peoCount() :
	global sen_A
	global sen_B
	global state
	global peocount
	global ch_time_begin
	global ch_time_finish
	global pulse_duration_A
	global pulse_duration_B
	global pulse_start_A
	global pulse_start_B
	global pulse_end_A
	global pulse_end_B

	pulse_duration_A = 0
	pulse_duration_B = 0
	pulse_start_A = 0
	pulse_start_B = 0
	pulse_end_A = 0
	pulse_end_B = 0

	time.sleep(0.02)
	GPIO.output(TRIG_A, False)
	time.sleep(0.005)
	GPIO.output(TRIG_A, True)
	time.sleep(0.00001)
	GPIO.output(TRIG_A, False)

	temp_time_A = time.time()
	while GPIO.input(ECHO_A) == 0 :
		pulse_start_A = time.time()
		if (pulse_start_A - temp_time_A > 0.1) :
			break
	temp_time_A = time.time()
	while GPIO.input(ECHO_A) == 1 :
		pulse_end_A = time.time()
		if (pulse_end_A - temp_time_A > 0.1) :
			break

	time.sleep(0.02)
	GPIO.output(TRIG_B, False)
	time.sleep(0.005)
	GPIO.output(TRIG_B, True)
	time.sleep(0.00001)
	GPIO.output(TRIG_B, False)

	temp_time_B = time.time()
	while GPIO.input(ECHO_B) == 0 :
		pulse_start_B = time.time()
		if (pulse_start_B - temp_time_B > 0.1) :
			break
	temp_time_B = time.time()
	while GPIO.input(ECHO_B) == 1 :
		pulse_end_B = time.time()
		if (pulse_end_B - temp_time_B > 0.1) :
			break

	pulse_duration_A = pulse_end_A - pulse_start_A
	distance_A = pulse_duration_A * 17000
	pulse_duration_B = pulse_end_B - pulse_start_B
	distance_B = pulse_duration_B * 17000

	## threshold calculate zone
	if (distance_A > 0 and distance_A < threshold) :
		sen_A = 1
	elif (distance_A >= threshold) :
		sen_A = 0
	if (distance_B > 0 and distance_B < threshold) :
		sen_B = 1
	elif (distance_B >= threshold) :
		sen_B = 0

	## check state 0 >> 1 and 0 >> -1
	if sen_A == 1 and sen_B == 0 and state == 0 :
		state = 1
		ch_time_begin = time.time()
	elif sen_A == 0 and sen_B == 1 and state == 0 :
		state = -1
		ch_time_begin = time.time()	
		
	## check state 1 >> 2 and -1 >> -2
	if sen_A == 0 and sen_B == 1 and state == 1 :
		state = 2		
	elif sen_A == 1 and sen_B == 0 and state == -1 :
		state = -2
		
	## check state 2 >> 0 peocount++ and -2 >> 0 peocount--
	if sen_A == 0 and sen_B == 0 and state == 2 :
		peocount = peocount + 1
		state = 0
		time.sleep(0.5)
	elif sen_A == 0 and sen_B == 0 and state == -2 :
		if peocount > 0 :
			peocount = peocount - 1
		state = 0
		time.sleep(0.5)
		
	## timeout
	ch_time_finish = time.time()
	if round(ch_time_finish - ch_time_begin) >= timeout:
		state = 0	

	os.system('clear')		
	print "distance A ::>   %d\tcm    :::>> %d" %(distance_A,sen_A)
	print "distance B ::>   %d\tcm    :::>> %d" %(distance_B,sen_B)
	print "====================================="
	print "state     ::>	%d" %(state)
	print "peocount  ::>	%d" %(peocount)

try :
	while True :
		peoCount()
			

except KeyboardInterrupt:
	print "EXIT"
        GPIO.cleanup()
