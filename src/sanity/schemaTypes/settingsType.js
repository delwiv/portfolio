export const settingsType = {
  name: 'settings',
  type: 'document',
  title: 'Settings',
  fields: [
    {
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    },
    {
      name: 'menu',
      title: 'Menu header',
      type: 'array',
      of: [
        {
          name: 'entry',
          title: 'Page',
          type: 'object',
          fields: [
            {
              type: 'reference',
              name: 'link',
              to: [
                {
                  type: 'page',
                },
              ],
            },
            {
              type: 'string',
              name: 'title',
              title: 'Name',
            },
          ],
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      title: 'Contact',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              type: 'string',
              title: 'Plateforme',
            },
            {
              name: 'text',
              type: 'string',
              title: 'Texte',
            },
            {
              name: 'url',
              type: 'url',
              title: 'URL',
            },
          ],
        },
      ],
    },
  ],
}
