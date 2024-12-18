<script name="Words" setup lang="ts">
import { Swipe, SwipeItem } from 'vant'
import type { IWord, IWordItem, useWordSound } from '~/composables/words'

import PlayIcon from './icon/PlayIcon.vue'

const props = defineProps<{
  data: IWordItem
  right: IWord
}>()

const emits = defineEmits<{
  (e: 'choose', word: IWord): void
  (e: 'previous'): void
}>()
const options = reactive({
  content: false,
  display: false,
  wrongAmo: 0,
})

watch(() => props.data?.mainWord, () => {
  options.wrongAmo = 0
  options.display = false
})

const finalOptions = computed(() => {
  if (!props.data?.mainWord)
    return null

  const res = [props.data.mainWord, ...props.data.options]

  // shuffle
  for (let i = res.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
      ;[res[i], res[j]] = [res[j], res[i]]
  }

  return res
})

async function handleChooseWord(word: IWord) {
  const right = props.right.word === word.word

  if (right) {
    options.display = true

    emits('choose', word)

    await sleep(800)

    options.display = false
  }
  else {
    if (options.wrongAmo >= 1) {
      options.content = true
    }

    options.wrongAmo++
  }
}
</script>

<template>
  <div :class="{ imagable: !!options.wrongAmo }" class="WordCard">
    <div v-if="data" class="WordsCard">
      <div class="WordsCard-Image transition-cubic">
        <Swipe lazy-render h-full :autoplay="3000" indicator-color="red">
          <SwipeItem v-for="item in data.mainWord.img" :key="item">
            <el-image fit="fill" loading="lazy" :src="item" />
            <el-image fit="fill" loading="lazy" :src="item" />
          </SwipeItem>
        </Swipe>
      </div>

      <p class="word transition-cubic">
        <span class="word-inner">{{ data.mainWord.word }}<span class="word-type">{{ formateType(data.mainWord.type, 1)
        }}.</span></span>
        <span class="phonetic" flex items-center gap-2>{{ data.mainWord.phonetic }}
        </span>
      </p>
    </div>

    <ul v-if="finalOptions" class="WordsOptions">
      <!-- {{ formateType(word.type, 1) }}.  -->
      <li
        v-for="word in finalOptions" :key="word.word" :class="{ right: options.display && word === right }"
        class="WordOption transition-cubic" @click="handleChooseWord(word)"
      >
        <p>{{ word.translation }}</p>
      </li>
    </ul>

    <div class="WordCard-Footer">
      <div mr-auto flex items-center gap-1 class="WordCard-Footer-Button" @click="emits('previous')">
        <div i-carbon-arrow-left />
        上一个
      </div>

      <div v-if="data?.mainWord" flex items-center gap-1 class="WordCard-Footer-Button">
        <WordPlayIcon :word="data.mainWord?.word" />
      </div>

      <div ml-auto flex items-center gap-1 class="WordCard-Footer-Button">
        <div i-carbon-star />
        收藏
      </div>
    </div>

    <teleport to="body">
      <div v-if="data.mainWord" :class="{ visible: options.content }" class="WordContent transition-cubic">
        <WordDetailContent :word="data.mainWord" @close="options.content = false" />
      </div>
    </teleport>
  </div>
</template>

<style lang="scss">
.WordContent {
  &.visible {
    transform: translateY(0);
  }

  z-index: 10;
  position: absolute;
  // padding: 1rem;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  min-height: 100%;

  overflow: scroll;
  transform: translateY(-120%);
  background-color: var(--el-bg-color);
}

.WordCard-Footer {
  &-Button {
    &:active {
      color: var(--el-text-color-regular);
      background-color: var(--el-fill-color-darker);
    }
    padding: 0.35rem 0.5rem;

    width: max-content;

    font-size: 14px;
    border-radius: 12px;
    color: var(--el-text-color-secondary);
    background-color: var(--el-fill-color-lighter);
  }
  position: sticky;
  padding: 0 0.5rem;
  margin: 1rem 0;
  display: grid;

  top: calc(100% - 94px);

  bottom: 1rem;

  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
}

.WordsOptions {
  .WordOption {
    &:active {
      background-color: var(--el-fill-color);
      border: 1px solid var(--el-color-primary);
    }

    p {
      position: relative;

      text-overflow: ellipsis;
      overflow: hidden;
      white-space: wrap;

      width: 100%;
      max-height: 90%;
    }

    display: flex;
    padding: 1rem 1rem;

    align-items: center;
    justify-content: flex-start;

    height: 85px;

    font-size: 16px;
    overflow: hidden;
    user-select: none;
    border-radius: 12px;
    color: var(--el-text-color-secondary);
    background-color: var(--el-bg-color);
    border: 1px solid #0000;

    &.right {
      box-shadow: 0 0 0px 2px var(--el-color-success-light-7);
      background-color: var(--el-color-success-light-9);
    }
  }

  display: grid;
  padding: 0 0.25rem;
  margin: 0 auto;

  width: 100%;

  gap: 1rem;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
}

.WordsCard {
  .word {
    .word-type {
      margin: 0 0.25rem;
      padding: 0.25rem 0.5rem;

      font-size: 16px;
      border-radius: 8px;
      color: var(--el-text-color-secondary);
      background-color: var(--el-fill-color-lighter);
    }

    .phonetic {
      color: var(--el-text-color-secondary);

      font-size: 18px;
      font-weight: normal;
    }
    display: flex;

    font-size: 22px;
    font-weight: 600;

    align-items: center;
    flex-direction: column;

    transform: translateY(-20vh);

    .imagable & {
      transform: translateY(0);
    }
  }

  .el-image {
    position: absolute;

    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    border-radius: 12px;
    // transform: scale(0.97);
    &:first-child {
      z-index: 0;

      // opacity: 0.5;
      filter: blur(5px);
      transform: scale(1);
    }
  }

  .WordsCard-Image {
    .imagable & {
      opacity: 1;
    }
    position: relative;
    padding: 0.5rem;

    width: 100%;
    height: 40vh;
    max-height: 50vh;

    opacity: 0;
    border-radius: 16px;

    .el-carousel {
      position: relative;

      height: 100%;

      overflow: hidden;
      border-radius: 16px;
    }
  }

  position: relative;
  display: flex;
  padding: 0 0.25rem;
  margin: 1rem auto;

  width: 100%;
  height: 45vh;

  gap: 1rem;
  align-items: center;
  flex-direction: column;

  border-radius: 18px;
  // background-color: var(--el-bg-color-page);
}

.WordsPage {
  padding: 1rem;
}
</style>
