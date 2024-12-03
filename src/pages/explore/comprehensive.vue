<script setup lang="ts">
import { Card, NavBar, Sidebar, SidebarItem } from 'vant'

const router = useRouter()
const active = ref(0)

function onClickLeft() {
  router.back()
}
</script>

<template>
  <div class="ComprehensivePage">
    <NavBar title="综合提升" left-text="返回" left-arrow @click-left="onClickLeft" />

    <div class="ComprehensivePage-Main">
      <div class="ComprehensivePage-Aside">
        <Sidebar v-model="active">
          <SidebarItem title="全部" />
          <SidebarItem title="高考词汇" />
          <SidebarItem title="大学精选" />
          <SidebarItem title="四级核心" />
          <SidebarItem title="六级核心" />
          <SidebarItem title="雅思" />
          <SidebarItem title="BEC" />
        </Sidebar>
      </div>

      <div class="ComprehensivePage-Content">
        <Card v-for="i in 10" :key="i" num="1" price="0.00" desc="英语真题试卷" title="英语真题" thumb="/pdf/BEC.png" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.ComprehensivePage-Content {
  flex: 1;

  --van-card-text-color: var(--el-text-color-primary);
  --van-card-price-color: var(--el-text-color-secondary);
  --van-card-background: var(--el-fill-color-lighter);
}

.ComprehensivePage-Aside {
  border-right: 1px solid var(--el-border-color);
}

.ComprehensivePage-Main {
  div.van-sidebar {
    div {
      color: var(--el-text-color-primary) !important;
    }
    position: sticky;

    top: 46px;

    width: 100px;
    // height: 100%;

    --van-sidebar-selected-background: var(--el-bg-color) !important;
    --van-sidebar-background: var(--el-bg-color) !important;
  }
  position: relative;
  display: flex;

  min-height: 100%;
}

.ComprehensivePage {
  .van-nav-bar {
    position: sticky;

    top: 0;
  }
  height: 100%;

  overflow-y: scroll;
}
</style>
