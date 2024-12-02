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
    name: '高考高频词汇',
    type: 'English',
    style: {
      color: '#E8992C',
      colorLight: '#A8670BFF',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M30 15h-2.05A12.01 12.01 0 0 0 17 4.05V2h-2v2.05A12.01 12.01 0 0 0 4.05 15H2v2h2.05A12.01 12.01 0 0 0 15 27.95V30h2v-2.05A12.01 12.01 0 0 0 27.95 17H30ZM17 25.95V22h-2v3.95A10.02 10.02 0 0 1 6.05 17H10v-2H6.05A10.02 10.02 0 0 1 15 6.05V10h2V6.05A10.02 10.02 0 0 1 25.95 15H22v2h3.95A10.02 10.02 0 0 1 17 25.95"/></svg>',
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
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M18 10v8zm1-1h-2v8h-3V9h-2v10h5v4h2v-4h1v-2h-1z"/></svg>',
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
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M18 14h-4v-3h5V9h-5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2m-4 7v-5h4v5Z"/></svg>',
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
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M3.6 22.5c-1-2-1.6-4.2-1.6-6.5C2 8.3 8.3 2 16 2v2C9.4 4 4 9.4 4 16c0 2 .5 3.8 1.4 5.5zM28 16c0 6.6-5.4 12-12 12c-2.9 0-5.6-1-7.7-2.8l5.7-5.7l-1.4-1.5l-6.5 6.5c-.4.4-.4 1 0 1.4C8.7 28.5 12.3 30 16 30c7.7 0 14-6.3 14-14z"/><path fill="currentColor" d="M18 25c-.1 0-.3 0-.4-.1c-.3-.1-.6-.4-.6-.8l-.7-5l2-.3l.4 3.3l2.2-1.7V15c0-.3.1-.5.3-.7l3.2-3.2c.9-.9 1.5-2.2 1.5-3.5V6h-1.5c-1.3 0-2.6.5-3.5 1.5l-3.2 3.2c-.2.2-.4.3-.7.3h-5.5l-1.7 2.2l3.3.4l-.3 2l-5-.7c-.4 0-.7-.3-.8-.6s-.1-.7.1-1l3-4q.45-.3.9-.3h5.6l3-3c1.3-1.3 3.1-2 4.9-2H26c1.1 0 2 .9 2 2v1.5c0 1.9-.7 3.6-2 4.9l-3 3V21c0 .3-.1.6-.4.8l-4 3c-.2.1-.4.2-.6.2"/></svg>',
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
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M24.832 16.969c-.272-.647-.581-1.38-.883-2.285c-.79-2.369 1.734-4.953 1.758-4.977l-1.414-1.414c-.14.14-3.423 3.478-2.242 7.023c.326.978.652 1.75.938 2.43A9.4 9.4 0 0 1 24 22a6.24 6.24 0 0 1-4.19 5.293a8.52 8.52 0 0 0-2.103-8l-1.044-1.044l-.582 1.357c-1.836 4.284-4.021 6.154-5.306 6.934A5.84 5.84 0 0 1 8 22a9.6 9.6 0 0 1 .929-3.629A11.3 11.3 0 0 0 10 14v-1.778c.874.36 2 1.303 2 3.778v2.604l1.743-1.935c3.112-3.454 2.463-7.567 1.206-10.308A4.486 4.486 0 0 1 18 11h2c0-5.537-4.579-7-7-7h-2l1.2 1.599c.137.185 2.862 3.927 1.353 7.688A4.94 4.94 0 0 0 9 10H8v4a9.6 9.6 0 0 1-.929 3.629A11.3 11.3 0 0 0 6 22c0 3.848 3.823 8 10 8s10-4.152 10-8a11.4 11.4 0 0 0-1.168-5.031M12.835 27.526a16.5 16.5 0 0 0 4.367-5.598a6.1 6.1 0 0 1 .257 5.971A11 11 0 0 1 16 28a10.3 10.3 0 0 1-3.165-.474"/></svg>',
    },
    words: CET4,
  },
])

export const globalData = useLocalStorage('globalData', JSON.parse(JSON.stringify(obj)))

export const targetDict = computed(() => dictionaries.find(item => item.id === globalData.value.dict) || dictionaries[0])
export const targetMode = computed(() => modes.find(item => item.mode === globalData.value.mode) || modes[0])
