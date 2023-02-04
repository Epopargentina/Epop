import React from 'react'
import { useRouter } from 'next/router'
import { Box, CardMedia, Typography } from '@mui/material'
import { useAppDispatch } from '../../src/store'
import { findByUserName } from '../../src/store/slices/firebase'
import { useSelector } from 'react-redux'
import { RootState } from '../../src/store'
import Link from 'next/link'

const Post = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { userId } = router.query
  const userInvite = useSelector((state: RootState) => state.firebaseSlice.inviteUser)
  const photoURL = userInvite?.user_image
  const links = userInvite?.links

  React.useEffect(() => {
    dispatch(findByUserName(String(userId))).then(result => {
      console.log(userInvite)
    })
  }, [])

  return (
    <Box
      component="div"
      sx={{
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        paddingBottom: '30px',
        paddingTop: '30px',
      }}
    >
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
          <b>{userInvite?.user_name}</b>
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
          {userInvite ? userInvite.user_job : ''} at {userInvite ? userInvite.company : ''}
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
          {userInvite ? userInvite.user_biography : ''}
        </Typography>

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
    </Box>
  )
}

export default Post
