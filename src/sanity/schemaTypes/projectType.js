import { defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'start',
      type: 'date',
    }),
    defineField({
      name: 'end',
      type: 'date',
    }),
    defineField({
      name: 'role',
      type: 'string',
    }),
    defineField({
      name: 'description',
      type: 'richText',
    }),
    defineField({
      name: 'tools',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'company',
      type: 'reference',
      to: [{ type: 'company' }],
    }),
    defineField({
      name: 'skills',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'skill' }],
        },
      ],
    }),
    defineField({
      name: 'screenshot',
      type: 'image',
    }),
    defineField({
      name: 'url',
      type: 'url',
    }),
  ],
})
