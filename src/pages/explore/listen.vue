<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { Card, NavBar, Sidebar, SidebarItem } from 'vant'

const router = useRouter()

function onClickLeft() {
  router.back()
}
</script>

<template>
  <div class="SpeechPage">
    <NavBar title="听力训练" left-text="返回" left-arrow w-full @click-left="onClickLeft" />

    Test
  </div>
</template>

<style lang="scss">
.SpeechPage {
  position: relative;
  display: flex;

  width: 100%;
  height: 100%;

  align-items: center;
  flex-direction: column;

  // background-color: var(--el-bg-color-page);
}
</style>
