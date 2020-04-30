<template>
    <div v-if="!item.hidden">
        <el-menu-item v-if="hasOneShowingChild(item.children, item) && !item.alwaysShow">
            <template v-if="onlyOneChild.length === 0">{{ item.meta.title }}</template>
        </el-menu-item>
        <el-submenu v-else index="2" popper-append-to-body>
            <template v-if="item.meta" slot="title">{{ item.meta.title }}</template>
            <sub-menu
                v-for="child in item.children"
                :key="child.path"
                :item="child"
            />
        </el-submenu>
    </div>
</template>

<script>
export default {
    name: 'SubMenu',
    props: {
        item: {
            type: Object,
            default: () => {}
        },
    },
    data() {
        return {
            onlyOneChild: null
        }
    },
    computed: {
        children () {
            return this.item.children
        },
    },
    methods: {
        hasOneShowingChild(children = [], parent) {
            const showingChildren = children.filter(item => {
                if (!item.hidden) {
                    this.$set(this, 'onlyOneChild', item)
                    return true
                }
            })
            // When there is only one child router, the child router is displayed by default
            if (showingChildren.length === 1) {
                return true
            }
            // Show parent if there are no child router to display
            if (showingChildren.length === 0) {
                this.$set(this, 'onlyOneChild', { ...parent, path: '', noShowingChildren: true })
                return true
            }
            return false
        },
    }
}
</script>

<style>

</style>
