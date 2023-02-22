import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
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
const firestore = getFirestore(app);

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

  const listAllBooks = () => {
    return getDocs(collection(firestore, "books"));
  };

  const getImageUrl = (path) => {
    return getDownloadURL(ref(storage, path));
  };

  const logOut = () => {
    signOut(auth);
  };

  const getBookById = async (id) => {
    const docRef = doc(firestore, "books", id);
    const reslt = await getDoc(docRef);
    return reslt;
  };

  const placeOrder = async (bookId, quantity) => {
    const collectionRef = collection(firestore, "books", bookId, "orders");
    const reslt = await addDoc(collectionRef, {
      uuserId: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      quantity: Number(quantity),
    });
  };

  const fetchMyBooks = async (userId) => {
    const collectionRef = collection(firestore, "books");
    const qry = query(collectionRef, where("userId", "==", userId));

    const reslt = await getDocs(qry);
    return reslt;
  };

  const getOrders  = async (bookId)=>{
    const collectionRef = collection(firestore, "books", bookId, "orders")
    const result = await getDocs(collectionRef) 
    return result
  }

  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailandPassword,
        signinUserWithEmailandPassword,
        signinWithGoogle,
        isLoggedIn,
        HandleCreateListing,
        listAllBooks,
        getImageUrl,
        logOut,
        getBookById,
        placeOrder,
        fetchMyBooks,
        user, getOrders
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
