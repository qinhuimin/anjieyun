var user = JSON.parse(localStorage.getItem("user"));
var name=localStorage.getItem("selcommay");


var sb1=[];
		var sb2=[];
		var sb3=[];
$(function(){
	init()
	baojing_7day()
	baojing_1day()
})
function init() {
		var req = {
			customerId: localStorage.getItem("khid"),
			pageNo: 1,
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
				console.log(data.result.records)
				let tabledata=""
				$.each(data.result.records, function(i, item) {
					
				tabledata+=	'<tr>'+
					   '<td>'+
					        '<input class="check_item" type="checkbox" style="background-color: transparent;">'+
					    '</td>'+
					    '<td>'+item.floorName+'</td>'+
					    '<td>'+item.testDeviceImei+'</td>'+
					    '<td>'+item.deviceType+'</td>'+
					    '<td>'+item.deviceNum+'</td>'+
					   ' <td>'+item.detectionTarget+'</td>'+
					    '<td>'+item.ranges+'</td>'+
					    '<td>'+item.unit+'</td>'+
					    '<td>'+item.tstatus+'</td>'+
					    '<td>'+item.testPv+'</td>'+
					    '<td>'+item.acquisitionTime+'</td>'+
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
	function baojing_7day(){
		
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
						if(i=="type3"){
							
							sb3.push(item_child.count)
							
						}else if(i=="type2"){
							
							sb2.push(item_child.count)
							
						}else{
							
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
	function baojing_1day(){
		
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
				let day1=[];
				let x=[];
				$.each(data.result.top0, function(i, item) {
					
					day1.push(item.count)
					x.push(item.days.substring(item.days.length-5,item.days.length))
					
				})
				 dat1(day1,x)
				
			},
			error: function() {
				console.log("请求失败");
			}
		});
	}
	