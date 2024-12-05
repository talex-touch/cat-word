<script setup>

</script>

<template>
  <div class="PersonalPage">
    <header class="header">
      <div class="header-top">
        <p>
          个人主页
        </p>
      </div>

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
      <SignCalendar />

      <LineArrow>
        <template #icon>
          <div i-carbon:calendar />
        </template>
        我的日历
      </LineArrow>
      <LineArrow>
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
      top: 0;
      left: 0;
      width: 100%;
      height: 30%;

      background-color: var(--theme-color);
      z-index: -1;
    }

    .header-img {
      img {
        width: 92px;
        height: 92px;

        border-radius: 50%;
      }
      padding: 8px;
      width: 108px;
      height: 108px;

      border-radius: 50%;
      background-color: var(--theme-color);
    }
    .header-content {
      display: flex;

      align-items: center;
      flex-direction: column;
      justify-content: space-between;

      p.name {
        font-size: 20px;
        font-weight: 600;
      }
    }
    position: relative;
    padding: 2rem 1rem;
    display: flex;

    gap: 1rem;
    align-items: center;
    flex-direction: column;
  }
  z-index: 1;
  position: relative;

  width: 100%;
  height: 100%;
}

.footer {
  text-align: center;
  padding: 20px 0;
}
</style>
