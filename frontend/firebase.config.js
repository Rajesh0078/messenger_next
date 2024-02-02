import { getApp, getApps, initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyBp6rXZwUQl9UTbDmHxyO-ub5b0ZxpZUwA",
    authDomain: "relu-a6e15.firebaseapp.com",
    projectId: "relu-a6e15",
    storageBucket: "relu-a6e15.appspot.com",
    messagingSenderId: "308543078675",
    appId: "1:308543078675:web:0be53d63501257f1221ae6",
    measurementId: "G-M5SRJX0PQN"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig)
const fireStore = getFirestore(app)
const storage = getStorage(app)

export { app, fireStore, storage }