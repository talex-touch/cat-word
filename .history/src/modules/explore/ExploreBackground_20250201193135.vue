<script setup lang="ts">
// 背景组件，不需要任何数据
</script>

<template>
  <div class="ExploreBackground">
    <div class="background-decoration">
      <div class="blue-gradient" />
      <div class="decoration-shape" />
    </div>
  </div>
</template>

<style scoped>
.ExploreBackground {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 200px;
  overflow: hidden;
  z-index: -1;
}

.background-decoration {
  position: relative;
  width: 100%;
  height: 100%;
}

.blue-gradient {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  background: linear-gradient(180deg, rgba(232, 240, 255, 0) 0%, rgba(232, 240, 255, 0.8) 100%);
}

.decoration-shape {
  position: absolute;
  right: -20px;
  bottom: -20px;
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #1a73e8 0%, #4285f4 100%);
  border-radius: 24px;
  transform: rotate(-15deg);
  opacity: 0.1;
}

.decoration-shape::before {
  content: '';
  position: absolute;
  left: -40px;
  top: -40px;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #1a73e8 0%, #4285f4 100%);
  border-radius: 16px;
  transform: rotate(30deg);
}
</style>
