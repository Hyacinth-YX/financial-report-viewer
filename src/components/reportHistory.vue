<template>
    <div class="q-pa-md flex justify-center">
        <div style="max-width: 90%; width: 300px;">
            <q-intersection
                    v-for="(item,index) in recentAnnouncementInfo"
                    :key="index"
                    transition="flip-right"
                    class="example-item"
            >
                <q-item clickable v-ripple class="shadow-2 q-pa-md p-ma-md" @click="routeToReport(item.announcementId,item.secCode,item.security)">
                    <q-item-section>
                        <q-icon name="wysiwyg"></q-icon>
                        <q-item-label >{{item.announcementTime}} | {{ item.announcementTitle }}</q-item-label>
                    </q-item-section>

                </q-item>
            </q-intersection>
        </div>
    </div>
</template>

<script>
    export default {
        name: "reportHistory",
        inject:['reload'],
        props:{
            selectStr:String,
            recentAnnouncementInfo:Array
        },
      methods:{
        routeToReport: function (announcementId,secCode,security){
            this.$router.push({
              path: "",
              query: {
                announcementId: announcementId,
                secCode:secCode,
                security:security
              }
            })
            this.reload()
        }
      }
    }
</script>

<style scoped>

</style>
