import React from 'react'
import { Button, CardMedia, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { RootState } from '../src/store'
import SimpleBottomNavigation from '../components/AppBar'
import TemporaryDrawer from '../components/drawer'
import { useAppDispatch } from '../src/store/index'
import { dataOfUser } from '../src/store/slices/firebase'
import { auth } from '../src/config/firebase'
import { confirmPasswordReset, onAuthStateChanged } from 'firebase/auth'
import Link from 'next/link'

export default function Home() {
  const token = useSelector((state: RootState) => state.firebaseSlice.token)
  const user = useSelector((state: RootState) => state.firebaseSlice.user)
  const [displayName, setDisplayName] = React.useState<any>('')
  const links = user?.links
  const router = useRouter()
  const [state, setState] = React.useState({ bottom: false })
  const photoURL = user?.user_image
  const biography = user?.user_biography
  const dispatch = useAppDispatch()

  const toggleDrawer = (anchor: string, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }

    setState({ ...state, [anchor]: open })
  }

  React.useEffect(() => {
    onAuthStateChanged(auth, function (user: any) {
      if (user) {
        sessionStorage.setItem('accessToken', user['stsTokenManager']['accessToken'])
        dispatch(dataOfUser(user['accessToken']))
        localStorage.setItem('displayName', user['displayName'])
        setDisplayName(localStorage.getItem('displayName'))
      } else {
        router.push('/login')
      }
    })
  }, [])

  return (
    <Box component="div" sx={{ overflowX: 'hidden', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '10px',
        }}
      >
        <img
          src={`${photoURL}`}
          style={{ width: '220px', height: '220px', objectFit: 'cover', borderRadius: '50%' }}
          alt="profile_photo"
        />
      </div>
      <Box
        component="div"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography
          component="p"
          sx={{
            fontFamily: 'Mulish',
            fontWeight: 600,
            fontSize: '32px',
            margin: '20px',
            marginBottom: '4px',
          }}
        >
          <b>{user?.user_name ? user?.user_name : displayName}</b>
        </Typography>

        <Typography
          component="p"
          sx={{
            fontFamily: 'Mulish',
            fontWeight: 600,
            fontSize: '20px',
            color: 'grey',
            marginBottom: '20px',
          }}
        >
          {user ? user.user_job : ''} at {user ? user.company : ''}
        </Typography>

        <Typography
          component="p"
          sx={{
            fontFamily: 'Mulish',
            fontWeight: 400,
            fontSize: '18px',
            color: 'darkgrey',
            marginBottom: '20px',
            width: '60%',
            textAlign: 'center',
          }}
        >
          {user ? user.user_biography : ''}
        </Typography>

        <Button
          onClick={toggleDrawer('bottom', true)}
          variant="contained"
          sx={{
            backgroundColor: 'black',
            width: '320px',
            height: '42px',
            borderRadius: '16px',
            '&:hover': { backgroundColor: 'black' },
            marginBottom: '40px',
          }}
        >
          Editar perfil
        </Button>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            maxWidth: '100%',
            alignItems: 'baseline',
            justifyContent: 'center',
            marginBottom: '20px',
          }}
        >
          {Array.isArray(links) &&
            links.map((item: any) => (
              <div
                key={item.link_name}
                style={{
                  margin: '5px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <Link href={`https://${item.link_url}`} target={'_blank'}>
                  <CardMedia
                    component="img"
                    image={item.link_logo}
                    sx={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '10px',
                    }}
                  />
                  <label
                    style={{
                      width: '100px',
                      fontFamily: 'Mulish',
                      fontSize: '12px',
                    }}
                  >
                    {item.link_name}
                  </label>
                </Link>
              </div>
            ))}
        </div>
      </Box>
      <TemporaryDrawer
        key={token}
        state={state}
        setState={setState}
        photo={user?.user_image}
        toggleDrawer={toggleDrawer}
      />
      <SimpleBottomNavigation image={user?.user_image} />
    </Box>
  )
}
