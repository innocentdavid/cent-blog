import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from "next/router"
import { db, auth } from '../../utils/fire-config/firebase'
import HeadMetadata from '../../components/HeadMetadata'
import Footer from '../../components/Footer'
import { deletePost, parseMd, openLoading } from '../../myFunctions'
import { confirmAlert } from 'react-confirm-alert';

function PostsPage({ post }) {
  // openLoading('close')
  useEffect(() => {
    openLoading('close');
  }, []);

  const router = useRouter()
  const [user, setUser] = useState([]);
  const [canEdit, setCanEdit] = useState(false);

  // setUser
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        setUser(authUser);
      } else {
        // router.push('/login')
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


  const prettyDate = new Date(post?.createdAt).toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })

  if (router.isFallback) {
    return (
      <div className="loading" style={{ display: 'grid' }}>
        <Image src="/loading.gif" alt="loading..." width="50px" height="50px" />
      </div>
    )
  } else {
    return (<>
      <HeadMetadata
        title={post ? `${post?.title} - Cent Blog` : "Get latest update around the world at your finger tip | Cent Blog"}
        metaDescription={post ? post?.excerpt : "Get latest update around the world at your finger tip | Cent Blog"}
      />

      <div className="parent">
        <div className="left"></div>
        <div className="middle homepage-container">

          {post?.createdAt && <div className="layout-wrapper">
            <div className="blog-post-container">
              <div>
                {canEdit && <div className="modBtn">
                  <Link href={`/admin/edit/${post?.slug}`}>
                    <a><button style={{ marginRight: 10 }}>Edit</button></a>
                  </Link>
                  <button className="modBtn2" onClick={() => { onDelete(post?.slug) }}>Delete</button>
                </div>}<br />

                <div className="blog_post_card__title" >{post?.title}</div>

                <div style={{ margin: 10 }}></div>

                <hr style={{ margin: '20px 0', border: '1px solid #25c7eb' }} />

                <div className="blog-post-top-section">
                  <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                    <div className="blog-post-author" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      {post?.author?.photoURL && <Image src={post?.author?.photoURL} alt={post?.author?.userName} width="100px" height="100px" className="authorPhoto" />}
                      <Link href={`/authors/${post?.author?.slug}`}><a style={{ color: '#005584', fontSize: '1.125rem', fontWeight: 900, fontFamily: 'Lato,Helvetica,Arial,sans-serif' }}>{post?.author?.userName && <b>{post?.author?.userName}</b>}</a></Link>
                    </div>

                    <div>
                      <div className="blog_post_card__date">
                        <div>Published at</div>
                        <time dateTime={post?.createdAt}>{prettyDate}</time>
                      </div>
                      {/* <div>S  H  A  R  E</div> */}
                    </div>
                  </div>
                </div>

                <hr style={{ marginTop: 20, border: '1px solid #25c7eb' }} />

                <div style={{ margin: 10 }}></div>

                {post?.body && <article dangerouslySetInnerHTML={{ __html: parseMd(post?.body) }} className="blog-post-body-content">
                </article>}
              </div>
            </div>
          </div>
          }
          <Footer />
        </div>
        <div className="right"></div>
      </div>
    </>)
  }
}

export default PostsPage

export const getServerSideProps = async (context) => {
  const { slug } = context.params;
  // console.log({ slug })
  if (slug) {
    const res = await db.collection("posts").doc(slug).get();
    const post = res?.data();

    if (res.exists) {
      return {
        props: { post }
      }
    } else {
      return {
        props: {}
      }
    }
  }
}