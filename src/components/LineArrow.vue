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

    <div class="end">
      <div i-carbon:chevron-right />
    </div>
  </section>
</template>

<style lang="scss">
section {
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
    width: 32px;
    height: 100%;
  }
  margin: 0.75rem 0;
  padding: 0.5rem 0.5rem;
  display: flex;

  width: 100%;
  align-items: center;
  justify-content: space-between;

  border-radius: 16px;
  background-color: var(--el-fill-color);
  border: 1px solid var(--el-border-color);
}
</style>
