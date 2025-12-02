import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../Firebase/firebase.config";
import { appendErrors } from "react-hook-form";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);
  console.log(`current user is ---> ${auth.currentUser?.email}`);

  // create user
  const registerUser = (email, password) => {
    setLoader(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login user
  const loginUser = (email, password) => {
    setLoader(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // signOut user
  const logOutUser = () => {
    setLoader(true);
    return signOut(auth);
  };

  // other create or login user
  const otherAuthUser = (provider) => {
    setLoader(true);
    return signInWithPopup(auth, provider);
  };

  // reset password
  const resetPassword = (email) => {
    setLoader(true);
    return sendPasswordResetEmail(auth, email);
  };

  // store user
  useEffect(() => {
    // mount
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoader(false);
    });

    // unmount
    return () => unsubscribe();
  }, []);

  const authInfo = {
    registerUser,
    loginUser,
    logOutUser,
    otherAuthUser,
    resetPassword,
    user,
    loader,
    setLoader,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
