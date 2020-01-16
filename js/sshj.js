var user = JSON.parse(localStorage.getItem("user"));
var name = localStorage.getItem("selcommay");


var sb1 = [];
var sb2 = [];
var sb3 = [];
$(function() {
	pagelimit(1)
	baojing_7day()
	baojing_1day()
})

function sure() {

	let pagemax = parseInt($("#pageall").text())
	let topage = parseInt($("#topage").val())
	if (topage <= pagemax) {
		pagelimit(topage)
	}

}

function pagedown() {
	let current_ = parseInt($("#currentpage").text())
	let pagemax = parseInt($("#pageall").text())
	if (current_ < pagemax) {
		pagelimit(current_ + 1)
	}

}

function pageup() {
	let current_ = parseInt($("#currentpage").text())
	if (current_ > 1) {
		pagelimit(current_ - 1)
	}

}

function pagelimit(no) {
	var req = {
		customerId: localStorage.getItem("khid"),
		pageNo: no,
		pageSize: 8
	}
	$.ajax({
		url: "http://49.235.203.189:8087/jeecg-boot/monitor/testRecord/queryTest",
		type: "get",
		// contentType: "application/json",
		dataType: "json",
		data: req,
		beforeSend: function(request) {
			request.setRequestHeader("X-Access-Token",
				user.token
			);

		},
		success: function(data) {
			console.log(data)
			$("#tbodydata").empty();
			console.log(data)
			var a = parseInt(data.result.total / 8)
			$("#currentpage").text(data.result.current)
			if ((data.result.total) % 8 == 0) {
				$("#pageall").text(a)
			} else {
				console.log(a + 1)
				$("#pageall").text(a + 1)
			}


			let tabledata = ""
			$.each(data.result.records, function(i, item) {
				let device = "";
				if (item.deviceType == "1") {
					device = "探测器"
				} else if (item.deviceType == "2") {
					device = "控制器"
				} else {
					device = "输出模块"
				}
				tabledata += '<tr>' +
					'<td>' +
					'<input class="check_item" type="checkbox" style="background-color: transparent;">' +
					'</td>' +
					'<td>' + item.oneAreaName + '</td>' +
					'<td>' + item.twoAreaName + '</td>' +
					'<td>' + item.name + '</td>' +
					'<td>' + item.floorName + '</td>' +
					'<td>' + item.testDeviceImei + '</td>' +
					'<td>' + device + '</td>' +
					'<td>' + item.deviceNum + '</td>' +
					' <td>' + item.detectionTarget + '</td>' +
					'<td>' + item.ranges + '</td>' +
					'<td>' + item.unit + '</td>' +
					'<td>' + item.tstatus + '</td>' +
					'<td>' + item.testPv + '</td>' +
					'<td>' + item.acquisitionTime + '</td>' +
					'</tr>';


			})
			$("#tbodydata").append(tabledata)
		},
		error: function() {
			console.log("请求失败");
		}
	});


}
//其他报警次数统计
function baojing_7day() {

	var req = {
		customerId: localStorage.getItem("khid"),

	}
	$.ajax({

		url: "http://49.235.203.189:8087/jeecg-boot/monitor/alarmRecord/selectSevenDayAll",
		type: "get",
		// contentType: "application/json",
		dataType: "json",
		data: req,
		beforeSend: function(request) {
			request.setRequestHeader("X-Access-Token",
				user.token
			);

		},
		success: function(data) {
			console.log(data)
			$.each(data.result, function(i, item) {
				$.each(item, function(y, item_child) {
					if (i == "type3") {

						sb3.push(item_child.count)

					} else if (i == "type2") {

						sb2.push(item_child.count)

					} else {

						sb1.push(item_child.count)

					}



				})

			})
			initoption()
		},
		error: function() {
			console.log("请求失败");
		}
	});
}

//当前客户一天报警统计
function baojing_1day() {

	var req = {
		customerId: localStorage.getItem("khid"),

	}
	$.ajax({

		url: "http://49.235.203.189:8087/jeecg-boot/monitor/alarmRecord/selectOneDayAll",
		type: "get",
		// contentType: "application/json",
		dataType: "json",
		data: req,
		beforeSend: function(request) {
			request.setRequestHeader("X-Access-Token",
				user.token
			);

		},
		success: function(data) {
			console.log(data)
			let day1 = [];
			let x = [];
			if (data.success) {
				$.each(data.result.top0, function(i, item) {

					day1.push(item.count)
					x.push(item.days.substring(item.days.length - 5, item.days.length))

				})
			}

			dat1(day1, x)

		},
		error: function() {
			console.log("请求失败");
		}
	});
}

function exporttoexel() {

	var req = {
		customerId: localStorage.getItem("khid"),
		acquisitionTime_begin: $("#startTime").val(),
		acquisitionTime_end: $("#endTime").val(),
		oneAreaId: "", //省份
		twoAreaId: "", //城市
		floorName: "", //楼层名称
		deviceType: $("#deviceType").val(), //设备类型
		deviceNum: $("#deviceNum").val(), //设备编号

	}
	$.ajax({

		url: "http://49.235.203.189:8087/jeecg-boot/monitor/testRecord/exportXlsTestAll",
		type: "get",
		// contentType: "application/json",
		dataType: "json",
		data: req,
		beforeSend: function(request) {
			request.setRequestHeader("X-Access-Token",
				user.token
			);

		},
		success: function(data) {
			console.log(data)


		},
		error: function() {
			console.log("请求失败");
		}
	});
}
