import { defineType } from 'sanity'

export const socialType = defineType({
  name: 'social',
  title: 'Social',
  type: 'object',
  fields: [
    {
      name: 'platform',
      title: 'Platform',
      type: 'string',
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'image',
    },
  ],
})
