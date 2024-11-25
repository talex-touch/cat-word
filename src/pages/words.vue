<script name="Words" setup lang="ts">
import { ElMessage } from 'element-plus'
import WordCard from '~/components/WordCard.vue'
import type { IWord } from '~/composables/words'
import { words } from '~/composables/words/CET-6'

const mainCard = ref<InstanceType<typeof WordCard>>()
const moveCard = ref<InstanceType<typeof WordCard>>()

const data = reactive<any>({
  content: false,
  current: null,
  next: null,
})

// 随机抽取1个单词以及3个额外单词的选项
function randomWords() {
  // 随机抽取
  const mainWordIndex = Math.floor(Math.random() * words.length)
  const mainWord = words[mainWordIndex]

  // 剩余单词数组
  const remainingWords = words.filter((_, index) => index !== mainWordIndex)

  // 从剩余单词中随机选择3个单词
  const options: any[] = []
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * remainingWords.length)
    options.push(remainingWords[randomIndex])
    remainingWords.splice(randomIndex, 1) // 移除已选中的单词
  }

  return { mainWord, options }
}

async function next() {
  const moving = data.current !== null

  if (!moving) {
    data.current = randomWords()

    return
  }

  const currentDom = mainCard.value!.$el
  const nextDom = moveCard.value!.$el

  data.next = data.current
  data.current = randomWords()

  currentDom.style.transition = 'none'
  currentDom.style.transform = 'translateX(120%) scale(0.85)'

  nextDom.style.transition = 'none'
  nextDom.style.transform = 'translateX(0)'

  await sleep(100)

  nextDom.style.visibility = 'visible'
  nextDom.style.transition = ''
  nextDom.style.transform = 'translateX(0%) scale(0.85)'

  await sleep(200)

  nextDom.style.transform = 'translateX(-120%) scale(0.85)'

  await sleep(200)

  currentDom.style.transition = ''
  currentDom.style.transform = 'translateX(0) scale(0.85)'

  await sleep(200)

  currentDom.style.transform = 'translateX(0) scale(1)'
  nextDom.style.visibility = ''
}

const {
  isSupported,
  isListening,
  isFinal,
  error,
  result,
  start,
  stop,
} = useSpeechRecognition()

async function speechRecognition() {
  if (!isSupported.value)
    return next()

  start()

  await sleep(3000)

  stop()

  if (result.value.toLocaleLowerCase() === data.current.mainWord.word.toLocaleLowerCase()) {
    ElMessage.success('阅读非常完美！')
  }
  else {
    ElMessage.info(`还需提升${result.value}`)
  }

  await sleep(300)

  next()
}

async function handleChoose(word: IWord) {
  if (isListening.value)
    return

  const wrong = word !== data.current.mainWord

  if (wrong) {
    data.content = true

    whenever(() => data.content === false, async () => {
      await sleep(600)

      speechRecognition()
    })
  }
  else {
    speechRecognition()
  }
}

next()
</script>

<template>
  <div :class="{ listenning: isListening }" class="WordsPage">
    <h1 class="title">
      单词打卡
    </h1>

    <div class="WordCard-Container">
      <WordCard
        ref="mainCard" :right="data.current.mainWord" class="WordCard WordCard-Main transition-cubic"
        :data="data.current" @choose="handleChoose"
      />
      <WordCard
        ref="moveCard" :right="data.current.mainWord" class="WordCard WordCard-Next transition-cubic"
        :data="data.next"
      />
    </div>

    <div v-if="data.current" :class="{ visible: data.content }" class="WordContent transition-cubic">
      <h1 p-4 class="title">
        <p class="word">
          {{ data.current.mainWord.word }}
        </p>
        <p class="desc">
          {{ data.current.mainWord.translation }} <span mx-2 op-50>{{ formateType(data.current.mainWord.type) }}</span>
        </p>
      </h1>

      <div v-if="data.current.mainWord.story" class="WordContent-Story">
        {{ data.current.mainWord.story }}
      </div>

      <WordExamples style="margin: 0 1rem" :word="data.current.mainWord" />

      <div v-if="data.current.mainWord.definition" class="WordContent-Definition">
        {{ data.current.mainWord.definition }}
      </div>

      <div class="WordContent-Extra">
        <div v-if="data.current.mainWord.synonyms?.length" class="block">
          <p class="title">
            同义词
          </p>
          <p class="content">
            <span v-for="word in data.current.mainWord.synonyms" :key="word">
              {{ word?.word || word }}
            </span>
          </p>
        </div>
        <div v-if="data.current.mainWord.antonyms?.length" class="block">
          <p class="title">
            反义词
          </p>
          <p class="content">
            <span v-for="word in data.current.mainWord.antonyms" :key="word">
              {{ word?.word || word }}
            </span>
          </p>
        </div>
      </div>

      <br>

      <div class="WordContent-Bottom" @click="data.content = false">
        <el-button size="large" w-full type="primary">
          下一题
        </el-button>
      </div>
    </div>

    <teleport to="body">
      <div v-if="isListening" class="Word-Recognition">
        <div i-carbon:voice-activate />
        <p>念出这个单词</p>
      </div>
    </teleport>
  </div>
</template>

<style lang="scss">
.Word-Recognition {
  p {
    font-size: 16px;
  }
  z-index: 10;
  position: absolute;
  display: flex;

  top: 50%;
  left: 50%;

  width: 128px;
  height: 128px;

  gap: 0.5rem;
  font-size: 32px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: var(--el-mask-color-extra-light);

  border-radius: 16px;
  backdrop-filter: blur(18px) saturate(180%);
  transform: translate(-50%, -50%);
}

.WordContent-Bottom {
  position: sticky;
  padding: 1rem;
  display: flex;

  top: 100%;
  bottom: 0;

  width: 100%;
  height: 72px;

  align-items: center;
  justify-content: center;

  background-color: var(--el-bg-color);
}

.WordContent-Definition {
  padding: 1rem;
  margin: 1rem 1rem;

  border-radius: 16px;
  color: var(--el-text-color-secondary);
  background-color: var(--el-bg-color-page);
}

.WordContent-Story {
  margin: 1rem 1rem 2rem;

  font-size: 18px;
}

.WordContent-Extra {
  .block {
    p.content {
      display: flex;

      width: 100%;
      gap: 0.25rem;

      flex-wrap: wrap;
    }

    p.title {
      width: max-content;
      padding: 0.25rem;

      border-radius: 8px;
      background-color: var(--el-fill-color);
    }

    margin: 0.5rem 0;
    padding: 1rem;

    border-radius: 16px;
    color: var(--el-text-color-secondary);
    background-color: var(--el-bg-color-page);
  }
  margin: 0.5rem 1rem;
}

.WordContent {
  &.visible {
    transform: translateY(0);
  }

  .title {
    p.word {
      font-size: 32px;
      font-weight: 600;
    }

    p.desc {
      margin-top: 0.5rem;
      font-size: 20px;
    }
  }
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

.WordsPage {
  &.listenning {
    filter: blur(2px);
  }

  h1.title {
    font-size: 24px;
    font-weight: 600;
  }
  position: relative;
  padding: 1rem;

  width: 100%;
  height: 100%;
}
</style>
