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
  --theme-color-light: #ebc23cff;
  --bg-color: var(--el-bg-color);
  --bg-color-dark: var(--el-bg-color-dark);
}

@font-face {
  font-family: 'MikyCoffee';
  src: url('/font/MikyCoffee.otf') format('opentype');
}

.coffee-font {
  font-family: 'MikyCoffee', sans-serif;
}
</style>
