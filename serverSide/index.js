//********** HOST & PORT initialize zone **********//
HOST = '127.0.0.1'
PORT = 30000


//********** Module included zone **********//
S = require('string')
app = require('express.io')()
fs = require('fs')
request = require('request')
mysql = require('mysql')


//********** HTTP & HTTPS zone **********//
option = {
    key: fs.readFileSync('./key'),
    cert: fs.readFileSync('./cert')
}
//app.https(option).io()	// for HTTPS
app.http().io()				// for HTTP


//********** Global variables zone **********//
busid = ''			// bus id 1-15
busNum = []
color = []
lat = []					// latitude real time
lng = []					// longitude real time
tme = []				// time real time
vel = []					// average velocity real time
max_vel = []			// max velocity real time
dist = []					// sum distance all line
numpeo = []			// number of passenger
numpeoTemp = []		// temp number of passenger
latTemp = []		// temp latitude
lngTemp = []		// temp longitude
tmeTemp = []		// temp time
current_seconds = []		// for calculate the velocity
current_secondsTemp = []	// for calculate the velocity

bus_stp_idx = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
time_busstop = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []]

red_lat_bst = ["16.479332","16.478967","16.478324","16.477804","16.477640","16.477205","16.476379","16.476775","16.477519","16.478398","16.480489","16.473537","16.469218","16.467956","16.466657","16.466950","16.468293","16.470106","16.471011","16.472300","16.473995","16.475692","16.477462","16.477609","16.478324","16.479332"]
red_lng_bst = ["102.808535","102.810005","102.814461","102.818636","102.820157","102.823521","102.830513","102.831956","102.832021","102.832026","102.831870","102.831725","102.831530","102.830741","102.830781","102.828276","102.826425","102.824610","102.823030","102.821643","102.822375","102.822694","102.820047","102.818795","102.813481","102.808535"]
yellow_lat_bst = ["16.479332","16.478967","16.478324","16.476951","16.473978","16.473995","16.474265","16.473318","16.472655","16.469967","16.468671","16.467531","16.465880","16.465514","16.466950","16.469404","16.472254","16.474553","16.476613","16.477115","16.477462","16.477609","16.478324","16.479517","16.479332"]
yellow_lng_bst = ["102.808535","102.810005","102.814461","102.819516","102.820755","102.822375","102.822898","102.821887","102.821032","102.816539","102.817293","102.819803","102.825921","102.827957","102.828276","102.827986","102.828091","102.828284","102.827372","102.823054","102.820047","102.818795","102.813481","102.807044","102.808535"]
blue_lat_bst = ["16.479332","16.478967","16.478704","16.478324","16.477804","16.477640","16.477205","16.474170","16.473987","16.474486","16.474530","16.474309","16.472254","16.469319","16.468293","16.467472","16.468418","16.469159","16.469967","16.476742","16.478324","16.479332"]
blue_lng_bst = ["102.808535","102.810005","102.811357","102.814461","102.818636","102.820157","102.823521","102.828279","102.826898","102.825715","102.825173","102.826442","102.828091","102.828003","102.826425","102.819983","102.817566","102.816697","102.816539","102.816177","102.813481","102.808535"]
orange_lat_bst = ["16.441856","16.446178","16.448123","16.450011","16.453198","16.467217","16.469967","16.472655","16.473995","16.475692","16.477462","16.476951","16.473978","16.472308","16.470324","16.467472","16.468418","16.469159","16.465777","16.450276","16.446852","16.441856"]
orange_lng_bst = ["102.814669","102.815109","102.815343","102.815595","102.815404","102.815522","102.816539","102.821032","102.822375","102.822694","102.820047","102.819516","102.820755","102.821662","102.824703","102.819983","102.817566","102.816697","102.815383","102.815699","102.815294","102.814669"]

placekkuAPI = "https://rdttc.kku.ac.th/itsupport/ikku_android/placekku_api.php?"
getplaceAPI = "http://www.kku.ac.th/ikku/api/places/services/getPlaces.php?key=&limit=2000&lang=th"
date = new Date()


//********** Database zone **********//
connection = mysql.createConnection({
    host: HOST,
    user: 'chayut',
    password: 'dodo1234',
    database: 'chayut'
})
connection.connect(function (err) {
    if (err) {
        console.log('ERROR : Cannot connect to database.')
        return
    } else {
        connection.query('select * from color a,distance b where a.color=b.color order by busid', function (err2, row) {
            for (data in row) {
                busNum[data] = row[data].BUSID
                color[data] = row[data].COLOR
            }
            // console.log(busNum)
            // console.log(color)
            for (i = 0; i < busNum.length; i++) {
				lat[i] = 0
				lng[i] = 0
                dist[i] = 0
                vel[i] = 0
                max_vel[i] = 0
                numpeo[i] = 0
            }
			// console.log(lng)
        })
    }
})


//********** HTTP link zone **********//
// link
app.get('/js/jquery.min.js', function (req, res) {
    res.sendfile(__dirname + '/html/js/jquery.min.js')
})
app.get('/js/excellentexport.js', function (req, res) {
    res.sendfile(__dirname + '/html/js/excellentexport.js')
})
app.get('/js/map.js', function (req, res) {
    res.sendfile(__dirname + '/html/js/map.js')
})
app.get('/js/db.js', function (req, res) {
    res.sendfile(__dirname + '/html/js/db.js')
})
app.get('/js/db_time.js', function (req, res) {
    res.sendfile(__dirname + '/html/js/db_time.js')
})
app.get('/css/style2.css', function (req, res) {
    res.sendfile(__dirname + '/html/css/style.css')
})
app.get('/css/images/bg-page.jpg', function (req, res) {
    res.sendfile(__dirname + '/html/images/bg-page.jpg')
})
app.get('/css/images/bg-body.jpg', function (req, res) {
    res.sendfile(__dirname + '/html/images/bg-body.jpg')
})
app.get('/css/main.css', function (req, res) {
    res.sendfile(__dirname + '/html/css/main.css')
})
app.get('/images/banner', function (req, res) {
    res.sendfile(__dirname + '/html/images/bus.swf')
})

// HTML page
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/html/index.html')
})
app.get('/listen', function (req, res) {
    res.sendfile(__dirname + '/html/listen.html')
})
app.get('/map', function (req, res) {
    res.sendfile(__dirname + '/html/map.html')
})
app.get('/database', function (req, res) {
    res.sendfile(__dirname + '/html/database.html')
})
app.get('/new_map', function (req, res) {
    res.sendfile(__dirname + '/html/new_map.html')
})
app.get('/new_db', function (req, res) {
    res.sendfile(__dirname + '/html/new_db.html')
})
app.get('/index', function (req, res) {
    res.sendfile(__dirname + '/html/index.html')
})
app.get('/report', function (req, res) {
    res.sendfile(__dirname + '/html/report.html')
})
app.get('/time', function (req, res) {
    res.sendfile(__dirname + '/html/time.html')
})
app.get('/about', function (req, res) {
    res.sendfile(__dirname + '/html/about.html')
})
app.get('/link', function (req, res) {
	res.sendfile(__dirname + '/html/about.html')
})

// Database query api page
app.get('/db_json', function (req, res) {
    var json = {}
    var arr = []
    var query_param = req.param('query')

    connection.query(query_param, function (err, rows) {
        for (data in rows) {
            arr[data] = {
                "BUSID": rows[data].BUSID,
                "COLOR": rows[data].COLOR,
                "PATH": rows[data].PATH,
                "DATE": rows[data].DATE,
                "ROUND": rows[data].ROUND,
                "DIST": rows[data].DIST,
                "AVG_V": rows[data].AVG_V,
                "MAX_V": rows[data].MAX_V,
                "NUM_P": rows[data].NUM_P,
				"START_TIME": rows[data].START_TIME,
				"STOP1": rows[data].STOP1,
				"STOP2": rows[data].STOP2,
				"STOP3": rows[data].STOP3,
				"STOP4": rows[data].STOP4,
				"STOP5": rows[data].STOP5,
				"STOP6": rows[data].STOP6,
				"STOP7": rows[data].STOP7,
				"STOP8": rows[data].STOP8,
				"STOP9": rows[data].STOP9,
				"STOP10": rows[data].STOP10,
				"STOP11": rows[data].STOP11,
				"STOP12": rows[data].STOP12,
				"STOP13": rows[data].STOP13,
				"STOP14": rows[data].STOP14,
				"STOP15": rows[data].STOP15,
				"STOP16": rows[data].STOP16,
				"STOP17": rows[data].STOP17,
				"STOP18": rows[data].STOP18,
				"STOP19": rows[data].STOP19,
				"STOP20": rows[data].STOP20,
				"STOP21": rows[data].STOP21,
				"STOP22": rows[data].STOP22,
				"STOP23": rows[data].STOP23,
				"STOP24": rows[data].STOP24,
				"STOP25": rows[data].STOP25,
				"DIFF":rows[data].DIFF
            }
        }
        if (err) {
            var text = []
            connection.query('show tables', function (err, rows) {
                for (data in rows) {
                    text[data] = "table = " + rows[data].Tables_in_chayut
                }
                json['error'] = ["Inavalid query sentence please fill parameter"]
                json['query'] = {"table": text}
                res.json(json)
            })
        } else {
            json['result'] = arr
            res.json(json)
        }
    })
})

// picture page
app.get('/picture', function (req, res) {
    var json = {}
    var param = req.param('pic')
    if (param == 1) {
        res.sendfile(__dirname + '/img/busstop.png')
    }
    else if (param == 2) {
        res.sendfile(__dirname + '/img/man.png')
    }
    else if (param == 3) {
        res.sendfile(__dirname + '/img/direction_down.png')
    }
    else if (param == 4 || param == 'red') {
        res.sendfile(__dirname + '/img/bus1.png')
    }
    else if (param == 5 || param == 'yellow') {
        res.sendfile(__dirname + '/img/bus2.png')
    }
    else if (param == 6 || param == 'blue') {
        res.sendfile(__dirname + '/img/bus3.png')
    }
    else if (param == 7 || param == 'orange') {
        res.sendfile(__dirname + '/img/bus4.png')
    }
    else if (param == 8) {
        res.sendfile(__dirname + '/img/button_serch.png')
    }
    else if (param == 9) {
        res.sendfile(__dirname + '/img/button_map.png')
    }
    else if (param == 10) {
        res.sendfile(__dirname + '/img/button_contract.png')
    }
    else {
        json['error'] = ["Inavalid parameter please fill parameter"]
        json['parameter'] = {"pic": "1-10"}
        res.json(json)
    }
})

// iKKU api called
app.get('/getplaceapi', function (req, res) {
    request({
        url: getplaceAPI,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            res.send(body)
        }
    })
})
app.get('/placekkuapi', function (req, res) {
    var param = req.param('type')
    request({
        url: placekkuAPI + "type=" + param,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            res.send(body)
        }
    })
})

// Android api
app.get('/getdistance', function (req, res) {
    lat1 = req.param('lat')
    lon1 = req.param('lon')
	colr = req.param('color')
	var arr = []
	k = 0
	for (i = 0; i<busNum.length; i++) {
		cal_dist = findDistance(lat1, lon1, lat[i], lng[i])
		if (colr == color[i] || colr == null) {
			arr[k] = {
				"busid": busNum[i],
				"lat": lat[i],
				"long": lng[i],
				"color": color[i],
				"numpeo": numpeo[i],
				"distance": cal_dist
			}
			k++
		}
	}
	arr.sort(SortByID)
	res.json(arr)
})
app.get('/getdistance2', function (req, res) {
    lat1 = req.param('lat1')
    lon1 = req.param('lon1')
    var url = placekkuAPI + "type=10"
    request({
        url: url,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var json = response.body.result
            for (var k in json) {
                var lat = json[k].lat
                var lon = json[k].lon
                json[k].distance = findDistance(lat1, lon1, lat, lon)
            }
            //json['result'] = [findDistance(lat1, lon1, lat2, lon2)]
            json.sort(SortByID)
            res.json(json)
        }
    })
})
function SortByID(x, y) {
    return x.distance - y.distance
}


//********** Socket  zone **********//
// input message   -->> "busid,long,lat,numpeo"
// output message -->> "busid,lat,long,time,velocity,distance,numpeo"
timecount = 0;
app.io.route('connector', function (req) {
    message = req.data
    id = S(message).between('', ',').s
    count = S(message).count(',')
    busid = id
    if (count == 3) {
        for (i = 0; i < busNum.length; i++) {
            if (busid == busNum[i]) {
                lng[i] = S(message).between(',', ',').s
                message = S(message).between(',').s
                lat[i] = S(message).between(',', ',').s
                message = S(message).between(',').s
                numpeo[i] = S(message).between(',').s

                tmes = new Date()
                current_hours = tmes.getHours()
                current_minutes = tmes.getMinutes()
                current_seconds[i] = tmes.getSeconds()
                tme[i] = current_hours + ':' + current_minutes + ':' + current_seconds[i]

                // broadcast message
                buff = busid
                buff += ',' + lat[i]
                buff += ',' + lng[i]
                buff += ',' + tme[i]
                buff += ',' + vel[i]
                buff += ',' + dist[i]
                buff += ',' + numpeo[i]

                // update number of passenger to database (increment only)
                if (numpeo[i] > numpeoTemp[i]) {
                    connection.query('UPDATE chayut.bus' + (i + 1) + ' SET NUM_P=NUM_P+1 WHERE DATE=CURDATE()', function (err, data) {
						if (err) {
							 console.log('ERROR : Cannot update number of passenger into database.')
							 return
						}
					})
					connection.query('UPDATE chayut.stop_' + color[i] + ' SET NUM_P=NUM_P+1 WHERE BUSID=' + busNum[i] + ' AND DATE=curdate() AND START_TIME=\'' + time_busstop[i][0] + '\'', function (err, data) {
						if (err) {
							 console.log('ERROR : Cannot update number of passenger into database(stop table).')
							 return
						}
					})
                }
                numpeoTemp[i] = numpeo[i]
				timeBusstop(i, lat[i], lng[i])
				
                // check time changed to calculate velocity and distance
                if (tmeTemp[i] != tme[i]) {
                    if (max_vel[i] < vel[i] && vel[i] < 100) {
                        max_vel[i] = vel[i]
                    }
                    if (timecount == 3) {    // update all value into database
                        queryDB(i)
                        timecount = 0
                    }
					
                    dist[i] += findDistance(lat[i], lng[i], latTemp[i], lngTemp[i])
                    vel[i] = findDistance(lat[i], lng[i], latTemp[i], lngTemp[i]) * (3600 / Math.abs(current_seconds[i] - current_secondsTemp[i]))
					latTemp[i] = lat[i]
                    lngTemp[i] = lng[i]
                    current_secondsTemp[i] = current_seconds[i]
                    timecount++
                }
            }
        }
    } else {
        buff = 'ERRROR message : ' + message
        console.log(buff)
    }
    req.io.broadcast('connector', buff)
    // console.log(buff)
})


//********** Listen zone **********//
app.listen(PORT)
console.log(date)
console.log('listening ' + HOST + ':' + PORT)


//********** Function zone **********//
// Calculate velocity function
//http://andrew.hedges.name/experiments/haversine/
function findDistance(lat_s, lon_s, lat_d, lon_d) {
    var Rk = 6373; // mean radius of the earth (km) at 39 degrees from the equator
    var t1, n1, t2, n2, lat1, lon1, lat2, lon2, dlat, dlon, a, c, dk, km;
    // get values for lat1, lon1, lat2, and lon2
    t1 = lat_s;
    n1 = lon_s;
    t2 = lat_d;
    n2 = lon_d;
    // convert coordinates to radians
    lat1 = deg2rad(t1);
    lon1 = deg2rad(n1);
    lat2 = deg2rad(t2);
    lon2 = deg2rad(n2);
    // find the differences between the coordinates
    dlat = lat2 - lat1;
    dlon = lon2 - lon1;
    // here's the heavy lifting
    a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);
    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // great circle distance in radians
    dis = c * Rk; // great circle distance in km
    if (!isNaN(dis)) {
        return Math.round(dis * 1000) / 1000;
    }
    else {
        return 0;
    }
}

// Convert degrees to radians
function deg2rad(deg) {
    rad = deg * Math.PI / 180; // radians = degrees * pi/180
    return rad;
}

// get bus stop times to database
function timeBusstop(index, param_lat, param_lng) {
	if (color[index] == 'red') {
		var dist_busstop_ref = findDistance(param_lat, param_lng, red_lat_bst[0], red_lng_bst[0])
		var dist_busstop = findDistance(param_lat, param_lng, red_lat_bst[bus_stp_idx[index]], red_lng_bst[bus_stp_idx[index]])
		var  length_busstop = red_lat_bst.length
	} else if (color[index] == 'yellow') {
		var dist_busstop_ref = findDistance(param_lat, param_lng, yellow_lat_bst[0], yellow_lng_bst[0])
		var dist_busstop = findDistance(param_lat, param_lng, yellow_lat_bst[bus_stp_idx[index]], yellow_lng_bst[bus_stp_idx[index]])
		var  length_busstop = yellow_lat_bst.length
	} else if (color[index] == 'blue') {
		var dist_busstop_ref = findDistance(param_lat, param_lng, blue_lat_bst[0], blue_lng_bst[0])
		var dist_busstop = findDistance(param_lat, param_lng, blue_lat_bst[bus_stp_idx[index]], blue_lng_bst[bus_stp_idx[index]])
		var  length_busstop = blue_lat_bst.length
	} else if (color[index] == 'orange') {
		var dist_busstop_ref = findDistance(param_lat, param_lng, orange_lat_bst[0], orange_lng_bst[0])
		var dist_busstop = findDistance(param_lat, param_lng, orange_lat_bst[bus_stp_idx[index]], orange_lng_bst[bus_stp_idx[index]])
		var  length_busstop = orange_lat_bst.length
	}

	if (bus_stp_idx[index] == 0) {
		if (dist_busstop < 0.080) {
			time_busstop[index][bus_stp_idx[index]] = tme[index]
			// console.log(time_busstop)
		} else {
			queryDB2(index)
			bus_stp_idx[index] = bus_stp_idx[index] + 1
		}
	} else if (bus_stp_idx[index] == 12 && color[index] == 'red') {
		bus_stp_idx[index] = 16;
	} else {
		if (dist_busstop < 0.080) {
			time_busstop[index][bus_stp_idx[index]] = tme[index]
			queryDB3(index, bus_stp_idx[index])
			// console.log(time_busstop)
			bus_stp_idx[index] = bus_stp_idx[index] + 1
		}
		 if (dist_busstop_ref < 0.080 && bus_stp_idx[index] != 0 && bus_stp_idx[index] != (length_busstop - 1)) {
			time_busstop[index] = []
			bus_stp_idx[index] = 0
		}
	}
}

// Query database function
function queryDB(table) {
    connection.query('SELECT count(DATE) AS result FROM chayut.bus' + (table + 1) + ' WHERE DATE=CURDATE()', function (err, data) {
        if (data[0].result == 0) {		// record not found >> new day
            connection.query('INSERT INTO chayut.bus' + (table + 1) + ' (DATE) VALUES (CURDATE())', function (err2, data2) {
                dist[table] = 0
                vel[table] = 0
                max_vel[table] = 0
                numpeo[table] = 0
                if (err2) {
                    console.log('ERROR : Cannot insert new row in BUS' + (table + 1) + ' table.')
                    return
                }
            })
        } else {		// record was found
            connection.query('UPDATE chayut.bus' + (table + 1) + ' SET DIST=' + dist[table] + ',AVG_V=' + vel[table] + ',MAX_V=' + max_vel[table] + ' WHERE DATE=CURDATE()', function (err2, data2) {
                if (err2) {
                    console.log('ERROR : Cannot update value in BUS' + (table + 1) + ' table.')
                    return
                }
            })
			connection.query('SELECT count(START_TIME) AS result from chayut.stop_' + color[table] + ' WHERE DATE=CURDATE()', function (err2, data2) {
				connection.query('UPDATE chayut.bus' + (table + 1) + ' SET ROUND=' + data2[0].result + ' WHERE DATE=CURDATE()', function (err3, data2) {
				})
            })
        }
        if (err) {
            console.log('ERROR : Cannot query in table.')
            return
        }
    })
}

function queryDB2(index) {
    connection.query('INSERT INTO chayut.stop_' + color[index] + ' (BUSID,DATE,START_TIME) VALUES ('  + busNum[index] + ',curdate(),\'' + time_busstop[index][0] + '\')', function (err, data) {
		if (err) {
			console.log('ERROR : Cannot insert into stop_' + color[index] + '.')
			return
		}
    })
}

function queryDB3(index, stop_index) {
    connection.query('UPDATE chayut.stop_' + color[index] + ' SET STOP' + stop_index + '=\'' + time_busstop[index][stop_index] + '\' WHERE BUSID=' + busNum[index] + ' AND DATE=curdate() AND START_TIME=\'' + time_busstop[index][0] + '\'', function (err, data) {
		if (err) {
			console.log('ERROR : Cannot update into stop_' + color[index] + '.')
			return
		}
    })
}