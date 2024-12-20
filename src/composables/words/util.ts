import { useSound } from '@vueuse/sound'
import { $api } from '../api'

import ErrorAudio from '/sound/error.wav'
import SuccessAudio from '/sound/success.wav'

export function useWordSound(word: string): Promise<HTMLAudioElement> {
  const url = $api.pronounce.getWordPronounce(word)

  const audio = new Audio()
  audio.src = url

  return new Promise((resolve, reject) => {
    audio.oncanplaythrough = () => resolve(audio)
    audio.onerror = reject
  })
}

export function useErrorAudio() {
  const audio = new Audio()
  audio.src = ErrorAudio

  return audio
}

export function useSuccessAudio() {
  const audio = new Audio()
  audio.src = SuccessAudio

  return audio
}
