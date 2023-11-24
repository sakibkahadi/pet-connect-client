import { createContext, useEffect, useState } from "react";

import app from "../firebase/firebase.config";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";




export const AuthContext = createContext(null)

const auth = getAuth(app);
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
   
    const googleProvider = new GoogleAuthProvider()
    const createUser = (email,password,)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const login = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSign = ()=>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const logOut = ()=>{
        setLoading(true)
        return signOut(auth)
    }
    const updateUserProfile =(fullName, image)=>{
        return updateProfile(auth.currentUser, {
            displayName: fullName, photoURL: image
        })
    }

    useEffect(()=>{
       const unsubscribe = onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser)
            console.log('current user', currentUser)
           
        })
        return ()=>{
            return unsubscribe();
        }
    },[])

    const authInfo ={
        user,
        loading, 
        createUser,
        login,
        logOut,
        updateUserProfile, googleSign
    }
    return (
        <AuthContext.Provider value={authInfo} >
            {children}
        </AuthContext.Provider >
    );
};

export default AuthProvider;