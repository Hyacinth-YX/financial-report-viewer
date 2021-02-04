<template>
    <div style="width: 100%;height: 100%">
        <q-scroll-area
                :thumb-style="thumbStyle"
                :bar-style="barStyle"
                style="height:900px; max-width: 100%"
                draggable="false"
        >

            <Tree :value="treeData" align="left">
                    <span slot-scope="{node, index, path, tree}">
                        <div v-if="path.length<=1" style="white-space: nowrap;overflow: scroll;">
                        <q-checkbox v-model="checkLoad" :val="node.text" @change="tree.toggleCheck(node, path)"
                                    color="cyan" style="float: left"/>
                            <div style="max-width: 180px;display: inline">
                                    {{node.text}}
                                </div>
                        </div>
                    </span>
            </Tree>
        </q-scroll-area>

    </div>
</template>

<script>
    import {Tree, Check, Draggable, Fold} from 'he-tree-vue'

    var _ = require('lodash');
    export default {
        name: "reportIndex",
        components: {Tree: Tree.mixPlugins([Check, Draggable, Fold])},
        computed: {
            newTreeData: function () {
                return _.filter(this.treeData, function (o) {
                    return o.children.length > 0;
                });
            }
        },
        watch: {
            treeData: {
                handler: function () {
                    this.$emit("update:treeData", this.treeData)
                },
                deep: true
            }
        },
        props: {
            treeData: Array
        },
        data() {
            return {
                checkLoad: [],
                thumbStyle: {
                    right: '4px',
                    borderRadius: '5px',
                    backgroundColor: '#027be3',
                    width: '5px',
                    opacity: 0.75
                },
                barStyle: {
                    right: '2px',
                    borderRadius: '9px',
                    backgroundColor: '#027be3',
                    width: '9px',
                    opacity: 0.2
                },
            }

        }

    }
</script>

<style scoped>

</style>
