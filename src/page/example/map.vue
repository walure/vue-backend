<template>
    <div class="page">
        <div class="note">
            <v-pageNotes>本层为浮动层。本页实际路径: src/page/example/map.vue</v-pageNotes>
        </div>
        <div id="container"></div>
    </div>
</template>

<script>
/* eslint-disable */
import amap from '@/util/amap'
var map
export default {
    data() {
        return {}
    },
    mounted() {
        amap.load(() => {
            this.init()
        })
    },
    methods: {
        init(){
            map = new AMap.Map('container', amap.defaultOption)
            AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
                map.addControl(new AMap.ToolBar())
                map.addControl(new AMap.Scale())
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    #container{
        width: 100%;
        height: 100%;
    }
    .note{
        position: absolute;
        top: 0px;
        left: 0;
        width: 100%;
        z-index: 1000;
    }
</style>

