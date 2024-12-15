<script setup lang="ts" generic="T extends any, O extends any">
import DisplayIndexCourse from '~/components/display/IndexCourse.vue'

defineOptions({
  name: 'IndexPage',
})

const cozeWebSDK = new CozeWebSDK.WebChatClient({
  config: {
    // 智能体 ID
    botId: '7448405006673412115',
  },
  ui: {
    footer: {
      expressionText: 'Powered by {{QuotaWish}}.',
      linkvars: {
        QuotaWish: {
          text: 'QuotaWish 科塔智爱',
          link: 'https://quotawish.com',
        },
      },
    },
    chatBot: {
      title: 'Lucas Tata',
    },
    asstBtn: {
      isNeed: false,
    },
    base: {
      icon: 'https://ai.quotawish.com/favicon.ico',
    },
  },
})
</script>

<template>
  <div class="IndexPage">
    <div class="IndexPage-Header">
      <div class="coffee-font" text-1.75xl flex items-center gap-1 font-bold @click="cozeWebSDK.showChatBot()">
        <img w-8 src="/ai-logo.png">
        Tata
      </div>

      <div flex items-center gap-2 class="IndexPage-Header-Info">
        <RoundInfo type="danger">
          <div i-carbon-favorite-filled />
          5
        </RoundInfo>

        <RoundInfo type="warning">
          <div i-carbon-star-filled />
          400
        </RoundInfo>
      </div>
    </div>

    <div mx-auto class="IndexPage-Card w-95%">
      <WordSignInfo />
    </div>

    <DisplayIndexCourse />

    <br>
  </div>
</template>

<style lang="scss">
.IndexPage-Card {
  p.title {
    margin: 0 0 1rem;

    color: var(--el-text-color-placeholder);
    font-size: 24px;
    font-weight: 600;
  }
}

.IndexPage-Header {
  .IndexPage-Header-Info {
    font-size: 14px;
  }

  & > p {
    color: #000;
  }

  z-index: 1;
  position: sticky;
  display: flex;
  padding: 1rem;

  top: 0;

  justify-content: space-between;

  background-color: var(--el-bg-color);
}

.IndexPage {
  position: relative;

  height: 100%;

  overflow-y: scroll;
  background-color: var(--el-bg-color);
}
</style>
