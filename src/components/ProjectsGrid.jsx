import Image from 'next/image';
import { Suspense, use, } from 'react'
import { urlFor } from '~/sanity/lib/image';
import { sanityFetch } from '~/sanity/lib/live'
import { PROJECTS_QUERY } from '~/sanity/lib/queries'

const Project = ({ project }) => {
  console.log({ project });
  return (
    <div className='rounded-xl px-4 py-2 bg-gray-500 flex flex-col items-center justify-between group relative gap-4'>
      <div className='h-full gap-4 flex flex-col justify-between'>

        <div className="flex justify-between">

          <div>

        <div className="text-2xl">{project.name}</div>
        <div className="text-xl">{project.role}</div>
          </div>
        <Image src={urlFor(project.company.logo).maxWidth(100).url()}
          width={100}
          height={100}
          alt={`${project.company.name} logo`}
        ></Image>
        </div>
        <div>{project.description}</div>
        <div>
          <div className='text-lg'>Tech</div>

          <div className="grid grid-cols-2 gap-2">
            {project.skills.map(skill => (
              <div key={skill.name} className="text-md rounded-xl bg-gray-600 p-2">{skill.name}</div>
            ))}
            {project.tools.map(tool => (
              <div key={tool} className="text-md rounded-xl bg-gray-600 p-2">{tool}</div>
            ))}
          </div>

        </div>

      </div>
      <a href={project.url} target='_blank'>
        {'View project ->'}
        <Image src={urlFor(project.screenshot).maxWidth(500).url()}
          className="rounded-xl w-full aspect-square"
          width={500}
          height={500}
          alt={`${project.company.name} logo`}
        ></Image>

      </a>
    </div>

  )
}

const LoadingProjects = ({ count }) => {
  return new Array(count)
    .fill(0)
    .map((_, i) => (
      <div
        key={i}
        className='rounded-xl h-[35px] w-[70px] bg-gray-500 animate-pulse'
      ></div>
    ))
}


export default function ProjectsGrid({ title, limit }) {
  const { data: projects } = use(
    sanityFetch({ query: PROJECTS_QUERY, params: { limit } })
  )

  return (
    <div className='w-full'>
      <div className='text-xl'>{title}</div>
      <Suspense fallback={<LoadingProjects />}>
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">

          {projects.map((project) => (
            <Project key={project._id} project={project}></Project>
          ))}
        </div>
      </Suspense>
    </div>
  )
}
