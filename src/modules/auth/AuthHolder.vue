<script setup lang="ts">
import { useGlobaAuthState } from '.'

const authState = useGlobaAuthState()
</script>

<template>
  <teleport defer to="#rootApp">
    <div :class="{ display: !authState.isLogin.value }" class="AuthHolder transition-cubic absolute-layout">
      <slot />
    </div>
  </teleport>
</template>

<style lang="scss" scoped>
.AuthHolder {
  &.display {
    transform: translateY(0) scale(1);
  }

  z-index: 1;

  transform: translateY(120%) scale(0.8);
  background-color: var(--el-bg-color);
}
</style>
