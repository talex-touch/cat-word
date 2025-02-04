<script setup lang="ts">
import { NavBar } from 'vant'

defineProps<{
  title: string
}>()

const router = useRouter()
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
      <div px-4 py-2 class="DictionaryHolder-Header">
        <slot name="header" />
      </div>

      <div class="PageNavHolder-Content h-full w-full flex">
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
