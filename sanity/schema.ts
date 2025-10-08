import { type SchemaTypeDefinition } from 'sanity'
import questions from './questions'
import settings from './settings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [questions, settings],
}
