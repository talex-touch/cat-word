import { PrepareWord, SignMode } from '.'
import { globalData, type IWord, type IWordItem, useWordSound } from '..'
import type { DictStorage } from '../storage'

export class ComprehensivePrepareWord extends PrepareWord<ComprehensiveMode> {
  onCreated(): void {
    const globalAmo = globalData.value.amount
    const storage = this.mode.dictionaryStorage
    const unlearedWords = storage.getUnlearnedWords()
    const amo = Math.min(globalAmo, unlearedWords.length)

    this.taskAmount = amo
  }

  wordsFinished: IWordItem[] = []

  async preloadWordData(word: {
    mainWord: IWord
    options: IWord[]
  }) {
    // load images
    const { mainWord } = word

    const promises: Promise<HTMLElement>[] = mainWord.img.map(async item => this.loadImage(item))

    promises.push(useWordSound(mainWord.word))

    return Promise.all(promises)
  }

  preload(callback: (progress: number) => void): Promise<boolean> {
    // 提前加载前2个单词的数据 / 后续根据用户行为习惯决定加载数量 2-3 个
    const PRELOAD_WORD_AMO = 2

    const storage = this.mode.dictionaryStorage
    // const unlearedWords = storage.getUnlearnedWords()

    return new Promise((resolve) => {
      let progress = 0
      const words = []

      for (let i = 0; i < this.taskAmount; ++i) {
        words.push(storage.randomUnlearnedWordsWithOptiohns())
        progress += 1
        callback(+((progress / this.taskAmount) / 2).toFixed(2))
      }

      this.wordsQueue = words

      const promises = words.filter((_, ind) => ind + 1 < PRELOAD_WORD_AMO).map(async (word) => {
        const res = await this.preloadWordData(word)

        progress += 1

        callback(+(progress / this.taskAmount).toFixed(2))

        return res
      })

      Promise.all(promises).then(() => {
        this.wordIndex = 0

        resolve(true)
      },
      )
    })
  }

  async next(success: boolean): Promise<boolean> {
    if (!this.currentWord)
      throw new Error('Current word not exist, cannot get next word')

    if (success) {
      // 从queue中删除
      this.wordsQueue.splice(this.wordIndex, 1)
      this.wordsFinished.push(this.currentWord!)
    }

    if (this.wordsQueue.length === 0) {
      return false
    }

    this.wordIndex++

    // 预备加载下下一个单词
    const nextIndex = this.wordIndex + 2
    if (nextIndex < this.wordsQueue.length)
      this.preloadWordData(this.wordsQueue[nextIndex])

    return true
  }

  // 只能返回上一个未成功选择的单词
  async previous(): Promise<boolean> {
    if (!this.currentWord)
      throw new Error('Current word not exist, cannot get previous word')

    if (this.wordIndex === 0) {
      return false
    }

    if (this.wordsQueue.length === 0) {
      return false
    }

    this.wordIndex--

    return true
  }

  async finish(): Promise<boolean> {
    if (!this.currentWord) {
      return false
    }

    if (this.wordIndex !== this.wordsQueue.length - 1) {
      return false
    }

    throw new Error('Method not implemented.')
  }

  getTargetComponent(): Component {
    throw new Error('Method not implemented.')
  }
}

export class ComprehensiveMode extends SignMode {
  getModeIcon(): string {
    return '🥊'
  }

  getModeDesc() {
    return 'Punch words in the air'
  }

  getModeName() {
    return '随时打卡'
  }

  prepareWords() {
    return new ComprehensivePrepareWord(this)
  }

  constructor(dictionaryStorage: DictStorage) {
    super(dictionaryStorage)
  }
}
