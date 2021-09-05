import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { auth } from '../utils/fire-config/firebase';

const Login = () => {
  const router = useRouter()
  const [content, setContent] = useState({ email: '', password: '' })

  const onChange = (e) => {
    const { value, name } = e.target;
    setContent(prevState => ({ ...prevState, [name]: value }));
  }

  const handleSubmit = () => {
    const { email, password } = content;
    auth.signInWithEmailAndPassword(email, password)
      .then(authUser => {
        // console.log(authUser.user)
        document.querySelector('#error').textContent = '';
        document.querySelector('#success').textContent = 'success';
        setTimeout(() => {
          router.back();
        }, 1000);
      })
      .catch(error => {
        let msg = `${error.code}: ${error.message}`;
        document.querySelector('#success').textContent = '';
        document.querySelector('#error').textContent = msg;
      })
  }

  return (
    <div style={{ padding: '0 10%', display: 'grid', placeItems: 'center' }}>
      <h1>SIGN IN</h1>
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
          <label htmlFor="password">Password</label><br />
          <input
            value={content.password}
            onChange={onChange}
            type="password" id="password" name="password" className="form-control" />
        </div>
        <br />

        <div id="error" style={{ color: 'red' }}></div>
        <div id="success" style={{ color: 'green' }}></div>

        <button type="submit" className="btnSolid">LOGIN</button>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ marginLeft: 20, color: 'red' }}>Don't have account?</div>
          <Link href="/signup"><a><button type="button" style={{ marginLeft: 20 }}>SIGNUP</button></a></Link>
        </div>
      </form>
    </div>
  )
}

export default Login
