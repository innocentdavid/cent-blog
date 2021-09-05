// import Prism from "prismjs"
// import "prismjs/plugins/line-numbers/prism-line-numbers.js"
// import "prismjs/plugins/normalize-whitespace/prism-normalize-whitespace.js"
// import moment from "moment"

import { useEffect, useState } from "react"
import Image from 'next/image'
import Link from 'next/link'
import Footer from "./Footer"
import { deletePost, parseMd } from "../myFunctions"
import { useRouter } from "next/router"
import { auth } from '../utils/fire-config/firebase'
import { confirmAlert } from 'react-confirm-alert';

export default function Post({ post }) {
  const router = useRouter()
  const [user, setUser] = useState([]);
  const [canEdit, setCanEdit] = useState(false);

  // setUser
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        setUser(authUser);
      } else {
        router.push('/login')
      }
    })
  }, []);

  // setCanEdit
  useEffect(() => {
    if (user?.displayName === 'code-cent') {
      setCanEdit(true)
    }
  }, [user]);

  const onDelete = (slug) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            openLoading('open');

            let res = deletePost(slug)
            console.log(res)
            openLoading('close');
            window.location.reload()
          }
        },
        {
          label: 'No',
          // onClick: () => alert('Click No')
        }
      ]
    });
  }

  useEffect(() => {
    // Prism.highlightAll()
    // console.log(post)
  }, [post]);

  const prettyDate = new Date(post.createdAt).toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })


  return (
    <div className="parent">
      <div className="left"></div>
      <div className="middle homepage-container">

        <div className="layout-wrapper">
          <div className="blog-post-container">
            <div>

              {canEdit && <div className="modBtn">
                <Link href={`/admin/edit/${post?.slug}`}>
                  <a><button style={{ marginRight: 10 }}>Edit</button></a>
                </Link>
                <button className="modBtn2" onClick={() => { onDelete(post?.slug) }}>Delete</button>
              </div>}<br />

              <div className="blog_post_card__title" >{post?.title}</div>

              {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                    <Link href={`/tag/${'tagName'}`}><a><span className="tag">Tags</span></a></Link>
                    <Link href={`/tag/${'tagName'}`}><a><span className="tag">Tags</span></a></Link>
                    <Link href={`/tag/${'tagName'}`}><a><span className="tag">Tags</span></a></Link>
                    <Link href={`/tag/${'tagName'}`}><a><span className="tag">Tags</span></a></Link>
                  </div> */}

              <div style={{ margin: 10 }}></div>

              <hr style={{ margin: '20px 0', border: '1px solid #25c7eb' }} />

              <div className="blog-post-top-section">
                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                  <div className="blog-post-author" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Image src={post?.author?.photoURL} alt={post?.author?.userName} width="100px" height="100px" className="authorPhoto" />
                    <div>{post?.author?.userName && <b>{post?.author?.userName}</b>}</div>
                  </div>

                  <div>
                    <div className="blog_post_card__date"><time dateTime={post.createdAt}>{prettyDate}</time></div>
                    <div>S  H  A  R  E</div>
                  </div>
                </div>
              </div>

              <hr style={{ marginTop: 20, border: '1px solid #25c7eb' }} />

              <div style={{ margin: 10 }}></div>

              {/* <div className="blog-post-top-meta">
                    {post?.tags?.map((tag, index) => {
                      return (
                        <a
                          className="blog-post-top-tag-btn"
                          key={index}
                          href={`/tags/${tag}`}
                        >
                          <span>{tag}</span>
                        </a>
                      )
                    })}
                  </div> */}

              <article dangerouslySetInnerHTML={{ __html: parseMd(post?.body) }} className="blog-post-body-content">
              </article>
            </div>
          </div>
        </div>

        <Footer />
      </div>
      <div className="right"></div>
    </div>
  )
}