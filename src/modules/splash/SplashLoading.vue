<script setup lang="ts">
const loading = ref(true)

  ; (async () => {
  await sleep(3000)

  loading.value = false
})()
</script>

<template>
  <div :class="{ loading }" class="SplashLoading">
    <div class="SplashLoading-Page transition-cubic">
      <div class="SplashLoading-Logo">
        <img :src="APP_LOGO" alt="Logo" class="logo">
        <img :src="APP_LOGO" alt="Logo" class="logo-bg">
      </div>
      <div class="progress-container">
        <progress-bar :progress="0" />
      </div>
      <div class="powered-by">
        Powered by QuotaWish.
      </div>
    </div>
    <div class="transition-cubic SplashLoading-Content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.SplashLoading {
  &-Page {
    position: absolute;

    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    opacity: 0;
    pointer-events: none;
    transform: scale(0.9);
  }

  &-Content {
    opacity: 1;
    pointer-events: all;
    transform: scale(1);

    height: 100%;
  }

  position: relative;

  height: 100%;

  background-color: var(--el-bg-color);
}

.loading.SplashLoading {
  .SplashLoading-Page {
    opacity: 1;
    pointer-events: all;
    transform: scale(1);
  }

  .SplashLoading-Content {
    opacity: 0;
    pointer-events: none;
    transform: scale(1.05);
  }
}

@keyframes enterView {
  from {
    opacity: 0;
    transform: translateY(5%) scale(0.85);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.SplashLoading-Logo {
  img {
    position: absolute;

    width: 150px;
    height: 150px;
  }

  .logo-bg {
    z-index: -1;
    filter: blur(15px);
  }

  z-index: 1;
  position: relative;

  width: 150px;
  height: 150px;

  animation: enterView 0.5s ease-in-out;
}

.progress-container {
  margin-bottom: 20px;
  /* 根据需要调整间距 */
}

.powered-by {
  position: absolute;

  bottom: 1rem;

  opacity: 0.6;
  font-size: 14px;
  color: var(--el-text-color-placeholder);
}
</style>
