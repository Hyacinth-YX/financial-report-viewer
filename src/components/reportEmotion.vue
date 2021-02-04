<template>
    <div>
        <progressive-color-bar :allColor="allColor" :barThickness=5></progressive-color-bar>
        <q-card class="shadow-0 q-pa-md">
            <div><span class="text-h7 text-green">绿色</span>代表情绪消极程度</div>
            <div><span class="text-h7 text-red">红色</span>代表情绪积极程度</div>
        </q-card>
        <q-card class="my-card shadow-1 q-mt-md">
            <q-card-section class="bg-primary text-white">
                <div class="text-h6">分析文段</div>
                <div class="text-subtitle2" align="left">{{omittedScoreStr}}</div>
            </q-card-section>
            <q-separator />
            <q-card-section align="center">
                <span class="text-h6">情绪评分：</span>
                <span class="text-h6">{{Math.round(Math.random()*20-10)}}</span>
            </q-card-section>
        </q-card>
        <div>

        </div>
    </div>
</template>

<script>
    import progressiveColorBar from "@/components/progressiveColorBar";

    export default {
        name: "reportEmotion",
        props:{
            scoreStr:String
        },
        computed:{
            omittedScoreStr: function () {
                if (this.scoreStr.length > 0){
                    let part_length = Math.round(this.scoreStr.length*0.6);
                    return this.scoreStr.substr(0,part_length)+" ... " + this.scoreStr.slice(-5,-1)
                }
                else {
                    return ""
                }
            }
        },
        components: {
            progressiveColorBar
        },
        data() {
            return {
                allColor: ['#00ff00', '#ffffff', '#ff0000']
            }
        }
    }
</script>

<style scoped>

</style>
