#import logging
#logging.getLogger('requests').setLevel(logging.WARNING)
#logging.basicConfig(level=logging.DEBUG)


from socketIO_client import SocketIO
import RPi.GPIO as GPIO
import serial
import os
import string
import time
import datetime
import json
import urllib2
from random import randint

GPIO.setmode(GPIO.BCM)
file = open('/home/pi/project/clientSide/log_numpeo','r')
file_obj = file.readlines()

HOST = 'lab.en.kku.ac.th'
PORT = 30000
busID = '1'

str = ''
GPRMC = ''
GPVTG = ''
GPGGA = ''
GPGSA = ''
GPGSV = ''
GPGLL = ''

list_GPRMC = []
list_GPVTG = []
list_GPGGA = []
list_GPGSA = []
list_GPGSV = []
list_GPGLL = []

times = 'N/A'
date = 'N/A'
lat = 'N/A'
lng = 'N/A'
valid = 'N/A'
num_sat = 'N/A'
abv_mean_sea = 'N/A'
speed = 'N/A'

temp = ''
temp_times = ''
temp_date = ''
temp_lat = ''
temp_lng = ''

rdn = 0
point = 1
togg = True

threshold = 50	# middle point
max_dist = 200
timeout = 2
peocount = int(file_obj[0])
state = 0
ch_time_begin = 0
ch_time_finish = 0

sen_A = 0
sen_B = 0

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

ser = serial.Serial('/dev/ttyAMA0',4800,timeout = 5) # timeout = None
ser.open()

socket = SocketIO(HOST,PORT)
print ('Waiting...')
time.sleep(2)
os.system('clear')
print ('connected to %s:%d' %(HOST,PORT))

def printCurrentLatLng() :
	os.system('clear')
	print ('++++++++++++++++++++++++++++++++++++++++++++++++++++++')
	print ('++++++++++++++++++++++++++++++++++++++++++++++++++++++')
	print ('++++++++++++                          ++++++++++++++++')
	print ('++++++++++++     Read GPS to send     ++++++++++++++++')
	print ('++++++++++++                          ++++++++++++++++')
	print ('++++++++++++++++++++++++++++++++++++++++++++++++++++++')
	print ('++++++++++++++++++++++++++++++++++++++++++++++++++++++')
	print ('')
	print ('Active or Void 		: %s' %valid)
	print ('Time (hh:mm:ss)_	: %s' %times)
	print ('Date (dd/mm/yyyy)	: %s' %date)
	print ('Latitude		: %s' %lat)
	print ('Longitude		: %s' %lng)
	print ('Number of sat		: %s' %num_sat)
	print ('Above mean sea (m)	: %s' %abv_mean_sea)
	print ('Speed (km/hr)		: %s' %speed)
	print ('')
	print ('+++++++++++++++++++++++++++++++++++++++++++++++++++')
	print ('+++++++++++++++++++++++++++++++++++++++++++++++++++')

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
	if round(ch_time_finish - ch_time_begin) >= timeout :
		state = 0	

	# os.system('clear')		
	# print "distance A ::>   %d\tcm    :::>> %d" %(distance_A,sen_A)
	# print "distance B ::>   %d\tcm    :::>> %d" %(distance_B,sen_B)
	# print "====================================="
	# print "state     ::>	%d" %(state)
	# print "peocount  ::>	%d" %(peocount)

try :
	while True :
		ch = ser.read()
		str += ch
		
		if ch == '' :
			socket.emit('connector','NO GPS SIGNAL')
			socket = SocketIO(HOST,PORT)

		if ch == '\n' :
			# printCurrentLatLng()
			if str.find('$GPRMC') != -1 :
				temp = str.strip('$GPRMC')
				GPRMC = temp.strip('\n')
				ch = ''
				str = ''
			if str.find('$GPVTG') != -1 :
				temp = str.strip('$GPVTG')
				GPVTG = temp.strip('\n')
				ch = ''
				str = ''
			if str.find('$GPGGA') != -1 :
				temp = str.strip('$GPGGA')
				GPGGA = temp.strip('\n')
				ch = ''
				str = ''
			if str.find('$GPGSA') != -1 :
				temp = str.strip('$GPGSA')
				GPGSA = temp.strip('\n')
				ch = ''
				str = ''
			if str.find('$GPGSV') != -1 :
				temp = str.strip('$GPGSV')
				GPGSV = temp.strip('\n')
				ch = ''
				str = ''
			if str.find('GPGLL') != -1 :
				temp = str.strip('$GPGLL')
				GPGLL = temp.strip('\n')
				ch = ''
				str = ''
			
			rdn = rdn + 1
			if rdn >= 20 :
				rdn = 20
				list_GPRMC = GPRMC.split(',')
				list_GPVTG = GPVTG.split(',')
				list_GPGGA = GPGGA.split(',')
				list_GPGSA = GPGSA.split(',')
				list_GPGSV = GPGSV.split(',')
				list_GPGLL = GPGLL.split(',')		
	
				valid = list_GPRMC[2] 
				if valid == 'A' :
					temp_times= list_GPRMC[1]
					temp_lat  = list_GPRMC[3]
					temp_lng = list_GPRMC[5]
					temp_date = list_GPRMC[9]
	
					## calculate time
					if len(temp_times) == 9 :
						hh = temp_times[0:2]
						mm = temp_times[2:4]
						ss = temp_times[4:6]
					else :
						hh = temp_times[0:2]
						mm = temp_times[2:4]
						ss = temp_times[4:6]
						hh = int(hh)
						hh = (hh + 7) % 24
					temp_times = "%2d:%s:%s" %(hh,mm,ss)
			
					## calculate date
					if len(temp_date) == 6 :
						dd = temp_date[0:2]
						mm = temp_date[2:4]
						yy = temp_date[4:6]
					else :
						dd = temp_date[0:1]
						mm = temp_date[1:3]
						yy = temp_date[3:5]
					temp_date = "%s/%s/20%s" %(dd,mm,yy)

					## calculate lat
					temp_lat 	= float(temp_lat)
					temp_lat	= temp_lat/100
					temp_lat_mod 	= temp_lat % 1
					temp_lat	= temp_lat - temp_lat_mod
					temp_lat	= temp_lat + ((temp_lat_mod/60)*100)
				
					## calculate lng
					temp_lng	= float(temp_lng)
					temp_lng	= temp_lng/100
					temp_lng_mod	= temp_lng % 1
					temp_lng	= temp_lng - temp_lng_mod
					temp_lng	= temp_lng + ((temp_lng_mod/60)*100)

					## return
					times 	= temp_times
					lat 	= "%f" %temp_lat
					lng		= "%f" %temp_lng
					date 	= temp_date
					num_sat = list_GPGGA[7]
					abv_mean_sea = list_GPGGA[9]
					speed 	= list_GPVTG[7]

					# send data
					peoCount()
					message = busID + ","  + lng + "," + lat + ",%d" %peocount
					if round(time.time() % 1) == 0 and togg == True :
						point = point + 1
						socket.emit('connector',message)
						file = open('/home/pi/project/clientSide/log_numpeo','r+')
						file.truncate()
						file.writelines("%d" %peocount)
						file.close()
						togg = False
					elif round(time.time() % 1) == 1 :
						togg = True

					if point % 20 == 0 :
						socket = SocketIO(HOST,PORT)
						point = 1

				else :
					times 	= 'N/A'
					date	= 'N/A'
					lat		= 'N/A'
					lng		= 'N/A'
					num_sat 	= 'N/A'
					abv_mean_sea	= 'N/A'
					speed	= 'N/A'

except :#KeyboardInterrupt:
	print ("EXIT")
	GPIO.cleanup()
	file.truncate()
	file.writelines("%d" %peocount)
	file.close()
	ser.close()