import { defineQuery } from 'groq'

export const LAYOUT_QUERY = defineQuery(`*[_type == "settings"][0]{
  menu[] {
    title,
    link-> {
      "slug": slug.current
    }
  },
  socialLinks[]
}`)

export const HOME_QUERY = defineQuery(
  `*[_type == "page" && slug == null && language == $language][0]`
)

export const BLOG_QUERY = defineQuery(
  `*[_type == "page" && title == "Blog" && language == $language][0]`
)

export const OG_QUERY = defineQuery(`*[slug.current == $slug][0]{
  title, heroImage, excerpt, SEO
}`)

export const SKILL_QUERY = defineQuery(
  `*[_type == "skill" && language == $language && name == $name][0]`
)

export const SKILLS_QUERY = defineQuery(
  `*[_type == "skill" && language == $language] | order(expertise desc)[0..$limit]`
)

export const POSTS_QUERY = defineQuery(
  `*[_type == 'post' && draft != true && language == $language] | order(publishedAt desc)[0..$limit]`
)

export const POST_QUERY = defineQuery(
  `*[_type == 'post' && slug.current == $slug][0]`
)

export const PROJECTS_QUERY = defineQuery(
  `*[_type == "project" && language == $language] | order(start desc) {
    _id,
    name,
    shortDescription,
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

export const FILTERED_PROJECTS_QUERY = defineQuery(
  `*[_type == "project" && language == $language && $skill in skills[]->name] | order(start desc) {
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

export const DEVELOPER_QUERY = defineQuery(`*[_type == 'developer'][0]`)
