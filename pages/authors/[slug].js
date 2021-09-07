import Image from 'next/image'
import Link from 'next/link'
import HeadMetadata from '../../components/HeadMetadata'
import { truncate } from '../../myFunctions'
import { db } from '../../utils/fire-config/firebase'

export default function Author({ author, posts, totalPost }) {

  if (author) {
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


  }else{
    return (<>
      <h2 style={{ marginTop: 30, padding: '0 15%' }}>Sorry we couldn't find the author you're looking for 😒</h2>
    </>)
  }
}

export const getServerSideProps = async (context) => {
  const { slug } = context.params;
  // console.log({ slug })
  if (slug) {
    const getAuthor = await db.collection("users").doc(slug).get();
    const author = getAuthor?.data();
    const getPosts = getAuthor?.exists && await db.collection("posts").where('author.email', '==', author?.email).get();
    const posts = !getPosts?.empty ? getPosts?.docs?.map(post => ({ ...post?.data(), postId: post?.id })) : [];
    const totalPost = !getPosts.empty ? posts?.length : 0;

    if (getAuthor.exists) {
      return {
        props: { author, posts, totalPost }
      }
    } else {
      return {
        props: {}
      }
    }
  }
}