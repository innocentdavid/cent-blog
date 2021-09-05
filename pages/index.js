import Posts from '../components/Posts'
import { db } from '../utils/fire-config/firebase'

export default function Home({ tech, pets, programming }) {

  return (
    <div className="parent">
      <div className="left"></div>
      <div className="middle homepage-container">

        <div className="homepage-introduction">
          <h1>Hi, I&#39;m Paul Innocent. I help people learn software development. I love pets too and tech stuff</h1>
          <p>I&#39;m a full stack software developer. I write about modern Node.js, JavaScript, and development.</p>
        </div>

        <Posts tech={tech} pets={pets} programming={programming} />

      </div>
      <div className="right"></div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const techEntries = await db.collection('posts').where('category', '==', 'tech').limit(3).get();
  const tech = techEntries.docs.map(post => ({ ...post.data(), postId: post.id }));
  console.log(tech)

  const petsEntries = await db.collection('posts').where('category', '==', 'pets').limit(3).get();
  const pets = petsEntries.docs.map(post => ({ ...post.data(), postId: post.id }));

  const programmingEntries = await db.collection('posts').where('category', '==', 'code').limit(3).get();
  const programming = programmingEntries.docs.map(post => ({ ...post.data(), postId: post.id }));

  return {
    props: { tech, pets, programming },
    // revalidate: 10
  }
}