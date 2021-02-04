<template>
    <q-layout view="hHh LpR fFf">
        <q-header elevated class="bg-primary text-white" height-hint="98">
            <q-toolbar>
                <q-btn dense flat round icon="menu" @click="left = !left"/>

                <q-toolbar-title>
                    Financial Report Viewer
                </q-toolbar-title>

                <q-input bottom-slots v-model="codeText" rounded outlined hide-bottom-space
                         placeholder="输入证券代码或简称" :dense="true" color="lime-11" bg-color="white">
                    <template v-slot:append>
                        <q-icon v-if="codeText !== ''" name="close" @click="codeText = ''" class="cursor-pointer"/>
                        <q-icon name="search"/>
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
                <div class="q-gutter-xl justify-center row q-pa-md p-ma-md">
                    <q-card class="my-card col-3" @click="gotoResult" style="cursor: pointer">
                        <q-card-section>
                            <div class="text-h6">贵州茅台酒股份有限公司</div>
                            <div class="text-subtitle2">600519</div>
                        </q-card-section>
                        <q-separator/>
                        <q-card-section vertical>
                            <div class="text-h6">2020年 半年报</div>
                            <div class="text-body1">
                                600519贵州茅台最新公布2020年半年报，本期实现每股收益17.99元，营业收入增长11.31%，净利润增长13.29%；报告期末股东总数98717户，比上期下降2.12%；对下报告期业绩预计：不适用。
                            </div>
                        </q-card-section>
                    </q-card>


                    <q-card class="my-card col-3" @click="gotoResult" style="cursor: pointer">
                        <q-card-section>
                            <div class="text-h6" >贵州茅台酒股份有限公司</div>
                            <div class="text-subtitle2">600519</div>
                        </q-card-section>
                        <q-separator/>
                        <q-card-section vertical>
                            <div class="text-h6">2019年 年报</div>
                            <div class="text-body1">
                                600519贵州茅台最新公布2019年报，本年实现每股收益32.8元，营业收入增长16.01%，净利润增长17.05%；报告期末股东总数96747户，比上期增长8.63%；本年度利润分配及资本公积金转增股本预案：每10股派息170.25元（含税）。
                            </div>
                        </q-card-section>
                    </q-card>

                    <q-card class="my-card col-3" @click="gotoResult" style="cursor: pointer">
                        <q-card-section>
                            <div class="text-h6">贵州茅台酒股份有限公司</div>
                            <div class="text-subtitle2">600519</div>
                        </q-card-section>
                        <q-separator/>
                        <q-card-section vertical>
                            <div class="text-h6">2018年 半年报</div>
                            <div class="text-body1">
                                600519贵州茅台最新公布2019年半年报，本期实现每股收益15.88元，营业收入增长18.24%，净利润增长26.56%；报告期末股东总数88000户，比上期增长9.19%。
                            </div>
                        </q-card-section>
                    </q-card>



                  <q-card class="my-card col-3" @click="gotoResult" style="cursor: pointer">
                    <q-card-section>
                      <div class="text-h6">平安银行</div>
                      <div class="text-subtitle2">600519</div>
                    </q-card-section>
                    <q-separator/>
                    <q-card-section vertical>
                      <div class="text-h6">2020年 半年报</div>
                      <div class="text-body1">
                        000001平安银行最新公布2020年半年报，本年利润分配预案：不分配；对下报告期业绩预计：不适用。
                      </div>
                    </q-card-section>
                  </q-card>

                  <q-card class="my-card col-3" @click="gotoResult" style="cursor: pointer">
                    <q-card-section>
                      <div class="text-h6">平安银行</div>
                      <div class="text-subtitle2">600519</div>
                    </q-card-section>
                    <q-separator/>
                    <q-card-section vertical>
                      <div class="text-h6">2020年 年报</div>
                      <div class="text-body1">
                        平安银行(000001)最新公布2020年报，本年利润分配预案：不分配。
                      </div>
                    </q-card-section>
                  </q-card>

                  <q-card class="my-card col-3" @click="gotoResult" style="cursor: pointer">
                    <q-card-section>
                      <div class="text-h6">平安银行</div>
                      <div class="text-subtitle2">600519</div>
                    </q-card-section>
                    <q-separator/>
                    <q-card-section vertical>
                      <div class="text-h6">2019年 年报</div>
                      <div class="text-body1">
                        000001平安银行最新公布2019年报，本年利润分配预案：不分配。
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
        methods:{
          gotoResult:function () {
              router.push("pdfviewpage");
          }
        }
    }
</script>
