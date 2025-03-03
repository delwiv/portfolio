import { defineField, defineType } from 'sanity'

export const postsGrid = defineType({
  name: 'postsGrid',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'limit',
      type: 'number',
      validation: (rule) => rule.integer().min(1),
    }),
  ],
})
