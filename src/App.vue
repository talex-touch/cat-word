<script setup lang="ts">
onMounted(() => {
  document.body.classList.add('mobile')
})
</script>

<template>
  <div class="Application">
    <div class="Application-Main">
      <RouterView />
    </div>

    <TheFooter />
  </div>
</template>

<style>
.transition-cubic {
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.Application {
  position: absolute;
  display: flex;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  max-height: 100vh;

  color: var(--el-text-color-primary);
  flex-direction: column;

  overflow: hidden;
}

.Application-Main {
  position: relative;

  flex: 1;
  height: 100%;
}

.fake-background::after {
  z-index: -1;
  content: '';
  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  opacity: var(--fake-opacity, 0.25);
  border-radius: inherit;
  background-color: var(--fake-color, var(--el-bg-color-page));
}

:root {
  --theme-color: #f7c62c;
  --theme-color-light: #d3ac2aff;
  --theme-color-dark: #bb920aff;
  --bg-color: var(--el-bg-color);
  --bg-color-dark: var(--el-bg-color-dark);
}

.coffee-font {
  font-family: 'Milky Coffee';
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'Milky Coffee';
  src:
    url('/font/MilkyCoffee.woff2') format('woff2'),
    url('font/MilkyCoffee.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@media (min-width: 768px) {
  *.only-pe-display {
    display: none !important;
  }
}

@media (max-width: 768px) {
  *.only-pc-display {
    display: none !important;
  }
}

html,
body {
  position: absolute;

  width: 100%;
  height: 100%;

  overflow: hidden;
}
</style>
