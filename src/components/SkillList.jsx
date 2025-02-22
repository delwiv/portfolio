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
        className='rounded-xl h-[35px] w-[70px] bg-gray-500 animate-pulse'
      ></div>
    ))
}

export default function SkillList({ title, limit }) {
  const { data: skills } = use(
    sanityFetch({ query: SKILLS_QUERY, params: { limit } })
  )

  return (
    <div className='w-full'>
      <div className='text-xl' id='skills'>
        {title}
      </div>
      <Suspense fallback={<LoadingSkills />}>
        <Skills skills={skills}></Skills>
      </Suspense>
    </div>
  )
}
