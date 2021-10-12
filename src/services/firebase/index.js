import { initializeApp } from 'firebase/app'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth, signOut as firebaseSignOut } from 'firebase/auth'
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDsSuXK0rH5F9AcN4N4rz8UGVJT8s2__H0",
    authDomain: "chatsprofile-ced3a.firebaseapp.com",
    databaseURL: "https://chatsprofile-ced3a-default-rtdb.firebaseio.com",
    projectId: "chatsprofile-ced3a",
    storageBucket: "chatsprofile-ced3a.appspot.com",
    messagingSenderId: "653489357032",
    appId: "1:653489357032:web:9fa3e3e0a9d8450261895d",
    measurementId: "G-W6FWG6YM9H"
};

initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getDatabase()

export const signUp = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password)
}

export const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
}

export const signOut = async () => {
    await firebaseSignOut(auth)
}
