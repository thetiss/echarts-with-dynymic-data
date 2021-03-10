/*
 * @Author: hiyan 
 * @Date: 2021-03-04 13:49:11 
 * @Last Modified by: hiyan
 * @Last Modified time: 2021-03-10 10:44:04
 */
// EBM **emergency broadcasting message**
// 重构echarts异步加载数据方案；ref: https://echarts.apache.org/v4/zh/tutorial.html#%E5%BC%82%E6%AD%A5%E6%95%B0%E6%8D%AE%E5%8A%A0%E8%BD%BD%E5%92%8C%E6%9B%B4%E6%96%B0
function renderInTransMediaByNumChart(containerId) {
    const myChart = echarts.init(document.getElementById('inTransMedia'));   
    myChart.setOption({
        backgroundColor: 'rgba(0, 0, 0, 0)',        
        //backgroundColor: 'rgba(1,202,217,.2)', // this color setting is for debugging usage
        title: [{ // 应急广播数值            
            text: [],
            textStyle: {
                fontSize: 16,
                fontFamily: 'Microsoft Yahei',
                fontWeight: 'bold',
                color: '#fff',
                rich: {
                    a: {
                        fontSize: 16,
                        fontWeight: 'bold'
                    }
                }
            },
            left: '26%',
            top: '35%'
        }, { // 应急广播标题
            text: [],
            color: '#fff',
            borderRadius: 20, 
            textStyle: {
                fontSize: 12,
                fontFamily: 'Microsoft Yahei',
                fontWeight: 'normal',
                color: '#fff'
            },
            left: '24%',
            top: '58%'
        }, { // 日常广播数值
            text: [],
            textStyle: {
                fontSize: 16,
                fontFamily: 'Microsoft Yahei',
                fontWeight: 'bold',
                color: '#fff',
                rich: {
                    a: {
                        fontSize: 16,
                        fontWeight: 'bold'
                    }
                }
            },
            left: '65%',
            top: '35%'
        }, { // 日常广播标题
            text: [],
            color: '#fff',
            borderRadius: 20,  
            textStyle: {
                fontSize: 12,
                fontFamily: 'Microsoft Yahei',
                fontWeight: 'normal',
                color: '#fff',             
            },
            left: '60%',
            top: '58%'
        }],
        series: [{            
            type: 'liquidFill',
            name: [],
            direction: 'right', // 波浪方向或者静止
            itemStyle: {
                normal: {
                    opacity: 1,
                    shadowBlur: 0,
                    shadowColor: '#00c2ff'
                }
            },
            color: ['#00c2ff'],
            radius: '92%',          
            center: ['33%', '52%'],
            label: {
                normal: {
                    formatter: '',
                    textStyle: {
                        fontSize: 12
                    }
                }
            },
            backgroundStyle: {
            color: '#061140',
            borderWidth: 2,
            borderColor: '#00c2ff',
            },
            outline: {
                itemStyle: {
                    borderColor: '#00c2ff',
                    borderWidth: 0
                },
                borderDistance: 0
            },
            data: [],
        },{
            type: 'liquidFill',
            itemStyle: {
                normal: {
                    opacity: 1,
                    shadowBlur: 0,
                    shadowColor: '#00c2ff'
                }
            },
            direction: 'right', // 波浪方向或者静止
            name: '',
            color: ['#00c2ff'],
            radius: '92%',
            center: ['69%', '52%'],
            backgroundStyle: {
            color: '#061140',
            borderWidth: 2,
            borderColor: '#00c2ff',
            },
            label: {
                normal: {
                    formatter: '',
                    textStyle: {
                        fontSize: 12
                    }
                }
            },     
            outline: {
                itemStyle: {
                    borderColor: '#00c2ff',
                    borderWidth: 0
                },
                borderDistance: 0
            },
            data: []
        }]
    });

    let textData = [];
    let abnormalTextData = [];
    let valueData = [];    
    let percentData = [];
    let sumValue = 0;
    function constructOptionData(data) { 
        for (let [index, item] of data.entries()) { 
            valueData.push(item.value);
            textData.push(item.name);  
            if(item.name === '应急广播')          
            abnormalTextData.push(item.name);
            sumValue += item.value;
        }  
        for (let item of data) {
            let percent = (item.value / sumValue * 100).toFixed(1);
            percentData.push(percent);
        }
        // debugger;  
    }

    $.ajax({
        url: "http://localhost/ebbs-ck-api/EBMNormalVSEmergence",
        data: {},
        type: 'GET',
        success: function (data) {            
            // console.log(JSON.stringify(data));
            constructOptionData(data);
            myChart.setOption({
                title: [{             
                    text: percentData[0] + '{a|%}'// 应急广播数值 .toFixed(1) + '{a|%}':'0',
                }, {
                    text: textData[0]  // 应急广播标题
                }, {
                    text: percentData[1] + '{a|%}'
                }, {
                    text: textData[1]
                }],
                series: [{
                    name: textData[0], // 应急广播数据
                    data: [ percentData[0] / 100 ] // liquidFill中data格式是：[0.X]，必须是小于1的数值(补充说明，里面的数值可以是多个，多个则有多个浪)；
                }, {
                    // name: textData[0],
                    data: [ percentData[1] / 100 ]
                }]
            });
            // debugger;
        }
    });
}
