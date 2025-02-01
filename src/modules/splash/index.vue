<script setup lang="ts">
import SpalshContainer from '~/modules/splash/SplashContainer.vue'
import SplashLoading from '~/modules/splash/SplashLoading.vue'
import { ScreenMode, useGlobaSpalshlState } from '.'
import SplashLayout from './SplashLayout.vue'

const spalshState = useGlobaSpalshlState()

function checkScreenSize() {
  if (window.innerWidth > 768) {
    spalshState.screenMode.value = ScreenMode.WRAPPED
    document.body.classList.add('large-screen')
    document.body.classList.remove('mobile')
  }
  else {
    spalshState.screenMode.value = ScreenMode.MOBILE
    document.body.classList.remove('large-screen')
    document.body.classList.add('mobile')
  }
}

const { width, height } = useWindowSize()

watch([width, height], () => {
  nextTick(checkScreenSize)
})

onMounted(() => {
  checkScreenSize()
})
</script>

<template>
  <SpalshContainer>
    <SplashLoading>
      <SplashLayout>
        <template #content>
          <slot name="main" />
        </template>
        <template #footer>
          <slot name="nav" />
        </template>
      </SplashLayout>
    </SplashLoading>
  </SpalshContainer>
</template>

<style>

</style>
