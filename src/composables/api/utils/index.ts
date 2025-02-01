import { endHttp } from '../axios'

export default {
  getWordPronounce(word: string) {
    const url = `https://api.quotawish.com/api/aigc/pronounce/word/${word}`

    return url
  },
  getDailyQuote() {
    const url = `https://dailyquote.quotawish.com/weapps/dailyquote/quote`

    return endHttp.get(url)
  }
}
