// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyClsFm7xHA8z7epO9TlCeIl5ycLVq4Q6Ms",
  authDomain: "bisiklet-dunyam.firebaseapp.com",
  projectId: "bisiklet-dunyam",
  storageBucket: "bisiklet-dunyam.appspot.com",
  messagingSenderId: "1063607634785",
  appId: "1:1063607634785:web:72ab2bef2e063b30b65320",
  measurementId: "G-HGXD0DCBDP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
