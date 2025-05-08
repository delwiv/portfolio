import { sanityFetch } from '~/sanity/lib/live'
import { SKILL_QUERY } from '~/sanity/lib/queries'
import { parseHeaders } from './headers'

export async function getSelectedSkill(name) {
  if (name) {
    const { language } = await parseHeaders()
    return sanityFetch({
      query: SKILL_QUERY,
      params: {
        name,
        language,
      },
    })
  }
}
