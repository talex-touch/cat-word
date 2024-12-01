<script setup lang="ts">
const max = 50

const options = computed(() => Array.from({ length: max / 5 }, (_, i) => (i + 1) * 5))

// 根据每个选项算出天数 然后倒叙
const days = computed(() => options.value.map(option => Math.ceil(max / option)))
</script>

<template>
  <div class="PlanPicker">
    <div class="PlanPicker-Column">
      <div class="PlanPicker-Header-Title">
        每日打卡数量
      </div>
      <ul class="PlanPicker-Main">
        <el-scrollbar>
          <li v-for="option in options" :key="option">
            {{ option }}个
          </li>
        </el-scrollbar>
      </ul>
    </div>
    <div class="PlanPicker-Column">
      <div class="PlanPicker-Header-Title">
        累计完成天数
      </div>
      <ul class="PlanPicker-Main">
        <el-scrollbar>
          <li v-for="option in days" :key="option">
            {{ option }}天
          </li>
        </el-scrollbar>
      </ul>
    </div>

    <div class="PlanPicker-Selection">
      <div class="checkmark">
        <div i-carbon:checkmark />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.PlanPicker-Selection {
  &::before {
    content: '';
    position: absolute;

    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    z-index: -1;

    opacity: 0.25;
    background-color: var(--theme-color-light);
  }
  .checkmark {
    position: absolute;
    display: flex;

    top: 50%;
    right: 0.5rem;

    width: 24px;
    height: 24px;

    color: #000;
    align-items: center;
    justify-content: center;

    border-radius: 50%;
    background-color: var(--theme-color-light);

    transform: translateY(-50%);
  }
  position: absolute;
  padding: 0.75rem 0;

  top: 50%;

  width: 100%;
  height: 40px;

  transform: translateY(-50%) translateY(2rem) translateY(12px);
}

.PlanPicker-Column {
  .PlanPicker-Header-Title {
    padding: 1rem 0;

    color: var(--el-text-color-secondary);

    border-bottom: 1px solid var(--el-border-color);
  }

  .PlanPicker-Main {
    li {
      margin: 1rem 0;

      text-align: center;
    }
    height: 120px;

    width: 100%;

    justify-content: center;
  }
  z-index: 1;
  display: flex;

  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.PlanPicker {
  padding: 1rem;
  display: flex;

  width: 100%;

  justify-content: space-around;
}
</style>
