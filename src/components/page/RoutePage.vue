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
  <WithPage class="transition-cubic RoutePage absolute-layout" :class="{ visible }">
    <slot />
  </WithPage>
</template>

<style lang="scss" scoped>
.RoutePage {
  &.visible {
    border-radius: 0;
    transform: translateX(0);
  }

  z-index: 1;

  border-radius: 18px;
  transform: translateX(120%);
  background-color: var(--el-fill-color);
}
</style>
