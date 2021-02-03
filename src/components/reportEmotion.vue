<template>
    <div>
        <progressive-color-bar :allColor="allColor" :barThickness=5></progressive-color-bar>
        <q-card class="shadow-0 ">
            <div><span class="text-h7 text-green">绿色</span>代表情绪消极程度</div>
            <div><span class="text-h7 text-red">红色</span>代表情绪积极程度</div>
        </q-card>
    </div>
</template>

<script>
    import progressiveColorBar from "@/components/progressiveColorBar";

    export default {
        name: "reportEmotion",
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
