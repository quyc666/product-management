<template>
    <el-card shadow="never">
        <div slot="header" class="flex justify-between">
            <span class="text-xl px-1">订单统计</span>
            <div class="">
                <el-check-tag :checked="current == item.value" @change="handleClick(item.value)" class="mx-2"
                    v-for="(item, index) in options">
                    {{ item.text }}
                </el-check-tag>
            </div>
        </div>
        <el-divider />
        <div id="myEcharts" :style="{ width: '100%', height: '300px', paddingBottom: '10px'}">
        </div>
    </el-card>
    <div class="echarts-box">

    </div>
</template>
<script setup>
import * as echarts from 'echarts';
import { getstatistics3 } from '../api';
import { onMounted, onUnmounted, ref } from 'vue';


const current = ref("week")
const options = [
    {
        text: "近一个月",
        value: "month"
    },
    {
        text: "近一周",
        value: "week"
    },
    {
        text: "近24小时",
        value: "hour"
    },
]

const handleClick = (type) => {
    current.value = type
    getChartData()
}

let myChart = null
onMounted(() => {
    myChart = echarts.init(document.getElementById('myEcharts'));
    getChartData()
});

onUnmounted(() => {
    echarts.dispose();
});

function getChartData(){
      // 指定图表的配置项和数据
      let option = {
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
                data: [],
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
                data: []
            }
        ]
    };

    getstatistics3(current.value).then(res => {
        console.log(res.x)
        option.xAxis[0].data = res.x
        option.series[0].data = res.y
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    })
}



</script>