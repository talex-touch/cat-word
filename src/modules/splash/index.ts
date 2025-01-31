/**
 * SpalshCore 是负责APP加载的入口
 * 此Core会在APP加载时进行初始化，并加载APP的配置文件，决定环境信息
 */
export enum ScreenMode {
  /** 移动端 */
  MOBILE,
  /** 非移动端 进行限制处理 */
  WRAPPED,
}

export const useGlobaSpalshlState = createGlobalState(
  () => {
    const screenMode = ref(0)
    return { screenMode }
  },
)
