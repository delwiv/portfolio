import { defineField } from 'sanity'

export const pageType = {
  name: 'page',
  type: 'document',
  title: 'Page',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 4,
    }),
    {
      name: 'heroImage',
      type: 'image',
      title: 'Hero Image',
    },
    {
      name: 'heroText',
      type: 'text',
      title: 'Hero Text',
    },
    {
      name: 'sections',
      type: 'array',
      title: 'Sections',
      of: [
        {
          type: 'projectsGrid',
          title: 'Projects',
        },
        {
          type: 'skills',
          title: 'Skills',
        },
        {
          type: 'richText',
          title: 'Texte',
        },
        {
          title: 'image',
          type: 'fixedImage',
        },
        {
          title: 'snippet',
          type: 'code',
        },
      ],
    },
  ],
}
