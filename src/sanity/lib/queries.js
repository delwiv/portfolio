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

export const SKILLS_QUERY = defineQuery(
  `*[_type == "skill"] | order(expertise desc)[0..$limit]`
)

export const PROJECTS_QUERY = defineQuery(
  `*[_type == "project"] | order(started desc)[0..$limit] {
    _id,
    name,
    description,
    start,
    role,
    skills[]->{ name },
    url,
    end,
    tools,
    screenshot,
    company-> {
      name,
      logo { asset { _ref } },
    }
  }`
)
