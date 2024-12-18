<script setup lang="ts">
import { NavBar } from 'vant'

import type { IWord } from '~/composables/words'
import { dictionaries, useWordSound } from '~/composables/words'

const route = useRoute()
const router = useRouter()

const dictionary = computed(() => dictionaries.find(item => item.id === route.query?.dict))
const currentWord = ref<any>()
</script>

<template>
  <div class="DictionaryPage">
    <NavBar :title="`${dictionary?.name} - 词典`" left-text="返回" left-arrow w-full @click-left="router.back()" />

    <ul>
      <li v-for="word in dictionary?.storage.getAllWords()" :key="word.word">
        <p w-full flex items-center justify-between class="word">
          <span text-lg font-bold>{{ word.word }}</span>
          <span>
            <WordPlayIcon :word="word.word" />
          </span>
        </p>
        <p w-full flex items-center justify-between font-size-3.25 op-75 class="content">
          <span flex items-center class="translation">
            <input type="checkbox">
            <span>{{ word.translation }}</span>
          </span>

          <span flex items-center @click="currentWord = word">
            详情
            <i i-carbon-chevron-right block />
          </span>
        </p>
      </li>
    </ul>

    <div :class="{ visible: currentWord }" class="transition-cubic DictionaryPage-Word">
      <WordDetailContent v-if="currentWord" button="关闭" :word="currentWord" @close="currentWord = false" />
    </div>
  </div>
</template>

<style lang="scss">
.DictionaryPage-Word {
  &.visible {
    transform: translateX(0%);
  }

  z-index: 1;
  position: absolute;

  width: 100%;
  height: 100%;

  top: 0;
  left: 0;

  overflow-y: scroll;
  transform: translateX(120%);
  background-color: var(--el-bg-color);
}

.DictionaryPage {
  .translation {
    // 当input选项框选中的时候
    input:checked + span {
      color: unset;
      background-color: transparent;
    }

    input {
      position: absolute;

      opacity: 0;
      width: calc(100% - 100px);
    }

    span {
      color: #0000;
      background-color: var(--el-fill-color-darker);
    }
  }

  ul {
    li {
      position: relative;
      padding: 0.5rem 1rem;
      display: flex;
      // margin: 0.35rem 0;

      width: 100%;
      height: 70px;

      flex-direction: column;
      justify-content: space-between;

      background-color: var(--el-fill-color-lighter);
      border-bottom: 1px solid var(--el-border-color-lighter);
    }

    position: relative;

    width: 100%;
    height: calc(100% - 2rem);

    overflow-x: hidden;
    overflow-y: scroll;
  }

  position: relative;
  padding-bottom: 1rem;

  height: 100%;
}
</style>
