<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left"/>
        <q-btn dense flat round icon="home" @click="backHome"></q-btn>
        <q-toolbar-title>
          Financial Report Viewer
        </q-toolbar-title>

        <q-input bottom-slots v-model="codeText" rounded outlined hide-bottom-space
                 placeholder="输入证券代码或简称" :dense="true" color="lime-11" bg-color="white" @keyup.enter="searchCompany">
          <template v-slot:append>
            <q-icon v-if="codeText !== ''" name="close" @click="codeText = ''" class="cursor-pointer"/>
            <q-icon name="search" @click="searchCompany"/>
          </template>
        </q-input>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page>
        <div class="row justify-between">

          <q-parallax
              src="https://cdn.quasar.dev/img/parallax2.jpg"
          >
            <h1 class="text-white">Efficient Report</h1>
          </q-parallax>

        </div>

        <q-intersection
            transition="scale"
        >
          <q-infinite-scroll @load="onLoad" :offset="9" class="q-gutter-xl justify-center row q-pa-md p-ma-md"
                             v-if="showType===1">
            <q-card class="my-card col-3 caption" :id="item.code" @click="gotoResult(item.code)" style="cursor: pointer"
                    v-for="(item, index) in companyItems" :key="index" align="left">
              <q-card-section>
                <div class="text-h6">{{ item.full_name }}</div>
                <div class="text-subtitle2 text-primary">代码:{{ item.a_code || item.b_code || item.c_code }}
                  <span class="text-body2 text-grey"> | {{ item.industry_1 }}</span>
                  <span class="text-body2 text-grey"> | {{ item.industry_2 }}</span>
                  <span class="text-body2 text-grey"> | {{ item.province }}</span>
                  <span class="text-body2 text-grey"> | {{ item.city }}</span>
                </div>
              </q-card-section>
              <q-separator inset/>
              <q-card-section vertical align="left">
                <div class="text-body2 text-primary">主营业务<span
                    class="text-body2 text-grey">：{{ item.main_business }}</span></div>
                <div class="text-body2 text-primary">业务范围<span
                    class="text-body2 text-grey">：{{ item.business_scope.substring(0, 36) + "....." }}</span></div>
                <div class="text-body2 text-primary">会计师事务所<span class="text-body2 text-grey">：{{ item.cpafirm }}</span>
                </div>
                <div class="text-body2 text-primary">律师事务所<span class="text-body2 text-grey">：{{ item.lawfirm }}</span>
                </div>
              </q-card-section>
            </q-card>

            <template v-slot:loading>
              <div class="row justify-center q-my-md">
                <q-spinner-dots color="primary" size="40px"/>
              </div>
            </template>
          </q-infinite-scroll>

          <div  class="q-gutter-xl justify-center row q-pa-md p-ma-md" v-else-if="showType===2">
            <q-card class="my-card col-3 caption" :id="item.code" @click="gotoResult(item.code)" style="cursor: pointer"
                    v-for="(item, index) in searchResultItems" :key="index" align="left">
              <q-card-section>
                <div class="text-h6">{{ item.full_name }}</div>
                <div class="text-subtitle2 text-primary">代码:{{ item.a_code || item.b_code || item.c_code }}
                  <span class="text-body2 text-grey"> | {{ item.industry_1 }}</span>
                  <span class="text-body2 text-grey"> | {{ item.industry_2 }}</span>
                  <span class="text-body2 text-grey"> | {{ item.province }}</span>
                  <span class="text-body2 text-grey"> | {{ item.city }}</span>
                </div>
              </q-card-section>
              <q-separator inset/>
              <q-card-section vertical align="left">
                <div class="text-body2 text-primary">主营业务<span
                    class="text-body2 text-grey">：{{ item.main_business }}</span></div>
                <div class="text-body2 text-primary">业务范围<span
                    class="text-body2 text-grey">：{{ item.business_scope.substring(0, 36) + "....." }}</span></div>
                <div class="text-body2 text-primary">会计师事务所<span class="text-body2 text-grey">：{{ item.cpafirm }}</span>
                </div>
                <div class="text-body2 text-primary">律师事务所<span class="text-body2 text-grey">：{{ item.lawfirm }}</span>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </q-intersection>
      </q-page>

    </q-page-container>

  </q-layout>
</template>

<script>
import router from "@/router";

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      companyItems: [],
      searchResultItems: [],
      codeText: "",
      showType: 1
    }
  },
  watch:{
    codeText(){
      if(this.codeText===""){
        this.showType = 1
      }
    }
  },
  methods: {
    gotoResult: async function (code) {
      let secCode = code.split(".")[0]
      let announcementId = await this.$api.report.getRecentReportAnnouncementId(secCode)
      router.push({
        path: "pdfviewpage",
        query: {
          announcementId: announcementId.data.data,
          secCode:secCode,
          security:code
        }
      });
    },
    onLoad: async function (index, done) {
      let start = (index - 1) * 9
      let data = await this.$api.report.getAllSecInfo(start, 9)
      data = data['data']['data']['infos']
      for (let d of data) {
        this.companyItems.push(d);
      }
      done()
    },
    searchCompany: async function(){
      if (this.codeText !==""){
        let res = await this.$api.report.searchSecCodes(this.codeText)
        this.searchResultItems = res.data.data
        this.showType = 2
      }
    },
    backHome: function (){
      if(this.$router.currentRoute.path!=='/'){
        this.$router.replace('/')
      }

    }
  }
}
</script>
