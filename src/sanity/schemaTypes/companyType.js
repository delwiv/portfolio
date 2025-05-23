import { defineField, defineType } from 'sanity'

export const companyType = defineType({
  name: 'company',
  title: 'Company',
  type: 'document',
  fields: [
    {
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    },
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'description',
      type: 'string',
    }),
    defineField({
      name: 'url',
      type: 'url',
    }),
    defineField({
      name: 'closed',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'logo',
      type: 'image',
    }),
    defineField({
      name: 'screenshot',
      type: 'image',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'language',
    },
  },
})
