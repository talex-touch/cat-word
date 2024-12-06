import cet4 from './cet4'
import cet6 from './cet6'
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
  cet6,
  postGraduate,
  ielts,
])

export interface ISignData {
  day: number
  date: number
  words: string[]
  cost: number
  done: boolean
}

export interface CalendarData {
  year: number
  month: number

  day: string

  data: ISignData[]
}

export const globalData = useLocalStorage<IGlobalData>('globalData', JSON.parse(JSON.stringify(obj)))
export const calendarData = useLocalStorage<CalendarData[]>('calendarData', [])

export const targetDict = computed(() => dictionaries.find(item => item.id === globalData.value.dict) || dictionaries[0])
export const targetMode = computed(() => modes.find(item => item.mode === globalData.value.mode) || modes[0])

export class CalendarManager {
  createTodayData(words: string[], cost: number, done: boolean) {
    let calendar: CalendarData | undefined = this.getTodayData()?.origin

    const [year, month, day] = this.getToday()
    if (!calendar) {
      calendar = reactive({
        year,
        month,
        day: '',
        data: [],
      })

      calendarData.value.push(calendar)
    }
    else {
      calendar = reactive(calendar)
    }

    const data: ISignData = {
      day,
      date: Date.now(),
      words,
      cost,
      done,
    }

    calendar.data.push(data)

    const days = calendar.day.split('')

    while (days.length < day) {
      days.push('0')
    }

    days[day] = '1'

    calendar.day = days.join('')

    return calendar
  }

  getTodayData() {
    return this.getDayData(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())
  }

  isTodaySigned() {
    return this.getTodayData()?.signed
  }

  isDaySigned(year: number, month: number, day: number) {
    return this.getDayData(year, month, day)?.signed
  }

  getDayData(year: number, month: number, day: number) {
    const data = calendarData.value.find(item => item.year === year && item.month === month)

    if (!data)
      return null

    const dayData = data.day
    const days = dayData.split('')

    return {
      signed: days?.[day] === '1',
      dataList: data.data,
      data: data.data.find(item => item.day === day),
      origin: data,
    }
  }

  getToday() {
    return [new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()]
  }
}

export const calendarManager = new CalendarManager()
