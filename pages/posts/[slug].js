import Image from 'next/image'
import Link from 'next/link'
import { getAllPosts, getPostBySlug, getAuthorBySlug } from '../../lib/api'

export default function Post({ post }) {
  const prettyDate = new Date(post?.createdAt).toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })

  return (
    <div className="post">
      <h1>{post?.title}</h1>

      <time dateTime={post?.createdAt}>{prettyDate}</time>

      {post?.author && <>
        <div style={{ marginTop: 15 }}><strong>Authors:</strong></div>

        {post?.author?.map((author, index) => {
          return (
            <div key={index}>

              <Image alt={author?.name} src={author?.profilePictureUrl} height="40" width="40" />

              <Link href={author?.permalink}>
                <a style={{ marginLeft: 10 }}>
                  {author?.name}
                </a>
              </Link>
            </div>
          )
        })}
      </>}

      <div dangerouslySetInnerHTML={{ __html: post?.body }} />
    </div>
  )
}

export function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug)
  const authors = post.authors.map(author => getAuthorBySlug(author))
  const author = getAuthorBySlug(post?.author)
  const reviewer = getAuthorBySlug(post?.reviewer)

  return {
    props: {
      post: {
        ...post,
        author: authors,
        reviewer,
      },
    },
  }
}


export function getStaticPaths() {
  return {
    fallback: false,
    paths: getAllPosts()?.map(post => ({
      params: {
        slug: post?.slug,
      },
    })),
  }
}