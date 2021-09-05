import Image from 'next/image'
import Link from 'next/link'
import { truncate } from '../../myFunctions'
import { db } from '../../utils/fire-config/firebase'

export default function Author({ author, posts }) {
  // console.log(posts)

  return (
    <div key={author.slug} className="parent">
      <div className="left"></div>
      <div className="middle homepage-container" style={{ marginTop: 0 }}>

        <div className="author">
          <Image alt={author?.userName} src={author?.photoURL} className="authorPhoto" height="80" width="80" />
          <h1 className="blog_post_card__author_name">{author?.userName}</h1>

        </div>
        <h2>Posts</h2>
        <ul>
          {posts ? posts.map(post => {
            // console.log(post)

            return (
              <li key={post.slug} className="blog_post_card">
                <Link href={`/posts/${post.slug}`}>
                  <a>{post.title}</a>
                </Link>
                <p>{truncate(post.excerpt)}</p>
                <Link href={`/posts/${post?.slug}`}><a className="read-more">Read more {`>`}</a></Link>
              </li>
            )
          }) : <>no post found!</>}
        </ul>

      </div>
      <div className="right"></div>
    </div>
  )
}

export const getStaticPaths = async () => {
  const users = await db.collection("users").get();
  const paths = users.docs.map(user => ({
    params: {
      slug: user?.data().slug
    }
  }));

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async (context) => {
  const { slug } = context.params;
  // console.log({ slug })
  const userRes = await db.collection("users").doc(slug).get();
  const user = userRes?.data();
  const userPostsRes = await db.collection("posts").where('author.email', '==', user.email).get();
  const posts = userPostsRes?.docs.map(post => ({ ...post.data(), postId: post.id }));

  if (userRes.exists) {
    return {
      props: {
        author: user,
        posts
      }
    }
  } else {
    return {
      props: {}
    }
  }
}