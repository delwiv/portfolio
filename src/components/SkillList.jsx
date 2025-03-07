import { Suspense, use } from 'react'
import { sanityFetch } from '~/sanity/lib/live'
import { SKILLS_QUERY } from '~/sanity/lib/queries'
import Skills from './Skills'

const LoadingSkills = ({ count }) => {
  return new Array(count)
    .fill(0)
    .map((_, i) => (
      <div
        key={i}
        className='rounded-xl h-[35px] w-[70px] bg-gray-800 animate-pulse'
      ></div>
    ))
}

export default function SkillList({ title, limit }) {
  const { data: skills } = use(
    sanityFetch({ query: SKILLS_QUERY, params: { limit } })
  )

  return (
    <section className='w-full'>
      <div className='flex gap-4 items-center py-4 w-full'>
        <div className='text-4xl' id='skills'>
          {title}
        </div>
        <div className='text-xl font-bebas'>
          (Click on a skill to filter related projects)
        </div>
      </div>
      <Suspense fallback={<LoadingSkills count={12} />}>
        <Skills skills={skills}></Skills>
      </Suspense>
    </section>
  )
}
