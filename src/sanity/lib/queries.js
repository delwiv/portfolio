import { defineQuery } from 'groq'

export const LAYOUT_QUERY = defineQuery(`*[_type == "settings"][0]{
  menu[] {
    title,
    link-> {
      "slug": slug.current
    }
  }
}`)

export const HOME_QUERY = defineQuery(
  `*[_type == "page" && title == "Home"][0]`
)

export const SKILLS_QUERY = defineQuery(`*[_type == "skill"][0..$limit]`)
