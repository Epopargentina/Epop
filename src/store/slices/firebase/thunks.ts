import { loginWithGoogle, updateUser } from "./firebaseSlice";
import { auth, googleAuthProvider } from "../../../config/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import axios from "axios";

export const loginWithGoogleThunk = () => {
  return async (dispatch: any) => {
    const result = await signInWithPopup(auth, googleAuthProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    let token: any = result.user;
    token = token["accessToken"];
    try {
      let { data } = await axios.post(
        "http://localhost:3001/auth/register",
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      data = data.data;
      dispatch(loginWithGoogle({ data, token }));
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateProfile = (token: string, data: any) => {
  return async (dispatch: any) => {
    let updatedUser = await axios.put("http://localhost:3001/user", data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    updatedUser = updatedUser.data;
    dispatch(updateUser({ updatedUser }));
  };
};
