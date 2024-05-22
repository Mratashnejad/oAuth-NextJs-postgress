// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth       } from 'firebase/auth';
import { getStorage    } from 'firebase/storage';


const  firebaseConfig = {
  apiKey: "AIzaSyCMYw_MV_YbPaVcKHIYTSqEVSbEsi5qNLo",
  authDomain: "authapp-8a2d3.firebaseapp.com",
  projectId: "authapp-8a2d3",
  storageBucket: "authapp-8a2d3.appspot.com",
  messagingSenderId: "899991511226",
  appId: "1:899991511226:web:715381e4882506e109a283",
  measurementId: "G-W9Q2MDWZYW"
};

const app         = initializeApp(firebaseConfig);
const auth        = getAuth(app);
const storage     = getStorage();
// const storageRef  = ref(storage);
// const imagesRef   = ref(storage , 'userAvatars');
export { app, auth  , storage };
