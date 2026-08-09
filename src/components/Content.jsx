import FixedImage from './FixedImage'
import CodeBlock from './CodeBlock'
import { urlFor } from '~/sanity/lib/image'
import PostsGrid from './PostsGrid'
import Image from './Image'
import RichText from './RichText'
import PostCard from './PostCard'

export default function Content({ item, searchParams }) {
  switch (item._type) {
    case 'richText':
      return (
        <div className='py-32'>
          <RichText value={item.content} />
        </div>
      )
    case 'block':
      return <RichText value={item} />
    case 'content':
      return <RichText value={item.content} />
    case 'code':
      return <CodeBlock code={item.code} language={item.language}></CodeBlock>
    case 'fixedImage':
      return (
        <FixedImage src={urlFor(item.image)} text={item.title}></FixedImage>
      )
    case 'postLink':
      return (
        <div className='w-full flex justify-start'>
          <div className='max-w-[500px]'>
            <PostCard post={item} language={item.language} compact></PostCard>
          </div>
        </div>
      )
    case 'image':
      return (
        <Image
          className='object-contain w-full h-full'
          alt={item.alt}
          src={urlFor(item.asset).url()}
          width={1200}
          height={480}
        ></Image>
      )
    case 'postsGrid':
      return <PostsGrid {...item} searchParams={searchParams} />
    default:
      return (
        <pre className='w-full text-wrap'>
          {JSON.stringify({ item }, null, 2)}
        </pre>
      )
  }
}
