import { notFound } from 'next/navigation'
import Content from '~/components/Content'
import PageComponent from '~/components/Page'
import PostSummary from '~/components/PostSummary'
import Sources from '~/components/Sources'
import { sanityFetch } from '~/sanity/lib/live'
import { POST_QUERY } from '~/sanity/lib/queries'
import { extractSummary } from '~/utils/summary'

export default async function Page({ params }) {
  const { slug } = await params

  const { data: post } = await sanityFetch({
    query: POST_QUERY,
    params: { slug },
  })

  if (!post) {
    return notFound()
  }

  const summary = extractSummary(post)

  return (
    <PageComponent page={post}>
      <div className='text-left gap-4 px-4 xl:px-16 w-full flex flex-col lg:flex-row relative'>
        <div className='flex-1'>
          <PostSummary summary={summary}></PostSummary>
        </div>
        <div className='lg:flex-[3] rounded-xl bg-gray-800 p-8'>
          <h1 className='text-5xl text-left w-full'>{post.title}</h1>
          {post.body.map((item) => (
            <div key={item._key} className=''>
              <Content item={item}></Content>
            </div>
          ))}
          <Sources sources={post.sources}></Sources>
        </div>
      </div>
    </PageComponent>
  )
}
