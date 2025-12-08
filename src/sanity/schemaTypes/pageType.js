import { defineField } from 'sanity'
import { apiVersion } from '../env.js'

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
        isUnique: async function (slug, context) {
          const { document, getClient } = context

          const client = getClient({ apiVersion })

          const id = document?._id

          if (!slug?.current || !id) {
            return true
          }

          const type = document._type
          const language = document.language

          const params = {
            type,
            language,
            slug: slug.current,
          }

          const query = `!defined(*[slug.current == $slug && _type == $type && language == $language][0]._id`

          const result = await client.fetch(query, params)
          return result || false
        },
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
