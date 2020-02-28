var busID = [];
var color = [];
var dist = [];
$(document).ready(function () {
	$.getJSON("/db_json?query=select * from color a,distance b where a.color=b.color order by busid", function (data) {
		$.each(data.result, function (i, item) {
			busID[i] = item.BUSID;
			color[i] = item.COLOR;
			dist[i] = item.PATH;
		});
	});
});

$(function () {
	$("#datepicker").datepicker();
	$('input:radio[name="list"]').change(function () {
		if ($(this).is(':checked') && $(this).val() == "type1") {
			$("#datepicker").val("-- เลือกวันที่ต้องการ --");
			$("#datepicker").prop('disabled', true);
			$("#ddl_year1").prop('disabled', false);
			$("#ddl_year2").prop('disabled', true);
			$("#ddl_month").prop('disabled', true);
			$("#ddl_year2").val("default");
			$("#ddl_month").val("default");
		} else if ($(this).is(':checked') && $(this).val() == "type2") {
			$("#datepicker").val("-- เลือกวันที่ต้องการ --");
			$("#datepicker").prop('disabled', true);
			$("#ddl_month").prop('disabled', false);
			$("#ddl_year1").prop('disabled', true);
			$("#ddl_year2").prop('disabled', false);
			$("#ddl_year1").val("default");
		} else {
			$("#datepicker").prop('disabled', false);
			$("#ddl_month").prop('disabled', true);
			$("#ddl_year1").prop('disabled', true);
			$("#ddl_year2").prop('disabled', true);
			$("#ddl_month").val("default");
			$("#ddl_year1").val("default");
			$("#ddl_year2").val("default");
		}
	});
	$("#submit").click(function () {
		if ($("#datepicker").val() !== "-- เลือกวันที่ต้องการ --") {
			var temp = $("#datepicker").val();
			var dd = temp.substring(3, 5);
			var mm = temp.substring(0, 2);
			var yy = temp.substring(6, 10);
			db_query_date(yy + '-' + mm + '-' + dd);
		} else if ($("#ddl_month").val() !== null && $("#ddl_year2").val() !== null) {
			var temp_m = $("#ddl_month").val();
			var temp_y = $("#ddl_year2").val();
			db_query_MY(temp_m + '-' + temp_y);
		} else if ($("#ddl_year1").val() !== null) {
			var temp_y = $("#ddl_year1").val();
			db_query_Y(temp_y);
		} else {
			alert("โปรดเลือกรายละเอียดให้ถูกต้อง");
		}
	});
});

// Year
function db_query_Y(param) {
	var temp_round = 0;
	var temp_dist = 0;
	var temp_avgvel = 0;
	var temp_maxvel = 0;
	var temp_numpeo = 0;

	var yy = param.substring(0, 4);

	for (var index = 0; index < busID.length; index++) {
		(function (index) {
			if (index == 0) {
				$('#div1').empty();
				$('#div1').append('<a download="export.xls" href="#" onclick="return ExcellentExport.excel(this, \'tb1\', \'Sheet Name Here\');">Export to Excel</a><br/><br/>');
				$('#div1').append('<table id="tb1" class="databaseTable">');
				$('#tb1').append('<tr align="center"><td colspan="8"><b>ข้อมูลประจำปี ' + yy + '</b></td></tr>');
				$('#tb1').append('<tr align="center"><td class="databaseTable"><b>หมายเลขรถ</b></td>' +
						'<td class="databaseTable"><b>สายรถ</b></td>' +
						'<td class="databaseTable"><b>ระยะทางต่อเที่ยว(Km)</b></td>' +
						'<td class="databaseTable"><b>จำนวนเที่ยว(เที่ยว)</b></td>' +
						'<td class="databaseTable"><b>ระยะทางรวม(Km)</b></td>' +
						'<td class="databaseTable"><b>ความเร็วเฉลี่ย(Km/hr)</b></td>' +
						'<td class="databaseTable"><b>ความเร็วสูงสุด(Km/hr)</b></td>' +
						'<td class="databaseTable"><b>จำนวนผู้โดยสาร(คน)</b></td></tr>');
			}
			var url = "/db_json?query=select year(DATE) as DATE,sum(ROUND) as ROUND,round(sum(DIST),3) as DIST,round(sum(AVG_V)/count(AVG_V),3)as AVG_V,round(max(MAX_V),3) as MAX_V,sum(NUM_P) as NUM_P from bus" + busID[index] + " where year(DATE)=" + yy + " group by year(DATE)";
			$.getJSON(url, function (data) {
				if (data.result == "") {
					$('#tb1').append('<tr align="center">' +
							'<td class="databaseTable">' + busID[index] + '</td>' +
							'<td class="databaseTable">' + color[index] + '</td>' +
							'<td class="databaseTable">' + dist[index] + '</td>' +
							'<td class="databaseTable">-</td>' +
							'<td class="databaseTable">-</td>' +
							'<td class="databaseTable">-</td>' +
							'<td class="databaseTable">-</td>' +
							'<td class="databaseTable">-</td>');
					return
				}
				$.each(data.result, function (i, item) {
					temp_round = item.ROUND;
					temp_dist = item.DIST;
					temp_avgvel = item.AVG_V;
					temp_maxvel = item.MAX_V;
					temp_numpeo = item.NUM_P;
				});

				$('#tb1').append('<tr align="center">' +
						'<td class="databaseTable">' + busID[index] + '</td>' +
						'<td class="databaseTable">' + color[index] + '</td>' +
						'<td class="databaseTable">' + dist[index] + '</td>' +
						'<td class="databaseTable">' + temp_round + '</td>' +
						'<td class="databaseTable">' + temp_dist + '</td>' +
						'<td class="databaseTable">' + temp_avgvel + '</td>' +
						'<td class="databaseTable">' + temp_maxvel + '</td>' +
						'<td class="databaseTable">' + temp_numpeo + '</td></tr>');

				temp_round = 0;
				temp_dist = 0;
				temp_avgvel = 0;
				temp_maxvel = 0;
				temp_numpeo = 0;
			});
		})(index);
	}
	$('#div1').append('</table>');
}

// Mounth
function db_query_MY(param) {
	var temp_round = 0;
	var temp_dist = 0;
	var temp_avgvel = 0;
	var temp_maxvel = 0;
	var temp_numpeo = 0;

	var mm = param.substring(0, 2);
	var yy = param.substring(3, 8);

	for (var index = 0; index < busID.length; index++) {
		(function (index) {
			if (index == 0) {
				$('#div1').empty();
				$('#div1').append('<a download="export.xls" href="#" onclick="return ExcellentExport.excel(this, \'tb1\', \'Sheet Name Here\');">Export to Excel</a><br/><br/>');
				$('#div1').append('<table id="tb1" class="databaseTable">');
				$('#tb1').append('<tr align="center"><td colspan="8"><b>ข้อมูลประจำเดือนข้อมูลประจำเดือน ' + mm + ' ปี ' + yy + '</b></td></tr>');
				$('#tb1').append('<tr align="center"><td class="databaseTable"><b>หมายเลขรถ</b></td>' +
						'<td class="databaseTable"><b>สายรถ</b></td>' +
						'<td class="databaseTable"><b>ระยะทางต่อเที่ยว(Km)</b></td>' +
						'<td class="databaseTable"><b>จำนวนเที่ยว(เที่ยว)</b></td>' +
						'<td class="databaseTable"><b>ระยะทางรวม(Km)</b></td>' +
						'<td class="databaseTable"><b>ความเร็วเฉลี่ย(Km/hr)</b></td>' +
						'<td class="databaseTable"><b>ความเร็วสูงสุด(Km/hr)</b></td>' +
						'<td class="databaseTable"><b>จำนวนผู้โดยสาร(คน)</b></td></tr>');
			}
			var url = "/db_json?query=select month(DATE) as DATE,sum(ROUND) as ROUND,round(sum(DIST),3) as DIST,round(sum(AVG_V)/count(AVG_V),3)as AVG_V,round(max(MAX_V),3) as MAX_V,sum(NUM_P) as NUM_P from bus" + busID[index] + " where month(DATE)=" + mm + " and year(DATE)=" + yy + " group by month(DATE),year(DATE)";
			$.getJSON(url, function (data) {
				if (data.result == "") {
					$('#tb1').append('<tr align="center">' +
							'<td class="databaseTable">' + busID[index] + '</td>' +
							'<td class="databaseTable">' + color[index] + '</td>' +
							'<td class="databaseTable">' + dist[index] + '</td>' +
							'<td class="databaseTable">-</td>' +
							'<td class="databaseTable">-</td>' +
							'<td class="databaseTable">-</td>' +
							'<td class="databaseTable">-</td>' +
							'<td class="databaseTable">-</td>');
					return
				}
				$.each(data.result, function (i, item) {
					temp_round = item.ROUND;
					temp_dist = item.DIST;
					temp_avgvel = item.AVG_V;
					temp_maxvel = item.MAX_V;
					temp_numpeo = item.NUM_P;
				});

				$('#tb1').append('<tr align="center">' +
						'<td class="databaseTable">' + busID[index] + '</td>' +
						'<td class="databaseTable">' + color[index] + '</td>' +
						'<td class="databaseTable">' + dist[index] + '</td>' +
						'<td class="databaseTable">' + temp_round + '</td>' +
						'<td class="databaseTable">' + temp_dist + '</td>' +
						'<td class="databaseTable">' + temp_avgvel + '</td>' +
						'<td class="databaseTable">' + temp_maxvel + '</td>' +
						'<td class="databaseTable">' + temp_numpeo + '</td></tr>');

				temp_round = 0;
				temp_dist = 0;
				temp_avgvel = 0;
				temp_maxvel = 0;
				temp_numpeo = 0;
			});
		})(index);
	}
	$('#div1').append('</table>');
}

// Day
function db_query_date(param) {
	var temp_round = 0;
	var temp_dist = 0;
	var temp_avgvel = 0;
	var temp_maxvel = 0;
	var temp_numpeo = 0;

	var dd = param.substring(8, 10);
	var mm = param.substring(5, 7);
	var yy = param.substring(0, 4);

	for (var index = 0; index < busID.length; index++) {
		(function (index) {
			if (index == 0) {
				$('#div1').empty();
				$('#div1').append('<a download="export.xls" href="#" onclick="return ExcellentExport.excel(this, \'tb1\', \'Sheet Name Here\');">Export to Excel</a><br/><br/>');
				$('#div1').append('<table id="tb1" class="databaseTable">');
				$('#tb1').append('<tr align="center"><td colspan="8"><b>ข้อมูลประจำวันที่ ' + dd + ' เดือน ' + mm + ' ปี ' + yy + '</b></td></tr>');
				$('#tb1').append('<tr align="center"><td class="databaseTable"><b>หมายเลขรถ</b></td>' +
						'<td class="databaseTable"><b>สายรถ</b></td>' +
						'<td class="databaseTable"><b>ระยะทางต่อเที่ยว(Km)</b></td>' +
						'<td class="databaseTable"><b>จำนวนเที่ยว(เที่ยว)</b></td>' +
						'<td class="databaseTable"><b>ระยะทางรวม(Km)</b></td>' +
						'<td class="databaseTable"><b>ความเร็วเฉลี่ย(Km/hr)</b></td>' +
						'<td class="databaseTable"><b>ความเร็วสูงสุด(Km/hr)</b></td>' +
						'<td class="databaseTable"><b>จำนวนผู้โดยสาร(คน)</b></td></tr>');
			}
			var url = "/db_json?query=select * from bus" + busID[index] + " where DATE='" + yy + "-" + mm + "-" + dd + "'";
			$.getJSON(url, function (data) {
				if (data.result == "") {
					$('#tb1').append('<tr align="center">' +
							'<td class="databaseTable">' + busID[index] + '</td>' +
							'<td class="databaseTable">' + color[index] + '</td>' +
							'<td class="databaseTable">' + dist[index] + '</td>' +
							'<td class="databaseTable">-</td>' +
							'<td class="databaseTable">-</td>' +
							'<td class="databaseTable">-</td>' +
							'<td class="databaseTable">-</td>' +
							'<td class="databaseTable">-</td>');
					return
				}
				$.each(data.result, function (i, item) {
					temp_round = item.ROUND;
					temp_dist = item.DIST;
					temp_avgvel = item.AVG_V;
					temp_maxvel = item.MAX_V;
					temp_numpeo = item.NUM_P;
				});

				$('#tb1').append('<tr align="center">' +
						'<td class="databaseTable">' + busID[index] + '</td>' +
						'<td class="databaseTable">' + color[index] + '</td>' +
						'<td class="databaseTable">' + dist[index] + '</td>' +
						'<td class="databaseTable">' + temp_round + '</td>' +
						'<td class="databaseTable">' + temp_dist + '</td>' +
						'<td class="databaseTable">' + temp_avgvel + '</td>' +
						'<td class="databaseTable">' + temp_maxvel + '</td>' +
						'<td class="databaseTable">' + temp_numpeo + '</td></tr>');

				temp_round = 0;
				temp_dist = 0;
				temp_avgvel = 0;
				temp_maxvel = 0;
				temp_numpeo = 0;
			});
		})(index);
	}
	$('#div1').append('</table>');
}