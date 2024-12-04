<script name="Words" setup lang="ts">
import type { IWord } from '~/composables/words'
import PlayIcon from './icon/PlayIcon.vue'

const props = defineProps<{
  data: {
    mainWord: IWord
    options: IWord[]
  }
  right: IWord
}>()

const emits = defineEmits<{
  (e: 'choose', word: IWord): void
}>()
const display = ref(false)
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
  display.value = true

  await sleep(800)

  emits('choose', word)

  display.value = false
}

const spokenText = ref('')
const {
  isSupported: spokenSupoorted,
  isPlaying,
  // status,
  // voiceInfo,
  // utterance,
  stop: spokenStop,
  speak,
} = useSpeechSynthesis(spokenText)

async function spokenWord(word: IWord) {
  if (!spokenSupoorted.value)
    return

  if (isPlaying.value)
    spokenStop()

  spokenText.value = word.word

  speak()
}
</script>

<template>
  <div class="WordCard">
    <div v-if="data" class="WordsCard">
      <div class="WordsCard-Image">
        <!-- indicator-position="outside" -->
        <el-carousel>
          <el-carousel-item v-for="item in data.mainWord.img" :key="item">
            <el-image :src="item" />
            <el-image :src="item" />
          </el-carousel-item>
        </el-carousel>
      </div>

      <p class="word">
        <span class="word-inner">{{ data.mainWord.word }}<span class="word-type">{{ formateType(data.mainWord.type, 1)
        }}.</span></span>
        <span class="phonetic" flex items-center gap-2>{{ data.mainWord.phonetic }} <PlayIcon @click="spokenWord(data.mainWord)" /></span>
      </p>
    </div>

    <ul v-if="finalOptions" class="WordsOptions">
      <!-- {{ formateType(word.type, 1) }}.  -->
      <li
        v-for="word in finalOptions" :key="word.word" :class="{ right: display && word === right }"
        class="WordOption transition-cubic" @click="handleChooseWord(word)"
      >
        <p>{{ word.translation }}</p>
      </li>
    </ul>

    <div class="WordCard-Footer">
      <div class="WordCard-Footer-Button">
        <div i-carbon-arrow-left>
          跳过
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.WordsOptions {
  .WordOption {
    &:active {
      background-color: var(--el-bg-color);
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

    height: 80px;

    font-size: 16px;
    overflow: hidden;
    border-radius: 12px;
    color: var(--el-text-color-secondary);
    background-color: var(--el-bg-color-page);

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
      background-color: var(--el-fill-color);
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
  }

  .el-image {
    position: absolute;

    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    // border-radius: 12px;
    &:first-child {
      z-index: 0;

      filter: blur(5px);
    }
  }

  .WordsCard-Image {
    position: relative;
    padding: 0.5rem;

    width: 100%;
    height: 300px;
    max-height: 40vh;

    overflow: hidden;
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
  height: 50vh;

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
