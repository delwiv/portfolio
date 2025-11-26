import PdfResume from '~/components/PdfResume'
import { sanityFetch } from '~/sanity/lib/live'
import {
  DEVELOPER_QUERY,
  RESUME_PROJECTS_QUERY,
  SKILLS_QUERY,
} from '~/sanity/lib/queries'
import { parseHeaders } from '~/utils/headers'

export default async function Page() {
  const { locale: language } = await parseHeaders()

  const [{ data: developer }, { data: skills }, { data: projects }] =
    await Promise.all([
      sanityFetch({ query: DEVELOPER_QUERY, params: { language } }),
      sanityFetch({ query: SKILLS_QUERY, params: { language, limit: 150 } }),
      sanityFetch({
        query: RESUME_PROJECTS_QUERY,
        params: { language },
      }),
    ])

  return (
    <div className='pt-[56px] pb-[82px] h-dvh overflow-y-scroll w-dvw'>
      <PdfResume
        data={{ developer, skills, projects }}
        instantDownload
      ></PdfResume>
    </div>
  )
}
