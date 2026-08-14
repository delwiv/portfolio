// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { createClient } from 'next-sanity'
import { defineLive } from 'next-sanity/live'

// Import environment variables
import { apiVersion, dataset, projectId } from '../env'

export const { sanityFetch, SanityLive } = defineLive({
  client: createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
  }),
  // Revalider les fetchs Sanity toutes les 5 min en production.
  // Sans ça, next-sanity met en cache indéfiniment (revalidate: false) :
  // les mises à jour du studio n'apparaissent qu'après un restart.
  // Coût quota négligeable : 1 re-fetch par page vue, par 5 min (CDN entre-temps).
  fetchOptions: {
    revalidate: 300,
  },
})
