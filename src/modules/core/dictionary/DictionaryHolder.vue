<script setup lang="ts">
import { NavBar } from 'vant'

defineProps<{
  visible: boolean
}>()

const router = useRouter()
</script>

<template>
  <RoutePage :visible="visible" class="DictionaryHolder">
    <template #header>
      <NavBar
        title="选择词典"
        left-text="返回"
        left-arrow
        @click-left="router.back()"
      />
    </template>

    <div h-full flex flex-col class="DictionaryHolder-Container">
      <div px-4 py-2 class="DictionaryHolder-Header">
        <slot name="header" />
      </div>

      <div class="DictionaryHolder-Content h-full w-full flex">
        <div class="DictionaryHolder-Nav z-1 w-[64px] flex-shrink-0">
          <slot name="nav" />
        </div>
        <div class="DictionaryHolder-Main w-full flex flex-1 flex-wrap justify-between overflow-x-hidden overflow-y-scroll p-2">
          <slot />
        </div>
      </div>
    </div>
  </RoutePage>
</template>

<style lang="scss" scoped>
.DictionaryHolder-Container {
  height: 100%;
}

.DictionaryHolder-Content {
  height: 100%;
}

.DictionaryHolder-Nav {
  height: 100%;

  overflow-y: auto;
}

.DictionaryHolder-Main {
  max-width: calc(100% - 64px);
  background-color: var(--el-fill-color);
}

.DictionaryHolder-Header {
  // border-bottom: 1px solid var(--el-border-color-light);
}
</style>
