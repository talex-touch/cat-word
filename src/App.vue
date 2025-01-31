<script setup lang="ts">
import Splash from '~/modules/splash/index.vue'
</script>

<template>
  <Splash>
    <template #main>
      <RouterView />
    </template>

    <template #nav>
      <TheFooter />
    </template>
  </Splash>
</template>
