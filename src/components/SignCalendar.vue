<script setup lang="ts">
import { calendarManager } from '~/composables/words'

// 获取近7天的日期
function getDates() {
  const dates = []
  for (let i = -3; i < 4; i++) {
    const date = new Date()
    date.setDate(date.getDate() + i)
    dates.push(date)
  }
  return dates
}

function calcAccumuData(signData: string): number {
  let num = (signData) || ''
  let amo = 0

  while (num.length) {
    if (((+num.at(-1)! || 0) & 1) === 0)
      break

    num = num.slice(0, -1)
    amo++
  }

  return amo
}

const dates = getDates()
const todayData = calendarManager.getTodayData()
const todaySigned = computed(() => todayData?.signed)
const signedDays = computed(() => (todayData?.origin.day || ''))
const signedDayMap = computed(() => signedDays.value.split(''))
const accumulateSigned = computed(() => calcAccumuData(signedDays.value))
</script>

<template>
  <div class="SignCalendar">
    <ul class="SignCalendar-Head">
      <li v-for="date in dates" :key="date.getDate()" :class="{ checked: signedDayMap[date.getDate() - 1] === '1' }">
        {{ date.getDate() }}
      </li>
    </ul>
    <div flex items-center gap-4 class="SignCalendar-Main">
      <div class="main-image">
        <div i-carbon:battery-charging />
      </div>
      <div flex flex-col class="main-content">
        <p text-sm class="title">
          坚持打卡不断电挑战
        </p>
        <p class="inner">
          <span class="normal">本月已打卡:</span><span color-green>
            {{ accumulateSigned }}
          </span>/30
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.SignCalendar-Main {
  .main-image {
    position: relative;
    display: flex;

    width: 42px;
    height: 42px;

    align-items: center;
    justify-content: center;

    color: #fff;
    font-size: 22px;
    font-weight: 600;
    border-radius: 50%;
    background-image: linear-gradient(120deg, #a6c0fe 0%, #f68084 100%);
  }

  .main-content {
    .title {
      color: var(--el-text-color-secondary);
    }

    .inner {
      color: var(--el-text-color-secondary);
    }

    .normal {
      margin-right: 0.5rem;

      color: var(--el-text-color-regular);
    }
  }
  margin-top: 4px;

  padding: 0.5rem 1rem;
}

.SignCalendar-Head {
  li.checked {
    color: var(--el-color-primary);
  }
  position: relative;
  padding: 0 1rem 0.5rem 1rem;
  display: flex;

  justify-content: space-between;

  border-bottom: 1px solid var(--el-border-color);
}

.SignCalendar {
  position: relative;
  padding: 0.5rem 0;

  width: 100%;
  height: 110px;

  border-radius: 25px;
  background-color: var(--el-fill-color);
  border: 1px solid var(--el-border-color);
}
</style>
