import Link from 'next/link'
import HeadMetadata from '../components/HeadMetadata'

import '../styles/globals.css'

// pages
import '../styles/pages/homepage.css'

export default function App({ Component, pageProps }) {
  return (
    <>
    <HeadMetadata title='Cent Blog | Home' metaDescription="Cent Blog" />
      <header>
        <div className="logo"><h1><strong>LOGO</strong></h1></div>

        <nav>
          <ul>
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>

            <li>
              <Link href="/posts">
                <a>Posts</a>
              </Link>
            </li>

            <li>
              <Link href="/authors">
                <a>Authors</a>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="blogName">CENT-BLOG</div>
      </header>

      <main>
        <Component {...pageProps} />
      </main>
    </>
  )
}