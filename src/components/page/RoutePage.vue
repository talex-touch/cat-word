<script setup lang="ts">
const props = defineProps<{
  visible: boolean
}>()

const emits = defineEmits<{
  (e: 'modelValue:visible'): void
}>()

const visible = useVModel(props, 'visible', emits)
</script>

<template>
  <WithPage class="RoutePage transition-cubic absolute-layout flex flex-col" :class="{ visible }">
    <div class="RoutePage-Header">
      <slot name="header" />
    </div>
    <slot />
  </WithPage>
</template>

<style lang="scss" scoped>
.RoutePage {
  z-index: 1;

  border-radius: 18px;
  transform: translateX(120%);
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

  &.visible {
    border-radius: 0;
    transform: translateX(0);
  }
}
</style>
