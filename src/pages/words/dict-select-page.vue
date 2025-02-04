<script setup lang="ts">
// import WordSelector from '@/components/words/WordSelector.vue'
import { useDebounceFn } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import { listEnglishDictionaryUsingGet } from '~/composables/api/clients/api/englishDictionaryController'
import type { Category } from '~/modules/core/dictionary'
import { useCategoryTree } from '~/modules/core/dictionary'
import DictionaryHolder from '~/modules/core/dictionary/DictionaryHolder.vue'
// import BookItem from './BookItem.vue'

const bookData = ref<Category[]>([])

async function fetchBookData() {
  const { code, data } = await listEnglishDictionaryUsingGet()

  if (code === 0) {
    const result = data || []

    bookData.value = useCategoryTree(result).value
  }
  else {
    ElMessage.error('获取书籍数据失败')
  }
}

onMounted(() => {
  fetchBookData()
})

const searchQuery = ref('')

const handleSearch = useDebounceFn(() => {
  // 搜索逻辑...
}, 300)
</script>

<template>
  <DictionaryHolder visible class="dictionary-page">
    <template #header>
      <div class="search-bar">
        <SearchBar
          v-model="searchQuery"
          placeholder="搜索书籍/教材"
          class="search-bar__input"
          @input="handleSearch"
        />
      </div>
    </template>

    {{ bookData }}
    <!-- 分类切换 -->
    <!-- <ElTabs v-model="activeCategory" @tab-change="handleCategoryChange">
      <ElTabPane
        v-for="category in categories"
        :key="category.value"
        :label="category.label"
        :name="category.value"
      />
    </ElTabs> -->

    <!-- 虚拟滚动书籍列表 -->
    <!-- 自定义书籍列表组件 -->
    <!-- <VirtualScroll
      :items="filteredBooks"
      :item-size="80"
      class="book-list"
    >
      <template #default="{ item }">
        <BookItem :book="item" />
      </template>
      </WordSelector>
    </virtualscroll> -->
  </DictionaryHolder>
</template>

<style scoped>
.dictionary-page {
  /* padding: 1rem; */
  /* height: 100vh; */
  display: flex;
  flex-direction: column;
}
.search-bar {
  margin-bottom: 20px;
}
</style>
