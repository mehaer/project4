// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-AbrqMUlXnnbDCD7j-6U2saBtp0lEXoA",
  authDomain: "flashcard-72c5b.firebaseapp.com",
  projectId: "flashcard-72c5b",
  storageBucket: "flashcard-72c5b.appspot.com",
  messagingSenderId: "163309934894",
  appId: "1:163309934894:web:52abff359508417aac42bf",
  measurementId: "G-DGYNNXX79P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app)

export{db}