import { FILTERED_PROJECTS_QUERY, PROJECTS_QUERY } from '~/sanity/lib/queries'
import { sanityFetch } from '~/sanity/lib/live'
import { Suspense, use } from 'react'
import Project from './Project'
import LoadingProjects from './LoadingProject'
import MasonryGrid from './MasonryGrid'
import { parseHeaders } from '~/utils/headers'
import HighlightSkill from './HighlightSkill'
import { getSelectedSkill } from '~/utils/skills'

export default function ProjectsGrid({ title, limit, searchParams }) {
  const search = use(searchParams)
  const { language, pathname } = use(parseHeaders())

  const { skill } = search

  const projects = use(
    sanityFetch({
      query: skill ? FILTERED_PROJECTS_QUERY : PROJECTS_QUERY,
      params: { limit, skill: skill || '', language },
    })
  )

  const selectedSkill = use(getSelectedSkill(skill))

  return (
    <section className='w-full'>
      <div className='text-4xl py-4' id='projects'>
        {title}
      </div>
      <HighlightSkill
        className='mb-4'
        pathname={pathname}
        skill={selectedSkill?.data}
      />
      <Suspense fallback={<LoadingProjects />}>
        <MasonryGrid>
          {projects.data.map((project, i) => (
            <Project index={i + 1} key={project._id} project={project} />
          ))}
        </MasonryGrid>
      </Suspense>
    </section>
  )
}
