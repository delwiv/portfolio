'use client'

import { FILTERED_PROJECTS_QUERY, PROJECTS_QUERY } from '~/sanity/lib/queries'
import MasonryGrid from './MasonryGrid'
import { useApp } from '~/contexts/appContext'
import Project, { LoadingProjects } from './Project'
import { client } from '~/sanity/lib/client'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'

export default function ProjectsGrid({ title, limit }) {
  const { selectedSkill } = useApp()

  const projects = useQuery({
    queryKey: ['projects'],
    queryFn: () => client.fetch(PROJECTS_QUERY, { limit }),
  })

  const filteredProjects = useQuery({
    queryKey: ['filteredProjects', selectedSkill],
    queryFn: () =>
      client.fetch(FILTERED_PROJECTS_QUERY, { limit, skill: selectedSkill }),
    enabled: selectedSkill !== null,
  })

  const projectsArray =
    (selectedSkill !== null ? filteredProjects.data : projects.data) || []

  return (
    <div className='w-full'>
      <div className='text-xl'>{title}</div>
      <MasonryGrid>
        {projects.isFetching || filteredProjects.isFetching
          ? new Array(6)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className={clsx(
                    'rounded-xl bg-gray-500 animate-pulse w-full aspect-[9/16]'
                  )}
                ></div>
              ))
          : projectsArray.map((project) => (
              <Project key={project._id} project={project}></Project>
            ))}
        <div
          className={clsx('opacity-0 rounded-xl w-full aspect-[9/16]')}
        ></div>
      </MasonryGrid>
      <div className='h-96 opacity-0'></div>
    </div>
  )
}
