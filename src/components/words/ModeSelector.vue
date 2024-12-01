<script setup lang="ts">
import { globalData, modes, targetMode } from '~/composables/words'

const active = computed({
  get() {
    return globalData.value.mode
  },
  set(val) {
    globalData.value.mode = val
  },
})
const el = ref<HTMLElement>()

async function fixActive() {
  const id = `selector-item-${active.value}`
  const dom = document.querySelector(`#${id}`)

  if (!dom)
    return

  dom.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
}

watch(active, () => nextTick(() => fixActive()), { immediate: true })
</script>

<template>
  <div ref="el" class="ModeSelector">
    <el-scrollbar>
      <div class="ModeSelector-Wrapper">
        <div
          v-for="(mode, ind) in modes" :id="`selector-item-${ind}`" :key="mode.mode"
          :class="{ active: mode.mode === active }" class="ModeSelector-Item" @click="active = mode.mode"
        >
          <p class="title">
            {{ mode.name }}
          </p>

          <div class="checkmark">
            <div i-carbon-checkmark />
          </div>
        </div>
      </div>
    </el-scrollbar>

    <p px-6>
      <el-text>{{ targetMode.desc }}</el-text>
    </p>

    <!-- <el-button style="width: 85%;left: 7.5%" relative my-6 type="primary" size="large">
      确定
    </el-button> -->
  </div>
</template>

<style lang="scss">
.ModeSelector-Item {
  .checkmark {
    position: absolute;
    display: flex;

    width: 32px;
    height: 32px;

    left: 0.5rem;
    bottom: 0.5rem;

    align-items: center;
    justify-content: center;

    border-radius: 50%;
    background-color: var(--el-fill-color);

    transition: 0.25s;
    transform: scale(0);
  }

  &.active {
    .checkmark {
      transform: scale(1);
    }

    transform: scale(1.025);
  }

  .title {
    font-size: 20px;
    font-weight: 600;

    color: #000;
  }

  position: relative;
  padding: 1rem;

  width: 100px;
  height: 130px;

  flex: 1 0 100px;
  border-radius: 12px;
  background-image: linear-gradient(to right, var(--theme-color), var(--theme-color-light)),
    linear-gradient(120deg, #a6c0fe 0%, #f68084 100%);
  border: 2px solid var(--theme-color-light);
}

.ModeSelector-Wrapper {
  padding: 3rem 1rem 2rem 1rem;
  display: flex;

  gap: 0.5rem;
  // width: 100%;
}

.ModeSelector {
  position: relative;

  width: 100%;

  overflow: hidden;
}
</style>
