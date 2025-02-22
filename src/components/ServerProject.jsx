import Project from './Project'

export default function ServerProject({
  project,
  index,
  loading,
  immediateShow,
}) {
  return (
    <Project
      project={project}
      index={index}
      loading={loading}
      immediateShow={immediateShow}
    ></Project>
  )
}

export const LoadingProjects = ({ count }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3'>
      {new Array(count).fill(0).map((_, i) => (
        <Project key={i} loading={true}></Project>
      ))}
    </div>
  )
}
