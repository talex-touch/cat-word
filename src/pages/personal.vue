<script setup>
import { calendarManager } from '~/composables/words'

async function handleClear() {
  calendarManager.clear()

  await useRequestAnimationFrame()

  alert('已清除打卡数据')
}
</script>

<template>
  <div class="PersonalPage">
    <header class="header">
      <!-- <div class="header-top">
        <p>
          个人主页
        </p>
      </div> -->

      <div class="header-img">
        <img src="/avatar.jpg">
      </div>
      <div class="header-content">
        <p class="name">
          Test Account
        </p>
        <p>爱学习的猫咪</p>
      </div>
    </header>

    <main px-4 class="main">
      <SignCalendar my-1 />
      <SignCalendarMonthly my-4 />

      <!-- <LineArrow>
        <template #icon>
          <div i-carbon:calendar />
        </template>
        我的日历
      </LineArrow> -->
      <LineArrow @click="handleClear">
        <template #icon>
          <div i-carbon:user-feedback />
        </template>
        帮助与反馈
      </LineArrow>
    </main>

    <footer class="footer">
      <p text-sm op-50>
        版权所有 &copy; QuotaWish
      </p>
    </footer>
  </div>
</template>

<style lang="scss">
.PersonalPage {
  .header {
    .header-top {
      position: absolute;

      top: 1rem;
      left: 1rem;

      font-size: 1.25rem;
      font-weight: 600;
    }

    &::before {
      content: '';
      position: absolute;

      top: -18px;
      right: -18px;

      width: 128px;
      height: 128px;

      z-index: -1;
      opacity: 0.5;
      filter: invert(0.2) brightness(150%);
      border-radius: 50%;
      background-image: radial-gradient(circle at center, var(--theme-color) 0%, #0000 80%);
    }
    &::after {
      content: '';
      position: absolute;

      top: -68px;
      right: -68px;

      width: 258px;
      height: 258px;

      z-index: -1;
      opacity: 0.5;
      border-radius: 50%;
      filter: invert(0.1) brightness(250%);
      background-image: radial-gradient(circle at center, var(--theme-color) 0%, #0000 80%);
    }

    .header-img {
      img {
        width: 64px;
        height: 64px;

        border-radius: 50%;
      }
      padding: 4px;
      width: 72px;
      height: 72px;

      border-radius: 50%;
      // background-color: var(--theme-color);
    }

    .header-content {
      display: flex;

      // align-items: center;
      flex-direction: column;
      justify-content: space-between;

      p.name {
        font-size: 20px;
        font-weight: 600;
      }
    }
    position: relative;
    padding: 0.5rem 1rem;
    display: flex;

    gap: 1rem;
    color: #000;
    align-items: center;
    // flex-direction: column;
  }
  z-index: 1;
  position: relative;

  width: 100%;
  height: 100%;

  overflow-y: scroll;
  overflow-x: hidden;
}

.PersonalPage {
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background-image: linear-gradient(to right, var(--theme-color), var(--theme-color-dark));
    z-index: -1;
  }

  .main {
    padding: 1rem;

    height: 100%;

    border-radius: 36px;
    background-color: var(--el-bg-color);
  }
}

.footer {
  text-align: center;
  padding: 20px 0;
}
</style>
