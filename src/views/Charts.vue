<template>
    <el-card class="charts">
        <div class="header">
            <el-card class="card-item">
                <template #header>
                    <div class="card-header">
                        <span>本届欧冠冠军</span>
                    </div>
                </template>
                <div>切尔西</div>
            </el-card>
            <el-card class="card-item">
                <template #header>
                    <div class="card-header">
                        <span>最佳射手</span>
                    </div>
                </template>
                <div>哈兰德</div>
            </el-card>
            <el-card class="card-item">
                <template #header>
                    <div class="card-header">
                        <span>金球奖预测</span>
                    </div>
                </template>
                <div>坎特</div>
            </el-card>
        </div>
        <div id="chart"></div>
    </el-card>
</template>

<script>
import { onMounted, onUnmounted } from 'vue'
import * as chart from 'echarts'

let myChart = null;

export default {
    setup() {
        onMounted(() => {
            myChart = chart.init(document.getElementById('chart'));

            const option = {
                title:{
                    text:"球星近五个欧冠赛季进球数"
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                      type: "shadow"
                    }
                },
                toolbox:{
                    show: true,
                    feature:{
                        magicType: {
                            type: ["line", "bar"]
                        },
                        saveAsImage: {},
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                color: ["#F56C6C", "#909399", "#67C23A", "#E6A23C"],  
                dataset: {
                    source: [
                        ["Season", "2016-2017", "2017-2018", "2018-2019", "2019-2020", "2020-2021"],
                        ["C罗", 12, 15, 6, 4, 4],
                        ["姆巴佩", 6, 4, 4, 5, 6],
                        ["梅西", 11, 6, 13, 3, 5],
                        ["内马尔", 4, 6, 5, 3, 3]
                    ]
                },
                legend: {},
                xAxis: {
                    type: "category",
                    axisTick: {
                      show: false
                    }
                },
                yAxis: {},
                series: [{
                    type: "bar",
                    seriesLayoutBy: "row"
                    },{
                    type: "bar",
                    seriesLayoutBy: "row"
                    },{
                    type: "bar",
                    seriesLayoutBy: "row"
                    },{
                    type: "bar",
                    seriesLayoutBy: "row"
                    },
                ],
            };

            myChart.setOption(option);
        })

        onUnmounted(() => {
            myChart.dispose()
        })
    }
}
</script>

<style scoped>
.charts .header {
    display: flex;
    margin-bottom: 50px;
  }
.card-item{
    flex: 1;
    margin-right: 20px;
  }
#chart {
    min-height: 300px;
}
</style>