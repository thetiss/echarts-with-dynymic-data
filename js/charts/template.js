/*
 * @Author: hiyan 
 * @Date: 2021-03-04 13:49:11 
 * @Last Modified by: hiyan
 * @Last Modified time: 2021-03-09 13:45:32
 */
function renderSevenDaysByNumChart(containerId) {
    const chart = echarts.init(document.getElementById('sevenDaysByNum'));
    $.ajax({
        url: "http://localhost/ebbs-ck-api/EBTOnlineForSevenDaysViaNum",
        data: {},
        type: 'GET',
        success: function (data) {            
            console.log(JSON.stringify(data));
            drawChart(data);  
        }
    });

    let xAxisData = [];
    let yAxisData = [];
    let chartData = [];
    function constructOptionData(data) {        
        for (let [index, item] of data.entries()) {
            xAxisData[index] = item.name;            
            chartData[index] = item.value;
        }    
    }
    
    const option = 

    function drawChart(data) {
        constructOptionData(data);
        chart.setOption(option);
    }


}
