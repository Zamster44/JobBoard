// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjeagGfzZzjXE9zxkaw3DCRD8_VQ7gsUE",
  authDomain: "zameer-job-board.firebaseapp.com",
  projectId: "zameer-job-board",
  storageBucket: "zameer-job-board.appspot.com",
  messagingSenderId: "996036539035",
  appId: "1:996036539035:web:ccbc357ee2cf0264038c3e",
  measurementId: "G-GRJWJR2TZR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
export {storage} ;