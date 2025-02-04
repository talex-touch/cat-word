<script setup lang="ts">

</script>

<template>
  <div class="SplashLayout">
    <div class="SplashLayout-Main">
      <slot name="content" />
    </div>

    <!-- FOOTER -->
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

  max-height: calc(100% - 64px);

  overflow: hidden;
}
</style>
