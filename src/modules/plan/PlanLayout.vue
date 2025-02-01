<script setup lang="ts">

</script>

<template>
  <div class="PlanLayout">
    <div class="PlanLayout-Header">
      <slot name="header" />
    </div>

    <div class="PlanLayout-Main">
      <slot name="main" />
    </div>
  </div>
</template>

<style lang="scss">
.PlanLayout-Main {
  position: relative;

  width: 100%;
  height: calc(100% - 88px);
}

.PlanLayout {
  &-Header {
    z-index: 1;
    position: sticky;
    display: flex;
    padding: 0.5rem 1rem;
    padding-top: calc(1rem + 24px);

    top: 0;

    height: 88px;

    justify-content: space-between;

    background-color: var(--el-bg-color);
  }
  position: relative;

  height: 100%;

  overflow-y: scroll;
  background-color: var(--el-bg-color);
}
</style>
