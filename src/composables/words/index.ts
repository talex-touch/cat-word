export interface IWord {
  word: string
  img: string[]
  content: string
  translation: any
  examples: {
    sentence: string
    translation: string
    addon: any
  }[]
  synonyms: string[]
  antonyms: {
    word: string
    translation: string
  }[]
  definition: any
  type: string[]
  story: string
}

export interface IGlobalData {

}

const obj: IGlobalData = {}

export const globalData = useLocalStorage('globalData', JSON.parse(JSON.stringify(obj)))
