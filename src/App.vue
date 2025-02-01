<script setup lang="ts">
import Auth from '~/modules/auth/index.vue'
import Splash from '~/modules/splash/index.vue'
</script>

<template>
  <Splash>
    <template #main>
      <RouterView />

      <Auth />
    </template>

    <template #nav>
      <TheFooter />
    </template>
  </Splash>
</template>
