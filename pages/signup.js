import dashify from "dashify";
import { useState } from "react";
import Link from 'next/link'
import { openLoading } from "../myFunctions";
import { auth, db, storage } from "../utils/fire-config/firebase";
import { useRouter } from "next/router";

const Signup = () => {
  const router = useRouter()
  const [content, setContent] = useState({ email: '', userName: '', password: '' })
  const [image, setImage] = useState('')
  const [progress, setPprogress] = useState(null);
  const [{ alt, src }, setImg] = useState({
    src: '/images/placeholder.png',
    alt: 'Upload an Image'
  });

  const onChange = (e) => {
    const { value, name } = e.target;
    setContent(prevState => ({ ...prevState, [name]: value }));
  }

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        src: URL.createObjectURL(e.target.files[0]),
        alt: e.target.files[0].name
      });
      setImage(e.target.files[0])
    }
  }

  const checkUserName = async (userName) => {
    let ref = await db.collection('users').where('userName', '==', userName).get();
    return ref.empty
  }

  const handleSubmit = async () => {
    const { email, userName, password } = content;
    const isUserNameAvailable = await checkUserName(userName);
    if (isUserNameAvailable) {
      if (image) {
        openLoading('open');
        let slug = dashify(userName);

        var file = new File([image], slug, { type: "image/png" });
        const uploadTask = storage.ref(`images/${slug}`).put(file);

        uploadTask.on("state_change", (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setPprogress(`${progress}%`)
          console.log({ progress })
          if (snapshot.bytesTransferred === snapshot.totalBytes) { console.log('success!'); setPprogress('success!') }
        }, (error) => { console.log(error.message) },
          () => {
            storage
              .ref(`images/${slug}`)
              .getDownloadURL()
              .then(photoURL => {
                // console.log({ photoURL })
                auth.createUserWithEmailAndPassword(email, password)
                  .then(authUser => {
                    authUser.user.updateProfile({
                      displayName: userName,
                      photoURL: photoURL
                    });
                    let createdAt = new Date().toISOString();
                    const data = { email, userName, slug, password, photoURL, uid: authUser.user.uid, createdAt };
                    db.collection('users').doc(slug).set(data);
                    router.back()
                  })
                  .catch(error => { console.log(error.message); alert(error.message); })
                openLoading('close');
              });
          }
        );
      } else {
        alert('You have not selected any photo')
      }
    } else {
      let error = 'userNameError: User name already exiest!'
      document.querySelector('#userNameError').textContent = error;
      alert(error)
    }
  }

  return (
    <div style={{ padding: '0 10%', display: 'grid', placeItems: 'center' }}>
      <h1>SIGN UP</h1>
      <br />

      <form action="" onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
        <div>
          <label htmlFor="email">Email</label><br />
          <input
            value={content.email}
            onChange={onChange}
            type="email" id="email" name="email" className="form-control" />
        </div><br />

        <div>
          <label htmlFor="userName">Username</label><br />
          <div id="userNameError" style={{ color: 'red' }}></div>
          <input
            value={content.userName}
            onChange={onChange}
            type="text" id="userName" name="userName" className="form-control" />
        </div><br />

        <div>
          <label htmlFor="password">Password</label><br />
          <input
            value={content.password}
            onChange={onChange}
            type="password" id="password" name="password" className="form-control" />
        </div><br />

        {/* <ImgPrev setImage={setImage} title="Upload author's avater" /> */}
        <div>
          <h1 className="form__title">Upload author's avater</h1>
          <div className="form__img-input-container">
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              id="photo"
              className="visually-hidden"
              onChange={handleImg}
            />
            <label htmlFor="photo" className="form-img__file-label">
              {/* <svg width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="#56ceef" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" />
                        <circle cx="12" cy="10" r="3" />
                        <circle cx="12" cy="12" r="10" />
                    </svg> */}
            </label>
            <img src={src} alt={alt} width={120} height={120} className="form-img__img-preview" />
          </div>
        </div>

        <br />
        {progress && <div style={{ margin: '10px 0', display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%' }}>
          {progress}
        </div>}
        <br />


        <button type="submit" className="btnSolid">SIGNUP</button>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ marginLeft: 20, color: 'red' }}>Already had an account?</div>
          <Link href="/login"><a><button type="button" style={{ marginLeft: 20 }}>LOGIN</button></a></Link>
        </div>
      </form>

      <br />
      <br />
      <br />
      <br />
    </div>
  )
}

export default Signup
