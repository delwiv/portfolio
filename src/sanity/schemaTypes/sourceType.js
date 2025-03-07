import { defineType } from 'sanity'

export const sourceType = defineType({
  name: 'source',
  type: 'object',
  fields: [
    {
      type: 'url',
      name: 'url',
    },
    {
      type: 'string',
      name: 'name',
    },
    {
      type: 'richText',
      name: 'comment',
    },
  ],
})
