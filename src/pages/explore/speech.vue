<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { Card, NavBar, Sidebar, SidebarItem } from 'vant'
import { articles } from '~/composables/speech'

const router = useRouter()

function onClickLeft() {
  router.back()
}

interface ISpeechData {
  index: number
}

const speechData = useLocalStorage<ISpeechData>('speechData', {
  index: 0,
})
const currentData = computed(() => articles?.[speechData.value.index || 0])

const spokenText = ref('')
const {
  isSupported,
  isPlaying,
  // status,
  // voiceInfo,
  // utterance,
  stop: spokenStop,
  speak,
} = useSpeechSynthesis(spokenText)

async function handlePlayParagraph(text: string) {
  spokenText.value = text

  speak()
}
</script>

<template>
  <div :class="{ supported: isSupported }" class="SpeechPage">
    <NavBar title="口语化学习" left-text="返回" left-arrow w-full @click-left="onClickLeft" />

    <div class="SpeechPage-Main">
      <div v-for="(paragraph, ind) in currentData.articles" :key="ind" class="SpeechPage-Main-Paragraph">
        <p class="SpeechPage-Main-Text">
          {{ paragraph.paragraph }}
          <PlayIcon inline @click="handlePlayParagraph(paragraph.paragraph)" />
        </p>
        <p class="SpeechPage-Main-Translation">
          {{ paragraph.translation }}
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.SpeechPage-Main {
  &-Paragraph {
    .SpeechPage-Main-Text {
      color: var(--el-text-color-regular);
    }

    .SpeechPage-Main-Translation {
      color: var(--el-text-color-secondary);
    }

    p {
      text-indent: 1em;
    }

    margin: 0 0 1rem;
  }

  padding: 1rem;

  overflow-y: scroll;
}

.SpeechPage {
  position: relative;
  display: flex;

  width: 100%;
  height: 100%;

  align-items: center;
  flex-direction: column;

  // background-color: var(--el-bg-color-page);
}
</style>
