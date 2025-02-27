import { defineType } from 'sanity'

export const developerType = defineType({
  name: 'developer',
  title: 'Developer',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'role',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string',
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'richText',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
    },
    {
      name: 'social',
      title: 'Social',
      type: 'array',
      of: [{ type: 'social' }],
    },
  ],
})
