import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { auth } from "../../../config/firebase";
import { signOut, sendPasswordResetEmail } from "firebase/auth";

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
      state.user = action.payload.data;
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
    updateUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload.updatedUser;
    },
    dataUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginWithGoogle, logOut, updateUser, dataUser } =
  firebaseSlice.actions;

export default firebaseSlice;
