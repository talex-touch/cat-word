/**
 * AuthModule 是负责APP验证的入口
 * 此Module会在APP加载时进行初始化
 */
export const useGlobaAuthState = createGlobalState(
  () => {
    const isLogin = ref(false)
    return { isLogin }
  },
)
