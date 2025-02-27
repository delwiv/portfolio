import { FILTERED_PROJECTS_QUERY, PROJECTS_QUERY } from '~/sanity/lib/queries'
import clsx from 'clsx'
import { sanityFetch } from '~/sanity/lib/live'
import { Suspense, use } from 'react'
import Project from './Project'
import LoadingProjects from './LoadingProject'
import MasonryGrid from './MasonryGrid'

export default function ProjectsGrid({ title, limit, searchParams }) {
  const search = use(searchParams)

  const { skill } = search

  const projects = use(
    sanityFetch({
      query: skill ? FILTERED_PROJECTS_QUERY : PROJECTS_QUERY,
      params: { limit, skill: skill || '' },
    })
  )

  return (
    <section className='w-full'>
      <div className='text-4xl py-4' id='projects'>
        {title}
      </div>
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
