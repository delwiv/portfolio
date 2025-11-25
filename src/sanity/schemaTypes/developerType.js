import { defineType } from 'sanity'

export const developerType = defineType({
  name: 'developer',
  title: 'Developer',
  type: 'document',
  fields: [
    {
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    },
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
      type: 'blockContent',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
    },
    {
      name: 'homeQrcode',
      title: 'Home QR Code',
      type: 'image',
    },
    {
      name: 'resumeQrcode',
      title: 'Resume QR Code',
      type: 'image',
    },
    {
      name: 'social',
      title: 'Social',
      type: 'array',
      of: [{ type: 'social' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'language',
    },
  },
})
