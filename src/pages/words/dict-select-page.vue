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
const selectCategory = ref<Category>()
// const selectBook = ref<Book>()

async function fetchBookData() {
  const { code, data } = await listEnglishDictionaryUsingGet()

  if (code === 0) {
    const result = data || []

    bookData.value = useCategoryTree(result).value

    if (!selectCategory.value) {
      selectCategory.value = bookData.value[0]
    }
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
  <DictionaryHolder visible class="DictionarySelectPage">
    <template #header>
      <div class="search-bar">
        <SearchBar
          v-model="searchQuery"
          placeholder="搜索词典/书籍/教材"
          class="search-bar__input"
          @input="handleSearch"
        />
      </div>
    </template>

    <template #nav>
      <ul h-full class="DictionarySelectPage-Nav">
        <li v-for="nav in bookData" :key="nav.id" :class="{ active: nav.id === selectCategory?.id }" text-center>
          {{ nav.name }}
        </li>
      </ul>
    </template>

    <div h-full class="DictionarySelectPage-Content">
      <DictionaryBookDisplay v-for="book in selectCategory?.books" :key="book.id" :model-value="book" />
      <!-- {{ currentCategory }} -->
    </div>
    <!-- {{ bookData }} -->
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

<style lang="scss" scoped>
.DictionarySelectPage-Nav {
  li.active {
    &::before {
      transform: scale(1);
    }
    background-color: var(--el-fill-color);
  }

  li {
    &::before {
      content: '';
      position: absolute;

      top: 20%;
      left: 0;

      width: 2px;
      height: 60%;

      transition: 0.25s;
      transform: scale(0);
      background-color: var(--theme-color);
    }
    position: relative;

    height: 36px;

    display: flex;

    align-items: center;
    justify-content: center;
  }

  background-color: var(--el-bg-color);
}

.DictionarySelectPage {
  background-color: var(--el-bg-color);
}
</style>
