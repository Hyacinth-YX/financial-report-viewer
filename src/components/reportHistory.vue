<template>
    <div class="q-pa-md flex justify-center">
        <div style="max-width: 90%; width: 300px;">
            <q-intersection
                    v-for="index in 5"
                    :key="index"
                    transition="flip-right"
                    class="example-item"
            >
                <q-item clickable v-ripple class="shadow-2 q-pa-md p-ma-md">
                    <q-item-section>
                        <q-icon name="wysiwyg"></q-icon>
                        <q-item-label >年报 #{{ 2018-index }}</q-item-label>
                        <q-item-label lines="10">{{selectStr}}</q-item-label>
                    </q-item-section>

                </q-item>
            </q-intersection>
        </div>
    </div>
</template>

<script>
    export default {
        name: "reportHistory",
        props:{
            selectStr:String
        }
    }
</script>

<style scoped>

</style>
