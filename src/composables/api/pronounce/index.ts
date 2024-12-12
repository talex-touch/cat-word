export default {
  getWordPronounce(word: string) {
    const url = `https://api.quotawish.com/api/aigc/pronounce/word/${word}`

    return url
  },
}
