<script setup lang="ts" generic="T extends any, O extends any">
import DisplayIndexCourse from '~/components/display/IndexCourse.vue'
import { globalData } from '~/composables/words'
import { modeManager, ModeType } from '~/composables/words/mode'
import { ComprehensiveMode } from '~/composables/words/mode/comprehensive'
import { PunchMode } from '~/composables/words/mode/punch'
import type { DictStorage } from '~/composables/words/storage'
import prewords from './prewords.vue'

defineOptions({
  name: 'IndexPage',
})

modeManager.set(ModeType.COMPREHENSIVE, (dictionaryStorage: DictStorage) => new ComprehensiveMode(dictionaryStorage))
modeManager.set(ModeType.PUNCH, (dictionaryStorage: DictStorage) => new PunchMode(dictionaryStorage))

const cozeWebSDK = new CozeWebSDK.WebChatClient({
  config: {
    // 智能体 ID
    botId: '7448405006673412115',
  },
  ui: {
    footer: {
      expressionText: 'Powered by {{QuotaWish}}.',
      linkvars: {
        QuotaWish: {
          text: 'QuotaWish 科塔智爱',
          link: 'https://quotawish.com',
        },
      },
    },
    chatBot: {
      title: 'Lucas Tata',
    },
    asstBtn: {
      isNeed: false,
    },
    base: {
      icon: 'https://ai.quotawish.com/favicon.ico',
    },
  },
})

const prewordsVisible = ref(false)
watch(prewordsVisible, visible => globalSetting.footer = !visible)

function handleSign() {
  prewordsVisible.value = true
}

onMounted(() => {
  globalSetting.footer = true
})
</script>

<template>
  <div class="IndexPage">
    <div class="IndexPage-Header">
      <div class="coffee-font" text-1.75xl flex items-center gap-1 font-bold @click="cozeWebSDK.showChatBot()">
        <img w-8 src="/ai-logo.png">
        Tata
      </div>

      <div flex items-center gap-2 class="IndexPage-Header-Info">
        <RoundInfo type="danger">
          <div i-carbon-favorite-filled />
          5
        </RoundInfo>

        <RoundInfo type="warning">
          <div i-carbon-star-filled />
          400
        </RoundInfo>
      </div>
    </div>

    <div id="sign-info" :class="{ expand: prewordsVisible }" mx-auto class="IndexPage-Card w-95%">
      <WordSignInfo @sign="handleSign" />

      <teleport to="body">
        <div :class="{ visible: prewordsVisible }" class="IndexPage-PreWords">
          <prewords @exit="prewordsVisible = false" />
        </div>
      </teleport>
    </div>

    <DisplayIndexCourse />

    <br>
  </div>
</template>

<style lang="scss">
.IndexPage-PreWords {
  &.visible {
    opacity: 1;
    pointer-events: auto;

    transform: scale(1);
    transition: 0.25s 0.1s;
  }
  z-index: 2;
  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  opacity: 0;
  pointer-events: none;
  transform: scale(1.05);
  background-color: var(--el-bg-color);
}

.IndexPage-Card {
  &::before {
    z-index: 1;
    content: '';
    position: absolute;

    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    opacity: 0;
    pointer-events: none;
    border-radius: 25px;
    background-color: var(--theme-color);
    transform: scale(1);

    transition: 0.25s 0.05s;
  }

  &.expand {
    &::before {
      opacity: 1;
      transform: scale(1);
    }
    z-index: 2;
    transform: scale(1.25);
  }

  p.title {
    margin: 0 0 1rem;

    color: var(--el-text-color-placeholder);
    font-size: 24px;
    font-weight: 600;
  }
  position: relative;

  transition: 0.25s;
}

.IndexPage-Header {
  .IndexPage-Header-Info {
    font-size: 14px;
  }

  & > p {
    color: #000;
  }

  z-index: 1;
  position: sticky;
  display: flex;
  padding: 1rem;

  top: 0;

  justify-content: space-between;

  background-color: var(--el-bg-color);
}

.IndexPage {
  position: relative;

  height: 100%;

  overflow-y: scroll;
  background-color: var(--el-bg-color);
}
</style>
