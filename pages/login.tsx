import React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CardMedia, CircularProgress, Divider } from '@mui/material'
import { RootState } from '../src/store'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { dataOfUser, loginWithGoogleThunk } from '../src/store/slices/firebase'
import { useAppDispatch } from '../src/store/index'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../src/config/firebase'

declare module '*.svg' {
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
  const src: string
}

const theme = createTheme()

theme.typography.h5 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  fontWeight: '500',
}

export default function SignIn() {
  const user = useSelector((state: RootState) => state.firebaseSlice.user)
  const token = useSelector((state: RootState) => state.firebaseSlice.token)
  const [loading, setLoading] = React.useState(false)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log('handle submit in development')
  }

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true)
      dispatch(loginWithGoogleThunk())
    } catch (error) {
      router.push('/login')
      console.log(error)
    }
  }

  React.useEffect(() => {}, [user])

  React.useEffect(() => {
    onAuthStateChanged(auth, function (user: any) {
      if (user) {
        sessionStorage.setItem('accessToken', user['stsTokenManager']['accessToken'])
      } else {
        setLoading(false)
        router.push('/login')
      }
    })
  }, [])

  React.useEffect(() => {
    if (token) {
      router.push('/home')
    }
    const accessToken = sessionStorage.getItem('accessToken')
    if (!user && accessToken) {
      // setLoading(true)
      dispatch(dataOfUser(accessToken))
    }
  }, [user])

  if (loading) {
    return (
      <Box
        component="div"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          backgroundColor: '#19191a',
          width: '100%',
        }}
      >
        <Container
          component="main"
          maxWidth="sm"
          sx={{
            backgroundColor: '#EEEEEE',
            borderRadius: '16px',
            overflowY: 'hidden',
            background: '#f5f5f5',
            width: '80%',
          }}
        >
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderRadius: '20px',
              mx: 'auto',
              mb: 2,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px',
                backgroundColor: '#19191a',
                width: '30%',
                height: '80px',
                borderRadius: '10px',
              }}
            >
              <CardMedia
                component="img"
                image="/logo.png"
                sx={{ width: '80%', height: '50px', objectFit: 'contain' }}
              />
            </div>

            <Typography
              component="label"
              sx={{
                fontFamily: 'Mulish',
                color: '#000',
                fontWeight: 800,
                fontSize: '28px',
                width: '100%',
                height: '60px',
                textAlign: 'center',
                padding: '24px',
              }}
            >
              Iniciar sesion
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                disabled
                margin="normal"
                required
                fullWidth
                id="email"
                label="Tu usuario"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                disabled
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                sx={{ display: 'block' }}
                control={<Checkbox value="remember" color="primary" sx={{ color: 'gray' }} />}
                label="Recordar contraseña"
              />
              <Box
                component="div"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Button
                  disabled
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 2,
                    mb: 1,
                    color: 'white',
                    backgroundColor: '#000',
                    textTransform: 'capitalize',
                  }}
                >
                  Iniciar sesion
                </Button>
              </Box>
              <Grid container>
                <Grid item xs>
                  <Link
                    href="#"
                    variant="body2"
                    sx={{
                      textDecoration: 'none',
                      color: '#000',
                      '&:hover': { color: '#00A6CB' },
                    }}
                  >
                    Olvidaste tu contraseña?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Divider
            sx={{
              color: '#000',
              mt: 2,
            }}
          ></Divider>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Button
              onClick={handleGoogleSignIn}
              sx={{
                backgroundColor: '#000',
                color: 'white',
                '&:hover': { backgroundColor: '#00A6CB' },
                display: 'flex',
                width: '75%',
                textTransform: 'capitalize',
                margin: '20px',
              }}
            >
              <CardMedia
                component="img"
                image="/google.svg"
                sx={{
                  width: '22px',
                  position: 'absolute',
                  top: '20%',
                  right: '0%',
                  left: '6%',
                  bottom: '0%',
                }}
              />
              Continuar con Google
            </Button>
          </Box>
          <Box sx={{ py: 1 }}></Box>
        </Container>
      </div>
    </ThemeProvider>
  )
}
