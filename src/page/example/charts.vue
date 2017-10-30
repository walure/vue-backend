<template>
    <div class="page">
        <v-pageTitle title="图表"></v-pageTitle>
        <v-pageNotes>图表使用echarts组件，详细配置请参考echarts官网文档。</v-pageNotes>
        <v-pageSection title="线形图">
            <v-pageToolbar>
                <el-button type="primary" @click="lineRefresh">刷新数据</el-button>
            </v-pageToolbar>
            <div id="line"></div>
        </v-pageSection>
    </div>
</template>

<script>
import lodash from 'lodash'
import echarts from 'echarts'
//  图表默认设置
var charts = {
    line:{
        option: {
            tooltip: {
                trigger: 'axis',
                formatter: '{a}<br />{b} : {c}'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value',
                min: 0,
                max: 100,
            },
            series: [
                {
                    name: '邮件营销',
                    type: 'line',
                    stack: '总量',
                    data: []
                }
            ]
        }
    }
}

export default {
    data() {
        return {
            // 定义charts全体对象
            charts: {
                line: {
                    // echarts对象
                    target: null,
                    data: []
                }
            }
        }
    },
    methods: {
        // 刷新数据（获取数据）
        lineRefresh(){
            let newArray = []
            // 正式中使用ajax调用
            for(let i = 0; i < 7; i++){
                newArray.push(parseInt(Math.random()*100)+1)
            }
            // 如果获取到的数据存在则直接渲染，否则调用默认数据
            if(newArray.length){
                this.charts.line.data = newArray
            } else {
                this.charts.line.data = charts.line.option.series[0].data
            }
            // 画图
            this.drawLine()
        },
        // 初始化图表
        chartsInit(){
            // 创建图表对象
            if(!this.charts.line.target){
                this.charts.line.target = echarts.init(document.getElementById('line'))
                // 生成默认数据
                charts.line.option.xAxis.data.forEach(() => {
                    charts.line.option.series[0].data.push(0)
                })
                // 合并图表选项
                // this.charts.line.option = charts.line.option
            }
            // 绘制默认图表
            // console.log(charts.line.option)
            this.charts.line.target.setOption(charts.line.option)
            // 请求数据
            this.chartsData()
        },
        // 请求图表数据
        chartsData(){
            // 模拟异步调用
            setTimeout(() =>{
                this.lineRefresh()
            },3000)
        },
        drawLine() {
            // 配置项需要变更
            // console.log(this.charts.line.data)
            let option = {
                series: [
                    {
                        data: this.charts.line.data
                    }
                ]
            }
            lodash.defaultsDeep(option, charts.line.option)
            // console.log(option)
            this.charts.line.target.setOption(option)
        }
    },
    mounted(){
        this.$nextTick(() => {
            this.chartsInit()
        })
    }
}
</script>
<style lang="scss" scoped>
    #line{
        width: 100%;
        height: 400px;
    }
</style>
