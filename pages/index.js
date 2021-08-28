import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <main className="parent">
        <div className="left"></div>
        <div className="middle homepage-container">

          <div className="homepage-introduction">
            <h1>Hi, I&#39;m Paul Innocent. I help people learn software development. I love pets too and tech stuff</h1>
            <p>I&#39;m a full stack software developer. I write about modern Node.js, JavaScript, and development.</p>
          </div>

          <div className="blog_post_card">
            <div className="blog_post_card__date">August 19th, 2021</div>
            <Link href="/posts"><a><h3 className="blog_post_card__title">10 LinkedIn Company Page Features You Need to Be Using Yesterday</h3></a></Link>
            <div className="author">
              <Image src="/images/cent.jpg" alt="title" width="60" height="60" className="authorPhoto" />
              <span className="blog_post_card__author_name">author name</span>
            </div>
            <p className="blog_post_card__description">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum reprehenderit quo neque necessitatibus possimus iste at nobis officia aut. Magnam voluptatem aliquam iure. Quae, cupiditate id? Laborum maiores dignissimos dolorum aut, ratione voluptatem totam recusandae molestiae nulla quia iure dicta expedita veritatis eveniet inventore, exercitationem, non eaque ut! Temporibus accusamus beatae eveniet facere animi itaque atque fugit unde ut neque quia, dolore dolores saepe blanditiis?</p>

            <Link href="/"><a style={{ color: 'red' }}>Read more {`>`}</a></Link>
          </div>

          <div className="blog_post_card">
            <div className="blog_post_card__date">August 19th, 2021</div>
            <Link href="/posts"><a><h3 className="blog_post_card__title">10 LinkedIn Company Page Features You Need to Be Using Yesterday</h3></a></Link>
            <div className="author">
              <Image src="/images/cent.jpg" alt="title" width="60" height="60" className="authorPhoto" />
              <span className="blog_post_card__author_name">author name</span>
            </div>
            <p className="blog_post_card__description">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum reprehenderit quo neque necessitatibus possimus iste at nobis officia aut. Magnam voluptatem aliquam iure. Quae, cupiditate id? Laborum maiores dignissimos dolorum aut, ratione voluptatem totam recusandae molestiae nulla quia iure dicta expedita veritatis eveniet inventore, exercitationem, non eaque ut! Temporibus accusamus beatae eveniet facere animi itaque atque fugit unde ut neque quia, dolore dolores saepe blanditiis?</p>

            <Link href="/"><a style={{ color: 'red' }}>Read more {`>`}</a></Link>
          </div>

        </div>
        <div className="right"></div>
      </main>

    </>
  )
}
