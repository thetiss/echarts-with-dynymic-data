/*
 * @Author: hiyan 
 * @Date: 2021-03-03 15:00:01 
 * @Last Modified by: hiyan
 * @Last Modified time: 2021-03-09 13:45:19
 */

// return： 图表， params: div.id
function renderSevenDaysByPerChart(containerId) {    
    const chart = echarts.init(document.getElementById('sevenDaysByPer'));
    // 异步加载后端接口数据
    $.ajax({
        url: "http://localhost/ebbs-ck-api/EBTOnlineForSevenDaysViaPercent",
        data: {},
        type: 'GET',
        success: function (data) {            
            console.log(JSON.stringify(data));
            drawChart(data);  
        }
    });

    // 根据option中配置，处理X、Y轴，图形数据   
    let valuePieData = [];
    let nonsensePieData = [];
    const color = ['#0f0','red','#006ced','#ffe000','#ffa800','#ff5b00','#ff3000'];    
    function constructOptionData(data) {
        // 构造带后端数据的饼图
        for (let [index, item] of data.entries()) {
            valuePieData[index] = {
                name: item.name,
                value: item.value,
                itemStyle: {
                    normal: {
                        borderWidth: 5,
                        shadowBlur: 20,
                        borderColor:color[index],
                        shadowColor: color[index]
                    }
                }
            }, {
                name: '',
                value: 2,
                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        },
                        color: 'rgba(0, 0, 0, 0)',
                        borderColor: 'rgba(0, 0, 0, 0)',
                        borderWidth: 0
                    }
                }
            }
        }
        // 构造样式饼图
        const NUMBERS_OF_CIRCLE = 8;
        for (let i=0; i<NUMBERS_OF_CIRCLE; i++) {
            if(i%2 ===0) {
                nonsensePieData[i] = {
                    name: (i + 1).toString(),
                    value: 30,
                    itemStyle: {
                        normal: {
                            color: "#FFD800",
                            borderWidth: 0,
                            borderColor: "rgba(0,0,0,0)"
                        }
                    }
                }
            } else {
                nonsensePieData[i] = {
                    name: (i + 1).toString(),
                    value: 20,
                    itemStyle: {
                        normal: {
                            color: "rgba(0,0,0,0)",
                            borderWidth: 0,
                            borderColor: "rgba(0,0,0,0)"
                        }
                    }
                }
            }
        }
    }    

    // 配置echarts.option对象
    const seriesOfOption = [{               
        name: '',
        type: 'pie',
        clockWise: false,
        center: ['51%','68%'],
        startAngle: 180,
        radius: [35, 39],
        hoverAnimation: false,
        itemStyle: {
            normal: {
                label: {
                    show: true,
                    color: '#ddd',
                    formatter: function(params) {
                        if(params.name !== '') {
                            return '状态：' + params.name + '\n'+'{hr|}' + '\n' + '占比：' + params.value.toFixed(0) + '%';
                        }else {
                            return '';
                        }
                    },
                    rich: {
                        hr: {
                            borderColor: '#12EABE',
                            width: '100%',
                            borderWidth: 2,
                            height: 0
                        }
                    }                
                },
                labelLine: {
                    length: 15,
                    length2: 10,
                    show: true,
                    color:'#00ffff'
                }
            }
        },
        data: valuePieData
    }, {
        type: 'pie',//黄色圆环
        zlevel: 2,
        silent: true,
        center: ['51%','68%'],
        radius: [26, 28],
        startAngle: -20,
        label: {
            normal: {
                show: false
            }
        },
        labelLine: {
            normal: {
                show: false
            }
        },
        data: nonsensePieData      
    }];

    const option =  {
        backgroundColor: 'rgba(0,0,0,0)',
        color: color, 
        grid: {
            bottom: '1%',
            right:'12%'
        },
        title: {
            text: '比率',
            top: '68%',
            textAlign: 'center',
            left: '54%',
            textStyle: {
                color: '#fff',
                fontSize: 12,
                fontWeight: '400'
            }
        },
        toolbox: {
            show: false
        },
        series: seriesOfOption
    };
    
    function drawChart(data) {
        constructOptionData(data);
        chart.setOption(option);
    }
}

