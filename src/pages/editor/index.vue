<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import type { IWord } from '~/composables/words'
import GptWords from '~/composables/words/gptwords.json?raw'

const GptWordList: any[] = reactive([])

  ; (() => {
  GptWords.split('\n').forEach((line) => {
    if (!line.length)
      return

    GptWordList.push(JSON.parse(line))
  })
})()

const active = ref('')
const list = useLocalStorage<any>('words', [])

const ruleForm = reactive<IWord & { data: string }>({
  data: '',
  word: '',
  img: [],
  content: '',
  translation: '',
  examples: [],
  synonyms: [],
  antonyms: [],
  definition: '',
  type: [],
  story: '',
  phonetic: {
    aloud: '',
    sound: '',
  },
  derived: [],
  phrases: [],
  prefix: '',
  suffix: '',
  transform: [],
  remember: '',
})

watch(active, () => {
  const target = list.value.find((i: any) => i.word === active.value)

  Object.assign(ruleForm, {
    ...target,
    data: JSON.stringify(target, null, 2),
  })

  handleSearch()
})

const loading = ref(false)
const data = ref('')

function reset() {
  ruleForm.data = ''
  ruleForm.word = ''
  ruleForm.img = []

  data.value = ''
}

function handleSearch() {
  const word = ruleForm.word.trim()

  if (!word)
    return

  loading.value = true

  const wordList = GptWordList.filter(item => item.word.toLocaleLowerCase() === word.toLocaleLowerCase())
  if (wordList.length) {
    data.value = JSON.stringify(wordList[0], null, 2)
  }

  loading.value = false
}

function handleAdd() {
  // 如果列表已有则修改
  const index = list.value.findIndex((item: any) => item.word === ruleForm.word)

  const _obj = JSON.parse(ruleForm.data)

  const obj = mergeData(JSON.stringify({
    ..._obj,
    word: ruleForm.word,
  }), data.value)

  if (index !== -1) {
    list.value[index] = obj
    return
  }

  list.value.push(JSON.parse(JSON.stringify(obj)))
}

function mergeData(word: any, data: any) {
  if (!word)
    return ''

  const obj = JSON.parse(word)
  const dataObj = JSON.parse(data || '{}')

  return {
    ...obj,
    img: ruleForm.img,
    backgroundStory: dataObj.content,
  }
}

function removeWord(index: number) {
  active.value = ''

  list.value.splice(index, 1)

  reset()
}

function saveJSONToFile(jsonString, filename) {
  // 创建一个 Blob 对象，类型为 'application/json'
  const blob = new Blob([jsonString], { type: 'application/json' })

  // 创建一个 URL 对象，指向 Blob 对象
  const url = URL.createObjectURL(blob)

  // 创建一个 <a> 元素，设置 href 和 download 属性
  const a = document.createElement('a')
  a.href = url
  a.download = filename

  // 触发点击事件，开始下载
  a.click()

  // 释放 URL 对象
  URL.revokeObjectURL(url)
}

function exportWords() {
  // 导出 words
  const text = JSON.stringify(list.value)

  saveJSONToFile(text, 'dictionary.json')
}

const { files, open, onCancel, onChange } = useFileDialog()

async function importWords() {
  open()
}

onChange(() => {
  const file = files.value?.item?.(0)

  if (!file)
    return

  // 如果不是文本文件
  if (file.type !== 'application/json') {
    ElMessage.error('请选择 JSON 文件')
    return
  }

  const reader = new FileReader()

  reader.onload = function (event) {
    const content = event.target?.result

    if (content) {
      list.value = JSON.parse(content as string)
    }
  }

  reader.readAsText(file)
})

function clearWords() {
  ElMessageBox.confirm(
    '将会清除所有单词，确认继续吗？',
    '确认删除',
    {
      confirmButtonText: '确认删除所有单词',
      cancelButtonText: '取消',
      type: 'warning',
    },
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: 'Delete completed',
      })

      list.value = []
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
}

function handleAddImg() {
  ElMessageBox.prompt('请输入图片地址', 'INPUT', {
    confirmButtonText: 'OK',
    cancelButtonText: '取消',

  })
    .then(({ value }) => {
      ruleForm.img.push(value)

      ElMessage({
        type: 'success',
        message: `添加成功`,
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Input canceled',
      })
    })
}

function removeImage(index) {
  ruleForm.img.splice(index, 1)
}
</script>

<template>
  <div class="Editor">
    <div class="Editor-Aside">
      <ul class="word-list" style="overflow: auto">
        <li
          v-for="(item, i) in list" :key="i" :class="{ active: active === item.word }" class="word-list-item"
          @click="active = item.word"
        >
          {{ item.word }}

          <div class="word-remove" @click="removeWord(i)">
            <div i-carbon-close />
          </div>
        </li>
      </ul>

      <div gap-4 class="Editor-Aside-Bottom">
        <el-text>共计 {{ list.length }} 个单词.</el-text>

        <div flex items-center justify-center>
          <el-button type="danger" @click="clearWords">
            清空
          </el-button>
          <el-button type="info" @click="importWords">
            导入
          </el-button>
          <el-button type="primary" @click="exportWords">
            导出
          </el-button>
        </div>
      </div>
    </div>
    <div class="Editor-Main">
      <h1 my-6 text-2xl font-bold>
        添加单词
      </h1>
      <el-form v-loading="loading" :model="ruleForm">
        <el-form-item label="当前单词" prop="name">
          <el-input v-model="ruleForm.word" />
        </el-form-item>
        <el-form-item label="合并数据" prop="data">
          <el-input v-model="ruleForm.data" :autosize="{ minRows: 5, maxRows: 10 }" type="textarea" />
        </el-form-item>
        <el-form-item v-if="false" label="合并数据" prop="data">
          <el-text>合并数据如下</el-text>
          <p>{{ data }}</p>
        </el-form-item>
        <el-form-item label="添加图片" prop="data">
          <ul>
            <li v-for="(img, index) in ruleForm.img" :key="img" flex items-center>
              <p>{{ img }}</p>
              <div cursor-pointer hover:color-red @click="removeImage(index)">
                <div i-carbon:close />
              </div>
            </li>
            <el-button type="primary" @click="handleAddImg">
              添加图片
            </el-button>
          </ul>
        </el-form-item>
        <el-form-item label="最终数据" prop="data">
          <p>{{ mergeData(ruleForm.data, data) }}</p>
        </el-form-item>

        <el-form-item>
          <el-button :loading="loading" type="warning" @click="handleSearch">
            查找
          </el-button>
          <el-button type="primary" @click="handleAdd">
            新增
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss">
.Editor {
  display: flex;
  margin: 0 auto;

  width: 100%;
  height: 100%;

  // max-width: 1080px;
}

.Editor-Aside-Bottom {
  position: sticky;
  display: flex;
  padding: 1rem;

  top: 100%;
  bottom: 0;

  flex-direction: column;
  justify-content: space-between;
  border-top: 1px solid var(--el-border-color);
}

.Editor-Main {
  padding: 1rem;

  flex: 1;

  overflow-y: scroll;
}

.Editor-Aside {
  ul {
    padding: 1rem;
  }

  .word-list-item {
    .word-remove {
      display: flex;

      width: 32px;
      height: 32px;

      align-items: center;
      justify-content: center;

      opacity: 0;
      transition: 0.25s;
      border-radius: 50%;
      background-color: var(--el-color-danger);
    }

    &:hover {
      .word-remove {
        opacity: 1;
      }

      background-color: var(--el-color-primary-light-5);
    }
    display: flex;
    margin: 1rem 0;
    padding: 0.25rem 0.5rem;

    cursor: pointer;

    border-radius: 18px;
    align-items: center;
    justify-content: space-between;

    &.active {
      background-color: var(--el-color-primary);
    }
  }

  width: 30%;
  max-width: 300px;

  border-right: 1px solid var(--el-border-color);
}
</style>
