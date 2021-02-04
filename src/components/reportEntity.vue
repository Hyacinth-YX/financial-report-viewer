<template>
    <div class="q-pa-md q-gutter-sm">
        <q-input
                ref="filter"
                filled
                v-model="filter"
                label="Search - only filters labels that have also '(*)'"
        >
            <template v-slot:append>
                <q-icon v-if="filter !== ''" name="clear" class="cursor-pointer" @click="resetFilter"/>
            </template>
        </q-input>

        <q-tree
                :nodes="simple"
                node-key="label"
                :filter="filter"
                :filter-method="myFilterMethod"
                :expanded.sync="expanded"
                default-expand-all
                :selected.sync="selectedEntity"
        />
    </div>
</template>

<script>
    export default {
        name: "reportEntity",
        data() {
            return {
                simple: [
                    {
                        label: '实体',
                        children: [
                            {
                                label: '企业',
                                children: [
                                    {label: '交银施罗德资管'},
                                    {label: '中国平安财产保险股份有限公司'},
                                    {label: '中国平安人寿保险股份有限公司'},
                                    {label: '中国银行股份有限公司上海市分行 '},
                                    {label:'中国证券金融股份有限公司'},
                                    {label:'深圳中电投资股份有限公司'},
                                    {label:'招商财富'}
                                ]
                            },
                            {
                                label: '人名',
                                children: [
                                    {label: '项有志'},
                                    {label: '杨如生'},
                                    {label:'郭田勇'},
                                    {label:'杨志群'},
                                    {label:'邱伟'},
                                    {label:'车国宝'},
                                    {label:'王春汉'},
                                ]
                            },
                        ]
                    }
                ],
                filter: '',
                expanded: ['Good service'],
                selectedEntity:""
            }
        },
        watch:{
            selectedEntity: function () {
                this.$emit("update:selectedEntity",this.selectedEntity)
            }
        },
        methods: {
            myFilterMethod(node, filter) {
                const filt = filter.toLowerCase()
                return node.label && node.label.toLowerCase().indexOf(filt) > -1 && node.label.toLowerCase().indexOf('(*)') > -1
            },

            resetFilter() {
                this.filter = ''
                this.$refs.filter.focus()
            }
        }
    }
</script>

<style scoped>

</style>
