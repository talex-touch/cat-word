import { useSound } from '@vueuse/sound'
import { $api } from '../api'

export async function useWordSound(word: string) {
  const url = $api.pronounce.getWordPronounce(word)

  const audio = new Audio()
  audio.src = url

  return audio
}
