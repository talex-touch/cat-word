<script setup lang="ts">
defineProps<{
  visible: boolean
}>()
</script>

<template>
  <RoutePage :visible="visible" class="DictionaryHolder">
    <slot />
  </RoutePage>
</template>

<style lang="scss" scoped>
.DictionaryHolder {
}
</style>
