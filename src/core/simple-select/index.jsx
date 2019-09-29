import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Select,
  InputLabel,
  Typography,
  FormControl,
  MenuItem
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  formControl: {
    marginTop: 20
  },
  label: {
    transform: 'translate(14px, 10px) scale(1)'
  }
}))

const SimpleSelect = ({
  id,
  label,
  options,
  onChange,
  selectedValue
}) => {
  const classes = useStyles()
  const inputLabel = React.useRef(null)
  const [labelWidth, setLabelWidth] = React.useState(0)

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])

  return (
    <div>
      <FormControl variant="outlined" fullWidth className={classes.formControl}>
        <InputLabel ref={inputLabel} htmlFor={id} className={classes.label}>
          <Typography variant="button">{label}</Typography>
        </InputLabel>
        <Select
          value={selectedValue}
          onChange={onChange}
          labelWidth={labelWidth}
          margin="dense"
          inputProps={{
            id
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {options.map(option => (
            <MenuItem value={option.value} key={option.value}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default SimpleSelect
