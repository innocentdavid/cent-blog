// import middleware from '../../../middleware/middleware'
// import nextConnect from 'next-connect'

// const handler = nextConnect()
// handler.use(middleware)

// handler.post((req, res) => {
//   // console.log(req.body)
//   // console.log(req.files)
//   const slug = req.body.slug
//   const image = req.files
//   // try {
//   // var file = new File([image], slug, { type: "image/png" });
//   const uploadTask = storage.ref(`images/${slug}`).put(image);
//   console.log(uploadTask);

//   uploadTask.on("state_change", (snapshot) => {
//     const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
//     console.log(progress)
//     // setShowProgBar(true)
//     // if (snapshot.bytesTransferred === snapshot.totalBytes) { setJk(slug) }
//   }, (error) => { /*console.log(error.message)*/ },
//     () => {
//       storage
//         .ref(`images/${slug}`)
//         .getDownloadURL()
//         .then(url => {
//           res.status(200).json({ url });
//         });
//     }
//   );
//   // } catch (e) {
//   //   res.status(400).end();
//   // }
// });

// export const config = {
//   api: {
//     bodyParser: false
//   }
// }

// export default handler

// // import { storage } from '../../../utils/db';

// // export default async (req, res) => {
// //   try {
// //     // const { slug, image } = req.body;
// //     console.log(req.files)
// //     // var file = new File([image], slug, { type: "image/png" });
// //     // const uploadTask = storage.ref(`images/${slug}`).put(file);

// //     // uploadTask.on("state_change", (snapshot) => {
// //     //   const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
// //     //   console.log(progress)
// //     //   // setShowProgBar(true)
// //     //   // if (snapshot.bytesTransferred === snapshot.totalBytes) { setJk(slug) }
// //     // }, (error) => { /*console.log(error.message)*/ },
// //     //   () => {
// //     //     storage
// //     //       .ref(`images/${slug}`)
// //     //       .getDownloadURL()
// //     //       .then(url => {
// //     //         res.status(200).json({ url });
// //     //       });
// //     //   }
// //     // );
// //   } catch (e) {
// //     res.status(400).end();
// //   }
// // }

// // export const config = {
// //   api: {
// //     bodyParser: false, // Disallow body parsing, consume as stream
// //   },
// // };
