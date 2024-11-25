export * from './dark'

export async function sleep(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}

export async function useRequestAnimationFrame() {
  return new Promise(resolve => requestAnimationFrame(resolve))
}

export function formateType(type: string[], len: number = -1) {
  let types = type.map((item) => {
    return item.replace(/[^a-z]/gi, '')
  })

  if (len !== -1) {
    types = types.splice(0, len)
  }

  return types.join('/')
}

export function useVibrate(type: 'light' | 'heavy' | 'medium' | 'bit') {
  switch (type) {
    case 'light':
      useAutoVibrate([5])
      break
    case 'heavy':
      useAutoVibrate([5, 30])
      break
    case 'medium':
      useAutoVibrate([10, 15])
      break
    case 'bit':
      useAutoVibrate([2, 1])
      break
  }
}

export function useAutoVibrate(duration: number[]) {
  if (typeof window !== 'undefined' && window.navigator.vibrate)
    window.navigator.vibrate(duration)
}
