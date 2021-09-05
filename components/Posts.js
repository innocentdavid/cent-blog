import Image from 'next/image'
import Link from 'next/link'
import { openLoading, truncate } from '../myFunctions'

const Posts = ({ tech, pets, programming }) => {
  
  return (<>
    {/* Latest Posts on Tech */}
    <div>
      <h2 style={{ marginBottom: 15 }}>
        Latest Posts on Tech
        <Link onClick={openLoading} href="/tech"><a className="homepage-latest-blog-posts-view-all">View all</a></Link>
      </h2>

      {tech?.map((post) => {
        // console.log(post)
        const prettyDate = new Date(post.createdAt).toLocaleString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        })

        return (
          <div key={post.slug} className="blog_post_card">
            <div className="blog_post_card__date"><time dateTime={post.createdAt}>{prettyDate}</time></div>
            <Link onClick={openLoading} href={`/posts/${post.slug}`}><a><h3 className="blog_post_card__title">{post?.title}</h3></a></Link>
            <div className="author">
              {post?.author?.photoURL && <Image alt={post.author.userName} src={post?.author?.photoURL} height="60" width="60" className="authorPhoto" />}
              <Link onClick={openLoading} href={`/author/${post?.author?.slug}`}><a className="blog_post_card__author_name">{post?.author?.userName}</a></Link>
            </div>
            <p className="blog_post_card__description">{truncate(post?.excerpt)}</p>
            <Link onClick={openLoading} href={`/posts/${post?.slug}`}><a className="read-more">Read more {`>`}</a></Link>
          </div>
        )
      })}
    </div>

    <br />
    <br />
    <hr />
    <br />
    <br />

    {/* Latest Posts on Pets */}
    <div>
      <h2 style={{ marginBottom: 15 }}>
        Latest Posts on Pets
        <Link onClick={openLoading} href="/programming"><a className="homepage-latest-blog-posts-view-all">View all</a></Link>
      </h2>

      {pets?.map((post) => {
        // console.log(post)
        const prettyDate = new Date(post.createdAt).toLocaleString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        })

        return (
          <div key={post.slug} className="blog_post_card">
            <div className="blog_post_card__date"><time dateTime={post.createdAt}>{prettyDate}</time></div>
            <Link onClick={openLoading} href={`/posts/${post.slug}`}><a><h3 className="blog_post_card__title">{post?.title}</h3></a></Link>
            <div className="author">
              {post?.author?.photoURL && <Image alt={post.author.userName} src={post?.author?.photoURL} height="60" width="60" className="authorPhoto" />}
              <Link onClick={openLoading} href={`/author/${post?.author?.slug}`}><a className="blog_post_card__author_name">{post?.author?.userName}</a></Link>
            </div>
            <p className="blog_post_card__description">{truncate(post?.excerpt)}</p>
            <Link onClick={openLoading} href={`/posts/${post?.slug}`}><a className="read-more">Read more {`>`}</a></Link>
          </div>
        )
      })}
    </div>

    <br />
    <br />
    <hr />
    <br />
    <br />

    {/* Latest Posts on Programming */}
    <div>
      <h2 style={{ marginBottom: 15 }}>
        Latest Posts on Programming
        <Link onClick={openLoading} href="/programming"><a className="homepage-latest-blog-posts-view-all">View all</a></Link>
      </h2>

      {programming?.map((post) => {
        // console.log(post)
        const prettyDate = new Date(post.createdAt).toLocaleString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        })

        return (
          <div key={post.slug} className="blog_post_card">
            <div className="blog_post_card__date"><time dateTime={post.createdAt}>{prettyDate}</time></div>
            <Link onClick={openLoading} href={`/posts/${post?.slug}`}><a><h3 className="blog_post_card__title">{post?.title}</h3></a></Link>
            <div className="author">
              {post?.author?.photoURL && <Image alt={post.author.userName} src={post?.author?.photoURL} height="60" width="60" className="authorPhoto" />}
              <Link onClick={openLoading} href={`/author/${post?.author?.slug}`}><a className="blog_post_card__author_name">{post?.author?.userName}</a></Link>
            </div>
            <p className="blog_post_card__description">{truncate(post?.excerpt)}</p>
            <Link onClick={openLoading} href={`/posts/${post?.slug}`}><a className="read-more">Read more {`>`}</a></Link>
          </div>
        )
      })}
    </div>
  </>)
}

export default Posts