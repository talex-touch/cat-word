<script setup lang="ts">
const banners = reactive([
  {
    title: '懂你英语课程',
    desc: '立即学懂英语，马上巩固基础',
    image: '',
    path: '',
  },
  {
    title: '懂你英语课程',
    desc: '立即学懂英语，马上巩固基础',
    image: '',
    path: '',
  },
  {
    title: '懂你英语课程',
    desc: '立即学懂英语，马上巩固基础',
    image: '',
    path: '',
  },
])
</script>

<template>
  <div class="WordIndexBanner">
    <div v-for="(banner, ind) in banners" :key="ind" class="WordIndexBanner-Item">
      <div flex flex-col gap-1 class="WordIndexBanner-Item-Main">
        <span font-bold>{{ banner.title }}</span>
        <span text-sm op-75>{{ banner.desc }}</span>
      </div>
      <img :src="banner.image">
    </div>
  </div>
</template>

<style lang="scss">
.WordIndexBanner-Item {
  &:active {
    background-color: var(--el-fill-color);
  }
  position: relative;
  display: flex;
  padding: 1rem;

  width: 100%;
  height: 80px;

  align-items: center;
  justify-content: space-between;

  border-radius: 16px;
  background-color: var(--el-bg-color-page);
}

.WordIndexBanner {
  position: relative;
  margin: 0 5%;
  display: flex;

  gap: 0.5rem;
  flex-direction: column;
}
</style>
