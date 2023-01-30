import React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import { CardMedia, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '../src/store'
import { useAppDispatch } from '../src/store/index'
import { updateProfile } from '../src/store/slices/firebase'
import BasicModal from './modalLink'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { dataOfUser } from '../src/store/slices/firebase'
import { auth } from '../src/config/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import ModalPhoto from './ModalPhoto'

interface Props {
  setState: any
  state: any
  photo: string
  toggleDrawer: any
}

export default function TemporaryDrawer(props: Props) {
  const user = useSelector((state: RootState) => state.firebaseSlice.user)
  const [modalPhoto, setModalPhoto] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [token, setToken] = React.useState<any>('')
  const [photo, setPhoto] = React.useState(props.photo)
  const [input, setInput] = React.useState({
    user_name: user?.user_name ? user?.user_name : '',
    user_biography: user?.user_biography ? user?.user_biography : '',
    user_job: user?.user_job ? user?.user_job : '',
    company: user?.company ? user?.company : '',
  })
  const dispatch = useAppDispatch()
  const [previewSource, setPreviewSource] = React.useState<any>('')
  const [image, setImage] = React.useState({
    imageName: '',
    user_image: '',
  })
  const [loading, setLoading] = React.useState(false)
  const [textOfProfile, setText] = React.useState('Actualizar perfil')

  React.useEffect(() => {
    setToken(sessionStorage.getItem('accessToken'))
  }, [])

  React.useEffect(() => {
    onAuthStateChanged(auth, function (user: any) {
      if (user) {
        dispatch(dataOfUser(user['accessToken']))
      }
    })
  }, [])

  function handleImage(e: any) {
    setImage({
      ...image,
      imageName: e.target.value,
      user_image: e.target.files[0],
    })
    previewFile(e.target.files[0])
  }

  function previewFile(file: any) {
    const reader = new FileReader()
    console.log(image)
    if (file) {
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setPreviewSource(reader.result)
      }
    }
  }

  function handleChange(e: any) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
  }

  async function saveProfile() {
    if (Object.values(input).length === 0 && previewSource === '') {
      return alert('Modifica algun campo para modificar')
    }
    try {
      setText('Cargando...')
      if (previewSource === '') {
        await dispatch(updateProfile(token, input, previewSource))
      } else {
        await dispatch(updateProfile(token, input, previewSource))
        setLoading(true)
        location.reload()
        setLoading(false)
      }
      setInput({
        user_name: user?.user_name ? user?.user_name : '',
        user_biography: user?.user_biography ? user?.user_biography : '',
        user_job: user?.user_job ? user?.user_job : '',
        company: user?.company ? user?.company : '',
      })
      setText('Actualizar perfil')
      props.setState({ bottom: false })
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {}, [loading])

  return (
    <div>
      <React.Fragment>
        <Drawer
          anchor={'bottom'}
          open={props.state['bottom']}
          onClose={props.toggleDrawer('bottom', false)}
          sx={{
            borderTopRightRadius: '8px',
            borderTopLeftRadius: '8px',
          }}
        >
          <Box sx={{ width: '100%', height: '60vh' }} role="presentation">
            <List>
              <Typography
                component="p"
                sx={{
                  fontFamily: 'Mulish',
                  fontWeight: 600,
                  fontSize: '18px',
                  marginLeft: '15px',
                }}
              >
                Editar perfil
              </Typography>
              <Box
                component="div"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <CardMedia
                  onClick={() => setModalPhoto(true)}
                  component="img"
                  image={previewSource ? previewSource : user?.user_image}
                  sx={{ width: '120px', height: '120px', borderRadius: '50%', marginY: '10px', cursor: 'pointer' }}
                />
                <div>
                  <EditIcon
                    color="inherit"
                    sx={{
                      position: 'relative',
                      top: '-40px',
                      left: '50px',
                      borderRadius: '10px',
                    }}
                  />
                </div>
                <input
                  onChange={(e: any) => handleChange(e)}
                  placeholder={'Nombre'}
                  className="input-drawer"
                  value={input.user_name}
                  name="user_name"
                ></input>
                <input
                  onChange={(e: any) => handleChange(e)}
                  placeholder={'Biografia'}
                  className="input-drawer"
                  value={input.user_biography}
                  name="user_biography"
                ></input>
                <input
                  onChange={(e: any) => handleChange(e)}
                  placeholder={'Puesto de trabajo'}
                  value={input.user_job}
                  className="input-drawer"
                  name="user_job"
                ></input>
                <input
                  onChange={(e: any) => handleChange(e)}
                  placeholder={'Empresa'}
                  value={input.company}
                  className="input-drawer"
                  name="company"
                  style={{ marginBottom: '20px' }}
                ></input>
                <Button
                  onClick={saveProfile}
                  sx={{
                    width: '80%',
                    backgroundColor: '#000',
                    color: '#FFF',
                    fontFamily: 'Mulish',
                    '&:hover': {
                      backgroundColor: '#000',
                    },
                    borderRadius: '10px',
                    marginBottom: '20px',
                  }}
                >
                  {textOfProfile}
                </Button>
                <Typography
                  component="p"
                  sx={{
                    fontFamily: 'Mulish',
                    fontWeight: 600,
                    fontSize: '18px',
                  }}
                >
                  Enlaces
                </Typography>
                {Array.isArray(user?.links) &&
                  user.links.map((link: any) => (
                    <Button
                      key={link.link_name}
                      sx={{
                        backgroundColor: 'lightgrey',
                        borderRadius: '12px',
                        padding: '6px',
                        width: '80%',
                        margin: '5px',
                        color: '#000',
                        fontFamily: 'Mulish',
                        textTransform: 'capitalize',
                      }}
                    >
                      {' '}
                      <CardMedia
                        key={link.link_name}
                        component="img"
                        image={link.link_logo}
                        className="image-links"
                        sx={{
                          width: '24px',
                          height: '24px',
                          marginRight: '4px',
                          position: 'absolute',
                          left: '20px',
                        }}
                      />{' '}
                      {link.link_name}
                    </Button>
                  ))}

                <Button
                  onClick={() => setOpen(true)}
                  sx={{
                    backgroundColor: 'lightgrey',
                    borderRadius: '12px',
                    padding: '6px',
                    width: '80%',
                    margin: '5px',
                    color: '#000',
                    fontFamily: 'Mulish',
                    textTransform: 'capitalize',
                  }}
                >
                  + Agregar nuevo enlace
                </Button>
              </Box>

              {open && <BasicModal open={open} setOpen={setOpen} setState={props.setState} />}
              {modalPhoto && <ModalPhoto open={modalPhoto} setOpen={setModalPhoto} />}
            </List>
          </Box>
        </Drawer>
      </React.Fragment>
    </div>
  )
}
