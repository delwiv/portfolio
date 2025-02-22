import clsx from 'clsx'
import Project from './Project'

export default function LoadingProjects({ count, invisible }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3'>
      {new Array(count).fill(0).map((_, i) => (
        <Project loading key={i}></Project>
      ))}
    </div>
  )
}
