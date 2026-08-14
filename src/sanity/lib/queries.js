import { defineQuery } from 'groq'

export const LAYOUT_QUERY =
  defineQuery(`*[_type == "settings" && language == $language][0]{
  menu[] {
    title,
    link-> {
      "slug": slug.current
    }
  },
  socialLinks[]
}`)

export const BLOG_QUERY = defineQuery(
  `*[_type == "page" && title == "Blog" && language == $language][0] {
    ...,
    "translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
      title,
      slug,
      language
    },
  }`
)

export const OG_QUERY = defineQuery(`*[slug.current == $slug][0]{
  title, heroImage, excerpt, SEO
}`)

export const POSTS_QUERY = defineQuery(
  `*[_type == 'post' && draft != true && language == $language] | order(publishedAt desc)[0..$limit]{
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    language,
    heroImage,
    "categories": categories[]->{title}
  }`
)

export const ALL_POSTS_QUERY = defineQuery(
  `*[_type == 'post' && draft != true] | order(publishedAt desc){
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    language,
    heroImage,
    "categories": categories[]->{title}
  }`
)

export const POST_QUERY = defineQuery(
  `*[_type == 'post' && slug.current == $slug][0] {
    ...,
    "categories": categories[]->{title},
    body[] {
      ...,
      _type == "postLink" => {
        ...@->{
          heroImage, excerpt, publishedAt, language, title 
        },
        "slug": @->slug
      }
    },
    "translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
      title,
      slug,
      language
    },
  }`
)

export const DEVELOPER_QUERY = defineQuery(
  `*[_type == 'developer' && language == $language][0]`
)
