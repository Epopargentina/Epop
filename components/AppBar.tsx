import * as React from 'react'
import Box from '@mui/material/Box'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import RestoreIcon from '@mui/icons-material/Restore'
import FavoriteIcon from '@mui/icons-material/Favorite'
import SettingsIcon from '@mui/icons-material/Settings'
import CardMedia from '@mui/material/CardMedia'
import Link from 'next/link'

interface Props {
  image: string
}

export default function SimpleBottomNavigation(props: Props) {
  const [value, setValue] = React.useState(1)

  return (
    <Box sx={{ width: '100%', marginTop: 'auto' }} component="footer">
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
        sx={{ border: '1px solid lightgray', width: '100%', borderRadius: '10px' }}
      >
        <Link href={'/#'}>
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        </Link>
        <Link href={'/home'}>
          <BottomNavigationAction
            icon={
              <CardMedia component="img" image={props.image} sx={{ width: '60px', borderRadius: 50, height: '60px' }} />
            }
          />
        </Link>
        <Link href="/settings">
          <BottomNavigationAction label="Configuracion" icon={<SettingsIcon />} />
        </Link>
      </BottomNavigation>
    </Box>
  )
}
