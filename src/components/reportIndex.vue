<template>
    <div style="width: 100%;height: 100%">
            <q-scroll-area
                    :thumb-style="thumbStyle"
                    :bar-style="barStyle"
                    style="height:900px; max-width: 100%"
            >
                <Tree :value="treeData" align="left">
                    <span slot-scope="{node, index, path, tree}">
                        <q-checkbox v-model="checkLoad" :val="node.text" @change="tree.toggleCheck(node, path)"
                                    color="cyan"/>
                        <q-btn :style="'left: '+(path.length-1) + 'px' " flat no-caps
                               @click="tree.toggleFold(node, path)" :label="node.text"></q-btn>
                    </span>
                </Tree>
            </q-scroll-area>
    </div>
</template>

<script>
    import {Tree, Check, Draggable, Fold} from 'he-tree-vue'
    // import {
    //     Tree, // 基础树
    //     Fold, Check, Draggable, // 插件: 折叠, 勾选框, 拖拽
    //     foldAll, unfoldAll, cloneTreeData, walkTreeData, getPureTreeData, //方法
    // } from 'he-tree-vue'
    // import 'he-tree-vue/dist/he-tree-vue.css' // 基础样式
    export default {
        name: "reportIndex",
        components: {Tree: Tree.mixPlugins([Check, Draggable, Fold])},
        data() {
            return {
                treeData: [{text: 'node 1', children: [{text: 'node 1-1'}, {text: 'node 1-2'}]},
                    {text: 'node 2', children: [{text: 'node 2-1'}, {text: 'node 2-2'}]},
                    {text: 'node 3', children: [{text: 'node 3-1'}, {text: 'node 3-2'}]}],
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
