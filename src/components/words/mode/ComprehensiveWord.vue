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
    const r = await prepareData.finish()

    if (r)
      router.push('/words/signed')

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
    <div class="WordsPage-Decoration">
      <div class="WordsPage-Decoration-EarLeft" />
      <div class="WordsPage-Decoration-EarRight" />
    </div>

    <div flex items-center justify-between gap-2 text-black class="WordsPage-Header">
      <div flex items-center gap-2 font-bold class="WordsPage-Header-Left">
        <p underline @click="goDictionary">
          {{ targetDict.name }}
        </p>
      </div>

      <h1 flex items-center gap-2 text-sm op-75>
        剩余 {{ prepareData.getLeftWords() }} 个
      </h1>
    </div>

    <div v-if="data.current" class="WordCard-Container">
      <WordCard
        ref="mainCard" :right="data.current!.mainWord" class="WordCard WordCard-Main transition-cubic"
        :data="data.current!" @choose="handleChoose"
      />
      <WordCard
        ref="moveCard" :right="data.current!.mainWord" class="WordCard WordCard-Next transition-cubic"
        :data="data.next!"
      />
    </div>

    <audio ref="successAudio" src="/sound/success.wav" />
    <audio ref="errorAudio" src="/sound/error.wav" />

    <div v-if="data.current" :class="{ visible: data.content }" class="WordContent transition-cubic">
      <WordDetailContent :word="data.current.mainWord" @close="data.content = false" />
    </div>
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
  &::before {
    z-index: -1;
    content: '';
    position: absolute;

    top: -1rem;
    left: -10vmin;

    width: 120vmin;
    height: 60vmin;

    // opacity: 0.75;
    // filter: drop-shadow(0 0 16px var(--theme-color));
    border-radius: 0 0 200px 200px;
    background-color: var(--theme-color);
    box-shadow:
      0 0 0rem 5rem #eea850e0,
      0 0 0.5rem 8rem #ed935780,
      0 0 1rem 10rem #eb726350;
  }

  &.listenning {
    filter: blur(2px);
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
}
</style>
