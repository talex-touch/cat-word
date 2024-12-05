<script setup lang="ts">
import { NavBar } from 'vant'

import { dictionaries } from '~/composables/words'

const route = useRoute()
const router = useRouter()

const dictionary = computed(() => dictionaries.find(item => item.id === route.query?.dict))
const currentWord = ref<any>()
</script>

<template>
  <div class="DictionaryPage">
    <NavBar :title="`${dictionary?.name} - 词典`" left-text="返回" left-arrow w-full @click-left="router.back()" />

    <ul>
      <li v-for="word in dictionary?.storage.getAllWords()" :key="word.word" @click="currentWord = word">
        {{ word.word }}
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
  ul {
    li {
      position: relative;
      padding: 0.5rem;
      display: flex;
      margin: 0.25rem 0;

      width: 100%;
      height: 40px;

      align-items: center;

      background-color: var(--el-fill-color-lighter);
    }

    position: relative;

    height: calc(100% - 2rem);

    overflow-y: scroll;
  }

  position: relative;
  padding-bottom: 1rem;

  height: 100%;
}
</style>
