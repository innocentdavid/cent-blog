import firebase from "firebase/app";
import "firebase/firestore"
import "firebase/auth"
import "firebase/storage"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var config = {
  apiKey: "AIzaSyDSmLXXH9J3oocwtjvNp-BumtOQvFQ2XAU",
  authDomain: "tiwastylee.firebaseapp.com",
  projectId: "tiwastylee",
  storageBucket: "tiwastylee.appspot.com",
  messagingSenderId: "345724139796",
  appId: "1:345724139796:web:7e35312bc3f3b876b3ea01",
  measurementId: "G-RD93175YPB"
}

var firebaseApp = null;

if (!firebase.apps.length) {
  firebaseApp = firebase.initializeApp(config);
} else {
  firebaseApp = firebase.app(); // if already initialized, use that one
}

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };