// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "accharplanner.firebaseapp.com",
  databaseURL: "https://accharplanner.firebaseio.com",
  projectId: "accharplanner",
  storageBucket: "accharplanner.appspot.com",
  messagingSenderId: "740401441520",
  appId: "1:740401441520:web:2cb5c9b2b5f3a74d803035"
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
