import { defineType } from 'sanity'

export const seoType = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().min(10).max(120),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (rule) => rule.required().min(55).max(255),
    },
  ],
})
