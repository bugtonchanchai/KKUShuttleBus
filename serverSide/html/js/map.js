var map;
var busNum = [];
var color = [];
var dist = [];
var marker = [];		// bus maker
var busStopMarker = [];
var arrLoc = [];
var arrLat = [];
var arrLng = [];
var arrDist = [];
var arrTime = [];
var arrNumpeo = [];
var arrVelocity = [];
var placemarker;		// place marker
var mymarker; 			// my position marker
var init_loc = new google.maps.LatLng(16.474430, 102.822495);

/********** initial function **********/
$(document).ready(function () {
    var mapOptions = {
        position: init_loc,
        center: init_loc,
        zoom: 15,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.BOTTOM_LEFT
        },
        panControl: true,
        panControlOptions: {
            position: google.maps.ControlPosition.MIDDLE_CENTER
        }
    };
    map = new google.maps.Map($('#map-canvas')[0], mapOptions);

    $.getJSON("/db_json?query=select * from color a,distance b where a.color=b.color order by busid", function (data) {
        $.each(data.result, function (i, item) {
            busNum[i] = item.BUSID;
            color[i] = item.COLOR;
            dist[i] = item.PATH;
            marker[i] = new google.maps.Marker({
                map: map,
                icon: "/picture?pic=" + item.COLOR,
                title: "BUS " + busNum[i]
            });
        });
        for (var i = 0; i < busNum.length; i++) {
            arrLat[i] = 0;
            arrLng[i] = 0;
            arrTime[i] = 0;
            arrVelocity[i] = 0;
            arrDist[i] = 0;
			arrNumpeo[i] = 0;
        }
		infoPanel();
		geolocation();
    });

    // home button
    var homeControlDiv = document.createElement('div');
    var homeControl = new HomeControl(homeControlDiv, map);
    homeControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.RIGHT_TOP].push(homeControlDiv);

    // bus stop button
    var busStopDiv = document.createElement('div');
    var nearBusstop = new NearBusstop(busStopDiv, map);
    busStopDiv.index = 1;
    map.controls[google.maps.ControlPosition.RIGHT_TOP].push(busStopDiv);

    // red line button
    var redLineDiv = document.createElement('div');
    var redLine = new Redline(redLineDiv, map);
    redLineDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(redLineDiv);

    // yellow line button
    var yellowLineDiv = document.createElement('div');
    var yellowLine = new Yellowline(yellowLineDiv, map);
    yellowLineDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(yellowLineDiv);

    // blue line button
    var blueLineDiv = document.createElement('div');
    var blueLine = new Blueline(blueLineDiv, map);
    blueLineDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(blueLineDiv);

    // orange line button
    var orangeLineDiv = document.createElement('div');
    var orangeLine = new Orangeline(orangeLineDiv, map);
    orangeLineDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(orangeLineDiv);
});


/********** Socket zone **********/
$(function () {
    io = io.connect()
    io.on('connector', function (data) {
        var splData = data.split(",");	// data package "busID,lat,lng,time"
        var busID = splData[0];		// busID
        var lat = splData[1];		// lat
        var lng = splData[2];		// long
        var time = splData[3]; 		// time
        var vel = splData[4];		// velocity
        var dist = splData[5];		// distance
		var peo = splData[6];		// passengers

        // if (lat != null && lng != null) {
        for (var i = 0; i < busNum.length; i++) {
            if (busID == busNum[i]) {
                arrLoc[i] = new google.maps.LatLng(lat, lng);
                arrLat[i] = lat;
                arrLng[i] = lng;
                arrTime[i] = time;
                arrVelocity[i] = vel;
                arrDist[i] = dist;
				arrNumpeo[i] = peo;
                marker[i].setPosition(arrLoc[i]);
            }
        }
        // }
        infoPanel();
    })
});

/********** Function zone **********/
// geolocation function
function geolocation() {
    var usericon = "/picture?pic=2";
    navigator.geolocation.getCurrentPosition(function (position) {
        var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        if (mymarker != null) {
            mymarker.setPosition(pos);
        }
        else {
            mymarker = new google.maps.Marker({
                icon: usericon,
                map: map,
                title: "my loction",
                position: pos
            });
        }
        map.panTo(pos);
    });
}

// home button func()
function HomeControl(controlDiv, map) {
    controlDiv.style.padding = '5px';

    // Set CSS for the control border
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = 'sky';
    controlUI.style.borderStyle = 'solid';
    controlUI.style.borderWidth = '1px';
    controlUI.style.cursor = 'pointer';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to set the map to your location';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior
    var controlText = document.createElement('div');
    controlText.style.fontFamily = 'Arial,sans-serif';
    controlText.style.fontSize = '14px';
    controlText.style.paddingLeft = '4px';
    controlText.style.paddingRight = '4px';
    controlText.innerHTML = '<b>My location</b>';
    controlUI.appendChild(controlText);

    google.maps.event.addDomListener(controlUI, 'click', function () {
        geolocation();
    });
}

// find bus stop func()
function NearBusstop(controlDiv, map) {
    controlDiv.style.padding = '5px';

    // Set CSS for the control border
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = 'sky';
    controlUI.style.borderStyle = 'solid';
    controlUI.style.borderWidth = '1px';
    controlUI.style.cursor = 'pointer';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to find nearest busstop';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior
    var controlText = document.createElement('div');
    controlText.style.fontFamily = 'Arial,sans-serif';
    controlText.style.fontSize = '14px';
    controlText.style.paddingLeft = '4px';
    controlText.style.paddingRight = '4px';
    controlText.innerHTML = '<b>bus stop</b>';
    controlUI.appendChild(controlText);

    var togg = false;
    var markerbusstop = "/picture?pic=1";
    google.maps.event.addDomListener(controlUI, 'click', function () {
        if (!togg) {
            $.getJSON("/placekkuapi?type=10", function (data) {
                $.each(data.result, function (i, item) {
                    busStopMarker[i] = new google.maps.Marker({
                        position: new google.maps.LatLng(item.lat, item.lon),
                        icon: markerbusstop,
                        map: map,
                        title: item.name
                    });
                });
            });
            togg = true;
        }
        else {
            for (var i = 0; i < busStopMarker.length; i++) {
                busStopMarker[i].setMap(null);
            }
            togg = false;
        }
    });
}

// redline button func()
function Redline(controlDiv, map) {
    controlDiv.style.padding = '5px';

    // Set CSS for the control border
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = 'red';
    controlUI.style.borderStyle = 'solid';
    controlUI.style.borderWidth = '2px';
    controlUI.style.cursor = 'pointer';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'view red line';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior
    var controlText = document.createElement('div');
    controlText.style.fontFamily = 'Arial,sans-serif';
    controlText.style.fontSize = '14px';
    controlText.style.paddingLeft = '4px';
    controlText.style.paddingRight = '4px';
    controlText.innerHTML = '<b>line 1</b>';
    controlUI.appendChild(controlText);

    var url_kml = "http://lab.en.kku.ac.th/chayut/serverSide/kml/line1.kml";
    var kmlOptions = {preserveViewport: 1};
    var line1 = new google.maps.KmlLayer(url_kml, kmlOptions);
    line1.setMap(null);
    var togg = false;
    google.maps.event.addDomListener(controlUI, 'click', function () {
        if (!togg) {
            line1.setMap(map);
            togg = true;
        }
        else {
            line1.setMap(null);
            togg = false;
        }
    });
}

// yellowline button func()
function Yellowline(controlDiv, map) {
    controlDiv.style.padding = '5px';

    // Set CSS for the control border
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = 'yellow';
    controlUI.style.borderStyle = 'solid';
    controlUI.style.borderWidth = '2px';
    controlUI.style.cursor = 'pointer';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'view yellow line';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior
    var controlText = document.createElement('div');
    controlText.style.fontFamily = 'Arial,sans-serif';
    controlText.style.fontSize = '14px';
    controlText.style.paddingLeft = '4px';
    controlText.style.paddingRight = '4px';
    controlText.innerHTML = '<b>line 2</b>';
    controlUI.appendChild(controlText);

    var url_kml = "http://lab.en.kku.ac.th/chayut/serverSide/kml/line2.kml";
    var kmlOptions = {preserveViewport: 1};
    var line2 = new google.maps.KmlLayer(url_kml, kmlOptions);
    line2.setMap(null);
    var togg = false;
    google.maps.event.addDomListener(controlUI, 'click', function () {
        if (!togg) {
            line2.setMap(map);
            togg = true;
        }
        else {
            line2.setMap(null);
            togg = false;
        }
    });
}

// blueline button func()
function Blueline(controlDiv, map) {
    controlDiv.style.padding = '5px';

    // Set CSS for the control border
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = 'blue';
    controlUI.style.borderStyle = 'solid';
    controlUI.style.borderWidth = '2px';
    controlUI.style.cursor = 'pointer';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'view blue line';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior
    var controlText = document.createElement('div');
    controlText.style.fontFamily = 'Arial,sans-serif';
    controlText.style.fontSize = '14px';
    controlText.style.paddingLeft = '4px';
    controlText.style.paddingRight = '4px';
    controlText.innerHTML = '<b>line 3</b>';
    controlUI.appendChild(controlText);

    var url_kml = "http://lab.en.kku.ac.th/chayut/serverSide/kml/line3.kml";
    var kmlOptions = {preserveViewport: 1};
    var line3 = new google.maps.KmlLayer(url_kml, kmlOptions);
    line3.setMap(null);
    var togg = false;
    google.maps.event.addDomListener(controlUI, 'click', function () {
        if (!togg) {
            line3.setMap(map);
            togg = true;
        }
        else {
            line3.setMap(null);
            togg = false;
        }
    });
}

// orangeline button func()
function Orangeline(controlDiv, map) {
    controlDiv.style.padding = '5px';

    // Set CSS for the control border
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = 'orange';
    controlUI.style.borderStyle = 'solid';
    controlUI.style.borderWidth = '2px';
    controlUI.style.cursor = 'pointer';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'view orange line';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior
    var controlText = document.createElement('div');
    controlText.style.fontFamily = 'Arial,sans-serif';
    controlText.style.fontSize = '14px';
    controlText.style.paddingLeft = '4px';
    controlText.style.paddingRight = '4px';
    controlText.innerHTML = '<b>line 4</b>';
    controlUI.appendChild(controlText);

    var url_kml = "http://lab.en.kku.ac.th/chayut/serverSide/kml/line4.kml";
    var kmlOptions = {preserveViewport: 1};
    var line4 = new google.maps.KmlLayer(url_kml, kmlOptions);
    line4.setMap(null);
    var togg = false;
    google.maps.event.addDomListener(controlUI, 'click', function () {
        if (!togg) {
            line4.setMap(map);
            togg = true;
        }
        else {
            line4.setMap(null);
            togg = false;
        }
    });
}

function infoPanel() {
    for (var i = 0; i < busNum.length; i++) {
        $('#info_bus0' + (i + 1)).text("");
        $('#info_bus0' + (i + 1)).append("<div align=\"center\"><b>BUS " + busNum[i] + "</b></div>");

        $('#info_bus' + (i + 1)).text("");
        $('#info_bus' + (i + 1)).append("Distance = " + parseFloat(arrDist[i]).toFixed(3) + " Km</br>");
        $('#info_bus' + (i + 1)).append("Velocity = " + parseFloat(arrVelocity[i]).toFixed(3) + " Km/hr</br>");
        $('#info_bus' + (i + 1)).append("Passengers = " + arrNumpeo[i]);
    }
}

$(function() {
	$("#info_bus01").click(function() {
		map.panTo(arrLoc[0]);
	});
	$("#info_bus02").click(function() {
		map.panTo(arrLoc[1]);
	});
	$("#info_bus03").click(function() {
		map.panTo(arrLoc[2]);
	});
	$("#info_bus04").click(function() {
		map.panTo(arrLoc[3]);
	});
	$("#info_bus05").click(function() {
		map.panTo(arrLoc[4]);
	});
	$("#info_bus06").click(function() {
		map.panTo(arrLoc[5]);
	});
	$("#info_bus07").click(function() {
		map.panTo(arrLoc[6]);
	});
	$("#info_bus08").click(function() {
		map.panTo(arrLoc[7]);
	});
	$("#info_bus09").click(function() {
		map.panTo(arrLoc[8]);
	});
	$("#info_bus010").click(function() {
		map.panTo(arrLoc[9]);
	});
	$("#info_bus011").click(function() {
		map.panTo(arrLoc[10]);
	});
	$("#info_bus012").click(function() {
		map.panTo(arrLoc[11]);
	});
	$("#info_bus013").click(function() {
		map.panTo(arrLoc[12]);
	});
	$("#info_bus014").click(function() {
		map.panTo(arrLoc[13]);
	});
	$("#info_bus015").click(function() {
		map.panTo(arrLoc[14]);
	});
});