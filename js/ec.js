var myChart = echarts.init(document.getElementById('main'));
option = {
	xAxis: {
		type: 'category',
		data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
	},
	yAxis: {
		type: 'value'
	},
	series: [{
		data: [120, 200, 150, 80, 70, 110, 130],
		type: 'bar'
	}]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
