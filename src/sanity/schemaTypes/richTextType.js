import { defineType } from 'sanity'

export const richTextType = defineType({
  title: 'Texte',
  type: 'object',
  name: 'richText',
  fields: [
    {
      name: 'content',
      type: 'array',
      of: [{ type: 'block' }],
      title: 'Texte',
    },
  ],
})
