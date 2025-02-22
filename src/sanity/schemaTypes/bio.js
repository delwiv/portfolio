import { defineType } from 'sanity'

export const bio = defineType({
  name: 'bio',
  title: 'Bio',
  type: 'document',
  fields: [
    {
      name: 'developer',
      title: 'Developer',
      type: 'reference',
      to: [{ type: 'developer' }],
    },
  ],
})
