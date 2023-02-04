import React from 'react'
import { useAppDispatch } from '../src/store/index'
import Link from 'next/link'
import SimpleBottomNavigation from '../components/AppBar'
import { useSelector } from 'react-redux'
import { RootState } from '../src/store'
import { Box } from '@mui/material'
import { updateProfile } from '../src/store/slices/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { dataOfUser } from '../src/store/slices/firebase'
import { auth } from '../src/config/firebase'

export default function Settings() {
  const user = useSelector((state: RootState) => state.firebaseSlice.user)
  const dispatch = useAppDispatch()
  const [token, setToken] = React.useState<any>('')
  const [input, setInput] = React.useState({
    user: '',
  })
  const [text, setText] = React.useState('Guardar')

  React.useEffect(() => {
    onAuthStateChanged(auth, function (user: any) {
      if (user) {
        setToken(user['accessToken'])
        dispatch(dataOfUser(user['accessToken']))
      }
    })
  }, [])

  React.useEffect(() => {
    setToken(sessionStorage.getItem('accessToken'))
  }, [])

  const handleChange = (e: any) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async () => {
    setText('Cargando...')
    await dispatch(updateProfile(token, input, ''))
    setInput({
      user: '',
    })
    setText('Guardar')
  }

  return (
    <>
      <Box
        sx={{
          overflowX: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          paddingBottom: '30px',
          paddingTop: '30px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <h3>Configuracion</h3>
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
            <label>Nombre de usuario</label>
            <input
              name="user"
              placeholder={user?.user === null ? '' : user?.user}
              type="text"
              onChange={handleChange}
              style={{
                borderRadius: '12px',
                border: '1px solid #D9D9D9',
                padding: '12px',
                width: '100%',
                fontFamily: 'Mulish',
                fontWeight: 800,
                fontSize: '14px',
                marginTop: '10px',
                marginBottom: '10px',
              }}
            ></input>
          </div>
          <button disabled={input.user === '' ? true : false} onClick={handleSubmit}>
            {text}
          </button>
        </div>
        <SimpleBottomNavigation image={user?.user_image} />
      </Box>
    </>
  )
}
