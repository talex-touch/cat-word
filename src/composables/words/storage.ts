import type { RemovableRef } from '@vueuse/core'
import type { Dictionary, IWord } from '.'

export interface IStorage {
  data: any

  /** 设置单词已学习 */
  setLearned: (word: string) => void

  /** 设置单词未学习 */
  setUnlearned: (word: string) => void

  /** 获取单词是否已学习 */
  getLearned: (word: string) => boolean

  /** 获取已学习单词 */
  getLearnedWords: () => IWord[]

  /** 获取未学习单词 */
  getUnlearnedWords: () => IWord[]

  /** 获取所有单词 */
  getAllWords: () => IWord[]

  /** 随机获取一个未学习单词和相关的3个选项 */
  randomUnlearnedWordsWithOptiohns: () => {
    mainWord: string
    options: string[]
  }
}

export interface IWordData {
  word: string
}

export class WordData {
  word: string

  constructor(word: string) {
    this.word = word
  }
}

export class DictStorage implements IStorage {
  dict: Dictionary
  data: WordData[]

  constructor(dict: Dictionary) {
    this.dict = dict

    this.data = useLocalStorage<WordData[]>(`word-data-${dict.id}`, []) as unknown as WordData[]
  }

  randomUnlearnedWordsWithOptiohns() {
    // const totalWords = this.getAllWords()
    const unlearnedWords = [...this.getUnlearnedWords()]

    const _options: any[] = []
    while (_options.length < 4) {
      const randomIndex = Math.floor(Math.random() * unlearnedWords.length)
      const selectWord = unlearnedWords[randomIndex]

      if (_options.includes(selectWord))
        continue

      _options.push(selectWord)

      unlearnedWords.splice(randomIndex, 1)
    }

    const [mainWord, ...options] = _options

    return { mainWord, options }
  }

  dataContainsWord(word: string) {
    if (!this.data)
      this.data = []

    return this.data.some(item => item.word === word)
  }

  setLearned(word: string) {
    if (this.dataContainsWord(word))
      return

    this.data.push(new WordData(word))
  }

  setUnlearned(word: string) {
    this.data = this.data.filter(item => item.word !== word)
  }

  getLearned(word: string) {
    return this.dataContainsWord(word)
  }

  getLearnedWords() {
    return JSON.parse(JSON.stringify(this.data))
  }

  getUnlearnedWords() {
    const totalWords = this.getAllWords()
    const learnedWords = this.getLearnedWords()

    return totalWords.filter(item => !learnedWords.includes(item))
  }

  getAllWords() {
    return this.dict.words
  }
}
