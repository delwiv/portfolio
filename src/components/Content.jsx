import { PortableText } from '@portabletext/react'
import FixedImage from './FixedImage'
import CodeBlock from './CodeBlock'
import { urlFor } from '~/sanity/lib/image'
import ProjectsGrid from './ProjectsGrid'
import SkillList from './SkillList'
import Bio from './Bio'

export default function Content({ item, searchParams }) {
  switch (item._type) {
    case 'richText':
      return (
        <div className='py-32'>
          <PortableText value={item.content}></PortableText>
        </div>
      )
    case 'code':
      return <CodeBlock code={item.code} language={item.language}></CodeBlock>
    case 'fixedImage':
      return (
        <FixedImage src={urlFor(item.image)} text={item.title}></FixedImage>
      )
    case 'projectsGrid':
      return <ProjectsGrid {...item} searchParams={searchParams} />
    case 'skills':
      return <SkillList {...item} />
    case 'bio':
      return <Bio {...item} />
    default:
      return (
        <pre className='w-full text-wrap'>
          {JSON.stringify({ item }, null, 2)}
        </pre>
      )
  }
}
