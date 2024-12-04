<script setup lang="ts">
import type { IWord } from '~/composables/words'
import { words } from '~/composables/words/CET-4'

const props = defineProps<{
  word: IWord
  button?: string
}>()

const emits = defineEmits<{
  (e: 'close'): void
}>()

const buttonTitle = computed(() => props.button || '下一题')

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

const analyze = ref(false)

function openAnalyse() {
  analyze.value = true
}
</script>

<template>
  <div class="WordDetailContent">
    <div class="WordDetaiContent-Header">
      <p flex items-end gap-2 class="word">
        {{ word.word }}
      </p>

      <div class="desc">
        <div flex items-center class="desc-phonetic">
          <span text-sm class="phonetic">
            {{ word.phonetic }}
          </span>
          <PlayIcon @click="spokenWord(word)" />
        </div>
        <div class="desc-translation">
          {{ word.translation }} <span mx-2 op-50>{{ formateType(word.type) }}.</span>
        </div>
      </div>
    </div>

    <div class="WordDetailContent-Main">
      <WordSection>
        <template #Tag>
          定义解析
        </template>
        <p>{{ word.definition[0] }}</p>
        <p>{{ word.definition[1] }}</p>
      </WordSection>

      <WordSection>
        <template #Tag>
          诠释助记
        </template>
        {{ word.remember }}
      </WordSection>

      <WordSection v-if="word.prefix || word.suffix">
        <template #Tag>
          词根助记
        </template>
        <p v-if="word.prefix">
          {{ word.prefix }}
        </p>
        <p v-if="word.suffix">
          {{ word.suffix }}
        </p>
      </WordSection>

      <WordSection>
        <template #Tag>
          短语助记
        </template>
        <div v-for="(phrase, ind) in word.phrases" :key="ind" my-2>
          <div my-1 class="phrase-header" flex flex-col font-bold>
            {{ phrase.phrase }}
            <p text-sm font-normal op-75>
              {{ phrase.usage }}
            </p>
          </div>
          <p text-sm>
            {{ phrase.example }}
          </p>
          <p text-sm>
            {{ phrase.translation }}
          </p>
        </div>
      </WordSection>

      <WordSection>
        <template #Tag>
          故事助记
        </template>
        {{ word.story }}
      </WordSection>
    </div>

    <!-- <div v-if="word.backgroundStory" class="WordContent-Story">
        {{ word.backgroundStory }}
      </div> -->

    <WordExamples v-if="word.examples?.length" style="margin: 0 1rem" :word="word" />

    <div class="WordContent-Extra">
      <div v-if="word.synonyms?.length" class="block">
        <p class="title">
          同义词
        </p>
        <p class="content">
          <span v-for="subWord in word.synonyms" :key="subWord.word">
            {{ subWord?.word }}
          </span>
        </p>
      </div>
      <div v-if="word.antonyms?.length" class="block">
        <p class="title">
          反义词
        </p>
        <p class="content">
          <span v-for="subWord in word.antonyms" :key="subWord.word">
            {{ subWord?.word }}
          </span>
        </p>
      </div>
      <div v-if="word.transform?.length" class="block">
        <p class="title">
          变形词
        </p>
        <p class="content">
          <span v-for="subWord in word.transform" :key="subWord.word">
            {{ subWord?.word }}
          </span>
        </p>
      </div>
      <div v-if="word.derived?.length" class="block">
        <p class="title">
          派生词
        </p>
        <p class="content">
          <span v-for="subWord in word.derived" :key="subWord.word">
            {{ subWord?.word }}
          </span>
        </p>
      </div>
    </div>

    <br>

    <div class="WordContent-Bottom">
      <el-button plain size="large" type="info" @click="openAnalyse">
        析
      </el-button>
      <el-button plain size="large" w-full type="primary" @click="emits('close')">
        {{ buttonTitle }}
      </el-button>
    </div>

    <TouchDialog v-model="analyze">
      <div class="WordDetailContent-DialogContent">
        <el-scrollbar>
          <MoContentRender :model-value="word.backgroundStory" />
        </el-scrollbar>
      </div>
    </TouchDialog>
  </div>
</template>

<style lang="scss">
.WordDetailContent-DialogContent {
  padding: 1rem;

  height: 85vh;
}

.WordDetaiContent-Header {
  .phonetic {
    margin: 0 0.25rem;
    padding: 0.25rem 0.5rem;

    font-size: 16px;
    border-radius: 8px;
    color: var(--el-text-color-secondary);
    background-color: var(--el-fill-color);
  }

  p.word {
    font-size: 32px;
    font-weight: 600;
  }

  .desc {
    display: flex;

    gap: 0.5rem;
    flex-direction: column;
    align-items: flex-start;
  }

  position: relative;
  padding: 1rem;
  display: flex;

  flex-direction: column;

  align-items: flex-start;
  justify-content: center;
}

.WordDetailContent-Main {
  padding: 0 1rem;
}

.WordContent-Bottom {
  position: sticky;
  padding: 1rem;
  display: flex;

  top: calc(100% - 72px);
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

.WordDetailContent {
  position: relative;

  width: 100%;
  min-height: 100%;
}
</style>
