$(function () {
  var myChart1 = echarts.init(document.getElementById('main_left'));
  var option1 = {
    title: {
      text: '2018年注册人数'
    },
    tooltip: {},
    legend: {
      data: ['人数', '销量']
    },
    xAxis: {
      data: ["1月", "2月", "3月", "4月", "5月", "6月"]
    },
    yAxis: {},
    series: [{
      name: '人数',
      type: 'bar',
      data: [500, 200, 360, 1000, 1300, 2000]
    }, {
      name: '销量',
      type: 'bar',
      data: [1000, 1200, 300, 780, 560, 1800]
    }]
  };
  myChart1.setOption(option1);
})

$(function () {
  var myChart2 = echarts.init(document.getElementById('main_right'));
  var option2 = {
    title: {
      text: '热门品牌销售',
      subtext: '2018年11月',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['耐克', '阿迪', '阿迪王', '李宁', '乔丹']
    },
    series: [
      {
        name: '品牌销量',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
          { value: 335, name: '耐克' },
          { value: 310, name: '阿迪' },
          { value: 234, name: '阿迪王' },
          { value: 135, name: '李宁' },
          { value: 1548, name: '乔丹' }
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  myChart2.setOption(option2);
})