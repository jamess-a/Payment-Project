import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0DD-GLku82ai5e60YSEqruRp-Qk-6aNY",
  authDomain: "onepay-bb2f2.firebaseapp.com",
  projectId: "onepay-bb2f2",
  storageBucket: "onepay-bb2f2.firebasestorage.app",
  messagingSenderId: "458069429914",
  appId: "1:458069429914:web:9184e9e559d491fa879923",
  measurementId: "G-B3MTH4X4NP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
