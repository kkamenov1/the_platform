import React from 'react'
import { Dialog } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  modalWrapper: {
    padding: 32
  }
}))

const Modal = ({
  fullScreen,
  open,
  onClose,
  children,
  other
}) => {
  const classes = useStyles()
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      {...other}
    >
      <div className={classes.modalWrapper}>
        {children}
      </div>
    </Dialog>
  )
}

export default Modal
