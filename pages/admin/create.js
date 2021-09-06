import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import dashify from 'dashify';
import { openLoading } from '../../myFunctions';
import Footer from '../../components/Footer';
import HeadMetadata from '../../components/HeadMetadata';
import { db, auth } from '../../utils/fire-config/firebase';

const Post = () => {
  const router = useRouter()
  const [user, setUser] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        const fetch = async () => {
          let res = await db.collection('users').doc(dashify(authUser.displayName)).get();
          setUser(res.data());
        }
        fetch();
      } else {
        router.back();
      }
    })
  }, []);

  const [content, setContent] = useState({ title: '', body: '', excerpt: '', category: '' });

  const onChange = (e) => {
    const { value, name } = e.target;
    setContent(prevState => ({ ...prevState, [name]: value }));
  }

  const isTitleAvailable = async (slug) => {
    let ref = await db.collection('posts').doc(slug).get();
    return ref.exists
  }

  const onSubmit = async () => {
    const { title, body, excerpt, category } = content;
    let slug = dashify(title)
    let checkIsTitleAvailable = await isTitleAvailable(slug, category)

    if (!checkIsTitleAvailable) {
      if (user) {
        if (category) {
          openLoading('open');
          console.log(user)
          let author = { userName: user.userName, email: user.email, photoURL: user.photoURL, slug: user.slug, uid: user.uid }
          let createdAt = new Date().toISOString();
          let data = { title, slug, body, excerpt, author, createdAt, category }
          db.collection('posts').doc(slug).set(data).then(() => {
            router.push(`/${posts}/${slug}`);
            // openLoading('close');
          }).catch(error => {
            console.log(error.message)
            openLoading('close');
          })
        } else {
          alert('You have not selected any category');
          openLoading('close');
        }
      } else {
        console.log(user)
      }
    } else {
      alert(`There is a post with this title: "${title}" already!`);
    }
  }

  return (<>
    <HeadMetadata title={'Cent Blog | Create article'} metaDescription="create article page" />

    <div style={{ padding: '0 10%' }}>
      {/* Post category */}
      <div style={{ margin: '10px 0' }}>
        <p>Post category</p>
        <div>
          <select
            className="form-control"
            required
            type="text"
            name="category"
            value={content.category}
            onChange={onChange}
          >
            <option value="">select</option>
            <option value="tech">Tech</option>
            <option value="pets">Pets</option>
            <option value="code">Programming</option>
          </select>
        </div>
      </div>

      <br />

      {/* Blog title */}
      <div style={{ margin: '10px 0' }}>
        <label htmlFor="title">Blog title</label><br />
        <div style={{ margin: '10px 0' }}></div>
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
      <div style={{ margin: '10px 0' }}>
        <label htmlFor="title">SEO Description (at least 120 character)</label><br />
        <div style={{ margin: '10px 0' }}></div>
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
      <div style={{ margin: '10px 0' }}>
        <label htmlFor="body">Body</label><br />
        <div style={{ margin: '10px 0' }}></div>
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
      <button className="btnSolid" onClick={onSubmit}>POST</button>


      <br />
      <br />

      <Footer />
    </div>
  </>);
};

export default Post;