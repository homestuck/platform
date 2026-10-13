import { singularize } from 'inflection'

export const toSingular = (word: string) => singularize(word)
