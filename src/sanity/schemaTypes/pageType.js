import { defineField } from 'sanity'

export const pageType = {
  name: 'page',
  type: 'document',
  title: 'Page',
  fields: [
    {
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    },
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      initialValue: '',
    }),
    { type: 'seo', name: 'SEO' },
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
    { type: 'blockContent', title: 'Content', name: 'content' },
    {
      name: 'sections',
      type: 'array',
      title: 'Sections',
      of: [
        {
          type: 'bio',
          title: 'Bio',
        },
        {
          type: 'projectsGrid',
          title: 'Projects',
        },
        {
          type: 'skills',
          title: 'Skills',
        },
        {
          title: 'Image',
          type: 'fixedImage',
        },
        {
          title: 'Snippet',
          type: 'code',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'language',
    },
  },
}
