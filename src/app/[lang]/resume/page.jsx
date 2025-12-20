import PdfResume from '~/components/PdfResume'
import TranslationsComponent from '~/components/TranslationsComponent'
import { sanityFetch } from '~/sanity/lib/live'
import {
  DEVELOPER_QUERY,
  RESUME_PROJECTS_QUERY,
  SKILLS_QUERY,
} from '~/sanity/lib/queries'
import { getTranslation } from '~/utils/translations'

export default async function Page({ params }) {
  const { lang } = await params

  const language = lang || 'en'

  const t = await getTranslation(language)

  const [{ data: developer }, { data: skills }, { data: projects }] =
    await Promise.all([
      sanityFetch({ query: DEVELOPER_QUERY, params: { language } }),
      sanityFetch({
        query: SKILLS_QUERY,
        params: {
          language,
        },
      }),
      sanityFetch({
        query: RESUME_PROJECTS_QUERY,
        params: { language },
        tags: [`${new Date().valueOf()}`],
      }),
    ])

  return (
    <>
      <TranslationsComponent
        translations={[{ language: 'en' }, { language: 'fr' }]}
        language={lang}
        basePath='/$LANG/resume'
      ></TranslationsComponent>
      <PdfResume
        data={{ developer, skills, projects }}
        t={t}
        language={language}
      ></PdfResume>
    </>
  )
}
