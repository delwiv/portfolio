import { Suspense, use } from 'react'
import { sanityFetch } from '~/sanity/lib/live'
import { SKILLS_QUERY } from '~/sanity/lib/queries'

const LoadingSkills = ({ count }) => {
  return new Array(count)
    .fill(0)
    .map((_, i) => (
      <div
        key={i}
        className='rounded-xl h-[35px] w-[70px] bg-gray-500 animate-pulse'
      ></div>
    ))
}

const Skills = ({ limit }) => {
  const { data: skills } = use(
    sanityFetch({ query: SKILLS_QUERY, params: { limit } })
  )

  console.log({ skills })
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4'>
      {skills.map((skill) => (
        <div key={skill._key} className='rounded-xl px-4 py-2 bg-gray-500 flex flex-col items-center'>
          {skill.name}
        </div>
      ))}
    </div>
  )
}
export default function SkillList({ title, limit }) {
  return (
    <div>
      <div className='text-xl'>{title}</div>
      <Suspense fallback={<LoadingSkills />}>
        <Skills limit={limit}></Skills>
      </Suspense>
    </div>
  )
}
