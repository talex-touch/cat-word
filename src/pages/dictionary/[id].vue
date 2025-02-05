<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { Tab, Tabs } from 'vant'
import { getEnglishDictionaryVoByIdUsingGet } from '~/composables/api/clients/api/englishDictionaryController'

defineOptions({
  name: 'DictionaryPage',
})

const route = useRoute('/dictionary/[id]')
const loading = ref(false)
const dict = ref<API.EnglishDictionaryVO>()
const router = useRouter()
const active = ref(0)
const showDetailsDialog = ref(false)

async function fetchDictionaryData() {
  loading.value = true

  const { code, data } = await getEnglishDictionaryVoByIdUsingGet({
    id: route.params.id,
  })

  if (code !== 0) {
    ElMessage.error('获取字典数据失败')

    router.back()

    return
  }

  dict.value = data

  loading.value = false
}

watch(() => route.params.id, fetchDictionaryData, { immediate: true })
</script>

<template>
  <PageNavHolder :loading="loading" title="词典">
    <div v-if="dict" class="dictionary-container">
      <!-- 顶部信息区域 -->
      <div class="info-section mb-3 rounded-lg bg-white">
        <div class="flex items-center gap-4">
          <div class="relative w-[100px] flex-shrink-0">
            <DictionaryBookDisplay only-image :border="false" :model-value="dict" />
          </div>
          <div class="min-w-0 flex-1">
            <h1 class="mb-2 truncate text-lg text-gray-900 font-bold">
              {{ dict.name }}
            </h1>
            <div class="relative text-sm text-gray-600">
              <MultiTextDisplay :custom-click="() => showDetailsDialog = true">
                {{ dict.description }}
              </MultiTextDisplay>
            </div>
          </div>
        </div>
      </div>

      <!-- 标签页 -->
      <div class="rounded-lg bg-white">
        <Tabs v-model:active="active" sticky>
          <Tab title="学习">
            <div class="p-4">
              <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div class="group option-card" @click="router.push(`/words/dict-select-page?dictId=${dict.id}`)">
                  <div class="flex items-center">
                    <div i-carbon-document-add class="text-primary text-2xl" />
                    <div class="ml-3 flex-1">
                      <h3 class="text-base font-medium">
                        开始学习
                      </h3>
                      <p class="mt-0.5 text-xs text-gray-500">
                        开始学习这本字典中的单词
                      </p>
                    </div>
                    <div i-carbon-chevron-right class="text-gray-400" />
                  </div>
                </div>
                <div class="option-card group">
                  <div class="flex items-center">
                    <div i-carbon-task class="text-primary text-2xl" />
                    <div class="ml-3 flex-1">
                      <h3 class="text-base font-medium">
                        学习记录
                      </h3>
                      <p class="mt-0.5 text-xs text-gray-500">
                        查看学习进度和历史记录
                      </p>
                    </div>
                    <div i-carbon-chevron-right class="text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </Tab>

          <Tab title="统计">
            <div class="p-4">
              <div class="border border-gray-100 rounded-lg p-4">
                <p class="text-sm text-gray-500">
                  学习统计信息展示区域
                </p>
              </div>
            </div>
          </Tab>

          <Tab title="词表">
            <div class="p-4">
              <div class="border border-gray-100 rounded-lg p-4">
                <p class="text-sm text-gray-500">
                  词表内容展示区域
                </p>
              </div>
            </div>
          </Tab>

          <Tab title="词典属性">
            <div class="p-4">
              <div class="space-y-3">
                <div v-if="dict.publisher" class="info-item">
                  <span class="info-label">出版社</span>
                  <span class="info-value">{{ dict.publisher }}</span>
                </div>
                <div v-if="dict.publication_date" class="info-item">
                  <span class="info-label">出版日期</span>
                  <span class="info-value">{{ dict.publication_date }}</span>
                </div>
                <div v-if="dict.isbn" class="info-item">
                  <span class="info-label">ISBN</span>
                  <span class="info-value">{{ dict.isbn }}</span>
                </div>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>

    <!-- 详情弹窗 -->
    <el-dialog v-model="showDetailsDialog" title="详细介绍" width="90%" max-width="600px">
      <div class="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed">
        {{ dict?.description }}
      </div>
    </el-dialog>
  </PageNavHolder>
</template>

<style scoped>
.dictionary-container {
  @apply p-3 bg-gray-50 min-h-screen;
}

.option-card {
  @apply p-4 bg-white rounded-lg border border-gray-100 hover:border-primary hover:shadow-sm transition-all duration-200 cursor-pointer;
}

.info-item {
  @apply flex items-center p-3.5 bg-gray-50 rounded-lg border border-gray-100;
}

.info-label {
  @apply text-gray-500 text-sm min-w-[4.5rem];
}

.info-value {
  @apply text-gray-700 text-sm flex-1;
}

:deep(.van-tabs__wrap) {
  @apply border-b border-gray-100 bg-white;
}

:deep(.van-tabs__nav) {
  @apply bg-transparent;
}

:deep(.van-tab) {
  @apply text-sm;
}

:deep(.van-tab--active) {
  @apply text-primary font-medium;
}

:deep(.van-tabs__line) {
  @apply bg-primary;
}
</style>
