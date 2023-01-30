import * as React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { useSelector } from 'react-redux'
import { RootState } from '../src/store'
import { Button, CardMedia } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { useAppDispatch } from '../src/store/index'
import { updateProfile } from '../src/store/slices/firebase'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
}

interface BasicModalProps {
  open: any
  setOpen: any
  imageState?: any
  handleImage?: any
  previewSource?: any
  setPreviewSource?: any
}

export default function ModalPhoto({ open, setOpen }: BasicModalProps) {
  const user = useSelector((state: RootState) => state.firebaseSlice.user)
  const [previewSource, setPreviewSource] = React.useState<any>('')
  const [input, setInput] = React.useState({})
  const [token, setToken] = React.useState<any>('')
  const [image, setImage] = React.useState({
    imageName: '',
    user_image: '',
  })
  const [loading, setLoading] = React.useState(false)
  const dispatch = useAppDispatch()
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  React.useEffect(() => {
    setToken(sessionStorage.getItem('accessToken'))
  }, [])

  function handleImage(e: any) {
    console.log('handle image')
    setImage({
      ...image,
      imageName: e.target.value,
      user_image: e.target.files[0],
    })
    previewFile(e.target.files[0])
  }

  function previewFile(file: any) {
    const reader = new FileReader()
    if (file) {
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setPreviewSource(reader.result)
        saveImageProfile(reader.result)
      }
    }
  }

  async function saveImageProfile(image: any) {
    if (image === '') {
      return alert('Por favor selecciona una imagen')
    }
    setLoading(true)
    await dispatch(updateProfile(token, input, image))
    handleClose()
    location.reload
    setLoading(false)
  }

  async function deleteImage() {
    setLoading(true)
    await dispatch(updateProfile(token, input, 'https://epop.com.ar/upload/default-avatar.svg'))
    handleClose()
    location.reload
    setLoading(false)
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {loading ? (
            <>
              <Stack spacing={1}>
                {/* For variant="text", adjust the height via font-size */}
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />

                {/* For other variants, adjust the size with `width` and `height` */}
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="rectangular" width={210} height={60} />
                <Skeleton variant="rounded" width={210} height={60} />
              </Stack>
            </>
          ) : (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CardMedia
                  component="img"
                  image={previewSource ? previewSource : user?.user_image}
                  sx={{ width: '120px', height: '120px', borderRadius: '50%', marginY: '10px', cursor: 'pointer' }}
                />
              </Box>
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
                  htmlFor="upload-photo1"
                  style={{
                    cursor: 'pointer',
                    backgroundColor: '#000',
                    color: '#fff',
                    textAlign: 'center',
                    borderRadius: '10px',
                    padding: '10px',
                    fontFamily: 'Mulish',
                    height: '45px',
                  }}
                >
                  <EditIcon />
                </label>
                <button
                  onClick={deleteImage}
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
                id="upload-photo1"
                name="user_image"
                placeholder="Imagen"
                value={image.imageName}
                onChange={(e: any) => handleImage(e)}
                style={{ opacity: 0, position: 'absolute', zIndex: -1 }}
              ></input>
            </>
          )}
        </Box>
      </Modal>
    </div>
  )
}
