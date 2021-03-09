/*
 * @Author: hiyan 
 * @Date: 2021-03-04 13:49:11 
 * @Last Modified by: hiyan
 * @Last Modified time: 2021-03-09 13:45:15
 */
function renderRegionsByNumChart(containerId) {
    const chart = echarts.init(document.getElementById('regionsByNum'));
    $.ajax({
        url: "http://localhost/ebbs-ck-api/EBTTodayOnlineByRegionViaNum",
        data: {},
        type: 'GET',
        success: function (data) {            
            console.log(JSON.stringify(data));
            drawChart(data);  
        }
    });

    let yAxisData = [];
    let onlineChartData = [];
    let offlineChartData = [];
    let totalChartData = [];
    let yAxisDataFromOnline = [];
    let yAxisDataFromTotal = [];
    
    /* TODO constructOptionData优化
    **  const API.DATA = [ [], [] ];
    **  期望：通过for of 直接取2个数组key-value进行计算；
    **  实际：for取第一/二个[]，调用函数处理当前数组进行处理；
    **  补充：series.data可以查[ [],[] ]数据，可以研究echarts.series.data取数据
    */  
    function constructOptionData(itemListArray) {     
        for(var i=0; i < itemListArray.length; i++) {
            const itemList = itemListArray[i];
            itemListConstruct(itemList, i);
        }
        function itemListConstruct(itemList, index) {
            if(index === 0) { // 数组中第一个元素是取终端在线数,第二个元素是终端总数
                for (let [index, item] of itemList.entries()) {
                    yAxisDataFromOnline[index] =  itemList[index].name;
                    onlineChartData[index] = itemList[index].value;
                }
            } else {
                for (let [index, item] of itemList.entries()) {
                    yAxisDataFromTotal[index] =  itemList[index].name;
                    totalChartData[index] = itemList[index].value;
                    if (yAxisDataFromOnline[index] === yAxisDataFromTotal[index]) // 判断yAxis值是否相等，若等则计算 offline = total - online
                    yAxisData[index] = yAxisDataFromOnline[index];
                    offlineChartData[index] =  totalChartData[index] - onlineChartData[index];
                }               
            }
        } 
    }
    
    const option = {   
        //backgroundColor: 'rgba(0,0,0,0)',  
        backgroundColor: '#00265f',    
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            top: '0%',
            right: '14%',
            left: '18%',
            bottom: '0%'
        },
        xAxis: [{
            type: 'value',
            axisLine: {
                show: false
            },        
        axisTick: {
                show: false
            },
            splitLine: {
                show: false
            },
            axisLabel: {
                show: false,
                margin: 10,
                color: '#e2e9ff',
                textStyle: {
                    fontSize: 14
                }
            }
        }],
        yAxis: [{
            type: 'category',
            data: yAxisData,
            axisLabel: {
                show: true,
                color: '#fff',
                textStyle: {
                    fontFamily:'PingFangSC-Regular',
                    fontSize:12
                }    
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
            stack: '总量',
            data: onlineChartData,
            barWidth: '10px',
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                        offset: 0,
                        color: '#03D0E0' // 0% 处的颜色
                    }, {
                        offset: 1,
                        color: '#BDE289' // 100% 处的颜色
                    }], false),
                    barBorderRadius: [30, 30, 30, 30],
                    shadowColor: 'rgba(0,160,221,1)',
                    shadowBlur: 4
                }
            },
            label: {
                normal: {
                    show: false
                }
            }}, {                
                type: 'bar', 
                stack: '总量',
                data: offlineChartData,
                barWidth: '10px', 
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                            offset: 0,
                            color: '#DCDCDC ' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#A9A9A9' // 100% 处的颜色
                        }], false),
                        barBorderRadius: [30, 30, 30, 30],
                        shadowColor: 'rgba(0,0,0,0)',
                        shadowBlur: 4,
                    }
                },
                label: {
                    normal: {
                        show: false
                    }
                }
            }, {
                type: 'bar',                
                data: totalChartData,
                barWidth: '10px',
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{                            
                            offset: 0,
                            color: 'rgba(0,0,0,0)' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: 'rgba(0,0,0,0)' // 100% 处的颜色
                        }], false),
                        barBorderRadius: [30, 30, 30, 30],
                        shadowColor: 'rgba(0,160,221,1)',
                        shadowBlur: 4
                    }
                },
                label: {
                    normal: {
                        show: false,
                        offset: [0,-10],
                        color:'#fff',
                        fontSize:12,
                        fontFamily:'PingFangSC-Regular',
                        position: 'right',
                        distance: 16,
                    }
                }
            }
        ]
    };

    function drawChart(data) {
        constructOptionData(data);
        chart.setOption(option);
    }
}
