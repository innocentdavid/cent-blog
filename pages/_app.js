import Link from 'next/link'
import Image from 'next/image'
import HeadMetadata from '../components/HeadMetadata'

import '../styles/globals.css'

import '../styles/react-confirm-alert.css'

// pages
import '../styles/pages/_error.css'
import '../styles/pages/homepage.css'

export default function App({ Component, pageProps }) {
  function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  // window.addEventListener('click', windowClicked);

  function windowClicked(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  return (
    <>
      <HeadMetadata title='Cent Blog | Home' metaDescription="Cent Blog" />

      <div className="loading">
        <Image src="/loading.gif" alt="loading..." width="50px" height="50px" />
      </div>

      <header>
        <div className="logo"><h1><strong>LOGO</strong></h1></div>

        <nav>
          <ul>
            <li>
              <Link href="/">
                <a><span style={{ color: 'black' }}>Home</span></a>
              </Link>
            </li>

            <li>
              <span className="dropdown">
                <span onClick={myFunction} className="dropbtn">Posts <svg xmlns="http://www.w3.org/2000/svg" style={{ width: 17, marginBottom: -5 }} className="h-2 w-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg></span>
                <span id="myDropdown" className="dropdown-content">
                  <Link href="/tech"><a onClick={myFunction}>Tech</a></Link>
                  <Link href="/pets"><a onClick={myFunction}>Pets</a></Link>
                  <Link href="/programming"><a onClick={myFunction}>Programming</a></Link>
                </span>
              </span>
            </li>

            <li>
              <Link href="/authors">
              <a><span style={{ color: 'black' }}>Authors</span></a>
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