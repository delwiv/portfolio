import StarRating from './StarRating'

export default function HighlightSkill({ skill }) {
  if (!skill) {
    return <div id='highlight-skill'></div>
  }
  return (
    <div
      id='highlight-skill'
      className='w-full mt-12 flex flex-col gap-4 border-green-500 border bg-green-800 p-4 rounded-xl'
    >
      <div className='text-2xl'>{skill.name}</div>
      <StarRating rating={skill.expertise}></StarRating>

      <div>{skill.description}</div>
      {skill.citation && (
        <div className='italic'>&laquo; {skill.citation} &raquo;</div>
      )}
    </div>
  )
}
