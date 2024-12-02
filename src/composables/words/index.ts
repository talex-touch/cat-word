import { words as CET4 } from './CET-4'
import { words as CET6 } from './CET-6'

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
}

export interface IDict {
  id: string
  name: string
  type: string
  style: {
    color: string
    colorLight: string
    icon: string
  }
  words: IWord[]
}

export const dictionaries = reactive<IDict[]>([
  {
    id: 'HIGH',
    name: '高考过考词汇',
    type: 'English',
    style: {
      color: '#E8992C',
      colorLight: '#A8670BFF',
      icon: 'i-carbon:center-circle',
    },
    words: CET4,
  },
  {
    id: 'CET-4',
    name: '四级过考词汇',
    type: 'English',
    style: {
      color: '#629E83',
      colorLight: '#3D5E4B',
      icon: 'i-carbon-number-4',
    },
    words: CET4,
  },
  {
    id: 'CET-6',
    name: '六级过考词汇',
    type: 'English',
    style: {
      color: '#F28372',
      colorLight: '#C04A3A',
      icon: 'i-carbon-number-6',
    },
    words: CET6,
  },
  {
    id: 'post-graduate',
    name: '考研过考词汇',
    type: 'English',
    style: {
      color: '#6B92BF',
      colorLight: '#4D6E9B',
      icon: 'i-carbon-mac-shift',
    },
    words: CET4,
  },
  {
    id: 'IELTS',
    name: '雅思过考词汇',
    type: 'English',
    style: {
      color: '#C7A90F',
      colorLight: '#A48A0A',
      icon: 'i-carbon-fire',
    },
    words: CET4,
  },
])

export const globalData = useLocalStorage('globalData', JSON.parse(JSON.stringify(obj)))

export const targetDict = computed(() => dictionaries.find(item => item.id === globalData.value.dict) || dictionaries[0])
export const targetMode = computed(() => modes.find(item => item.mode === globalData.value.mode) || modes[0])
