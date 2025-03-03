import { notFound } from 'next/navigation'
import Content from '~/components/Content'
import PageComponent from '~/components/Page'
import { sanityFetch } from '~/sanity/lib/live'
import { POST_QUERY } from '~/sanity/lib/queries'

export default async function Page({ params }) {
  const { slug } = await params
  console.log({ slug })

  const { data: post } = await sanityFetch({
    query: POST_QUERY,
    params: { slug },
  })

  console.log({ post })

  if (!post) {
    return notFound()
  }

  return (
    <PageComponent page={post}>
      <div className='text-left flex flex-col gap-4 px-4 md:px-8 lg:px-16 max-w-screen'>
        <h1 className='text-5xl text-left w-full'>{post.title}</h1>

        {post.body.map((item) => (
          <div key={item._key} className=''>
            <Content item={item}></Content>
          </div>
        ))}
      </div>
    </PageComponent>
  )
}
