import { FILTERED_PROJECTS_QUERY, PROJECTS_QUERY } from '~/sanity/lib/queries'
import MasonryGrid from './MasonryGrid'
import clsx from 'clsx'
import { sanityFetch } from '~/sanity/lib/live'
import { Suspense, use } from 'react'
import Project, { LoadingProjects } from './Project'

export default function ProjectsGrid({ title, limit, searchParams }) {
  const search = use(searchParams)

  const { skill } = search

  const projects = use(
    sanityFetch({ query: PROJECTS_QUERY, params: { limit } })
  )

  const filteredProjects =
    skill &&
    use(
      sanityFetch({
        query: FILTERED_PROJECTS_QUERY,
        params: { limit, skill },
      })
    )

  const projectsArray = (skill ? filteredProjects.data : projects.data) || []

  const isServer = typeof window === 'undefined'

  return (
    <div className='w-full'>
      <div className='text-4xl py-4' id='projects'>
        {title}
      </div>
      <Suspense fallback={<LoadingProjects />}>
        <MasonryGrid>
          {projectsArray.map((project, i) => (
            <Project
              index={i + 1}
              key={project._id}
              project={project}
              immediateShow={isServer}
            />
          ))}
          <div
            className={clsx('opacity-0 rounded-xl w-full aspect-[9/16]')}
          ></div>
        </MasonryGrid>
      </Suspense>
    </div>
  )
}
