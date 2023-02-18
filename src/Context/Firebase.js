import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const FirebaseContext = createContext();
export const useFirebase = () => useContext(FirebaseContext);

//Firebase Configeration
const firebaseConfig = {
  apiKey: "AIzaSyDDVNi-75NOBPfTRNStNXXYxnJElz23I-U",
  authDomain: "bookify-b404c.firebaseapp.com",
  projectId: "bookify-b404c",
  storageBucket: "bookify-b404c.appspot.com",
  messagingSenderId: "107048461725",
  appId: "1:107048461725:web:5f1a2a48ae0b27d227fb74",
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider(app);
const storage = getStorage(app);
const firestore = getFirestore(app)

export const FirebaseProvider = (props) => {
  const signupUserWithEmailandPassword = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password);
  };

  const signinUserWithEmailandPassword = (email, password) => {
    signInWithEmailAndPassword(auth, email, password);
  };

  const signinWithGoogle = () => {
    signInWithPopup(auth, provider);
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const isLoggedIn = user ? true : false;

  const HandleCreateListing = async (name, isbn, price, cover) => {
    // const imgRef = ref(storage, `uploads/images/${Date.now}-${cover.name}`);
    const imgRef = ref(storage, `uploads/images/${Date.now()}-${cover.name}`);

    const uploadReslt = await uploadBytes(imgRef, cover);

    return await addDoc(collection(firestore, "books"), {
      name,
      isbn,
      price,
      imgUrl: uploadReslt.ref.fullPath,
      userId: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    });
  };


  const listAllBooks =()=>{
    return getDocs(collection(firestore, "books"))
  }

  const getImageUrl =(path)=>{
    return getDownloadURL(ref(storage, path))
  }

  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailandPassword,
        signinUserWithEmailandPassword,
        signinWithGoogle,
        isLoggedIn,
        HandleCreateListing,
        listAllBooks, getImageUrl
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
