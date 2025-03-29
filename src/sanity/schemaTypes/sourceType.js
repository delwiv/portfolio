import { defineType } from 'sanity'

export const sourceType = defineType({
  name: 'source',
  type: 'object',
  fields: [
    {
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    },
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
