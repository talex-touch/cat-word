<script setup lang="ts">
import { globalData, targetDict } from '~/composables/words'
import Cat from '/svg/cat.svg'

const router = useRouter()

const data = computed<any>(() => targetDict.value)

const storage = computed(() => data.value.storage)
const learnedAmo = computed(() => storage.value.getLearnedWords().length)
const totalAmo = computed(() => data.value.words.length)

const progress = computed(() => learnedAmo.value / totalAmo.value)
</script>

<template>
  <div class="WordSignInfo-Wrapper transition-cubic">
    <div class="WordSignInfo transition-cubic">
      <div class="WordSignInfo-Svg">
        <img :src="Cat">
      </div>

      <div class="WordSignInfo-Dictionary" @click="router.push(`/dictionary?dict=${targetDict.id}`)">
        <DictionaryDisplay :dict="data" />
      </div>

      <div class="WordSignInfo-Content">
        <p class="WordSignInfo-Content-Title coffee-font">
          单词练习
        </p>
        <p class="WordSignInfo-Content-Desc">
          {{ learnedAmo }} /{{ totalAmo }} 已学习
        </p>
        <div :style="`--p: ${progress * 100}%`" class="WordSignInfo-Content-Progress">
          <div class="WordSignInfo-Content-Progress-Bg" />
          <div class="WordSignInfo-Content-Progress-Inner" />
        </div>
      </div>
    </div>

    <div class="WordSignInfo-Detail">
      <p w-full flex items-center justify-between>
        <span font-bold class="title">今日计划</span>
        <span text-sm op-75>随时随地，单词好记</span>
      </p>

      <div mt-2 flex items-center justify-between class="WordSignInfo-DetailBlockWrapper">
        <div class="WordSignInfo-DetailBlock coffee-font">
          <p text-sm font-bold>
            需新学
          </p>

          <p text-2xl>
            {{ globalData.amount }} 词
          </p>
        </div>
        <div class="WordSignInfo-DetailBlock coffee-font">
          <p text-sm font-bold>
            需复习
          </p>

          <p text-2xl>
            {{ globalData.amount }} 词
          </p>
        </div>
      </div>

      <el-button w-full size="large" type="primary" @click="router.push('/prewards')">
        开始背单词吧！
      </el-button>
    </div>
  </div>
</template>

<style lang="scss">
.WordSignInfo-Detail {
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
  padding: 0.5rem 1rem;

  width: 100%;
  height: 150px;

  border-top: 1px solid var(--theme-color-dark);
  // border-radius: 5px;
  background-image: linear-gradient(to right, var(--theme-color), var(--theme-color-dark));
}

.WordSignInfo-Wrapper {
  position: relative;
  display: flex;

  left: 5%;

  width: 90%;
  height: 270px;

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

    border-radius: 16px;
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
    font-size: 1.25em;
  }

  .WordSignInfo-Content-Desc {
    margin-bottom: 1em;

    color: #eee;
    opacity: 0.75;
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

    opacity: 0.5;
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
