// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBr-0n0eDV5PpowxqO_eag_MI_lrytE-E",
  authDomain: "henry-book-explorer.firebaseapp.com",
  projectId: "henry-book-explorer",
  storageBucket: "henry-book-explorer.appspot.com",
  messagingSenderId: "178130176150",
  appId: "1:178130176150:web:1a8cb43878c669bfd05ab7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
