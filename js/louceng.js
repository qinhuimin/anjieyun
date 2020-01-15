var user = JSON.parse(localStorage.getItem("user"));
var imgurl='http://49.235.203.189:8087/jeecg-boot/sys/common/view/';
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
					
					
					
					if(y==0){
						console.log("into")
						 $("#planPic").css("background-image","url('"+imgurl+item.planPic+"')")
					}
					louceng += '<tr>'+
						'<td>'+item.floorName+'</td>'+
						'<td style="color:#6de7ff" onclick=query("'+item.id+'")>查看</td>'+
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
	//更新右边的视图
	devinlouceng(id);
	console.log(id)
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
	           console.log(data.result)
			if (data.success) {
	            
				$("#self_all").text(data.result.deviceCount)
				$("#self_normal").text(data.result.normalcount)
				$("#self_whsb").text(data.result.deviceDefendCount)
				$("#self_gzsb").text(data.result.deviceFaultCount)
				$("#self_txgz").text(data.result.deviceCommFailCount)
				$("#self_bjsb").text(data.result.deviceAlertCount)
			}
	
		},
		error: function() {
			console.log("请求失败");
		}
	});
}
//中间显示的楼层设备
function devinlouceng(id){
	var req = {
		fid: id,
	   
	}
	$.ajax({
	
		url: "http://49.235.203.189:8087/jeecg-boot/monitor/floorPlan/queryFloorDeviceByFid",
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
			$("#louceng_dev").empty()
			console.log(data.result)
			//更换楼层图纸
			  $("#planPic").css("background-image","url('"+imgurl+data.result.picurl+"')")
	           console.log(data.result.deviceInfoDTOS)
			if (data.success) {
				let sbinlouceng=""
				let px="px"
				// position: absolute;top: 50px;left: 30px;
	            $.each(data.result.deviceInfoDTOS, function(y, item) {
					let aaa=JSON.stringify(item)
				
					sbinlouceng+='<img onclick=sbck("' + aaa + '") style="top:'+item.yposition+px+';left:'+item.xposition+px+'" class="sbinlouceng" src="'+imgurl+item.picUrl+'" >'
	            	// sbinlouceng+='<img onclick=sbck("'+a+'") style="top:'+item.yposition+px+';left:'+item.xposition+px+'" class="sbinlouceng" src="'+imgurl+item.picUrl+'" >'
	            })
			    $("#louceng_dev").append(sbinlouceng)
			}
	
		},
		error: function() {
			console.log("请求失败");
		}
	});
}
//设备上弹出的窗口
function sbck(obj){
	console.log(obj)
	var req = {
		fid: id,
	   
	}
	$.ajax({
	
		url: "http://49.235.203.189:8087/jeecg-boot/monitor/floorPlan/queryFloorDeviceByFid",
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

