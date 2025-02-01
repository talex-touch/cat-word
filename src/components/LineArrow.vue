<script setup lang="ts">

</script>

<template>
  <section>
    <div flex items-center gap-2 class="head">
      <div class="head-icon">
        <slot name="icon" />
      </div>
      <slot />
    </div>

    <div flex items-center class="end">
      <slot name="end" />

      <div i-carbon:chevron-right />
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
  &:active {
    background-color: var(--el-fill-color-light);
  }

  .head-icon {
    display: flex;

    width: 30px;
    height: 30px;

    align-items: center;
    justify-content: center;

    border-radius: 50%;
    background-color: var(--el-bg-color);
  }

  .end {
    height: 100%;
    min-width: 32px;

    width: max-content;

    font-size: 14px;
    color: var(--el-text-color-secondary);
  }
  margin: 0.75rem 0;
  padding: 0.5rem 0.5rem;
  display: flex;

  width: 100%;
  align-items: center;
  justify-content: space-between;

  border-radius: 12px;
  background-color: var(--el-fill-color);
  // border: 1px solid var(--el-border-color);
}
</style>
