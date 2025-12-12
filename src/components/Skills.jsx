'use client'

import Skill from './Skill'
import { clsx } from 'clsx'

export default function Skills({ skills }) {
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
