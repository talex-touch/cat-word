<script setup lang="ts">
import { NavBar } from 'vant'

defineProps<{
  title: string
  header?: boolean
}>()

const router = useRouter()

// 获取插槽
const ins = ref(getCurrentInstance())
</script>

<template>
  <RoutePage class="PageNavHolder">
    <template #header>
      <NavBar
        :title="title"
        left-text="返回"
        left-arrow
        @click-left="router.back()"
      />
    </template>

    <div h-full flex flex-col class="PageNavHolder-Container">
      <div v-if="ins?.slots.header" px-4 py-2 class="DictionaryHolder-Header">
        <slot name="header" />
      </div>

      <div class="PageNavHolder-Content h-full w-full px-4">
        <slot />
      </div>
    </div>
  </RoutePage>
</template>

<style lang="scss" scoped>
.PageNavHolder-Container {
  height: 100%;
}

.PageNavHolder-Content {
  height: 100%;
}

.PageNavHolder {
  background-color: var(--el-bg-color);
}

.PageNavHolder-Main {
  background-color: var(--el-fill-color);
}
</style>
