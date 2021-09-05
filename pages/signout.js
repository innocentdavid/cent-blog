import { useRouter } from 'next/router'
import { useEffect } from 'react';
import { auth } from '../utils/fire-config/firebase';

const signOut = () => {
  const router = useRouter()

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if(authUser) {
        auth?.signOut().then(() => {
          router.back();
        }).catch(error => { console.log(error.message) })
      }else{ 
        router.push('/login')
      }
    })
  }, [])

  return (<></>)
}

export default signOut
