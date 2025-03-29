import { defineField, defineType } from 'sanity'

export const skillType = defineType({
  name: 'skill',
  title: 'Skill',
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
      name: 'since',
      type: 'date',
    }),
    defineField({
      name: 'description',
      type: 'text',
    }),
    defineField({
      name: 'citation',
      type: 'text',
    }),
    defineField({
      name: 'expertise',
      type: 'number',
      validation: (rule) => rule.positive().precision(1).min(1).max(5),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'language',
    },
  },
})
