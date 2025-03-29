'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.jsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion } from './src/sanity/env'
import { schema } from './src/sanity/schemaTypes'
import { structure } from './src/sanity/structure'
import { codeInput } from '@sanity/code-input'
import { documentInternationalization } from '@sanity/document-internationalization'
import { internationalizedArray } from 'sanity-plugin-internationalized-array'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET

export default defineConfig({
  name: 'portfolio',
  title: 'Portfolio',
  // basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({ structure }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    codeInput(),
    documentInternationalization({
      // ...or a function that takes the client and returns a promise of an array of supported languages
      supportedLanguages: [
        { id: 'en', title: 'English' },
        { id: 'fr', title: 'French' },
      ],
      // Translations UI will only appear on these schema types
      schemaTypes: [
        'page',
        'skill',
        'company',
        'project',
        'bio',
        'seo',
        'developer',
        'post',
      ],
      // Optional
      // Customizes the name of the language field
      languageField: `language`, // defauts to "language"
      // Optional
      // Keep translation.metadata references weak
      weakReferences: true, // defaults to false
    }),
    internationalizedArray({
      languages: [
        { id: 'en', title: 'English' },
        { id: 'fr', title: 'French' },
      ],
      defaultLanguages: ['en'],
      fieldTypes: ['string', 'text'],
    }),
  ],
})
