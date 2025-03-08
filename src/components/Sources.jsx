import RichText from './RichText'

export default function Sources({ sources }) {
  return (
    <div className='flex flex-col gap-4'>
      <h3>Sources</h3>
      {sources.map((source) => (
        <div className='flex flex-col' key={source.name}>
          <a href={source.url} className='underline'>
            {source.name}
          </a>
          <RichText value={source.comment.content}></RichText>
        </div>
      ))}
    </div>
  )
}
