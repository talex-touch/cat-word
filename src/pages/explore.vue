<script setup lang="ts">
const icons = [{
  name: '综合提升',
  icon: 'i-carbon',
  color: ['#02D9B2', '#01BDB4'],
}, {
  name: '发音',
  icon: 'i-carbon',
  color: ['#B392F2', '#8A69F6'],
}, {
  name: '综合提升',
  icon: 'i-carbon',
  color: ['#20DF9F', '#13D77F'],
}, {
  name: '综合提升',
  icon: 'i-carbon',
  color: ['#FFA9E8', '#FD82D0'],
}, {
  name: '综合提升',
  icon: 'i-carbon',
  color: ['#FEAA06', '#FF7C01'],
}, {
  name: '综合提升',
  icon: 'i-carbon',
  color: ['#FE4794', '#FF4B50'],
}, {
  name: '综合提升',
  icon: 'i-carbon',
  color: ['#0DB2B3', '#0B7B8A'],
}, {
  name: '综合提升',
  icon: 'i-carbon',
  color: ['#FE0000', '#F30102'],
}, {
  name: '综合提升',
  icon: 'i-carbon',
  color: ['#0FDEFE', '#00B4FE'],
}, {
  name: '综合提升',
  icon: 'i-carbon',
  color: ['#FBDC03', '#FEB601'],
}]
</script>

<template>
  <div class="ExplorePage">
    <h1 class="title">
      探索
    </h1>

    <div class="ExplorePage-Icon">
      <div
        v-for="icon in icons" :key="icon.name" class="ExplorePage-IconItem"
        :style="`--c1: ${icon.color[0]}; --c2: ${icon.color[1]}`"
      >
        <div class="ExplorePage-IconItem-Bg">
          <div :class="icon.icon" />
        </div>
        <span>{{ icon.name }}</span>
      </div>
    </div>

    <div my-2 class="ExplorePage-Banner">
      <el-carousel height="150px">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3 class="small justify-center" text="2xl">
            你离地道发音还有多远？
          </h3>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="ExplorePage-Course">
      <h1>更多课程</h1>
      1
    </div>
  </div>
</template>

<style lang="scss">
.ExplorePage-Course {
  h1 {
    margin-bottom: 1rem;

    font-size: 22px;
    font-weight: 600;
    color: var(--el-text-color-regular);
  }
}

.ExplorePage-Icon {
  &Item {
    display: flex;

    gap: 0.5rem;
    align-items: center;
    flex-direction: column;
    &-Bg {
      width: 48px;
      height: 48px;

      border-radius: 50%;
      background-image: linear-gradient(to bottom, var(--c1), var(--c2));
    }

    span {
      font-size: 14px;

      color: var(--el-text-color-regular);
    }
  }
  margin: 1rem 0;
  display: grid;

  width: 100%;

  gap: 0.5rem;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
}

.ExplorePage {
  & > h1 {
    font-size: 24px;
    font-weight: 600;

    color: var(--el-text-color-regular);
  }
  padding: 1rem;
  display: flex;

  flex-direction: column;
}
</style>
