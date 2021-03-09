/*
 * @Author: hiyan 
 * @Date: 2021-03-04 13:49:11 
 * @Last Modified by: hiyan
 * @Last Modified time: 2021-03-09 13:45:25
 */

/*
 * 功能优化：当前月日期数据全显示，若有终端数据，则日期下显示label；
 * 更好一点是yesterday label颜色要深(突然想到一个技巧：比较日期，将日期作为某个scatter数据，将日期值visualMap到颜色深度上==灵感来源于echarts galley上一个日历demo)；
 * 旧版：只显示后端传过来的日期数据；不足 or bug：每月第一天则返回[]，整个图表不显示(每月第一天返回[]是一个后端接口bug，永远查不到每月最后一天数据)；
 * 计划：先在echarts galley上将想要样式调出，再补充于此；
 * 
 * 
 * */

/* TODO tooltip优化，参考 https://www.makeapie.com/editor.html?c=xr-uRS4-sG
*/

function renderCurrentMonthByNumChart(containerId) {
    const chart = echarts.init(document.getElementById('currentMonthByNum'));
    $.ajax({
        url: "http://localhost/ebbs-ck-api/EBTOnlineForCurrentMonthViaNum",
        data: {},
        type: 'GET',
        success: function (data) {   
            console.log(JSON.stringify(data));
            drawChart(data);  
        }
    });

    let chartData = [];
    let calendarTimeRange = [];
    let currentDate = '';
    let rangeTime = '';
    /* TODO range当前只能接受数组变量，若是字符串变量，则option中为""
    同理currentDate值在option中也为空；
    */
    // let rangeTime = '2021-03';
    let rTime = ""; // '2021-03';
    function constructOptionData(data) {  
        for (const item of data) {
            chartData.push([ item.name, item.value ]);
        }  
        let startDate = chartData[0][0];    
        let endDate = chartData[chartData.length - 1][0];    
        calendarTimeRange.push(startDate);
        calendarTimeRange.push(endDate);
        let endMonth = endDate.substr(0, 7);
        // rangeTime = JSON.stringify(rangeTime.concat(endMonth));
        // rangeTime = rangeTime.concat(endMonth);
        rangeTime = '2021-03';
        // console.log('判断rangeTime ===');
        // console.log(rangeTime === '2021-03');
        // debugger;
        // rTime = rTime.concat("2021-03");
        // debugger;
        var date = new Date();        
        currentDate = [(date.getMonth() + 1), date.getDate()];              
        currentDate.unshift(date.getFullYear());
        currentDate = currentDate.join('-');
        return calendarTimeRange && currentDate ? true : false
    }
        
    const option = {
        //backgroundColor:'rgba(0, 0, 0, 0)',
        backgroundColor: '#204371',
        tooltip: {
             show: false
        },
        calendar: [{
            top: '12%',
            left: 'center',
            range: calendarTimeRange,
            // range: rangeTime ? rangeTime : "2021-02",
            // range: "2021-03",
            orient: 'vertical',
            cellSize: 48,//控制单元格大小
            itemStyle: {
                normal: {
                    color: 'rgba(0, 0, 0, 0)',
                    borderColor: 'rgba(0, 0, 0, 0)',
                }
            },
            splitLine: {
                show: false
            },
            yearLabel: {
                show: false
            },
            monthLabel: {
                show: false
            },
            dayLabel: {
                firstDay: 1,
                nameMap: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
                margin: 5,
                textStyle: {
                    color: '#fff',
                    fontFamily: 'PingFangSC-Regular',
                    fontSize: 10
                }
            }
         }],
        series:  [{
            name: '活跃用户统计', // 显示当月日期值
            type: 'effectScatter',
            coordinateSystem: 'calendar',
            symbolSize: 0.1,
            rippleEffect: {
                
            },
            itemStyle: {
                normal: {
    
                }
            },
            label: {
                normal: {
                    show: true,
                    formatter(params) {
                        return params.value[0].split("-")[2]
                    },
                    fontWeight: 350,
                    fontSize: 12,
                    align:'center', //控制date显示水平居中
                    verticalAlign: 'bottom',
                    color: '#fff'
                }
            },
            data: chartData
        }, {
            type: 'scatter', // 显示当月非today的绿色数字；
            coordinateSystem: 'calendar',
            symbolSize: 0.00001,
            label: {
                normal: {
                    show: true,
                    formatter: function(params) {
                        return '\n\n\n' + (params.value[1] || '');
                    },
                    fontSize: 10,
                    offset: [1, -6], // 控制总数显示位置，x: left,y: top
                    fontFamily: 'Helvetica',
                    fontWeight: 350,
                    color: '#0f0'
                }
            },
            data: chartData
         }, {   
             type: 'scatter',// 控制当前日期的数量白色显示；fail
             coordinateSystem: 'calendar',
             symbol: 'roundRect', 
             symbolSize(params) { 
                 if (params[0] === currentDate) {
                     return 48; //当前日期高亮 宽度高度设置成和Calender:cellSize单元格宽度高度一样
                 } else {
                     return 0.1;//其他隐藏不显示
                 }
             },
             itemStyle: {
                 normal: {
                     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                         offset: 0.14,
                         color: '#03D0E0' // 0% 处的颜色
                     }, {
                         offset: 0.89,
                         color: '#BDE289' // 100% 处的颜色
                     }], false),            
                 }
             },
             label: {
                 normal: {
                     show: true,
                     formatter: function(params) {
                         return '\n\n\n' + (params.value[1] || '');
                     },
                     fontSize: 10,
                     offset: [1, -6], //控制总数显示位置，x:left,y:top
                     fontFamily: 'Helvetica',
                     fontWeight: 350,
                     color: '#fff'
                 }
             },
             data: chartData
            }] 
     };

    function drawChart(data) {
        if(constructOptionData(data)){
            // debugger;
            chart.setOption(option);   
        }
        // debugger;
    }
}
