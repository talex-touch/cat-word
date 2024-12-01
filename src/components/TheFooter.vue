<script lang="ts" setup>
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
    path: '/personal',
  },
])

const route = useRoute()
const router = useRouter()

const activeNav = computed(() => navs.find(item => item.path === route?.path))

const indicator = ref<HTMLElement>()

async function fixIndicator() {
  if (!indicator.value)
    return

  await sleep(20)

  const ind = navs.findIndex(item => item.path === route?.path)
  const el = document.querySelector(`#footer-nav-item-${ind + 1}`) as HTMLElement

  if (!el)
    return

  const x = el.offsetLeft

  Object.assign(indicator.value.style, {
    opacity: '0.5',
    transform: `${indicator.value.style.transform} scale(0.5)`,
  })

  await sleep(20)

  Object.assign(indicator.value.style, {
    opacity: '',
    transform: `translateX(${x - 32}px) scale(0.5)`,
  })

  await sleep(200)

  Object.assign(indicator.value.style, {
    opacity: '',
    transform: `translateX(${x - 32}px) scale(1)`,
  })
}

watchEffect(() => {
  const _ignore = indicator.value

  fixIndicator()
})
</script>

<template>
  <nav v-if="activeNav" class="Application-Footer fake-background" mt-6 inline-flex gap-2 text-xl>
    <ul w-full flex justify-between>
      <li
        v-for="(nav, ind) in navs" :id="`footer-nav-item-${ind + 1}`" :key="nav.path" flex flex-col items-center
        :class="{ active: activeNav?.path === nav.path }" @click="router.push(nav.path)"
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
  <div v-if="activeNav" ref="indicator" class="Application-Footer-Indicator transition-cubic" />
</template>

<style lang="scss">
.Application-Footer ul li {
  &.active {
    opacity: 1;
    color: var(--el-text-color-regular);
  }
  .nav-icon {
    font-size: 20px;
  }
  padding: 0 1rem;

  opacity: 0.75;
  font-size: 12px;
  font-weight: 600;
  justify-content: space-between;
  color: var(--el-text-color-secondary);
}

.Application-Footer {
  z-index: 1;
  position: absolute;
  padding: 1rem;

  width: 100%;
  bottom: 0;

  height: 80px;

  flex: 1 0 80px;
  border-radius: 16px 16px 0 0;
  border-top: 1px solid var(--el-border-color);

  backdrop-filter: blur(18px) saturate(180%);
}

.Application-Footer-Indicator {
  position: absolute;

  left: 0;
  bottom: 0;

  width: 108px;
  height: 108px;

  opacity: 0.75;
  filter: blur(32px);
  background-color: var(--theme-color);
}
</style>
