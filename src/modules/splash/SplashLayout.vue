<script setup lang="ts">

</script>

<template>
  <div class="SplashLayout">
    <div class="SplashLayout-Main">
      <slot name="content" />
    </div>

    <slot name="footer" />
  </div>
</template>

<style lang="scss" scoped>
.SplashLayout {
  position: absolute;
  display: flex;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  flex-direction: column;
  color: var(--el-text-color-primary);
}

.SplashLayout-Main {
  position: relative;

  flex: 1;
  height: 100%;
}
</style>
