<script setup lang="ts">
defineProps<{
  visible: boolean
}>()
</script>

<template>
  <RoutePage :visible="visible" class="DictionaryHolder">
    <div p-4 class="DictionaryHolder-Container">
      <div class="DictionaryHolder-Header">
        <slot name="header" />
      </div>

      <div class="DictionaryHolder-Content flex">
        <div class="DictionaryHolder-Nav">
          <slot name="nav" />
        </div>
        <div class="DictionaryHolder-Main">
          <slot />
        </div>
      </div>
    </div>
  </RoutePage>
</template>

<style lang="scss" scoped>
.DictionaryHolder {
  display: flex;

  flex-direction: column;

  height: 100%;
}
</style>
