import logging
logging.getLogger('requests').setLevel(logging.WARNING)
logging.basicConfig(level=logging.DEBUG)


from socketIO_client import SocketIO
import serial
import os
import string
import time
import datetime
import json
import urllib2
from random import randint

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


ser = serial.Serial('/dev/ttyAMA0',4800,timeout = 5) # timeout = None
ser.open()

print ('Waiting...')
socket = SocketIO(HOST,PORT)
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


try :
	while True :
		ch = ser.read()
		str += ch
		
		if ch == '' :
			socket.emit('connector','NO GPS SIGNAL')
			socket = SocketIO(HOST,PORT)
		
		if ch == '\n' :
			#printCurrentLatLng()
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
					lng	= "%f" %temp_lng
					date 	= temp_date
					num_sat = list_GPGGA[7]
					abv_mean_sea = list_GPGGA[9]
					speed 	= list_GPVTG[7]

					# send data
					message = busID + ","  + lng + "," + lat + ",0"
					if round(time.time() % 1) == 0 and togg == True :
						point = point + 1
						socket.emit('connector',message)
						togg = False
					elif round(time.time() % 1) == 1 :
						togg = True

					if point % 10 == 0 :
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

except AttributeError :
	print "Attribute Error"

except KeyboardInterrupt :
	print ("EXIT")
	ser.close()
