<template>
    <div class="echarts-box">
        <div id="myEcharts" :style="{ width: '600px', height: '300px' }">
        </div>
    </div>
</template>
<script setup>
import * as echarts from 'echarts';
import { getstatistics3 } from '../api';
import { onMounted, onUnmounted } from 'vue';
let type = "hour"
getstatistics3(type).then(res => {
    console.log(res)
})

onMounted(() => {
    initChart();
});

onUnmounted(() => {
    echarts.dispose();
});

function initChart() {
    let myChart = echarts.init(document.getElementById('myEcharts'));
    // 指定图表的配置项和数据
    let option = {
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'Direct',
                type: 'bar',
                barWidth: '60%',
                data: [10, 52, 200, 334, 390, 330, 220]
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}



</script>