'use client'

import { useCallback, useMemo, useState } from 'react'
import Skill from './Skill'
import HighlightSkill from './HighlightSkill'
import { useSearchParams } from 'next/navigation'
import { clsx } from 'clsx'

export default function Skills({ skills, vertical }) {
  const searchParams = useSearchParams()

  const selectedSkill = useMemo(() => {
    const searchParam = searchParams.get('skill')
    if (!searchParam) {
      return null
    }
    return skills.find((skill) => skill.name === searchParam)
  }, [searchParams, skills])

  return (
    <div
      className={clsx(
        'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-4 w-full'
      )}
    >
      {skills.map((skill) => (
        <Skill key={skill._id} skill={skill}></Skill>
      ))}
    </div>
  )
}
