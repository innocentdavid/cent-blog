import { db } from '../utils/fire-config/firebase'

export const getAllPosts = async (collection) => {
  // let ref = await db.collection(collection).get();
  // return ref.docs.map(post => (post.data()))
}

export const getAllPostsByCategory = async (category) => {
  let ref = await db.collection('posts').where('category', '==', category).get();
  return ref.docs.map(post => (post.data()))
}








// import fs from 'fs'
// import path from 'path'
// import matter from 'gray-matter'
// import { parseMd } from '../myFunctions'
// // import fire from '../config/fire-config'
// // import remark from 'remark'
// // import html from 'remark-html'

// export function getAllPosts() {
//   const postsDirectory = path.join(process.cwd(), '_posts')
//   const filenames = fs.readdirSync(postsDirectory)
//   let ret = filenames.map(filename => {
//     const file = fs.readFileSync(path.join(process.cwd(), '_posts', filename), 'utf8')

//     // get frontmatter
//     const { content, data, } = matter(file)

//     // get slug from filename
//     const slug = filename.replace(/\.md$/, '')

//     // return combined frontmatter and slug; build permalink
//     return {
//       ...data,
//       content,
//       slug,
//       permalink: `/posts/${slug}`,
//     }
//   })
//   // console.log(ret.map(ret => ret.slug))
//   return ret
// }

// export function getLatestTechPosts(number=3) {
//   const postsDirectory = path.join(process.cwd(), '_tech')
//   const filenames = fs.readdirSync(postsDirectory)
//   let ret = filenames.map(filename => {
//     const file = fs.readFileSync(path.join(process.cwd(), '_tech', filename), 'utf8')

//     // get frontmatter
//     const { content, data, } = matter(file)

//     // get slug from filename
//     const slug = filename.replace(/\.md$/, '')

//     // return combined frontmatter and slug; build permalink
//     return {
//       ...data,
//       content,
//       slug,
//       permalink: `/posts/${slug}`,
//     }
//   })
//   // console.log(ret)
//   return ret
// }


// export function getPostBySlug(slug) {
//     const file = fs.readFileSync(path.join(process.cwd(), '_posts', `${slug}.md`), 'utf8')
  
//     const {
//       content,
//       data,
//     } = matter(file)
  
//     const body = parseMd(content)
  
//     return {
//       ...data,
//       body,
//     }
//   }

  
// export function getAllAuthors() {
//   const authorsDirectory  = path.join(process.cwd(), '_authors')
//   const filenames = fs.readdirSync(authorsDirectory )

//   return filenames.map(filename => {
//     const file = fs.readFileSync(path.join(process.cwd(), '_authors', filename), 'utf8')

//     // get data
//     const data = JSON.parse(file)

//     // get slug from filename
//     const slug = filename.replace(/\.json/, '')

//     // return combined data and slug; build permalink
//     return {
//       ...data,
//       slug,
//       permalink: `/authors/${slug}`,
//       profilePictureUrl: `/${slug}.jpg`,
//     }
//   })
// }


// export function getAuthorBySlug(slug) {
//     const file = fs.readFileSync(path.join(process.cwd(), '_authors', `${slug}.json`), 'utf8')

//     const data = JSON.parse(file)
  
//     return {
//       ...data,
//       permalink: `/authors/${slug}`,
//       profilePictureUrl: `/${slug}.jpg`,
//       slug,
//     }
//   }