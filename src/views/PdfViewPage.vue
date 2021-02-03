<template>
    <q-layout view="hHh LpR fFf">

        <q-header elevated class="bg-primary text-white" height-hint="98">
            <q-toolbar>
                <q-btn dense flat round icon="menu" @click="left = !left"/>

                <q-toolbar-title>
                    Financial Report Viewer
                </q-toolbar-title>

                <q-input bottom-slots v-model="text" rounded outlined hide-bottom-space
                         placeholder="输入证券代码或简称" :dense="true" color="lime-11" bg-color="white">
                    <template v-slot:append>
                        <q-icon v-if="text !== ''" name="close" @click="text = ''" class="cursor-pointer"/>
                        <q-icon name="search"/>
                    </template>
                </q-input>
            </q-toolbar>

            <!--            <q-tabs align="left">-->
            <!--                <q-route-tab to="/page1" label="Page One"/>-->
            <!--                <q-route-tab to="/page2" label="Page Two"/>-->
            <!--                <q-route-tab to="/page3" label="Page Three"/>-->
            <!--            </q-tabs>-->
        </q-header>

        <q-drawer show-if-above v-model="left" side="left" :width="drawWidth" bordered>
            <q-splitter
                    v-model="splitterModel"
                    style="min-height: 800px;"
            >
                <template v-slot:before>
                    <q-tabs
                            v-model="tab"
                            vertical
                            class="text-teal"
                            no-caps
                            draggable="false"
                    >

                        <q-tab name="index" icon="mail" label="目录"/>
                        <q-tab name="entity" icon="alarm" label="实体"/>
                        <q-tab name="search" icon="search" label="检索"/>
                        <q-tab name="emotion" icon="people" label="情绪"/>
                        <q-tab name="relation" icon="movie" label="关系"/>
                    </q-tabs>
                </template>

                <template v-slot:after>
                    <q-tab-panels
                            v-model="tab"
                            animated
                            vertical
                            transition-prev="jump-up"
                            transition-next="jump-up"
                    >
                        <q-tab-panel name="index">
                            <div class="text-h4 q-mb-md">目录</div>
                            <div class="q-pa-md row q-col-gutter-sm">
                                <report-index/>
                            </div>
                        </q-tab-panel>

                        <q-tab-panel name="entity">
                            <div class="text-h4 q-mb-md">Alarms</div>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam
                                odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda
                                consectetur culpa fuga nulla ullam. In, libero.</p>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam
                                odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda
                                consectetur culpa fuga nulla ullam. In, libero.</p>
                        </q-tab-panel>


                        <q-tab-panel name="search">
                            <q-input bottom-slots v-model="text" outlined
                                     placeholder="搜索百科" :dense="true" color="lime-11" bg-color="white">
                                <template v-slot:append>
                                    <q-icon v-if="text !== ''" name="close" @click="text = ''" class="cursor-pointer"/>
                                    <q-icon name="search"/>
                                </template>
                            </q-input>
                            <div class="text-h4 q-mb-md">Movies</div>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam
                                odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda
                                consectetur culpa fuga nulla ullam. In, libero.</p>
                        </q-tab-panel>

                        <q-tab-panel name="emotion">
                            <div class="text-h4 q-mb-md">Emotion</div>
                            <report-emotion></report-emotion>
                        </q-tab-panel>

                        <q-tab-panel name="relation">
                            <div class="text-h4 q-mb-md">Movies</div>
                        </q-tab-panel>
                    </q-tab-panels>
                </template>
            </q-splitter>
        </q-drawer>
        <q-page-container>
            <q-page class="q-pa-sm">
                <div class="column" style="width: 100%">
                    <q-card class="col report-card q-ma-sm q-pa-sm" align="center">
                        <div class="text-h6">Our Changing Planet</div>
                    </q-card>

                    <q-card v-for="n in 15" :key="n" class="col report-card q-pa-xs" align="left" flat
                            style="text-indent: 2ch;" v-ripple>

                        <div class="text-body2" style="width: 100%;border-right: 2px solid #26A69A">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil praesentium
                            molestias a
                            adipisci, dolore vitae odit, quidem consequatur optio voluptates asperiores pariatur eos
                            numquam
                            rerum delectus commodi perferendis voluptate?

                        </div>
                    </q-card>

                </div>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script scoped>
    import reportIndex from "@/components/reportIndex";
    import reportEmotion from "@/components/reportEmotion";

    export default {
        name: "PdfViewPage",
        components: {reportIndex, reportEmotion},
        data() {
            return {
                left: false,
                tab: 'index',
                splitterModel: 20,
                drawWidth: 350,
                text: '',
                ph: '',

            }
        },
    }
</script>

<style lang="sass" scoped>
    .report-card
        width: 100%
        max-width: 100%
</style>
