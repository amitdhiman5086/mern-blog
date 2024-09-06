// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // eslint-disable-next-line no-undef
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-fa5b2.firebaseapp.com",
  projectId: "mern-blog-fa5b2",
  storageBucket: "mern-blog-fa5b2.appspot.com",
  messagingSenderId: "1075233388216",
  appId: "1:1075233388216:web:6b1c32571cd37b341ee64d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
