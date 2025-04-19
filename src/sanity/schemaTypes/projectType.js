import { defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
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
      name: 'shortDescription',
      type: 'string',
    }),
    defineField({
      name: 'url',
      type: 'url',
    }),
    defineField({
      name: 'role',
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
      name: 'description',
      type: 'blockContent',
    }),
    defineField({
      name: 'private',
      type: 'boolean',
    }),
    defineField({
      name: 'online',
      type: 'boolean',
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
