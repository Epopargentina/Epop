import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { auth, googleAuthProvider } from "../../../config/firebase";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  sendPasswordResetEmail,
  GoogleAuthProvider,
} from "firebase/auth";

export interface CounterState {
  user: any;
  token: any;
  loading: boolean;
  error: any;
}

const initialState: CounterState = {
  user: null,
  token: null,
  loading: true,
  error: [],
};

//SLICE
export const firebaseSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    loginWithGoogle: (state, action: PayloadAction<any>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    logOut: (state) => {
      signOut(auth).then(() => {
        state.user = null;
        state.token = null;
      });
    },
    recoverPassword: (state, action: PayloadAction<string>) => {
      sendPasswordResetEmail(auth, action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginWithGoogle, logOut } = firebaseSlice.actions;

export default firebaseSlice;
