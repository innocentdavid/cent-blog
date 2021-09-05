import Image from 'next/image'
import Link from 'next/link'
import { db } from '../../utils/fire-config/firebase'

export default function Authors({ authors }) {
  // console.log(authors)

  return (
    <div className="parent">
      <div className="left"></div>
      <div className="middle homepage-container" style={{ marginTop: 0 }}>

        <div className="authors">
          <h1>Authors</h1>

          {authors?.map(author => {
            // console.log(author)

            return (
              <div key={author.slug}>
                <div className="author">
                  {author?.photoURL && <Image alt={author.userName} src={author?.photoURL} height="60" width="60" className="authorPhoto" />}
                  <Link href={`/authors/${author?.slug}`}><a className="blog_post_card__author_name">{author?.userName}</a></Link>
                </div>

                {/* <p>{author.posts.length} post(s)</p> */}

                <Link href={`/authors/${author.slug}`}><a>Go to profile →</a></Link>
              </div>
            )
          })}
        </div>


      </div>
      <div className="right"></div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const ref = await db.collection('users').limit(30).get();
  const authors = ref.docs.map(author => ({ ...author.data(), authorId: author.id }));

  return {
    props: { authors },
    // revalidate: 10
  }
}