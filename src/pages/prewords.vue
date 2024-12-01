<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <div class="PreWordsPage">
    <div class="PreWordsPage-Main">
      <div class="PreWordsPage-Head coffee-font">
        <span class="prewords-headword-item item-1">W</span>
        <span class="prewords-headword-item item-2">O</span>
        <span class="prewords-headword-item item-3">R</span>
        <span class="prewords-headword-item item-4">D</span>
        <span class="prewords-headword-item item-5">S</span>
      </div>

      <p class="head-title">
        准备打卡
      </p>

      <div class="PreWordsPage-Section">
        1
      </div>
    </div>

    <div class="PreWordsPage-Supper">
      <el-button size="large" w-full type="primary" @click="router.push('/words')">
        开始打卡
      </el-button>
    </div>
  </div>
</template>

<style lang="scss">
.PreWordsPage-Supper {
  position: absolute;

  margin: 0 auto;
  left: 7.5%;

  width: 85%;
  bottom: 20vmin;
}

.PreWordsPage-Head {
  .prewords-headword-item {
    &.item-1 {
      z-index: 5;
      transform: translateX(16px) rotateZ(-12deg);
    }
    &.item-2 {
      z-index: 4;
      transform: translateX(8px) rotateZ(12deg);
      background-color: #81b9b9;
    }
    &.item-3 {
      z-index: 3;
      transform: translateX(0px) rotateZ(-4deg);
    }
    &.item-4 {
      z-index: 2;
      transform: translateX(-8px) rotateZ(4deg);
      background-color: #f83d09;
    }
    &.item-5 {
      z-index: 1;
      transform: translateX(-16px) rotateZ(8deg);
    }
    position: relative;
    display: flex;

    width: 48px;
    height: 48px;

    align-items: center;
    justify-content: center;

    border-radius: 18px;
    background-color: var(--el-fill-color);
  }
  display: flex;
  padding: 2.5rem;

  justify-content: center;
}

.PreWordsPage-Main {
  .head-title {
    position: relative;
    margin: 0 auto;

    font-size: 20px;
    font-weight: 600;
  }

  width: 100%;

  text-align: center;
}

.PreWordsPage {
  &::before {
    z-index: -1;
    content: '';
    position: absolute;

    left: -50vmin;

    width: 200vmin;
    height: 120vmin;

    border-radius: 0 0 1000px 1000px;
    background-color: var(--theme-color);
  }
  position: relative;

  width: 100%;
  height: 100%;
}
</style>
