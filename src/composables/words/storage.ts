import type { Dictionary } from '.'

export interface IStorage {
  data: any
}

export class DictStorage implements IStorage {
  dict: Dictionary
  data: any

  constructor(dict: Dictionary) {
    this.dict = dict
  }
}
