import ComprehensiveWord from '~/components/words/mode/ComprehensiveWord.vue'
import { PrepareWord, SignMode } from '.'
import { calendarManager, globalData, type IWord, type IWordItem, useWordSound } from '..'
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

    // const promises: Promise<HTMLElement>[] = mainWord.img.map(async item => this.loadImage(item))
    const promises: Promise<HTMLElement>[] = [mainWord.img[0]].map(async item => this.loadImage(item))

    promises.push(useWordSound(mainWord.word))

    return Promise.all(promises)
  }

  preload(callback: (progress: number) => void): Promise<boolean> {
    // 提前加载前5个单词的数据 / 后续根据用户行为习惯决定加载数量 2-3 个
    const PRELOAD_WORD_AMO = 5

    const storage = this.mode.dictionaryStorage
    // const unlearedWords = storage.getUnlearnedWords()

    return new Promise((resolve) => {
      const maxProgress = PRELOAD_WORD_AMO * 5 * this.taskAmount + this.taskAmount
      let progress = 0
      const words = []

      for (let i = 0; i < this.taskAmount; ++i) {
        words.push(storage.randomUnlearnedWordsWithOptiohns())
        progress += 1
        callback(+(progress / maxProgress).toFixed(2))
      }

      this.wordsQueue = words

      const promises = words.filter((_, ind) => ind + 1 <= PRELOAD_WORD_AMO).map(async (word) => {
        const res = await this.preloadWordData(word)

        progress += this.taskAmount * 5

        callback(+(progress / maxProgress).toFixed(2))

        return res
      })

      Promise.all(promises).then(() => {
        this.wordIndex = 0

        this.startTime = Date.now()
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
    else {
      const obj = this.wordsQueue[this.wordIndex]

      obj.wrongHistory.push(Date.now())
    }

    if (this.wordsQueue.length === 0) {
      return false
    }

    this.wordIndex++

    // 预备加载下5个单词
    const nextIndex = this.wordIndex + 5
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

    this.endTime = Date.now()

    const duration = this.endTime - this.startTime

    const words = this.wordsQueue.map(i => i.mainWord.word)

    calendarManager.createTodayData(words, duration, true)

    return true
  }

  getLeftWords(): number {
    return this.wordsQueue.length - this.wordIndex
  }

  getTargetComponent(): Component {
    return ComprehensiveWord
  }
}

export class ComprehensiveMode extends SignMode {
  getModeIcon(): string {
    return '👁️'
  }

  getModeDesc() {
    return '采用图片、音频、拼写进行综合学习'
  }

  getModeName() {
    return '综合沉浸'
  }

  prepareWords() {
    return new ComprehensivePrepareWord(this)
  }

  constructor(dictionaryStorage: DictStorage) {
    super(dictionaryStorage)
  }
}
