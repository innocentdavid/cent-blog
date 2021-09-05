import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import dashify from 'dashify';
import { db, auth } from '../../../utils/fire-config/firebase'
import { openLoading } from '../../../myFunctions';

const EditEntry = () => {
  const router = useRouter()
  const [user, setUser] = useState([]);

  // setUser
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        setUser(authUser);
      } else {
        router.back();
      }
    })
  }, []);
  
  const [content, setContent] = useState(
    { title: '', body: '', excerpt: '', category: '', createdAt: '', author: [] })

  // get entry by id
  useEffect(() => {
    const { id } = router.query;
    const fetch = async () => {
      if (id) {
        let res = await db.collection('posts').doc(id).get();
        const { title, body, excerpt, category, createdAt, author } = res.data();
        let data = { title, body, excerpt, category, createdAt, author }
        setContent(data);
      }
    };

    return fetch();
  }, [router])

  const onChange = (e) => {
    const { value, name } = e.target;
    setContent(prevState => ({ ...prevState, [name]: value }));
  }

  const onSubmit = async (e) => {
    openLoading('open');
    const { id } = router.query
    const { title, body, excerpt, category, createdAt, author } = content;
    const slug = dashify(title)
    await db.collection('posts').doc(id).delete();
    let updatedAt = new Date().toISOString();
    let data = { slug, title, body, excerpt, category, createdAt, author, updatedAt, lastUpdatedBy: user?.displayName };
    await db.collection('posts').doc(slug).set(data);
    router.push(`/posts/${slug}`)
    openLoading('close');
  }

  return (
    <div style={{ padding: '0 10%'}}>
      {/* Blog title */}
      <div style={{ margin: '10px 0'}}>
        <label htmlFor="title">Blog title</label><br />
        <div style={{ margin: '10px 0'}}></div>
        <input
          className="form-control"
          style={{ width: '100%' }}
          type="text"
          required
          placeholder="Blog title"
          name="title"
          value={content.title}
          onChange={onChange}
        />
      </div>

      <br />

      {/* SEO Description */}
      <div style={{ margin: '10px 0'}}>
        <label htmlFor="title">SEO Description (at least 120 character)</label><br />
        <div style={{ margin: '10px 0'}}></div>
        <textarea
          className="form-control"
          style={{ width: '100%', height: 100 }}
          type="text"
          required
          placeholder="SEO Description"
          name="excerpt"
          value={content.excerpt}
          onChange={onChange}
        />
      </div>

      <br />

      {/* Body */}
      <div style={{ margin: '10px 0'}}>
        <label htmlFor="body">Body</label><br />
        <div style={{ margin: '10px 0'}}></div>
        <textarea
          className="form-control"
          style={{ width: '100%', height: 500 }}
          required
          placeholder="Write your article"
          name="body"
          value={content.body}
          onChange={onChange}
        />
      </div>

      <br />
      <button className="btnSolid" onClick={onSubmit}>UPDATE</button>

      
      
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default EditEntry;