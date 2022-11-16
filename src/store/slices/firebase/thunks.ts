import { loginWithGoogle } from "./firebaseSlice";
import { auth, googleAuthProvider } from "../../../config/firebase";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  sendPasswordResetEmail,
  GoogleAuthProvider,
} from "firebase/auth";
import { AnyAction, createAsyncThunk, Dispatch } from "@reduxjs/toolkit";
import { AppDispatch, useAppDispatch } from "../../store";

// const loginWithGoogleThunk = createAsyncThunk("login", async () => {
//   signInWithPopup(auth, googleAuthProvider).then((result: any) => {
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential?.accessToken;
//     const user = result.user;
//     return { user, token };
//   });
// });

export const loginWithGoogleThunk = () => {
  return async (dispatch: any) => {
    signInWithPopup(auth, googleAuthProvider).then((result: any) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      dispatch(loginWithGoogle({ user, token }));
    });
  };
};
