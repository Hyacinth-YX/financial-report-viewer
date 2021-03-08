<template>
    <div>
        <q-input bottom-slots v-model="searchText" outlined @keyup.enter="searchContent"
                 placeholder="搜索百科" :dense="true" color="blue-11" bg-color="white">
            <template v-slot:append>
                <q-icon v-if="searchText !== ''" name="close" @click="searchText = '',showIFrame=false"
                        class="cursor-pointer" />
                <q-icon name="search" @click="searchContent"/>
            </template>
        </q-input>
        <div v-if="!showIFrame">
            <div class="text-h4 q-mb-md text-grey-6">检索实体</div>
            <p class="text-grey-6">内置检索以发现更多内容</p>
        </div>
        <div v-else>
            <iframe v-if="showIFrame" :src="targetSrc" height="300px" width="900px"></iframe>
        </div>
    </div>
</template>

<script>
    export default {
        name: "reportSearch",
        computed: {
            targetSrc: function () {
                return this.searchSource + this.searchText
            }
        },
        props: {
            searchText: String
        },
        data() {
            return {
                showIFrame: false,
                searchSource: "https://www.baidu.com/baidu?wd=",
            }

        },
        methods: {
            searchContent: function () {
                this.showIFrame = true
            }
        }
    }
</script>

<style scoped>

</style>
