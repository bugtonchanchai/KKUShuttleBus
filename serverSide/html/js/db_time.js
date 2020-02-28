var busID = [];
var color = [];
var dist = [];
var num_col = [25, 25 ,25 ,25 ,25, 24, 24, 24, 21, 21, 21, 21, 21, 21, 21]
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
		var temp_busnum = $("#ddl_busnumber").val();
		if ($("#datepicker").val() !== "-- เลือกวันที่ต้องการ --") {
			var temp = $("#datepicker").val();
			var temp_d = temp.substring(3, 5);
			var temp_m = temp.substring(0, 2);
			var temp_y = temp.substring(6, 10);
			var temp_header = "ข้อมูลประจำวันที่ " + temp_d + " เดือน " + temp_m + " ปี " + temp_y + " ของรถหมายเลข " + busID[temp_busnum];
			var temp_url = "/db_json?query=select *,TIMEDIFF(STOP" + num_col[temp_busnum] + ",START_TIME) AS DIFF from stop_" + color[temp_busnum] + " where BUSID=" + busID[temp_busnum] + " and DATE=\"" + temp_y + "-" + temp_m + "-" + temp_d + "\" order by DATE";
			db_query(temp_header, temp_url, temp_busnum);
		} else if ($("#ddl_month").val() !== null && $("#ddl_year2").val() !== null) {
			var temp_m = $("#ddl_month").val();
			var temp_y = $("#ddl_year2").val();
			var temp_header = "ข้อมูลประจำเดือน " + temp_m + " ปี " + temp_y + " ของรถหมายเลข " + busID[temp_busnum];
			var temp_url = "/db_json?query=select *,TIMEDIFF(STOP" + num_col[temp_busnum] + ",START_TIME) AS DIFF from stop_" + color[temp_busnum] + " where BUSID=" + busID[temp_busnum] + " and year(DATE)=" + temp_y + " and month(DATE)=" + temp_m + " order by DATE";
			db_query(temp_header, temp_url, temp_busnum);
		} else if ($("#ddl_year1").val() !== null) {
			var temp_y = $("#ddl_year1").val();
			var temp_header = "ข้อมูลประจำปี " + temp_y+ " ของรถหมายเลข " + busID[temp_busnum];
			var temp_url = "/db_json?query=select *,TIMEDIFF(STOP" + num_col[temp_busnum] + ",START_TIME) AS DIFF from stop_" + color[temp_busnum] + " where BUSID=" + busID[temp_busnum] + " and year(DATE)=" + temp_y + " order by DATE";
			db_query(temp_header, temp_url, temp_busnum);
		} else {
			alert("โปรดเลือกรายละเอียดให้ถูกต้อง");
		}
	});
});

function db_query(header, url, busnum) {
	if (color[busnum] == "red") {
		$.getJSON(url, function (data) {
			if (data.result == "") {
				$('#div1').empty();
				$('#div1').append('<br/><b>ไม่พบข้อมูลที่ท่านเลือก</b>');
				return
			}
			$('#div1').empty();
			$('#div1').append('<a download="export.xls" href="#" onclick="return ExcellentExport.excel(this, \'tb1\', \'Sheet Name Here\');">Export to Excel</a><br/><br/>');
			$('#div1').append('<table  id="tb1" class="databaseTable2">');
			$('#tb1').append('<tr><td colspan="30"><h3>' + header + '</h3></td></tr>');
			$('#tb1').append('<tr><td colspan="6"  class="databaseTable2" align="center"><b>ข้อมูลโดยสรุป</b></td><td colspan="24"  class="databaseTable2" align="center"><b>ข้อมูลโดยละเอียด (เวลาในแต่ละป้าย)</b></td></tr>');
			$('#tb1').append('<tr align="center"><td class="databaseTable2"><b>หมาย<br/>เลขรอบ</b></td>' +
					'<td class="databaseTable2"><b>ปี-เดือน-วัน</b></td>' +
					'<td class="databaseTable2"><b>จำนวน<br/>ผู้โดยสาร</b></td>' +
					'<td class="databaseTable2"><b>เวลา</br>เริ่มต้น</b></td>' +
					'<td class="databaseTable2"><b>เวลา</br>สิ้นสุด</b></td>' +
					'<td class="databaseTable2"><b>เวลา</br>ที่ใช้</b></td>' +
					'<td class="databaseTable2"><b>หอ 8 หลัง</b></td>' +
					'<td class="databaseTable2"><b>ปั๊ม<br/>ปตท</b></td>' +
					'<td class="databaseTable2"><b>หอแปดชาย</b></td>' +
					'<td class="databaseTable2"><b>โรง<br/>ชาย</b></td>' +
					'<td class="databaseTable2"><b>คอม<br/>เพล็กซ์</b></td>' +
					'<td class="databaseTable2"><b>สมาคมศิษย์เก่า</b></td>' +
					'<td class="databaseTable2"><b>ศาล<br/>เจ้าพ่อฯ</b></td>' +
					'<td class="databaseTable2"><b>รร.ขวัญมอ</b></td>' +
					'<td class="databaseTable2"><b>สัตว<br/>แพทย์</b></td>' +
					'<td class="databaseTable2"><b>ร.ร.สา<br/>ธิตฯ มอ</b></td>' +
					'<td class="databaseTable2"><b>วิทยา<br/>ลัยปกครองฯ</b></td>' +
					'<td class="databaseTable2"><b>แพทย์<br/>ศาสตร์</b></td>' +
					'<td class="databaseTable2"><b>รพ.ศรีฯ</b></td>' +
					'<td class="databaseTable2"><b>ศูนย์หัวใจ</b></td>' +
					'<td class="databaseTable2"><b>ทันต<br/>แพทย์</b></td>' +
					'<td class="databaseTable2"><b>บ้านพัก<br/>หนองแวง</b></td>' +
					'<td class="databaseTable2"><b>คณะ<br/>พยาบาล<br/>ศาสตร์</b></td>' +
					'<td class="databaseTable2"><b>หอ 24 หญิง</b></td>' +
					'<td class="databaseTable2"><b>โรงพิมพ์ มข</b></td>' +
					'<td class="databaseTable2"><b>คณะ<br/>เทคโน<br/>โลยี</b></td>' +
					'<td class="databaseTable2"><b>ตึก<br/>sc08</b></td>' +
					'<td class="databaseTable2"><b>เกษตร<br/>ศาสตร์</b></td>' +
					'<td class="databaseTable2"><b>โรงยิม</b></td>' +
					'<td class="databaseTable2"><b>สนาม<br/>ยิงปืน</b></td></tr>');
			$.each(data.result, function (i, item) {
				null_checker(item);
				$('#tb1').append('<tr align="center">' +
					'<td class="databaseTable2">' + (i+1) + '</td>' +
					'<td class="databaseTable2">' + (item.DATE).substring(0,10) + '</td>' +
					'<td class="databaseTable2">' + item.NUM_P + '</td>' +
					'<td class="databaseTable2">' + item.START_TIME + '</td>' +
					'<td class="databaseTable2">' + item.STOP25 + '</td>' +
					'<td class="databaseTable2">' + item.DIFF + '</td>' +
					'<td class="databaseTable2">' + item.STOP1 + '</td>' +
					'<td class="databaseTable2">' + item.STOP2 + '</td>' +
					'<td class="databaseTable2">' + item.STOP3 + '</td>' +
					'<td class="databaseTable2">' + item.STOP4 + '</td>' +
					'<td class="databaseTable2">' + item.STOP5 + '</td>' +
					'<td class="databaseTable2">' + item.STOP6 + '</td>' +
					'<td class="databaseTable2">' + item.STOP7 + '</td>' +
					'<td class="databaseTable2">' + item.STOP8 + '</td>' +
					'<td class="databaseTable2">' + item.STOP9 + '</td>' +
					'<td class="databaseTable2">' + item.STOP10 + '</td>' +
					'<td class="databaseTable2">' + item.STOP11 + '</td>' +
					'<td class="databaseTable2">' + item.STOP12 + '</td>' +
					'<td class="databaseTable2">' + item.STOP13 + '</td>' +
					'<td class="databaseTable2">' + item.STOP14 + '</td>' +
					'<td class="databaseTable2">' + item.STOP15 + '</td>' +
					'<td class="databaseTable2">' + item.STOP16 + '</td>' +
					'<td class="databaseTable2">' + item.STOP17 + '</td>' +
					'<td class="databaseTable2">' + item.STOP18 + '</td>' +
					'<td class="databaseTable2">' + item.STOP19 + '</td>' +
					'<td class="databaseTable2">' + item.STOP20 + '</td>' +
					'<td class="databaseTable2">' + item.STOP21 + '</td>' +
					'<td class="databaseTable2">' + item.STOP22 + '</td>' +
					'<td class="databaseTable2">' + item.STOP23 + '</td>' +
					'<td class="databaseTable2">' + item.STOP24 + '</td></tr>');
			});
		});
		$('#div1').append('</table>');
	} else if (color[busnum] == "yellow") {
		$.getJSON(url, function (data) {
			if (data.result == "") {
				$('#div1').empty();
				$('#div1').append('<br/><b>ไม่พบข้อมูลที่ท่านเลือก</b>');
				return
			}
			$('#div1').empty();
			$('#div1').append('<a download="export.xls" href="#" onclick="return ExcellentExport.excel(this, \'tb1\', \'Sheet Name Here\');">Export to Excel</a><br/><br/>');
			$('#div1').append('<table  id="tb1" class="databaseTable2">');
			$('#tb1').append('<tr><td colspan="29"><h3>' + header + '</h3></td></tr>');
			$('#tb1').append('<tr><td colspan="6"  class="databaseTable2" align="center"><b>ข้อมูลโดยสรุป</b></td><td colspan="23"  class="databaseTable2" align="center"><b>ข้อมูลโดยละเอียด (เวลาในแต่ละป้าย)</b></td></tr>');
			$('#tb1').append('<tr align="center"><td class="databaseTable2"><b>หมาย<br/>เลขรอบ</b></td>' +
					'<td class="databaseTable2"><b>ปี-เดือน-วัน</b></td>' +
					'<td class="databaseTable2"><b>จำนวน<br/>ผู้โดยสาร</b></td>' +
					'<td class="databaseTable2"><b>เวลา</br>เริ่มต้น</b></td>' +
					'<td class="databaseTable2"><b>เวลา</br>สิ้นสุด</b></td>' +
					'<td class="databaseTable2"><b>เวลา</br>ที่ใช้</b></td>' +
					'<td class="databaseTable2"><b>หอ 8 หลัง</b></td>' +
					'<td class="databaseTable2"><b>ปั๊ม<br/>ปตท</b></td>' +
					'<td class="databaseTable2"><b>เกษตร<br/>ศาสตร์</b></td>' +
					'<td class="databaseTable2"><b>โรงอาหาร<br/>เทคโน</b></td>' +
					'<td class="databaseTable2"><b>คณะ<br/>เทคโน<br/>โลยี</b></td>' +
					'<td class="databaseTable2"><b>วงเวียน<br/>ร.6</b></td>' +
					'<td class="databaseTable2"><b>ภาค<br/>เครื่องกล</b></td>' +
					'<td class="databaseTable2"><b>สะพาน<br/>ขาว</b></td>' +
					'<td class="databaseTable2"><b>ตึก<br/>อธิการ<br/>บดี</b></td>' +
					'<td class="databaseTable2"><b>คณะ<br/>ศิลป<br/>กรรมฯ</b></td>' +
					'<td class="databaseTable2"><b>ศูนย์<br/>แพทย์<br/>4</b></td>' +
					'<td class="databaseTable2"><b>โรง<br/>อาหาร<br/>หนองแวง</b></td>' +
					'<td class="databaseTable2"><b>ประตู<br/>กัง<br/>สดาร</b></td>' +
					'<td class="databaseTable2"><b>ทันต<br/>แพทย์</b></td>' +
					'<td class="databaseTable2"><b>เทคนิค<br/>การ<br/>แพทย์</b></td>' +
					'<td class="databaseTable2"><b>คณะ<br/>สถา<br/>ปัตฯ</b></td>' +
					'<td class="databaseTable2"><b>สนาม<br/>เทนนิส<br/>ศึกษา</b></td>' +
					'<td class="databaseTable2"><b>คณะ<br/>มนุษย์ฯ</b></td>' +
					'<td class="databaseTable2"><b>ตึก<br/>สาร<br/>สนเทศ</b></td>' +
					'<td class="databaseTable2"><b>เกษตร<br/>ศาสตร์</b></td>' +
					'<td class="databaseTable2"><b>โรงยิม</b></td>' +
					'<td class="databaseTable2"><b>สนาม<br/>ยิงปืน</b></td>' +
					'<td class="databaseTable2"><b>หอ<br/>9<br/>หลัง</b></td></tr>');
			$.each(data.result, function (i, item) {
				null_checker(item);
				$('#tb1').append('<tr align="center">' +
					'<td class="databaseTable2">' + (i+1) + '</td>' +
					'<td class="databaseTable2">' + (item.DATE).substring(0,10) + '</td>' +
					'<td class="databaseTable2">' + item.NUM_P + '</td>' +
					'<td class="databaseTable2">' + item.START_TIME + '</td>' +
					'<td class="databaseTable2">' + item.STOP24 + '</td>' +
					'<td class="databaseTable2">' + item.DIFF + '</td>' +
					'<td class="databaseTable2">' + item.STOP1 + '</td>' +
					'<td class="databaseTable2">' + item.STOP2 + '</td>' +
					'<td class="databaseTable2">' + item.STOP3 + '</td>' +
					'<td class="databaseTable2">' + item.STOP4 + '</td>' +
					'<td class="databaseTable2">' + item.STOP5 + '</td>' +
					'<td class="databaseTable2">' + item.STOP6 + '</td>' +
					'<td class="databaseTable2">' + item.STOP7 + '</td>' +
					'<td class="databaseTable2">' + item.STOP8 + '</td>' +
					'<td class="databaseTable2">' + item.STOP9 + '</td>' +
					'<td class="databaseTable2">' + item.STOP10 + '</td>' +
					'<td class="databaseTable2">' + item.STOP11 + '</td>' +
					'<td class="databaseTable2">' + item.STOP12 + '</td>' +
					'<td class="databaseTable2">' + item.STOP13 + '</td>' +
					'<td class="databaseTable2">' + item.STOP14 + '</td>' +
					'<td class="databaseTable2">' + item.STOP15 + '</td>' +
					'<td class="databaseTable2">' + item.STOP16 + '</td>' +
					'<td class="databaseTable2">' + item.STOP17 + '</td>' +
					'<td class="databaseTable2">' + item.STOP18 + '</td>' +
					'<td class="databaseTable2">' + item.STOP19 + '</td>' +
					'<td class="databaseTable2">' + item.STOP20 + '</td>' +
					'<td class="databaseTable2">' + item.STOP21 + '</td>' +
					'<td class="databaseTable2">' + item.STOP22 + '</td>' +
					'<td class="databaseTable2">' + item.STOP23 + '</td></tr>');
			});
		});
		$('#div1').append('</table>');
	} else if (color[busnum] == "blue") {
		$.getJSON(url, function (data) {
			if (data.result == "") {
				$('#div1').empty();
				$('#div1').append('<br/><b>ไม่พบข้อมูลที่ท่านเลือก</b>');
				return
			}
			$('#div1').empty();
			$('#div1').append('<a download="export.xls" href="#" onclick="return ExcellentExport.excel(this, \'tb1\', \'Sheet Name Here\');">Export to Excel</a><br/><br/>');
			$('#div1').append('<table  id="tb1" class="databaseTable2">');
			$('#tb1').append('<tr><td colspan="26"><h3>' + header + '</h3></td></tr>');
			$('#tb1').append('<tr><td colspan="6"  class="databaseTable2" align="center"><b>ข้อมูลโดยสรุป</b></td><td colspan="20"  class="databaseTable2" align="center"><b>ข้อมูลโดยละเอียด (เวลาในแต่ละป้าย)</b></td></tr>');
			$('#tb1').append('<tr align="center"><td class="databaseTable2"><b>หมาย<br/>เลขรอบ</b></td>' +
					'<td class="databaseTable2"><b>ปี-เดือน-วัน</b></td>' +
					'<td class="databaseTable2"><b>จำนวน<br/>ผู้โดยสาร</b></td>' +
					'<td class="databaseTable2"><b>เวลา</br>เริ่มต้น</b></td>' +
					'<td class="databaseTable2"><b>เวลา</br>สิ้นสุด</b></td>' +
					'<td class="databaseTable2"><b>เวลา</br>ที่ใช้</b></td>' +
					'<td class="databaseTable2"><b>หอ 8 หลัง</b></td>' +
					'<td class="databaseTable2"><b>หอ inter</b></td>' +
					'<td class="databaseTable2"><b>ปั๊ม<br/>ปตท</b></td>' +
					'<td class="databaseTable2"><b>หอแปดชาย</b></td>' +
					'<td class="databaseTable2"><b>โรง<br/>ชาย</b></td>' +
					'<td class="databaseTable2"><b>คอม<br/>เพล็กซ์</b></td>' +
					'<td class="databaseTable2"><b>สนาม<br/>เทนนิส<br/>ศึกษา</b></td>' +
					'<td class="databaseTable2"><b>ลาน<br/>จอดรถ<br/>ศึกษาฯ</b></td>' +
					'<td class="databaseTable2"><b>คณะ<br/>วิทยา<br/>การฯ</b></td>' +
					'<td class="databaseTable2"><b>คณะ<br/>วิทยา<br/>ศาสตร์</b></td>' +
					'<td class="databaseTable2"><b>คณะ<br/>มนุษย์ฯ</b></td>' +
					'<td class="databaseTable2"><b>คณะ<br/>สถา<br/>ปัตฯ</b></td>' +
					'<td class="databaseTable2"><b>เทคนิค<br/>การ<br/>แพทย์</b></td>' +
					'<td class="databaseTable2"><b>บ้านพัก<br/>หนองแวง</b></td>' +
					'<td class="databaseTable2"><b>ศูนย์<br/>แพทย์<br/>4</b></td>' +
					'<td class="databaseTable2"><b>หอ<br/>พยาบาล</b></td>' +
					'<td class="databaseTable2"><b>คณะ<br/>ศิลป<br/>กรรมฯ</b></td>' +
					'<td class="databaseTable2"><b>ตึก<br/>อธิการ<br/>บดี</b></td>' +
					'<td class="databaseTable2"><b>สนาม<br/>ฟุตบอล<br/>2</b></td>' +
					'<td class="databaseTable2"><b>สนาม<br/>ยิงปืน</b></td></tr>');
			$.each(data.result, function (i, item) {
				null_checker(item);
				$('#tb1').append('<tr align="center">' +
					'<td class="databaseTable2">' + (i+1) + '</td>' +
					'<td class="databaseTable2">' + (item.DATE).substring(0,10) + '</td>' +
					'<td class="databaseTable2">' + item.NUM_P + '</td>' +
					'<td class="databaseTable2">' + item.START_TIME + '</td>' +
					'<td class="databaseTable2">' + item.STOP21 + '</td>' +
					'<td class="databaseTable2">' + item.DIFF + '</td>' +
					'<td class="databaseTable2">' + item.STOP1 + '</td>' +
					'<td class="databaseTable2">' + item.STOP2 + '</td>' +
					'<td class="databaseTable2">' + item.STOP3 + '</td>' +
					'<td class="databaseTable2">' + item.STOP4 + '</td>' +
					'<td class="databaseTable2">' + item.STOP5 + '</td>' +
					'<td class="databaseTable2">' + item.STOP6 + '</td>' +
					'<td class="databaseTable2">' + item.STOP7 + '</td>' +
					'<td class="databaseTable2">' + item.STOP8 + '</td>' +
					'<td class="databaseTable2">' + item.STOP9 + '</td>' +
					'<td class="databaseTable2">' + item.STOP10 + '</td>' +
					'<td class="databaseTable2">' + item.STOP11 + '</td>' +
					'<td class="databaseTable2">' + item.STOP12 + '</td>' +
					'<td class="databaseTable2">' + item.STOP13 + '</td>' +
					'<td class="databaseTable2">' + item.STOP14 + '</td>' +
					'<td class="databaseTable2">' + item.STOP15 + '</td>' +
					'<td class="databaseTable2">' + item.STOP16 + '</td>' +
					'<td class="databaseTable2">' + item.STOP17 + '</td>' +
					'<td class="databaseTable2">' + item.STOP18 + '</td>' +
					'<td class="databaseTable2">' + item.STOP19 + '</td>' +
					'<td class="databaseTable2">' + item.STOP20 + '</td></tr>');
			});
		});
		$('#div1').append('</table>');
	} else if (color[busnum] == "orange") {
		$.getJSON(url, function (data) {
			if (data.result == "") {
				$('#div1').empty();
				$('#div1').append('<br/><b>ไม่พบข้อมูลที่ท่านเลือก</b>');
				return
			}
			$('#div1').empty();
			$('#div1').append('<a download="export.xls" href="#" onclick="return ExcellentExport.excel(this, \'tb1\', \'Sheet Name Here\');">Export to Excel</a><br/><br/>');
			$('#div1').append('<table  id="tb1" class="databaseTable2">');
			$('#tb1').append('<tr><td colspan="26"><h3>' + header + '</h3></td></tr>');
			$('#tb1').append('<tr><td colspan="6"  class="databaseTable2" align="center"><b>ข้อมูลโดยสรุป</b></td><td colspan="20"  class="databaseTable2" align="center"><b>ข้อมูลโดยละเอียด (เวลาในแต่ละป้าย)</b></td></tr>');
			$('#tb1').append('<tr align="center"><td class="databaseTable2"><b>หมาย<br/>เลขรอบ</b></td>' +
					'<td class="databaseTable2"><b>ปี-เดือน-วัน</b></td>' +
					'<td class="databaseTable2"><b>จำนวน<br/>ผู้โดยสาร</b></td>' +
					'<td class="databaseTable2"><b>เวลา</br>เริ่มต้น</b></td>' +
					'<td class="databaseTable2"><b>เวลา</br>สิ้นสุด</b></td>' +
					'<td class="databaseTable2"><b>เวลา</br>ที่ใช้</b></td>' +
					'<td class="databaseTable2"><b>หอ<br/>ศิลปฯ<br/>มข</b></td>' +
					'<td class="databaseTable2"><b>บ้าน<br/>พัก<br/>ศรีฐาน</b></td>' +
					'<td class="databaseTable2"><b>คณะ<br/>นิติ<br/>ศาสตร์</b></td>' +
					'<td class="databaseTable2"><b>แฟลต<br/>ป่าดู่</b></td>' +
					'<td class="databaseTable2"><b>อุทยาน<br/>เกษตร</b></td>' +
					'<td class="databaseTable2"><b>ตึก<br/>อธิการ<br/>บดี</b></td>' +
					'<td class="databaseTable2"><b>สะพาน<br/>ขาว</b></td>' +
					'<td class="databaseTable2"><b>คณะ<br/>เทคโน<br/>โลยี</b></td>' +
					'<td class="databaseTable2"><b>ตึก<br/>sc08</b></td>' +
					'<td class="databaseTable2"><b>เกษตร<br/>ศาสตร์<br/>(ด้านหน้า)</b></td>' +
					'<td class="databaseTable2"><b>เกษตร<br/>ศาสตร์<br/>(ด้านข้าง)</b></td>' +
					'<td class="databaseTable2"><b>โรงอาหาร<br/>เทคโน</b></td>' +
					'<td class="databaseTable2"><b>ภาค<br/>เครื่องกล</b></td>' +
					'<td class="databaseTable2"><b>คณะ<br/>พยาบาล<br/>ศาสตร์</b></td>' +
					'<td class="databaseTable2"><b>ศูนย์<br/>แพทย์<br/>4</b></td>' +
					'<td class="databaseTable2"><b>หอ<br/>พยาบาล</b></td>' +
					'<td class="databaseTable2"><b>คณะ<br/>ศิลป<br/>กรรมฯ</b></td>' +
					'<td class="databaseTable2"><b>อุทยาน<br/>เกษตร</b></td>' +
					'<td class="databaseTable2"><b>ร.ร.<br/>สาธิตฯ<br/>ศึกษา</b></td>' +
					'<td class="databaseTable2"><b>หอ<br/>กาญฯ</b></td></tr>');
			$.each(data.result, function (i, item) {
				null_checker(item);
				$('#tb1').append('<tr align="center">' +
					'<td class="databaseTable2">' + (i+1) + '</td>' +
					'<td class="databaseTable2">' + (item.DATE).substring(0,10) + '</td>' +
					'<td class="databaseTable2">' + item.NUM_P + '</td>' +
					'<td class="databaseTable2">' + item.START_TIME + '</td>' +
					'<td class="databaseTable2">' + item.STOP21 + '</td>' +
					'<td class="databaseTable2">' + item.DIFF + '</td>' +
					'<td class="databaseTable2">' + item.STOP1 + '</td>' +
					'<td class="databaseTable2">' + item.STOP2 + '</td>' +
					'<td class="databaseTable2">' + item.STOP3 + '</td>' +
					'<td class="databaseTable2">' + item.STOP4 + '</td>' +
					'<td class="databaseTable2">' + item.STOP5 + '</td>' +
					'<td class="databaseTable2">' + item.STOP6 + '</td>' +
					'<td class="databaseTable2">' + item.STOP7 + '</td>' +
					'<td class="databaseTable2">' + item.STOP8 + '</td>' +
					'<td class="databaseTable2">' + item.STOP9 + '</td>' +
					'<td class="databaseTable2">' + item.STOP10 + '</td>' +
					'<td class="databaseTable2">' + item.STOP11 + '</td>' +
					'<td class="databaseTable2">' + item.STOP12 + '</td>' +
					'<td class="databaseTable2">' + item.STOP13 + '</td>' +
					'<td class="databaseTable2">' + item.STOP14 + '</td>' +
					'<td class="databaseTable2">' + item.STOP15 + '</td>' +
					'<td class="databaseTable2">' + item.STOP16 + '</td>' +
					'<td class="databaseTable2">' + item.STOP17 + '</td>' +
					'<td class="databaseTable2">' + item.STOP18 + '</td>' +
					'<td class="databaseTable2">' + item.STOP19 + '</td>' +
					'<td class="databaseTable2">' + item.STOP20 + '</td></tr>');
			});
		});
		$('#div1').append('</table>');
	}
}

function null_checker(item) {
	if (item.DIFF == null)	item.DIFF = '';
	if (item.STOP1 == null)	item.STOP1 = '';
	if (item.STOP2 == null)	item.STOP2 = '';
	if (item.STOP3 == null)	item.STOP3 = '';
	if (item.STOP4 == null)	item.STOP4 = '';
	if (item.STOP5 == null)	item.STOP5 = '';
	if (item.STOP6 == null)	item.STOP6 = '';
	if (item.STOP7 == null)	item.STOP7 = '';
	if (item.STOP8 == null)	item.STOP8 = '';
	if (item.STOP9 == null)	item.STOP9 = '';
	if (item.STOP10 == null)	item.STOP10 = '';
	if (item.STOP11 == null)	item.STOP11 = '';
	if (item.STOP12 == null)	item.STOP12 = '';
	if (item.STOP13 == null)	item.STOP13 = '';
	if (item.STOP14 == null)	item.STOP14 = '';
	if (item.STOP15 == null)	item.STOP15 = '';
	if (item.STOP16 == null)	item.STOP16 = '';
	if (item.STOP17 == null)	item.STOP17 = '';
	if (item.STOP18 == null)	item.STOP18 = '';
	if (item.STOP19 == null)	item.STOP19 = '';
	if (item.STOP20 == null)	item.STOP20 = '';
	if (item.STOP21 == null)	item.STOP21 = '';
	if (item.STOP22 == null)	item.STOP22 = '';
	if (item.STOP23 == null)	item.STOP23 = '';
	if (item.STOP24 == null)	item.STOP24 = '';
	if (item.STOP25 == null)	item.STOP25 = '';
}