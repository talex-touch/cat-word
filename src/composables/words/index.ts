import cet4 from './cet4'
import high from './high'
import ielts from './ielts'
import postGraduate from './post-graduate'
import type { IDict } from './types'

export * from './types'

export interface IWord {
  word: string
  img: string[]
  content: string
  translation: any
  examples: {
    sentence: string
    translation: string
    addon: string
    highlight: string
  }[]
  synonyms: {
    word: string
    translation: string
  }[]
  derived: {
    word: string
    translation: string
  }[]
  antonyms: {
    word: string
    translation: string
  }[]
  definition: any
  type: string[]
  story: string
  backgroundStory: string
  phonetic: {
    aloud: string // 英音
    sound: string // 美音
  }
  phrases: {
    phrase: string
    example: string
    translation: string
    usage: string
  }[]
  prefix: string
  suffix: string
  remember: string
  transform: {
    word: string
    single: string
    multiple: string
    tense: string
    translation: string
  }[]
}

export interface IGlobalData {
  dict: string
  mode: Mode
  amount: number
}

export enum Mode {
  COMPREHENSIVE = 'comprehensive',
  LISTENING = 'listening',
  READING = 'reading',
  PUNCH = 'punch',
}

export const modes = reactive([

  {
    mode: Mode.COMPREHENSIVE,
    name: '综合模式',
    desc: '采用图片、音频、拼写进行综合学习',
  },
  {
    mode: Mode.LISTENING,
    name: '音析模式',
    desc: '通过听写进行学习',
  },
  {
    mode: Mode.READING,
    name: '词析模式',
    desc: '通过单词历史意义进行学习',
  },
  {
    mode: Mode.PUNCH,
    name: '小打卡',
    desc: '适合随时随地碎片化学习',
  },
])

const obj: IGlobalData = {
  dict: 'CET-4',
  mode: Mode.COMPREHENSIVE,
  amount: 10,
}

export const dictionaries = reactive<IDict[]>([
  high,
  cet4,
  postGraduate,
  ielts,
  // {
  //   id: 'CET-6',
  //   name: '六级过考词汇',
  //   type: 'English',
  //   style: {
  //     color: '#F07A67FF',
  //     colorLight: '#BC4232FF',
  //     icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M18 14h-4v-3h5V9h-5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2m-4 7v-5h4v5Z"/></svg>',
  //   },
  //   words: JSON.parse(IELTS),
  // },
])

export const globalData = useLocalStorage<IGlobalData>('globalData', JSON.parse(JSON.stringify(obj)))

export const targetDict = computed(() => dictionaries.find(item => item.id === globalData.value.dict) || dictionaries[0])
export const targetMode = computed(() => modes.find(item => item.mode === globalData.value.mode) || modes[0])
