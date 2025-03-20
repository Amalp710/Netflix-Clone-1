import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyATjwy5IebNUDKr3zCOT289FSSKyRUd9Yc",
  authDomain: "netflix-clone-831d1.firebaseapp.com",
  projectId: "netflix-clone-831d1",
  storageBucket: "netflix-clone-831d1.appspot.com",
  messagingSenderId: "778767610427",
  appId: "1:778767610427:web:6fa777966d0ccf0a9ca21e"
};


const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);

const signup=async(name,email,password)=>{
    try {
        const response=await createUserWithEmailAndPassword(auth,email,password);
        const user=response.user;
        await addDoc(collection(db,"user"),{
            uid:user.uid,
            name,
            authProvider:"local",
            email,
        });
        
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
        
    }

}


const login = async(email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password)

        
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
        
    }

}

const logout= ()=>{
    signOut(auth);
}


export {auth,db,login,signup,logout};