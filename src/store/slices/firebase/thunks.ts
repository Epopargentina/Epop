import { dataUser, loginWithGoogle, updateUser } from './firebaseSlice'
import { auth, googleAuthProvider } from '../../../config/firebase'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import axios from 'axios'

const endpoint = 'https://epop-api.onrender.com'

export const loginWithGoogleThunk = () => {
  return async (dispatch: any) => {
    const result = await signInWithPopup(auth, googleAuthProvider)
    const credential = GoogleAuthProvider.credentialFromResult(result)
    let token: any = result.user
    token = token['accessToken']
    try {
      let { data } = await axios.post(
        `${endpoint}/auth/register`,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      )
      data = data.data
      dispatch(loginWithGoogle({ data, token }))
    } catch (error) {
      console.log(error)
    }
  }
}

export const updateProfile = (token: string, data: any, decoded: any) => {
  return async (dispatch: any) => {
    if (decoded != '') {
      data.user_image = decoded
    }
    let updatedUser = await axios.put(`${endpoint}/user`, data, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    updatedUser = updatedUser.data
    dispatch(updateUser({ updatedUser }))
  }
}

export const dataOfUser = (token: string) => {
  return async (dispatch: any) => {
    try {
      let { data } = await axios.post(
        `${endpoint}/auth/register`,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      )
      data = data.data
      dispatch(dataUser(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const postLink = (token: string, linkData: any) => {
  return async (dispatch: any) => {
    try {
      let postLink = await axios.post(`${endpoint}/links`, linkData, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      let { data } = await axios.post(
        `${endpoint}/auth/register`,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      )
      data = data.data
      dispatch(dataUser(data))
    } catch (error) {
      console.log(error)
    }
  }
}
