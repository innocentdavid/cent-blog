import { useEffect, useState } from 'react'
import Link from 'next/link'

import { confirmAlert } from 'react-confirm-alert'
import { db } from '../../../utils/fire-config/firebase'
import HeadMetadata from '../../../components/HeadMetadata';

const List = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    let res = db.collection('posts').orderBy('createdAt', 'desc').get();
    setEntries(res.docs.map(post => ({ ...post.data(), postId: post.id })));
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
            await db.collection('posts').doc(slug).delete()
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
  

  return (
    <div>
      <HeadMetadata title={'Cent Blog | Admin - All posts'} metaDescription="Admin - All posts" />

      <h1>Entries</h1>
      {entries.map(entry => (
        <div key={entry.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: 300 }}>
          <div>{entry.title}</div>
          <div>
            <Link href={`/admin/edit/${entry.id}`}>
              <a><button style={{ marginRight: 10 }}>Edit</button></a>
            </Link>
            <button onclick={()=>{ onDelete(entry.id) }}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;