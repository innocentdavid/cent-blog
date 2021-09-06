import Image from 'next/image'
import Link from 'next/link'
import HeadMetadata from '../../components/HeadMetadata'
import { truncate } from '../../myFunctions'
import { db } from '../../utils/fire-config/firebase'

export default function Posts({ posts }) {
  // console.log(posts)
  
  return (<>
    <HeadMetadata title='Cent Blog | Programming updates' metaDescription="Get latest update on programming" />

    <main className="parent">
      <div className="left"></div>


      <div className="middle posts">
        {posts.map(post => {
          const prettyDate = new Date(post.createdAt).toLocaleString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
          })

          return (
            <div key={post.slug} className="blog_post_card">
            <div className="blog_post_card__date"><time dateTime={post.createdAt}>{prettyDate}</time></div>
            <Link href={`/posts/${post.slug}`}><a><h3 className="blog_post_card__title">{post?.title}</h3></a></Link>
            <div className="author">
              {post?.author?.photoURL && <Image alt={post.author.userName} src={post?.author?.photoURL} height="60" width="60" className="authorPhoto" />}
              <Link href={`/author/${post?.author?.slug}`}><a className="blog_post_card__author_name">{post?.author?.userName}</a></Link>
            </div>
            <p className="blog_post_card__description">{truncate(post?.excerpt)}</p>
            <Link href={`/posts/${post?.slug}`}><a className="read-more">Read more {`>`}</a></Link>
          </div>
          )
        })}
      </div>
    </main>

      <br />
      <br />
      <br />
  </>)
}


export const getServerSideProps = async () => {
  const ref = await db.collection('posts').where('category', '==', 'code').limit(20).get();
  const posts = ref.docs.map(post => ({ ...post.data(), postId: post.id }));

  return {
    props: { posts },
    // revalidate: 10
  }
}
