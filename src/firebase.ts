import { initializeApp, FirebaseOptions } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "accharplanner.firebaseapp.com",
  databaseURL: "https://accharplanner.firebaseio.com",
  projectId: "accharplanner",
  storageBucket: "accharplanner.appspot.com",
  messagingSenderId: "740401441520",
  appId: "1:740401441520:web:2cb5c9b2b5f3a74d803035",
} as FirebaseOptions;

export default initializeApp(firebaseConfig);
