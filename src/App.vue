<script setup lang="ts">
import Auth from '~/modules/auth/index.vue'
import Core from '~/modules/core/index.vue'
import Splash from '~/modules/splash/index.vue'

const router = useRouter()
</script>

<template>
  <Splash>
    <template #main>
      <router-view v-slot="{ Component }">
        <transition :name="router.transition.name">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
      <!-- <RouterView /> -->

      <Auth />
      <Core />
    </template>

    <template #nav>
      <TheFooter />
    </template>
  </Splash>
</template>
