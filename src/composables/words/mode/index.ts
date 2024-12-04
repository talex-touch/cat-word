import { type IWord, Mode } from '..'

export interface IModeManager {
  randomWord: () => IWord
}
