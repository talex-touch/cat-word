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

:root {
  --theme-color: #dfe214;
  --theme-color-light: #ebee2e;
  --bg-color: var(--el-bg-color);
  --bg-color-dark: var(--el-bg-color-dark);
}
</style>
