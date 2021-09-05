import Posts from '../../components/Posts'
import { db } from '../../utils/fire-config/firebase'

const PostsPage = ({ tech, pets, programming }) => (
  <div className="parent">
    <div className="left"></div>
    <div className="middle homepage-container">

      <Posts tech={tech} pets={pets} programming={programming} />

    </div>
    <div className="right"></div>
  </div>
)

export const getServerSideProps = async () => {
  const techEntries = db.collection('posts').where('category', '==', 'tech').limit(3).get();
  const tech = (await techEntries).docs.map(post => ({ ...post.data(), postId: post.id }));

  const petsEntries = db.collection('posts').where('category', '==', 'pets').limit(3).get();
  const pets = (await petsEntries).docs.map(post => ({ ...post.data(), postId: post.id }));

  const programmingEntries = db.collection('posts').where('category', '==', 'code').limit(3).get();
  const programming = (await programmingEntries).docs.map(post => ({ ...post.data(), postId: post.id }));

  return {
    props: { tech, pets, programming },
    // revalidate: 10
  }
}

export default PostsPage;