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

interface Props {
  setState: any
  state: any
  photo: string
  toggleDrawer: any
}

export default function TemporaryDrawer(props: Props) {
  const [open, setOpen] = React.useState(false)
  const user = useSelector((state: RootState) => state.firebaseSlice.user)
  const [token, setToken] = React.useState<any>('')
  const [photo, setPhoto] = React.useState(props.photo)

  const [input, setInput] = React.useState({})
  const dispatch = useAppDispatch()
  const [previewSource, setPreviewSource] = React.useState<any>('')
  const [image, setImage] = React.useState({
    imageName: '',
    user_image: '',
  })
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    setToken(sessionStorage.getItem('accessToken'))
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
      if (previewSource === '') {
        await dispatch(updateProfile(token, input, previewSource))
      } else {
        await dispatch(updateProfile(token, input, previewSource))
        setLoading(true)
        location.reload()
        setLoading(false)
      }
      setInput({})
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
          <Box sx={{ width: '100%' }} role="presentation">
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
                  component="img"
                  image={previewSource ? previewSource : user?.user_image}
                  sx={{ width: '120px', height: '120px', borderRadius: '50%', marginY: '10px' }}
                />
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'normal',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    gap: '40px',
                    marginBottom: '10px',
                  }}
                >
                  <label
                    htmlFor="upload-photo"
                    style={{
                      cursor: 'pointer',
                      backgroundColor: '#000',
                      color: '#fff',
                      textAlign: 'center',
                      // width: '120px',
                      borderRadius: '10px',
                      padding: '10px',
                      fontFamily: 'Mulish',
                      height: '45px',
                    }}
                  >
                    <EditIcon />
                  </label>
                  <button
                    style={{
                      backgroundColor: '#FDCFDA',
                      border: '1px solid #B4042B',
                      fontFamily: 'Mulish',
                      padding: '10px',
                      borderRadius: '10px',
                      height: '45px',
                      cursor: 'pointer',
                    }}
                  >
                    <DeleteIcon />
                  </button>
                </div>
                <input
                  type="file"
                  id="upload-photo"
                  name="user_image"
                  placeholder="Imagen"
                  value={image.imageName}
                  onChange={(e: any) => handleImage(e)}
                  style={{ opacity: 0, position: 'absolute', zIndex: -1 }}
                ></input>

                <input
                  onChange={(e: any) => handleChange(e)}
                  placeholder="Nombre"
                  className="input-drawer"
                  name="user_name"
                ></input>
                <input
                  onChange={(e: any) => handleChange(e)}
                  placeholder="Biografia"
                  className="input-drawer"
                  name="user_biography"
                ></input>
                <input
                  onChange={(e: any) => handleChange(e)}
                  placeholder="Puesto de trabajo"
                  className="input-drawer"
                  name="user_job"
                ></input>
                <input
                  onChange={(e: any) => handleChange(e)}
                  placeholder="Empresa"
                  className="input-drawer"
                  name="company"
                  style={{ marginBottom: '20px' }}
                ></input>
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
                        width: '40%',
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
                    width: '40%',
                    margin: '5px',
                    color: '#000',
                    fontFamily: 'Mulish',
                    textTransform: 'capitalize',
                  }}
                >
                  + Agregar nuevo enlace
                </Button>
              </Box>
              <Button
                onClick={saveProfile}
                fullWidth
                sx={{
                  backgroundColor: '#000',
                  color: '#FFF',
                  fontFamily: 'Mulish',
                  '&:hover': {
                    backgroundColor: '#000',
                  },
                  marginTop: '5px',
                  borderRadius: 0,
                }}
              >
                Guardar perfil
              </Button>
              {open && <BasicModal open={open} setOpen={setOpen} setState={props.setState} />}
            </List>
          </Box>
        </Drawer>
      </React.Fragment>
    </div>
  )
}
