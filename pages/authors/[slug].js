import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import HeadMetadata from '../../components/HeadMetadata'
import { openLoading, truncate } from '../../myFunctions'
import { db } from '../../utils/fire-config/firebase'

export default function Author({ slug }) {
  const [author, setAuthor] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalPost, setTotalPost] = useState(0);

  useEffect(() => {
    openLoading('open');
    const fetch = async () => {
      const authorRes = await db.collection("users").doc(slug).get();
      if (authorRes.exists) { setAuthor(authorRes?.data()) }
      const postsRef = await db.collection("posts").where('author.email', '==', authorRes?.data().email).get();
      const posts = postsRef?.docs.map(post => ({ ...post.data(), postId: post.id }));
      if (!postsRef.empty) { setPosts(posts); setTotalPost(posts.length) }
    }
    fetch();
    openLoading('close');
  }, []);

  return (<>
    <HeadMetadata title={`Cent Blog | ${author?.userName}`} metaDescription={`Hi, I'm ${author?.userName}, I write to inspire!`} />

    <div key={author?.slug} className="parent">
      <div className="left"></div>
      <div className="middle homepage-container" style={{ marginTop: 0 }}>

        <div className="author">
          {author?.userName && <Image alt={author?.userName} src={author?.photoURL} className="authorPhoto" height="80" width="80" />}
          
          <div>
            <h1 className="blog_post_card__author_name">{author?.userName}</h1>
            <span style={{ color: '#868994', fontSize: '.875rem', marginLeft: 20 }}>Total published - {totalPost}</span>
          </div>
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
  </>)
}

Author.getInitialProps = ({ query }) => {
  return {
    slug: query.slug,
  }
}