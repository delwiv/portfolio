'use client'

import { useCallback, useMemo, useState } from 'react'
import Skill from './Skill'
import HighlightSkill from './HighlightSkill'
import { useSearchParams } from 'next/navigation'

export default function Skills({ skills }) {
  const searchParams = useSearchParams()
  const selectedSkill = useMemo(() => {
    const searchParam = searchParams.get('skill')
    if (!searchParam) {
      return null
    }
    return skills.find((skill) => skill.name === searchParam)
  }, [searchParams, skills])

  return (
    <>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 w-full'>
        {skills.map((skill) => (
          <Skill key={skill._id} skill={skill}></Skill>
        ))}
      </div>
      <HighlightSkill skill={selectedSkill}></HighlightSkill>
    </>
  )
}
