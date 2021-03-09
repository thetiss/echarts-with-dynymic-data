/*
 * @Author: hiyan 
 * @Date: 2021-03-03 15:00:01 
 * @Last Modified by: hiyan
 * @Last Modified time: 2021-03-09 13:45:24
 */

// return： 图表， params: div.id
function renderSevenDaysByNumChart(containerId) { 
    const chart = echarts.init(document.getElementById('sevenDaysByNum'));
    // 异步加载后端接口数据
    $.ajax({
        url: "http://localhost/ebbs-ck-api/EBTOnlineForSevenDaysViaNum",
        data: {},
        type: 'GET',
        success: function (data) {            
            console.log(JSON.stringify(data));
            drawChart(data);  
        }
    });

    // 根据option中配置，处理X、Y轴，图形数据
    let xAxisData = [];
    let yAxisData = [];
    let chartData = [];
    function constructOptionData(data) {        
        for (let [index, item] of data.entries()) {
            xAxisData[index] = item.name;            
            chartData[index] = item.value;
        }    
    }
    
    // 配置echarts.option对象
    const option =  {
        backgroundColor: '#00265f',
        // backgroundColor: 'rgba(0,0,0,0)',
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            top: '25%',
            right: '1%',
            left: '6%',
            bottom: '12%'
        },
        xAxis: [{
            type: 'category',
            data: xAxisData,
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                margin: 5,
                //rotate:30,//调整label倾斜显示
                color: '#e2e9ff',
                textStyle: {
                    fontSize: 10
                },
                formatter: function(value, index) {
                    // 格式化成 X月/Y日，只在第一个刻度显示年份
                    var date = new Date(value);
                    var texts = [(date.getMonth() + 1), date.getDate()];
                    if (index === 0) {
                        texts.unshift(date.getFullYear());
                    }
                    return texts.join('/');
                }
            },
        }],
        yAxis: [{
            axisLabel: {
                formatter: '{value}',
                color: '#e2e9ff'
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false
            }
        }],
        series: [{
            type: 'bar',
            data: chartData,
            barWidth: '21px',
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(0,244,255,1)' // 0% 处的颜色
                    },
                    {
                        offset: 1,
                        color: 'rgba(0,77,167,1)' // 100% 处的颜色
                    }], false),
                    barBorderRadius: [30, 30, 30, 30],
                    shadowColor: 'rgba(0,160,221,1)',
                    shadowBlur: 4,
                }
            },
            label: {
                normal: {
                    show: true,
                    lineHeight: 21,
                    //竖线高度
                    width: 55,
                    //调整label背景块宽度
                    height: 20,
                    backgroundColor: 'rgba(0,160,221,0.1)',
                    borderRadius: 100,
                    position: ['-10', '-30'],
                    //0-控制竖线在bar左右，1控制上下,整体控制label与bar图形的位置
                    distance: 1,
                    formatter: [' {d|●}', ' {a|{c}}\n', '    {b|}'].join(''),
                    rich: {
                        d: {
                            color: '#3CDDCF',
                        },
                        a: {
                            color: '#fff',
                            align: 'left',
                        },
                        b: {
                            width: 0,
                            //控制线宽度
                            height: 15,
                            borderWidth: 0,
                            borderColor: '#234e6c',
                            align: 'left'
                        },
                    }
                }
            }
        }]
    };
    
    function drawChart(data) {
        constructOptionData(data);
        chart.setOption(option);
    }
}
