import { defineField, defineType } from 'sanity'

export const projectGrid = defineType({
  name: 'projectsGrid',
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
