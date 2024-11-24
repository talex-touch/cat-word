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