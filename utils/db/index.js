// // import admin from 'firebase-admin';
// // import serviceAccount from './serviceAccountKey.json';

// // if (!admin.apps.length) {
// //   try {
// //     admin.initializeApp({
// //       credential: admin.credential.cert(serviceAccount),
// //       // databaseURL: "YOUR_DB_URL"
// //     });
// //   } catch (error) {
// //     console.log('Firebase admin initialization error', error.stack);
// //   }
// // }

// // const db = admin.firestore();
// // // const storage = admin.storage();

// // export { db };


// import admin from 'firebase-admin';
// import serviceAccount from './serviceAccountKey.json';

// var fApp = null;

// if (!admin.apps.length) {
//   try {
//     fApp = admin.initializeApp({
//       credential: admin.credential.cert(serviceAccount),
//       // databaseURL: "YOUR_DB_URL"
//     });
//   } catch (error) {
//     console.log('Firebase admin initialization error', error.stack);
//   }
// }else{
//   fApp = admin.app()
// }

// const db = fApp.firestore();
// // const db = admin.firestore();
// // const storage = admin.storage();

// export { db };