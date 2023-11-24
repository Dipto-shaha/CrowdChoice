import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./Firebase/firbase.config";
import axios from "axios";

export const AuthContest = createContext(null);

const Context = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const updateUserProfile = (name, photourl) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photourl,
    });
  };
  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logInWithGoogle = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("User in Auth Change");
      if (currentUser) {
        console.log("User is present");
        axios
          .post("https://CrowdChoice-server.vercel.app/jwt", currentUser, {
            withCredentials: true,
          })
          .then((res) => console.log(res.data))
          .catch((err) => {
            console.error(err);
            logOut();
          });
      } else {
        console.log("User is not present");
        axios
          .post("https://CrowdChoice-server.vercel.app/logout", user, {
            withCredentials: true,
          })
          .then((res) => console.log(res.data))
          .catch((error) => console.log(error));
      }
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, [user]);
  const authInfo = {
    user,
    createUser,
    logOut,
    logIn,
    logInWithGoogle,
    loading,
    updateUserProfile,
  };

  return (
    <AuthContest.Provider value={authInfo}>{children}</AuthContest.Provider>
  );
};
Context.propTypes = {
  children: PropTypes.object,
};
export default Context;
