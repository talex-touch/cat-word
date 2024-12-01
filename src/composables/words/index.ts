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

export const dictionaries = reactive([

  {
    id: 'HIGH',
    name: '高考过考词汇',
    type: 'English',
    style: {

    },
  },
  {
    id: 'CET-4',
    name: '四级过考词汇',
    type: 'English',
  },
  {
    id: 'CET-6',
    name: '六级过考词汇',
    type: 'English',
  },
  {
    id: 'post-graduate',
    name: '考研过考词汇',
    type: 'English',
  },
  {
    id: 'IELTS',
    name: '雅思过考词汇',
    type: 'English',
  },
])

export const globalData = useLocalStorage('globalData', JSON.parse(JSON.stringify(obj)))

export const targetDict = computed(() => dictionaries.find(item => item.id === globalData.value.dict) || dictionaries[0])
export const targetMode = computed(() => modes.find(item => item.mode === globalData.value.mode) || modes[0])
