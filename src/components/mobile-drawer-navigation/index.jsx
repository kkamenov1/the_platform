import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'

const useStyles = makeStyles({
  drawer: {
    top: 80
  }
})

const MobileDrawerNavigation = ({ toggleDrawer, open }) => {
  const classes = useStyles()

  return (
    <Drawer
      anchor="top"
      open={open}
      onClose={toggleDrawer(false)}
      classes = {{
        paper: classes.drawer
      }}
    >
      <h1>TESTTTTTTTTTT</h1>
    </Drawer>
  )
}

export default MobileDrawerNavigation
