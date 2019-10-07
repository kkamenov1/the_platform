import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, InputLabel, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  input: {
    marginTop: 0,
    width: '100%'
  }
}))

const InputWithLabel = ({
  id,
  placeholder,
  label,
  other
}) => {
  const classes = useStyles()

  return (
    <div>
      <InputLabel htmlFor={id}>
        <Typography variant="button">{label}</Typography>
      </InputLabel>
      <TextField
        id={id}
        variant="outlined"
        placeholder={placeholder}
        margin="dense"
        className={classes.input}
        {...other}
      />
    </div>
  )
}

export default InputWithLabel
