// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1WTLG1kJpoZTXyKZcwlbupehcr0JAIGs",
  authDomain: "blogapp-45987.firebaseapp.com",
  projectId: "blogapp-45987",
  storageBucket: "blogapp-45987.firebasestorage.app",
  messagingSenderId: "847500137531",
  appId: "1:847500137531:web:916a1c08f1ac210d4b381e",
  measurementId: "G-GJYH3GSYFQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };