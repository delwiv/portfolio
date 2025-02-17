import { defineType } from 'sanity'

export const richImageType = defineType({
  title: 'Image',
  name: 'fixedImage',
  type: 'object',
  fields: [
    {
      name: 'image',
      type: 'image',
      title: 'Image',
    },
    { name: 'title', type: 'string', title: 'Titre' },
  ],
})
