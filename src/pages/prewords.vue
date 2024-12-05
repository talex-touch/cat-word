<script setup lang="ts">
import DictSelector from '~/components/words/DictSelector.vue'
import ModeSelector from '~/components/words/ModeSelector.vue'
import PlanSelector from '~/components/words/PlanSelector.vue'
import { globalData, targetDict, targetMode } from '~/composables/words'

const router = useRouter()

const dialogOptions = reactive<any>({
  visible: false,
  component: null,
})

function selectDict() {
  Object.assign(dialogOptions, {
    visible: true,
    component: DictSelector,
  })
}

function selectPlan() {
  Object.assign(dialogOptions, {
    visible: true,
    component: PlanSelector,
  })
}

function selectMode() {
  Object.assign(dialogOptions, {
    visible: true,
    component: ModeSelector,
  })
}

function calculateTime(amo: number) {
  return Math.max(Math.ceil(amo / 20), 1)
}
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

      <p text-black class="head-title">
        准备打卡
      </p>

      <div mt-8 class="PreWordsPage-Section">
        <LineArrow @click="selectDict">
          <template #icon>
            <div i-carbon:book />
          </template>
          <template #end>
            {{ targetDict.name }}
          </template>
          选择词书
        </LineArrow>

        <LineArrow @click="selectPlan">
          <template #icon>
            <div i-carbon:plan />
          </template>
          <template #end>
            {{ globalData.amount }}个/组
          </template>
          制定计划
        </LineArrow>

        <LineArrow @click="selectMode">
          <template #icon>
            <div i-carbon:apps />
          </template>
          <template #end>
            {{ targetMode.name }}
          </template>
          实操模式
        </LineArrow>
      </div>
    </div>
    <div class="PreWordsPage-Supper">
      <div my-2 flex items-center justify-center gap-2 op-75>
        <div i-carbon-time />预计用时 {{ calculateTime(globalData.amount) }} 分钟
      </div>
      <el-button size="large" w-full type="primary" @click="router.push('/words')">
        开始打卡
      </el-button>
    </div>

    <TouchDialog v-model="dialogOptions.visible">
      <template #Main>
        <component :is="dialogOptions.component" v-if="dialogOptions.component" />
      </template>
    </TouchDialog>
  </div>
</template>

<style lang="scss">
.PreWordsPage-Section {
  padding: 0 7.5%;
}

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
  z-index: 1;
  position: absolute;

  width: 100%;
  height: 100%;

  overflow: hidden;
}
</style>
