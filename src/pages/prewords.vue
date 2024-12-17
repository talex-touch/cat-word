<script setup lang="ts">
import NumberFlow from '@number-flow/vue'
import { routerKey } from 'vue-router'
import DictSelector from '~/components/words/DictSelector.vue'
import ModeSelector from '~/components/words/ModeSelector.vue'
import PlanSelector from '~/components/words/PlanSelector.vue'
import type { PrepareWord } from '~/composables/words'
import { globalData, targetDict, targetMode, targetSignMode } from '~/composables/words'
import words from '~/pages/words/index.vue'

const emits = defineEmits(['exit'])

const loadingOptions = reactive<{
  loading: boolean
  progress: number
  start: boolean
  component: Component | null
  prepare: PrepareWord<any> | null
}>({
  loading: false,
  progress: -1,
  start: false,
  component: null,
  prepare: null,
})

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
  return Math.max(Math.ceil(amo / 7), 1)
}

async function handleStart() {
  loadingOptions.loading = true
  loadingOptions.progress = -1

  const signMode = targetSignMode.value

  const prepared = signMode.prepareWords()

  loadingOptions.prepare = prepared

  await sleep(1200)

  loadingOptions.progress = 0

  await sleep(500)

  const done = await prepared.preload((p: number) => {
    loadingOptions.progress = Math.min(p * 100, 100)
  })

  if (!done) {
    loadingOptions.progress = -1
    loadingOptions.loading = false

    return
  }

  loadingOptions.component = prepared.getTargetComponent()

  await sleep(500)

  // start
  loadingOptions.start = true

  await sleep(500)

  loadingOptions.loading = false
  loadingOptions.progress = -1
}

useRouter().beforeEach((_to, _from, next) => {
  if (loadingOptions.start) {
    next(false)

    loadingOptions.loading = false
    loadingOptions.start = false
    return
  }

  next(true)
})
</script>

<template>
  <div :class="{ wordVisible: loadingOptions.start, loading: loadingOptions.loading }" class="PreWordsPage">
    <div class="PreWordsPage-Main">
      <div class="PreWordsPage-Head coffee-font">
        <span class="prewords-headword-item item-1">W</span>
        <span class="prewords-headword-item item-2">O</span>
        <span class="prewords-headword-item item-3">R</span>
        <span class="prewords-headword-item item-4">D</span>
        <span class="prewords-headword-item item-5">S</span>
      </div>

      <p text-black class="transition-cubic head-title">
        准备打卡
      </p>
      <p text-black class="transition-cubic head-title next">
        请稍等
      </p>

      <div mt-8 class="PreWordsPage-Section transition-cubic">
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
    <div class="PreWordsPage-Supper transition-cubic">
      <div my-2 flex items-center justify-center gap-2 op-75>
        <div i-carbon-time />预计用时 {{ calculateTime(globalData.amount) }} 分钟
      </div>
      <el-button size="large" w-full type="primary" @click="handleStart">
        开始打卡
      </el-button>

      <p mt-4 text-center @click="emits('exit')">
        <el-text active:op-50>
          退出
        </el-text>
      </p>
    </div>

    <div class="PreWordsPage-Progress transition-cubic">
      <p mb-1 flex items-center justify-between>
        <span>正在为您定制学习计划</span>
        <span v-if="loadingOptions.progress !== -1">
          <NumberFlow
            suffix="%" :continuous="true" :will-change="true" :animated="true"
            :value="loadingOptions.progress"
          />

        </span>
      </p>

      <LineLoading :progress="loadingOptions.progress" />
    </div>

    <teleport to="body">
      <div :class="{ wordVisible: loadingOptions.start }" class="PreWordsPage-Word transition-cubic">
        <component :is="loadingOptions.component" v-if="loadingOptions.component" :prepare="loadingOptions.prepare" @quit="loadingOptions.start = false" />
      </div>
    </teleport>

    <TouchDialog v-model="dialogOptions.visible">
      <template #Main>
        <component :is="dialogOptions.component" v-if="dialogOptions.component" />
      </template>
    </TouchDialog>
  </div>
</template>

<style lang="scss">
.PreWordsPage-Word {
  &.wordVisible {
    opacity: 1;
    pointer-events: auto;

    border-radius: 0;
    transform: translateX(0);
  }
  z-index: 10;
  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  opacity: 0;
  overflow: hidden;
  border-radius: 25px;
  pointer-events: none;
  transform: translateX(100%);
  box-shadow: var(--el-box-shadow);
  background-color: var(--el-bg-color);
}

.PreWordsPage-Section {
  .loading & {
    opacity: 0;
    pointer-events: none;
    transform: translateY(-10%);
  }

  padding: 0 7.5%;
}

.PreWordsPage-Progress {
  .loading & {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }

  z-index: 1;
  position: absolute;

  margin: 0 auto;
  left: 7.5%;

  width: 85%;
  bottom: 15vmin;

  opacity: 0;
  pointer-events: none;
  color: var(--el-text-color-secondary);
}

.PreWordsPage-Supper {
  .loading & {
    opacity: 0;
    pointer-events: none;
    transform: translateY(10%);
  }

  position: absolute;

  margin: 0 auto;
  left: 7.5%;

  width: 85%;
  bottom: 15vmin;
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
    &.next {
      .loading & {
        opacity: 1;
        filter: blur(0);

        transform: translateY(-100%);
      }

      opacity: 0;
      filter: blur(2px);

      transform: translateY(0);
    }

    position: relative;
    margin: 0 auto;

    font-size: 20px;
    font-weight: 600;

    opacity: 1;
    filter: blur(0);

    .loading & {
      opacity: 0;
      filter: blur(2px);

      pointer-events: none;
      transform: translateY(-100%);
    }
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

    transition: 0.5s;
    border-radius: 0 0 1000px 1000px;
    background-color: var(--theme-color);
  }

  &.loading::before {
    transform: scale(0.95) translateY(-50vmin);
  }
  &.wordVisible {
    transform: scale(0.95);
  }

  z-index: 1;
  position: absolute;

  width: 100%;
  height: 100%;

  overflow: hidden;
}
</style>
