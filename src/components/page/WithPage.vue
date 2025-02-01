<script setup lang="ts">

</script>

<template>
  <div class="WithPage">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.WithPage {
  position: relative;
  padding-top: 24px;

  width: 100%;
  min-height: 100%;
  // min-height: 100%;
  // max-height: 100%;
}
</style>
