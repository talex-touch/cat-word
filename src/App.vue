<script setup lang="ts">
import Auth from '~/modules/auth/index.vue'
import Splash from '~/modules/splash/index.vue'
</script>

<template>
  <Splash>
    <template #main>
      <router-view v-slot="{ Component }">
        <!-- <transition name="el-fade-in-linear"> -->
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
        <!-- </transition> -->
      </router-view>
      <!-- <RouterView /> -->

      <Auth />
    </template>

    <template #nav>
      <TheFooter />
    </template>
  </Splash>
</template>
