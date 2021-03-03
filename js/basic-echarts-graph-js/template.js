/*
 * @Author: hiyan 
 * @Date: 2021-03-03 15:00:01 
 * @Last Modified by: hiyan
 * @Last Modified time: 2021-03-03 15:37:46
 */

// 基于准备好的dom，初始化echarts实例
// var bloodChart = echarts.init(document.getElementById('main'));
// 指定图表的配置项和数据


function currentChartOption(chart){
    $.ajax({
    url: "http://localhost/ebbs-ck-api/EBTOnlineForSevenDaysViaNum",
    data: {},
    type: 'GET',
    success: function(data) {
        console.log(JSON.stringify(data)) 
        bloodFun(data);

    },
}); 
    function bloodFun(data) {
    //X轴数值
    var X = (function() {
        var lineX = [];
        data.forEach(function(item, index) {
            lineX[index] = item.name;
        }) 
        return lineX;
    })();
    //Y轴数值
    var Y = (function() {
        var lineY = [];
        data.forEach(function(item, index) {
            lineY[index] = item.value;
        }) 
        return lineY;
    })();
    chart.setOption( {
        //backgroundColor: '#00265f',
        //backgroundColor: 'rgba(1,202,217,.1)',
        backgroundColor: 'rgba(0,0,0,0)',

        /*title: {
    text: '用电单位为:度 '
    },*/
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            top: '25%',
            //调整图形整体
            right: '1%',
            left: '6%',
            bottom: '12%'
        },
        xAxis: [{
            type: 'category',
            data: X,
            axisLine: {
                show: false,
                lineStyle: {
                    color: 'rgba(255,255,255,0.12)'
                }
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                margin: 5,
                //rotate:30,//调整label倾斜显示
                color: '#e2e9ff',
                textStyle: {
                    fontSize: 10
                },
                formatter: function(value, index) {
                    // 格式化成月/日，只在第一个刻度显示年份
                    var date = new Date(value);
                    //console.log(date+"_________________date_____________________");//打印Wed Nov 04 2020 08:00:00 GMT+0800
                    var texts = [(date.getMonth() + 1), date.getDate()];
                    //console.log(texts+"____________________month+1,date__________________");//打印11,4
                    if (index === 0) {
                        texts.unshift(date.getFullYear());
                        //console.log(date.getFullYear()+"_______________year_______________________");
                        //console.log(texts.unshift(date.getFullYear())+"_______________unshift_______________________");
                    }
                    return texts.join('/');
                }
            },
        }],
        yAxis: [{
            axisLabel: {
                formatter: '{value}',
                color: '#e2e9ff',
            },
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                show: false,
                lineStyle: {
                    color: 'rgba(255,255,255,0.12)'
                }
            }
        }],
        series: [{
            type: 'bar',
            data: Y,
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
                    // padding: [0, 4, 5, 6],
                    backgroundColor: 'rgba(0,160,221,0.1)',
                    borderRadius: 100,
                    position: ['-10', '-30'],
                    //0-控制竖线在bar左右，1控制上下,整体控制label与bar图形的位置
                    distance: 1,
                    formatter: [' {d|●}', ' {a|{c}}\n', '    {b|}'].join(''),
                    rich: {
                        d: {
                            color: '#3CDDCF',
                            //align: 'left',
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
    }) // 结束定义option
    
    }
}
