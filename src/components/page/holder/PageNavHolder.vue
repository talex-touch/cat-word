<script setup lang="ts">
import { NavBar } from 'vant'
import LineLoading from '~/components/chore/LineLoading.vue'
import Logo from '~/components/chore/Logo.vue'

withDefaults(defineProps<{
  title: string
  header?: boolean
  loading?: boolean
  contentPadding?: boolean
}>(), {
  contentPadding: true,
})

const router = useRouter()

// 获取插槽
const ins = ref(getCurrentInstance())
</script>

<template>
  <RoutePage :class="{ loading }" class="PageNavHolder">
    <template #header>
      <NavBar
        :title="title"
        left-text="返回"
        left-arrow
        @click-left="router.back()"
      />
    </template>

    <div relative h-full flex flex-col class="PageNavHolder-Container">
      <div v-if="ins?.slots.header" px-4 py-2 class="DictionaryHolder-Header">
        <slot name="header" />
      </div>

      <div :class="{ 'px-4': contentPadding }" class="PageNavHolder-Content h-full w-full">
        <slot />
      </div>

      <div class="transition-cubic PageNavHolder-Loading absolute-layout z-1 h-full w-full flex flex-col items-center justify-center gap-4 p-4">
        <Logo />
        <LineLoading class="!w-[50%]" :progress="-1" />
      </div>
    </div>
  </RoutePage>
</template>

<style lang="scss" scoped>
.PageNavHolder-Loading {
  .loading & {
    opacity: 1;
    pointer-events: all;
  }

  .LogoContainer {
    width: 72px;
    height: 72px;
  }

  opacity: 0;
  pointer-events: none;
  background-color: var(--el-fill-color);
}

.PageNavHolder-Container {
  height: 100%;
}

.PageNavHolder-Content {
  height: 100%;

  overflow-y: auto;
}

.PageNavHolder {
  background-color: var(--el-bg-color);
}

.PageNavHolder-Main {
  background-color: var(--el-fill-color);
}
</style>
