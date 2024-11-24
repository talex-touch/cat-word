<script setup>
const navs = reactive([
  {
    name: '学习',
    icon: 'i-carbon-book',
    path: '/',
  },
  {
    name: '探索',
    icon: 'i-carbon-explore',
    path: '/explore',
  },
  {
    name: '我的',
    icon: 'i-carbon-user',
    path: '/user',
  },
])

const route = useRoute()

const activeNav = computed(() => navs.find(item => item.path === route?.path))
</script>

<template>
  <nav v-if="activeNav" class="Application-Footer" mt-6 inline-flex gap-2 text-xl>
    <ul w-full flex justify-between>
      <li
        v-for="nav in navs" :key="nav.path" flex flex-col items-center :class="{ active: activeNav?.path === nav.path }"
        @click="$router.push(nav.path)"
      >
        <div class="nav-icon">
          <div :class="nav.icon" />
        </div>
        <span class="title">
          {{ nav.name }}
        </span>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
.Application-Footer ul li {
  &.active {
    color: var(--theme-color);
  }
  .nav-icon {
    font-size: 24px;
  }
  padding: 0 1rem;

  font-size: 16px;
  font-weight: 600;
  justify-content: space-between;
}

.Application-Footer {
  position: absolute;
  padding: 1rem;

  width: 100%;
  bottom: 0;

  height: 80px;

  flex: 1 0 80px;
  border-top: 1px solid var(--el-border-color);
}
</style>
