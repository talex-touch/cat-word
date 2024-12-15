<script setup lang="ts">
import DictSelector from '~/components/words/DictSelector.vue'
import ModeSelector from '~/components/words/ModeSelector.vue'
import PlanSelector from '~/components/words/PlanSelector.vue'

import { calendarManager, globalData, targetDict } from '~/composables/words'
import Cat from '/svg/cat.svg'
import Checked from '/svg/complete.svg'

const emits = defineEmits(['sign'])

const router = useRouter()

const data = computed<any>(() => targetDict.value)

const storage = computed(() => data.value.storage)
const learnedAmo = computed(() => storage.value.getLearnedWords().length)
const totalAmo = computed(() => data.value.words.length)

const progress = computed(() => learnedAmo.value / totalAmo.value)
const todayData = computed(() => calendarManager.getTodayData())

function calculateTime(amo: number) {
  return Math.max(Math.ceil(amo / 7), 1)
}

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
</script>

<template>
  <div :class="{ signed: todayData?.signed }" text-black class="WordSignInfo-Wrapper transition-cubic">
    <div class="WordSignInfo transition-cubic">
      <div class="WordSignInfo-Svg">
        <img :src="Cat">
      </div>

      <div class="WordSignInfo-Dictionary" @click="router.push(`/dictionary?dict=${targetDict.id}`)">
        <DictionaryDisplay :dict="data" />
      </div>

      <div class="WordSignInfo-Content">
        <p w-full flex justify-between class="WordSignInfo-Content-Title">
          <span>{{ data.name }}</span>
          <span mr-4 flex items-center text-sm font-normal op-75 active:op-100 @click="selectDict">
            调整词书
            <i i-carbon-chevron-right block />
          </span>
        </p>
        <p w-full flex items-center justify-between class="WordSignInfo-Content-Desc">
          <span>{{ learnedAmo }} /{{ totalAmo }} 已学习</span>
          <span mr-4 text-sm op-75>剩余 {{ Math.ceil((totalAmo - learnedAmo) / globalData.amount) }} 天</span>
        </p>
        <div :style="`--p: ${progress * 100}%`" class="WordSignInfo-Content-Progress">
          <div class="WordSignInfo-Content-Progress-Bg" />
          <div class="WordSignInfo-Content-Progress-Inner transition-cubic" />
        </div>
      </div>
    </div>

    <div class="WordSignInfo-Detail">
      <p w-full flex items-center justify-between>
        <span font-bold class="title">今日计划</span>
        <!-- <span text-sm>随时随地，单词好记</span> -->
        <span flex items-center text-sm font-normal op-75 active:op-100 @click="selectPlan">
          调整计划
          <i i-carbon-chevron-right block />
        </span>
      </p>

      <div my-4 flex items-center justify-between class="WordSignInfo-DetailBlockWrapper">
        <template v-if="todayData?.signed">
          <div class="WordSignInfo-DetailBlock coffee-font">
            <p text-sm font-bold op-75>
              已学习
            </p>

            <p>
              <span mr-3 text-3xl font-bold>
                {{ todayData.data?.words.length }}
              </span> 词
            </p>
          </div>
        </template>
        <template v-else>
          <div class="WordSignInfo-DetailBlock">
            <p text-sm op-75>
              需新学
            </p>

            <p>
              <span mr-3 text-3xl font-bold>
                {{ globalData.amount }}
              </span> 词
            </p>
          </div>
          <div class="WordSignInfo-DetailBlock">
            <p text-sm op-75>
              需复习
            </p>

            <p>
              <span mr-3 text-3xl font-bold>
                {{ globalData.amount }}
              </span>词
            </p>
          </div>
        </template>
      </div>

      <template v-if="!todayData?.signed">
        <el-button w-full size="large" type="primary" @click="emits('sign')">
          <span>开始背单词吧！</span>
        </el-button>

        <div my-2 flex items-center justify-center gap-1 text-sm op-75>
          <div i-carbon-time />预计用时 {{ calculateTime(globalData.amount) }} 分钟
        </div>
      </template>

      <template v-else>
        <el-button w="30%" size="large" type="primary" @click="router.push('/words/signed')">
          <span>打卡</span>
        </el-button>

        <div class="WordSignInfo-Checked">
          <img :src="Checked">
        </div>
      </template>
    </div>

    <TouchDialog v-model="dialogOptions.visible">
      <template #Main>
        <component :is="dialogOptions.component" v-if="dialogOptions.component" />
      </template>
    </TouchDialog>
  </div>
</template>

<style lang="scss">
.WordSignInfo-Checked {
  z-index: -1;
  position: absolute;

  bottom: 0;
  width: 40%;

  right: 5%;
  transform: translate(0, 10%);
  // background-image: linear-gradient(to right, var(--theme-color), var(--theme-color-dark));
}

.WordSignInfo-Detail {
  &::before {
    z-index: -1;
    content: '';
    position: absolute;

    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    opacity: 0.125;
    --color: var(--theme-color);
    // background-color: #191a1a;
    background-image: linear-gradient(
        0deg,
        transparent 24%,
        var(--theme-color) 25%,
        var(--theme-color-dark) 26%,
        transparent 27%,
        transparent 74%,
        var(--theme-color) 75%,
        var(--theme-color-dark) 76%,
        transparent 77%,
        transparent
      ),
      linear-gradient(
        90deg,
        transparent 24%,
        var(--color) 25%,
        var(--color) 26%,
        transparent 27%,
        transparent 74%,
        var(--color) 75%,
        var(--color) 76%,
        transparent 77%,
        transparent
      );
    pointer-events: none;
    background-size: 55px 55px;
  }
  z-index: 1;
  position: relative;
  padding: 0.5rem 1rem;

  width: 100%;
  height: 185px;

  border-top: 1px solid var(--theme-color-dark);
  // border-radius: 5px;
  background-image: linear-gradient(to right, var(--theme-color), var(--theme-color-dark));
}

.WordSignInfo-Wrapper {
  position: relative;
  display: flex;

  left: 5%;

  width: 90%;
  height: 325px;

  flex-direction: column;
  justify-content: center;

  overflow: hidden;
  border-radius: 25px;

  filter: drop-shadow(0 0 4px var(--theme-color));
  background-image: linear-gradient(to right, var(--theme-color), var(--theme-color-dark));

  &:active {
    filter: drop-shadow(2px 2px 8px var(--theme-color));
  }
}

@keyframes growth {
  from {
    width: 0;
  }

  to {
    width: var(--p);
  }
}

.WordSignInfo-Content-Progress {
  .WordSignInfo-Content-Progress-Bg {
    position: absolute;

    width: 100%;
    height: 100%;

    opacity: 0.25;
    border-radius: 16px;
    background-color: #fff;
  }

  .WordSignInfo-Content-Progress-Inner {
    position: absolute;

    width: var(--p);
    height: 100%;

    animation: growth 0.5s;
    border-radius: 16px 8px 8px 16px;
    background-color: #fff;
    box-shadow: 0 0 4px 1px #eee;
    filter: drop-shadow(2px 2px 8px #fff);
  }
  position: relative;

  width: 90%;
  height: 8px;

  // overflow: hidden;
}

.WordSignInfo-Content {
  .WordSignInfo-Content-Title {
    color: #fff;
    font-weight: 600;
    // font-size: 1.25em;
  }

  .WordSignInfo-Content-Desc {
    margin-bottom: 0.5em;

    color: #eee;
  }
  position: relative;
  padding: 1.25rem 0;
  display: flex;

  margin-left: 10%;

  flex: 1;
  flex-direction: column;
  justify-content: space-between;
}

.WordSignInfo-Svg {
  z-index: 1;
  position: absolute;
  display: flex;

  width: 30%;

  left: -0.5rem;
  bottom: 0;

  align-items: flex-end;

  transform: scaleX(-1);
}

.signed .WordSignInfo-Svg {
  left: unset;
  right: -0.5rem;

  transform: scale(1);
}

.WordSignInfo-Dictionary {
  position: relative;

  top: 10%;
  left: 5%;

  width: 80px;
  height: 80%;
}

.WordSignInfo {
  &::before {
    content: '';
    position: absolute;

    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    opacity: 0.25;
    --color: var(--theme-color);
    // background-color: #191a1a;
    background-image: linear-gradient(
        0deg,
        transparent 24%,
        var(--theme-color) 25%,
        var(--theme-color-dark) 26%,
        transparent 27%,
        transparent 74%,
        var(--theme-color) 75%,
        var(--theme-color-dark) 76%,
        transparent 77%,
        transparent
      ),
      linear-gradient(
        90deg,
        transparent 24%,
        var(--color) 25%,
        var(--color) 26%,
        transparent 27%,
        transparent 74%,
        var(--color) 75%,
        var(--color) 76%,
        transparent 77%,
        transparent
      );
    background-size: 55px 55px;
  }
  position: relative;
  display: flex;

  width: 100%;
  height: 120px;

  // border-radius: 5px;
}
</style>
