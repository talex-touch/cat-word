import type { IWordItem } from '..'
import type { DictStorage } from '../storage'

export abstract class PrepareWord<T> {
  mode: T
  wordsQueue: IWordItem[]

  wordIndex: number = -1
  taskAmount: number = 0

  startTime: number = 0
  endTime: number = 0

  constructor(mode: T) {
    this.mode = mode
    this.wordsQueue = []

    this.onCreated()
  }

  abstract onCreated(): void
  abstract getTargetComponent(): Component

  abstract preload(callback: (progress: number) => void): Promise<boolean>

  abstract next(success: boolean): Promise<boolean>
  abstract previous(): Promise<boolean>
  abstract finish(): Promise<boolean>

  abstract getLeftWords(): number

  get currentWord() {
    if (!this.wordsQueue.length)
      return null
    if (this.wordIndex < 0)
      return null

    return this.wordsQueue[this.wordIndex]
  }

  async loadImage(url: string) {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = url
    })
  }
}

export interface ISignMode<T> {
  getModeName: () => string
  getModeIcon: () => string
  getModeDesc: () => string
  // randomWord: () => IWord
  prepareWords: () => PrepareWord<T>
}

export abstract class SignMode implements ISignMode<SignMode> {
  dictionaryStorage: DictStorage

  abstract getModeName(): string
  abstract getModeIcon(): string
  abstract getModeDesc(): string
  // abstract randomWord(): IWord
  abstract prepareWords(): PrepareWord<any>

  constructor(dictionaryStorage: DictStorage) {
    this.dictionaryStorage = dictionaryStorage
  }
}

export enum ModeType {
  COMPREHENSIVE = 'comprehensive',
  LISTENING = 'listening',
  READING = 'reading',
  PUNCH = 'punch',
}

type ModeIdentifier = ModeType

export const modeManager = new Map<ModeIdentifier, (dictionaryStorage: DictStorage) => SignMode>()
