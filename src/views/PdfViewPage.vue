<template>
  <q-layout view="hHh lpR lFr">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left"/>
        <q-btn dense flat round icon="home" @click="backHome"></q-btn>

        <q-toolbar-title>
          Financial Report Viewer
        </q-toolbar-title>
        <q-btn dense flat round icon="menu" @click="right = !right"/>

        <!--        <q-input bottom-slots v-model="codeText" rounded outlined hide-bottom-space-->
        <!--                 placeholder="输入证券代码或简称" :dense="true" color="lime-11" bg-color="white">-->
        <!--          <template v-slot:append>-->
        <!--            <q-icon v-if="codeText !== ''" name="close" @click="codeText = ''" class="cursor-pointer"/>-->
        <!--            <q-icon name="search"/>-->
        <!--          </template>-->
        <!--        </q-input>-->
      </q-toolbar>
      <!--      <div class="fit row justify-end items-end  q-gutter-md">-->
      <!--        <q-select v-model="yearChoose" :options="yearOptions" bg-color="white" label="年度" rounded-->
      <!--                  class="q-ma-sm q-pt-md " style="min-width: 150px" dense/>-->
      <!--        <q-select v-model="typeChoose" :options="typeOptions" bg-color="white" label="公告类型" rounded-->
      <!--                  class="q-ma-sm q-pd-md" style="min-width: 150px" dense/>-->
      <!--      </div>-->
    </q-header>

    <q-drawer show-if-above v-model="left" side="left" :width="drawWidth" bordered>
      <q-splitter
          v-model="splitterModel"
          horizontal
          style="height: 100%;"
      >
        <template v-slot:before>
          <div class="text-h4 q-mb-md">目录</div>
          <div class="la-align-left">
            <q-scroll-area style="height: 600px; max-width: 100%;" class="bg-grey-1 rounded-borders">
              <p id="sidebar" v-html="Outline" class="la-align-left"></p>
            </q-scroll-area>
          </div>
        </template>

        <template v-slot:after>
          <div style="min-height: 300px">
            <q-tabs
                v-model="tab"
                class="text-blue-5"
                no-caps
                draggable="false"
            >
              <q-tab name="history" icon="hourglass_full" label="历年比较"/>
              <q-tab name="entity" icon="store" label="实体"/>
              <q-tab name="search" icon="search" label="外部检索"/>
            </q-tabs>

            <q-tab-panels
                v-model="tab"
                animated
                vertical
                transition-prev="jump-up"
                transition-next="jump-up"
            >

              <q-tab-panel name="history">
                <div class="text-h4 q-mb-md">
                  <div>历史报告对比</div>
                </div>
                <report-history :selectStr="selectStr"
                                :recentAnnouncementInfo="recentAnnouncementInfo"></report-history>
              </q-tab-panel>

              <q-tab-panel name="entity">
                <div class="text-h4 q-mb-md">查看所有实体</div>
                <report-entity :selectedEntity.sync="searchText"></report-entity>
              </q-tab-panel>


              <q-tab-panel name="search">
                <report-search :searchText="searchText"></report-search>
              </q-tab-panel>


            </q-tab-panels>
          </div>
        </template>
      </q-splitter>
    </q-drawer>

    <q-page-container>
      <q-page class="q-pa-sm">
        <div class="column" style="width: 100%">
          <!--                    <q-card class="col report-card q-ma-sm q-pa-sm" align="center">-->
          <!--                        <div class="text-h6">{{reportTitle}}</div>-->
          <!--                    </q-card>-->


          <!--                    <q-card v-for="n in flatText.length" :key="n" class="col report-card q-pa-xs" align="left" flat-->
          <!--                            style="text-indent: 2ch;" v-ripple="false">-->

          <!--                        <div class="text-body2"-->
          <!--                             :style="'width: 100%;cursor: pointer;border-right: 2px solid '-->
          <!--                             + colorBand[Math.floor(Math.random()*colorBand.length)]"-->
          <!--                             v-ripple @click="selectReportStr">-->
          <!--                            {{flatText[n]}}-->
          <!--                        </div>-->
          <!--                    </q-card>-->
          <q-no-ssr v-if="forceRander">
            <p ref="htstr" v-html="reportContent"></p>
          </q-no-ssr>
          <q-spinner-gears size="50px" color="primary" v-if="visible" class="absolute-center"/>

        </div>
      </q-page>
    </q-page-container>

    <q-drawer show-if-above v-model="right" side="right" :width="drawWidth" bordered>
      <q-splitter
          v-model="splitterModelRight"
          horizontal
          style="height: 100%"
      >
        <template v-slot:before>
          <!--          <q-card class="my-card col-3 caption" :id="companyInfo.code" align="left">-->

          <q-card-section>
            <div class="text-h6">{{ announcementInfo.announcementTitle }}</div>
            <div class="text-subtitle2 text-primary">报告日期:{{ announcementInfo.announcementTime }}
            </div>
            <div class="text-subtitle2 text-accent">
              <q-icon name="face"></q-icon>
              情绪评级:{{ announcementEmotion[$route.query.announcementId] }}
            </div>
          </q-card-section>
          <q-separator inset/>
          <q-card-section>
            <div class="text-h6">{{ companyInfo.full_name }}</div>
            <div class="text-subtitle2 text-primary">
              代码:{{ companyInfo.a_code || companyInfo.b_code || companyInfo.c_code }}
              <span class="text-body2 text-grey"> | {{ companyInfo.industry_1 }}</span>
              <span class="text-body2 text-grey"> | {{ companyInfo.industry_2 }}</span>
              <span class="text-body2 text-grey"> | {{ companyInfo.province }}</span>
              <span class="text-body2 text-grey"> | {{ companyInfo.city }}</span>
            </div>
          </q-card-section>
          <q-separator inset/>
          <q-card-section vertical align="left">
            <div class="text-body2 text-primary">注册资本<span class="text-body2 text-grey">：{{
                companyInfo.register_capital
              }} {{ companyInfo.currency }}</span>
            </div>
            <div class="text-body2 text-primary">联系方式<span class="text-body2 text-grey">：{{
                companyInfo.contact_number
              }}</span>
            </div>
            <div class="text-body2 text-primary">网址<span class="text-body2 text-grey">：{{ companyInfo.website }}</span>
            </div>
            <div class="text-body2 text-primary">电子邮箱<span class="text-body2 text-grey">：{{ companyInfo.email }}</span>
            </div>
            <div class="text-body2 text-primary">会计师事务所<span class="text-body2 text-grey">：{{
                companyInfo.cpafirm
              }}</span>
            </div>
            <div class="text-body2 text-primary">律师事务所<span class="text-body2 text-grey">：{{
                companyInfo.lawfirm
              }}</span>
            </div>
            <div class="text-body2 text-primary">主营业务<span
                class="text-body2 text-grey">：{{ companyInfo.main_business }}</span></div>
            <div class="text-body2 text-primary">业务范围<span
                class="text-body2 text-grey">：{{ companyInfo.business_scope }}</span></div>


          </q-card-section>
          <!--          </q-card>-->
        </template>

        <template v-slot:after>
          <charts security="000630.XSHE"></charts>
        </template>
      </q-splitter>
    </q-drawer>

    <q-footer elevated class="bg-white shadow-0" bordered style="height: 200px">
      <report-relation></report-relation>
    </q-footer>
  </q-layout>
</template>

<script scoped>
// import reportIndex from "@/components/reportIndex";
// import reportEmotion from "@/components/reportEmotion";
import reportEntity from "@/components/reportEntity";
import reportSearch from "@/components/reportSearch";
import reportRelation from "@/components/reportRelation";
import reportHistory from "@/components/reportHistory";
import charts from "@/components/charts";

export default {
  name: "PdfViewPage",
  components: {
    reportRelation, reportEntity, reportSearch, reportHistory, charts,
    // reportIndex, reportEmotion,
  },
  watch: {
    searchText: function () {
      this.tab = "search"
    }
  },
  data() {
    return {
      left: true,
      right: true,
      tab: 'history',
      splitterModel: 50,
      splitterModelRight: 400,
      drawWidth: 350,
      codeText: '',
      selectStr: "",
      searchText: "",
      yearChoose: "2019",
      yearOptions: ['2016', '2017', '2018', '2019'],
      typeChoose: "年报",
      typeOptions: ['年报', '半年报', '一季报', '三季报'],
      reportTitle: "",
      reportContent: "",
      forceRander: true,
      visible: true,
      recentAnnouncementInfo: [],
      announcementEmotion: {},
      treeData: [{
        text: "重要提示", children: [
          {
            text: "一、 本公司董事会、监事会及董事、监事、高级管理人员保证年度报告内容的真实、准确、完整，\n" +
                "不存在虚假记载、误导性陈述或重大遗漏，并承担个别和连带的法律责任。", children: []
          },
          {text: "二、 公司全体董事出席董事会会议。", children: []},
          {text: "三、 天职国际会计师事务所（特殊普通合伙）为本公司出具了标准无保留意见的审计报告。 ", children: []},
          {
            text: "四、 公司负责人高卫东、主管会计工作负责人刘刚及会计机构负责人（会计主管人员）陈华声明:" +
                "保证年度报告中财务报告的真实、准确、完整。 ", children: []
          },
          {
            text: "五、 经董事会审议的报告期利润分配预案或公积金转增股本预案\n根据公司实际状况和未来可持续协调发展的需求，拟订了以下利润分配预案：以2019年年末\n" +
                "总股本125,619.78万股为基数，对公司全体股东每10股派发现金红利170.25元（含税），共分配利\n" +
                "润21,386,767,545.00元，剩余94,505,569,862.39元留待以后年度分配。以上利润分配预案需提交公\n" +
                "司股东大会审议通过后实施。", children: []
          },
          {
            text: "六、 前瞻性陈述的风险声明\n本年度报告中所涉及的未来计划、发展战略等前瞻性陈述因存在不确定性，不构成本公司对\n" +
                "投资者的实质承诺，敬请投资者注意投资风险。", children: []
          }
        ]
      },
        {
          text: "董事长致辞",
          children: [
            {
              text: "不忘初心、回归本质、顺势而为",
              children: [
                {
                  text: "2020 年是极不平凡的一年，复杂的国际形势，叠加突发的新冠疫情，社会经济秩序悄然改变，\n" +
                      "但变中有序，危中有机。2020 年也是平安银行深化转型的开局之年，经过三年转型攻坚之战，迈入\n" +
                      "新阶段的我们基础更实，底气更足，打法更新，机制更稳。\n" +
                      "外因助推，内因驱动，2020 年平安银行向市场提交了一份稳健的成绩单。\n" +
                      "效益喜人。全年营收增幅 11.3%，连续三年实现两位数增长，拨备前利润增幅 12.0%，资产规模\n" +
                      "接近 4.5 万亿，负债平均成本率 2.32%，同比下降 32 个基点，零售 AUM 超 2.6 万亿，增幅 32.4%。\n" +
                      "质量稳健。不良率 1.18%，较上年末下降 0.47 个百分点，拨备覆盖率 201.40%，较上年末上升\n" +
                      "18.28 个百分点，业绩增长的基础更加牢靠。\n" +
                      "结构均衡。零售向纵深突破，网均 AUM 营收同比增长 41.5%，私人银行 AUM 及客户数均实现\n" +
                      "高速增长；对公精益求精，心无旁骛、聚焦火力做精五大重点，构建统一客户经营平台，打造新型\n" +
                      "供应链，做大票据，做强复杂投融，做实生态综拓；资金同业融汇国际视野、本土智慧，依托业内\n" +
                      "绝对领先的科技平台，与零售、对公加强协同，成为全行新增长极。", children: []
                },
                {
                  text: "回顾平安银行过去四年的挑战与成就，纷繁复杂表象下的商业逻辑以及经营思想已经逐步清晰，\n" +
                      "不忘初心、回归本质、顺势而为，才能始终“保持战略定力不折腾，厘清发展重点不盲乱，准确把\n" +
                      "握趋势立潮头”。", children: []
                },
                {
                  text: "作为金融机构，我们以实体为本，这是初心。在当前“国内大循环为主体、国内国际双循环相\n" +
                      "互促进”的新发展格局下，银行业服务实体的方式理应更全面，更创新。\n" +
                      "零售转型意在从消费端发力支持实体。四年前平安银行提出零售转型战略，既是因为我们背靠\n" +
                      "的平安集团有强大的零售基因，也是因为近年来消费在实体经济增长中越来越重要。在当前强化国\n" +
                      "内大循环的历史要求下，我们转型第一阶段打造的智能普惠零售服务模式，在促进消费、扩大内需，\n" +
                      "带动生产环节繁荣方面有更大用武之地。\n" +
                      "一方面，我们帮助客户做好资产配置，实现财富保值增值。我们打造的优选基金服务，2020 年\n" +
                      "推荐基金的平均收益率达到 52.5%，比同期上证指数涨幅高出 38.7 个百分点；另一方面，我们将金\n" +
                      "融服务嵌入生态、场景，用线上化、智能化方式打造更极致的消费体验，满足人民群众对美好生活\n" +
                      "的追求。比如我们与国内某石油公司合作联名信用卡，不仅加油打折，还能以这张卡为载体，享受\n" +
                      "保险、车服务、积分互通等多种权益，为客户车生活提供一站式解决方案。", children: []
                }
              ]
            }]
        },
        {
          text: "第一节 释义",
          children: [{
            text: "公司信息", children: {
              text: "股票简称 平安银行 股票代码 000001\n" +
                  "股票上市证券交易所 深圳证券交易所\n" +
                  "公司的中文名称 平安银行股份有限公司\n" +
                  "公司的中文简称 平安银行\n" +
                  "公司的外文名称 Ping An Bank Co., Ltd.\n" +
                  "公司的外文名称缩写 PAB\n" +
                  "公司的法定代表人 谢永林\n" +
                  "注册地址 中华人民共和国广东省深圳市罗湖区深南东路 5047 号\n" +
                  "注册地址的邮政编码 518001\n" +
                  "办公地址 中国广东省深圳市深南东路 5047 号\n" +
                  "中国广东省深圳市福田区益田路 5023 号平安金融中心 B 座\n" +
                  "办公地址的邮政编码 518001、518033\n" +
                  "公司网址 http://bank.pingan.com\n" +
                  "电子信箱 PAB_db@pingan.com.cn\n" +
                  "服务热线 95511 转 3", children: []
            }
          }, {text: "联系人和联系方式", children: {text: "联系人和联络方式", children: []}},
            {
              text: "发展战略及核心竞争力", children: {
                text: "本行发展战略", children: [{
                  text: "本行以打造“中国最卓越、全球领先的智能化零售银行”为战略目标，持续坚持“科技引领、零\n" +
                      "售突破、对公做精”十二字策略方针，在此基础上，全面升级新三年战略举措，推动业务发展迈上\n" +
                      "新台阶。一是始终坚持“三不变”，即坚持零售转型方向不变，坚持“综合金融、科技赋能”两大核\n" +
                      "心优势不变，坚持均衡、协同发展思路不变；二是着力打造“数字银行、生态银行、平台银行”三\n" +
                      "张名片：在数字银行方面，要做到决策“三先”（先知、先觉、先行）、经营“三提”（提效益、提效\n" +
                      "率、提产能）、管理“三降”（降成本、降风险、降人力）；在生态银行方面，要筑好护城河、发挥优\n" +
                      "势、获得反哺；在平台银行方面，要对接平台、批量获客、场景经营；三是分别构建和深化零售业\n" +
                      "务、对公业务、资金同业业务“3+2+1”经营策略。", children: []
                }]
              }
            }]
        },
        {
          text: "第二节 公司简介和主要财务指标",
          children: []
        },
        {
          text: "第三节 公司业务概要",
          children: []
        },
        {
          text: "第四节 经营情况讨论与分析",
          children: []
        },
        {
          text: "第五节 重要事项",
          children: []
        },
        {
          text: "第六节 普通股股份变动及股东情况",
          children: []
        },
        {
          text: "第七节 优先股相关情况",
          children: []
        },
        {
          text: "第八节 董事、监事、高级管理人员和员工情况",
          children: []
        },
        {
          text: "第九节 公司治理",
          children: []
        },
        {
          text: "第十节 公司债券相关情况",
          children: []
        },
        {
          text: "第十一节 财务报告",
          children: []
        },
        {
          text: "第十二节 备查文件目录",
          children: []
        },
      ],
      colorBand: [],
      companyInfo: {},
      announcementInfo: {},
      Outline: "该文档无法解析目录"

    }
  },
  computed: {
    flatText: function () {
      return walkTree(this.treeData)
    },
  },
  methods: {
    selectReportStr: function (e) {
      this.selectStr = e.target.innerText;
    },
    backHome: function () {
      if (this.$router.currentRoute.path !== '/') {
        this.$router.replace('/')
      }
    },
  },
  created: async function () {
    this.colorBand = getBarColors(['#00ff00', '#ffffff', '#ff0000']);
    let res = null
    this.announcementEmotion[this.$route.query.announcementId] = 5

    res = await this.$api.report.getSecInfo(this.$route.query.security)
    res = res.data.data
    this.companyInfo = res

    res = await this.$api.report.getReportInfo(this.$route.query.announcementId)
    res = res.data.data
    this.announcementInfo = res

    res = await this.$api.report.getAllRecentReportAnnouncementInfo(this.$route.query.secCode)
    res = res.data.data
    this.recentAnnouncementInfo = res
    console.log(this.recentAnnouncementInfo)

    res = await this.$api.report.getAnnouncementOutline(this.$route.query.announcementId)
    if (res.data.code == 1) {
      res = res.data.data
      this.Outline = res
    }


    this.visible = true;
    res = await this.$api.report.getReportContent(this.$route.query.announcementId);
    // let res = await this.$api.report.testTemplate();
    // let js_res = await this.$api.report.reportTemplateJs();
    // js_res = js_res.data.data
    this.reportContent = res['data']
    this.forceRander = false;
    this.$nextTick().then(() => {
      this.forceRander = true;
      this.visible = false;
    })
    //       .then(()=>{
    //     let regJs = get_js_str(this.reportContent)
    //     var ele = document.createElement("script")
    //     ele.innerHTML = regJs
    //     console.log(regJs)
    //     this.$refs.htstr.append(ele)
    //     var ele2 = document.createElement("script")
    //     ele2.innerHTML = js_res
    //     console.log(js_res)
    //     this.$refs.htstr.append(ele2)
    //   });



  },
}

// function get_js_str(resdata){
//   var regJs = "";
//   resdata.replaceAll(/<script.*?>([\s\S]+?)<\/script>/img,function(_,js){    //正则匹配出script中的内容
//     regJs = js
//   });
//   return regJs
// }

function walkTree(treeData) {

  var nodes = [treeData[0].text];
  if (treeData.length > 0) {
    var stack = [];
    for (i = treeData.length - 1; i >= 0; i--) {
      stack.push(treeData[i])
    }


    while (stack.length != 0) {
      var item = stack.pop();
      nodes.push(item.text);

      var children = item.children;
      for (var i = children.length - 1; i >= 0; i--)
        stack.push(children[i]);
    }
  }

  return nodes;

}

// rgb to hex
function rgbToHex(r, g, b) {
  var hex = ((r << 16) | (g << 8) | b).toString(16);
  return "#" + new Array(Math.abs(hex.length - 7)).join("0") + hex;
}

// hex to rgb
function hexToRgb(hex) {
  var rgb = [];
  for (var i = 1; i < 7; i += 2) {
    rgb.push(parseInt("0x" + hex.slice(i, i + 2)));
  }
  return rgb;
}

function gradient(startColor, endColor, step = 10) {
  // 将 hex 转换为rgb
  var sColor = hexToRgb(startColor),
      eColor = hexToRgb(endColor);

  // 计算R\G\B每一步的差值
  var rStep = (eColor[0] - sColor[0]) / step;
  let gStep = (eColor[1] - sColor[1]) / step;
  let bStep = (eColor[2] - sColor[2]) / step;

  var gradientColorArr = [];
  for (var i = 0; i < step; i++) {
    // 计算每一步的hex值
    gradientColorArr.push(rgbToHex(parseInt(rStep * i + sColor[0]), parseInt(gStep * i + sColor[1]), parseInt(bStep * i + sColor[2])));
  }
  return gradientColorArr;
}

function getBarColors(allColor) {
  let gradient_colors = [];
  for (let i = 0; i < allColor.length - 1; i++) {
    gradient_colors = gradient_colors.concat(gradient(allColor[i], allColor[i + 1], 10))
  }
  return gradient_colors;
}

</script>

<style lang="sass" scoped>
.report-card
  width: 100%
  max-width: 100%


</style>

<style type="text/css">
.l {
  text-decoration: none;
  color: #1D1D1D;
  text-align: left;
  float: inside;
  font-weight: bold;
  width: 100%;
  vertical-align: middle;
}

/*.ul {*/
/*  text-align: left;*/
/*  float:left;*/
/*}*/
</style>
