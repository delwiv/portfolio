import FixedImage from './FixedImage'
import CodeBlock from './CodeBlock'
import { urlFor } from '~/sanity/lib/image'
import PostsGrid from './PostsGrid'
import Image from './Image'
import RichText from './RichText'
import PostCard from './PostCard'
import Reveal from './Reveal'

export default function Content({ item, searchParams, t }) {
  switch (item._type) {
    case 'richText':
      return (
        <Reveal>
          <RichText value={item.content} />
        </Reveal>
      )
    case 'block':
      return <RichText value={item} />
    case 'content':
      return <RichText value={item.content} />
    case 'code':
      return (
        <Reveal>
          <CodeBlock code={item.code} language={item.language} t={t}></CodeBlock>
        </Reveal>
      )
    case 'fixedImage':
      return <FixedImage src={urlFor(item.image)} text={item.title}></FixedImage>
    case 'postLink':
      return (
        <Reveal className='my-8 w-full lg:max-w-md'>
          <PostCard
            post={item}
            language={item.language}
            compact
            t={t}
          ></PostCard>
        </Reveal>
      )
    case 'image':
      return (
        <Reveal>
          <Image
            className='h-auto w-auto max-w-[90ch] rounded-xl object-contain'
            alt={item.alt}
            src={urlFor(item.asset).url()}
            width={1200}
            height={480}
            blur
          ></Image>
        </Reveal>
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
