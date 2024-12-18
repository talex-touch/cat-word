<script name="Words" setup lang="ts">
import { ElMessage } from 'element-plus'
import WordCard from '~/components/WordCard.vue'
import type { IWord, IWordItem } from '~/composables/words'
import { calendarData, calendarManager, globalData, targetDict, useWordSound } from '~/composables/words'
import type { PrepareWord } from '~/composables/words/mode'
import type { ComprehensiveMode } from '~/composables/words/mode/comprehensive'

const props = defineProps<{
  prepare: PrepareWord<ComprehensiveMode>
}>()

const emits = defineEmits<{
  (e: 'quit'): void
}>()

const mainCard = ref<InstanceType<typeof WordCard>>()
const moveCard = ref<InstanceType<typeof WordCard>>()

const successAudio = ref<HTMLAudioElement>()
const errorAudio = ref<HTMLAudioElement>()

const router = useRouter()
const prepareData = reactive(props.prepare)

const data = reactive<{
  content: boolean
  current: IWordItem | null
  next: IWordItem | null
}>({
  content: false,
  current: null,
  next: null,
})

async function playAudioSound(success: boolean = false) {
  const el = success ? successAudio.value : errorAudio.value

  if (!el)
    return

  el.currentTime = 0
  await el.play()
}

async function spokenWord(word: IWord) {
  const audio = await useWordSound(word.word)

  audio.play()
}

function refreshData() {
  data.current = prepareData.currentWord
}

async function handlePrevious() {
  const currentDom = mainCard.value!.$el
  const nextDom = moveCard.value!.$el

  data.next = data.current

  const result = await prepareData.previous()
  if (!result) {
    return
  }

  refreshData()

  currentDom.style.transition = 'none'
  currentDom.style.transform = 'translateX(-120%)'

  nextDom.style.transition = 'none'
  nextDom.style.transform = 'translateX(0)'

  await sleep(10)

  nextDom.style.visibility = 'visible'
  nextDom.style.transition = ''
  nextDom.style.transform = 'translateX(0%)'

  await sleep(20)

  nextDom.style.transform = 'translateX(120%)'

  await sleep(200)

  currentDom.style.transition = ''
  currentDom.style.transform = 'translateX(0)'

  spokenWord(prepareData.currentWord!.mainWord)

  await sleep(200)

  currentDom.style.transform = 'translateX(0)'
  nextDom.style.visibility = ''
}

async function next(success: boolean) {
  const moving = data.current !== null

  if (!moving) {
    refreshData()
    spokenWord(prepareData.currentWord!.mainWord)

    return
  }

  const currentDom = mainCard.value!.$el
  const nextDom = moveCard.value!.$el

  data.next = data.current

  const result = await prepareData.next(success)

  if (!result) {
    const _r = await prepareData.finish()

    router.replace({
      query: {
        signed: 'true',
      },
    })

    return
  }

  refreshData()

  currentDom.style.transition = 'none'
  currentDom.style.transform = 'translateX(120%)'

  nextDom.style.transition = 'none'
  nextDom.style.transform = 'translateX(0)'

  await sleep(10)

  nextDom.style.visibility = 'visible'
  nextDom.style.transition = ''
  nextDom.style.transform = 'translateX(0%)'

  await sleep(20)

  nextDom.style.transform = 'translateX(-120%)'

  await sleep(200)

  currentDom.style.transition = ''
  currentDom.style.transform = 'translateX(0)'

  spokenWord(prepareData.currentWord!.mainWord)

  await sleep(200)

  currentDom.style.transform = 'translateX(0)'
  nextDom.style.visibility = ''
}

async function handleChoose(word: IWord) {
  const wrong = word !== data.current!.mainWord

  await playAudioSound(!wrong)

  if (wrong) {
    data.content = true
    useVibrate('heavy')

    whenever(() => data.content = false, () => {
      next(wrong)
    })
  }
  else {
    targetDict.value.storage.setLearned(data.current!.mainWord.word)

    useVibrate('bit')

    next(wrong)
  }
}

function goDictionary() {
  router.push(`/dictionary?dict=${targetDict.value.id}`)
}

onMounted(() => {
  next(true)
})
</script>

<template>
  <div class="WordsPage">
    <div flex items-center justify-between gap-2 text-black class="WordsPage-Header">
      <div flex items-center gap-2 class="WordsPage-Header-Left">
        <div i-carbon:chevron-left @click="emits('quit')" />
        <p class="WordsPage-Header-Title">
          <span>需新学 {{ prepareData.getLeftWords() }}</span>
          <span>需复习 {{ prepareData.getLeftWords() }}</span>
        </p>
      </div>

      <h1 flex items-center gap-2 text-sm op-75 @click="goDictionary">
        <el-link>{{ targetDict.name }}</el-link>
      </h1>
    </div>

    <div v-if="data.current" class="WordCard-Container">
      <WordCard
        ref="mainCard" :right="data.current!.mainWord" class="WordCard WordCard-Main transition-cubic"
        :data="data.current!" @choose="handleChoose" @previous="handlePrevious"
      />
      <WordCard
        ref="moveCard" :right="data.current!.mainWord" class="WordCard WordCard-Next transition-cubic"
        :data="data.next!" @previous="handlePrevious" @choose="handleChoose"
      />
    </div>

    <audio ref="successAudio" src="/sound/success.wav" />
    <audio ref="errorAudio" src="/sound/error.wav" />
  </div>
</template>

<style lang="scss">
.WordCard {
  &.WordCard-Next {
    visibility: hidden;
  }

  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
}

.WordCard-Container {
  position: absolute;
  margin: 1rem;

  top: 50px;
  left: 0;

  width: calc(100% - 2rem);
  height: calc(100% - 2rem);

  overflow: hidden;
}

.WordCard-Next {
  position: absolute;
}

.WordsPage-Decoration {
  .WordsPage-Decoration-EarLeft {
    position: absolute;

    top: 15%;
    left: 0%;

    width: 50vw;
    height: 40vw;

    border-radius: 45%;
    background-color: var(--theme-color);
    // box-shadow: 0 0 0.5rem 2rem var(--theme-color);
  }

  .WordsPage-Decoration-EarRight {
    position: absolute;

    top: 15%;
    right: 0%;

    width: 50vw;
    height: 40vw;

    border-radius: 45%;
    background-color: var(--theme-color);
    // box-shadow: 0 0 0.5rem 2rem var(--theme-color);
  }

  display: none;
  z-index: -1;
  position: absolute;

  top: 50vmin;
  left: 0;

  width: 100%;
  height: 50vw;

  filter: drop-shadow(0 0 4px var(--theme-color));
  // ;
  // box-shadow: 0 0 2rem 8rem var(--theme-color);
}

.WordsPage {
  &-Header {
    &-Title {
      display: flex;
      padding-right: 1rem;

      font-size: 12px;
      flex-direction: column;
      color: var(--el-text-color-secondary);
      border-right: 1px solid var(--el-border-color);
    }
  }

  h1.title {
    font-size: 24px;
    font-weight: 600;
  }

  z-index: 1;
  position: relative;
  padding: 1rem;

  width: 100%;
  height: 100%;

  background-color: var(--el-fill-color);
}
</style>
