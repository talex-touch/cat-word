<script setup lang="ts">
const click = ref(false)

async function handleClick() {
  click.value = true

  await sleep(3000)

  click.value = false
}
</script>

<template>
  <span :class="{ click }" class="PlayIcon" @click="handleClick">
    <i i-carbon:volume-up block />
  </span>
</template>

<style lang="scss">
.PlayIcon {
  &.click {
    opacity: 1;

    color: var(--theme-color);
  }

  opacity: 0.75;
  cursor: pointer;
  font-size: 0.95em;
}
</style>
