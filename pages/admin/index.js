import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import HeadMetadata from '../../components/HeadMetadata'
import { deletePost, openLoading } from '../../myFunctions';
import { confirmAlert } from 'react-confirm-alert';
import { db, auth } from '../../utils/fire-config/firebase'

function Admin() {
  const router = useRouter()
  const [user, setUser] = useState([]);
  const [canEdit, setCanEdit] = useState(false);
  const [entries, setEntries] = useState([]);

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

  // setEntries
  useEffect(async () => {
    const fetch = async () => {
      openLoading('open');
      let res = await db.collection('posts').orderBy('createdAt', 'desc').get();
      let doc = res.docs.map(post => ({ ...post.data(), postId: post.id }))
      setEntries(doc);
      openLoading('close');
    }
    fetch();
  }, []);

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

  return (<>
  <HeadMetadata
        title='Cent Blog | Admins'
        metaDescription="Admin page"
      />
    <div style={{ padding: "0 10%" }}>
      <h1>Welcome to the Admin page!</h1>

      <div style={{ margin: 20 }}></div>

      <Link href="/admin/create"><a className="Link" style={{ border: '1px solid rgb(0 0 0 / 20%)', padding: '10px 15px' }}>Create Post</a></Link>

      <div style={{ margin: 20 }}></div>
      <h1>Entries</h1>


      {entries.map(entry => (
        <div key={entry?.postId} className="entriesList">
          <div>{entry?.title}</div>
          <div className="modBtn">
            <Link href={`/admin/edit/${entry?.postId}`}>
              <a><button style={{ marginRight: 10 }}>Edit</button></a>
            </Link>
            {canEdit && <button className="modBtn2" onClick={() => { onDelete(entry?.postId) }}>Delete</button>}
          </div>
        </div>
      ))}


      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  </>)
}

export default Admin
