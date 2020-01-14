var user = JSON.parse(localStorage.getItem("user"));
$(function() {
	selectDeviceCount()
	getloucengname()
})

function selectDeviceCount() {

	var req = {
		customerId: localStorage.getItem("khid"),

	}
	$.ajax({

		url: "http://49.235.203.189:8087/jeecg-boot/monitor/device/selectDeviceCount",
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

			if (data.success) {

				$("#allcount").text(data.result.deviceCount)
				$("#normalcount").text(data.result.normalcount)
				$("#whsb").text(data.result.deviceDefendCount)
				$("#gzsb").text(data.result.deviceFaultCount)
				$("#txgz").text(data.result.deviceCommFailCount)
				$("#bjsb").text(data.result.deviceAlertCount)
			}

		},
		error: function() {
			console.log("请求失败");
		}
	});
}
//楼层的名称
function getloucengname() {
	var req = {
		cid: localStorage.getItem("khid"),

	}
	$.ajax({

		url: "http://49.235.203.189:8087/jeecg-boot/monitor/floorPlan/queryFloorNameAndIdByCid",
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
			if (data.success) {
				let louceng = "";
				$.each(data.result, function(y, item) {
					louceng += '<tr>'+
						'<td>'+item.floorName+'</td>'+
						'<td onclick=query("'+item.id+'")>查看</td>'+
						'</tr>';
				})
              $("#loucengall").append(louceng)
			}

		},
		error: function() {
			console.log("请求失败");
		}
	});
}
function query(id){
	var req = {
		customerId: localStorage.getItem("khid"),
	    floorId:id
	}
	$.ajax({
	
		url: "http://49.235.203.189:8087/jeecg-boot/monitor/device/selectCountDeviceByFlor",
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
	
			if (data.success) {
	
				
			}
	
		},
		error: function() {
			console.log("请求失败");
		}
	});
}
