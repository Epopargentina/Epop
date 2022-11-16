// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2LtmqPfsLcep6YRvAuPODf9PREABgdWI",
  authDomain: "epop-backend-project.firebaseapp.com",
  projectId: "epop-backend-project",
  storageBucket: "epop-backend-project.appspot.com",
  messagingSenderId: "921338020127",
  appId: "1:921338020127:web:379b064357980c6bb2302a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
