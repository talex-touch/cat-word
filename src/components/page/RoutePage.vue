<script setup lang="ts">
// defineProps<{
//   path?: string
// }>()

// const visible = ref(!false)

// onActivated(() => {
//   nextTick(() => {
//     visible.value = true
//   })
// })

// onDeactivated(() => {
//   visible.value = false
// })
</script>

<template>
  <!-- :class="{ visible }" -->
  <WithPage class="RoutePage transition-cubic absolute-layout flex flex-col">
    <div class="RoutePage-Header">
      <slot name="header" />
    </div>
    <div class="RoutePage-Main w-full flex-1 overflow-hidden">
      <slot />
    </div>
  </WithPage>
</template>

<style lang="scss" scoped>
.RoutePage {
  z-index: 1;

  // border-radius: 18px;
  // transform: translateX(120%);
  background-color: var(--el-fill-color);

  &-Header {
    :deep(.van-nav-bar) {
      .van-icon,
      .van-nav-bar__text {
        color: var(--theme-color);
      }
      &::after {
        border-bottom: none !important;
      }
      padding-top: 0.5rem;
    }
  }

  // &.visible {
  //   border-radius: 0;
  //   transform: translateX(0);
  // }
}
</style>
