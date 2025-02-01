<script setup lang="ts">
import { $api } from '~/composables/api'

const data = reactive({
  poster: '',
  content: '',
  author: '',
  translation: '',
})

$api.utils.getDailyQuote().then((res: any) => {
  if (!res?.content)
    return
  const { content, author, translation, origin_img_urls } = res

  Object.assign(data, {
    content,
    author,
    translation,
    poster: origin_img_urls?.[0],
  })
})
</script>

<template>
  <div class="PlanCover absolute-layout">
    <div v-if="data?.poster" class="PlanCover-Bg fake-background absolute-layout">
      <img :src="data.poster" alt="Cover">
    </div>
    <div v-if="data?.content" class="PlanCover-Main fake-background absolute-layout flex flex-col items-start justify-end">
      <p font-bold>
        {{ data.content }}
      </p>
      <p text-size-4 op-75>
        {{ data.translation }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.PlanCover {
  &-Bg {
    img {
      width: 100%;
      height: 100%;
    }
    &::after {
      z-index: 0;
    }

    transform: scale(1.25);
    filter: blur(18px) saturate(180%);

    --fake-opacity: 0.5;
  }

  &-Main {
    z-index: 1;
    padding: 10% 5%;
  }

  overflow: hidden;
}
</style>
