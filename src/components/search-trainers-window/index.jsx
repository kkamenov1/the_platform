import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Button } from '@material-ui/core'
import InputWithLabel from '../../core/components/input-with-label'
import SimpleSelect from '../../core/components/simple-select'

const useStyles = makeStyles(theme => ({
  outerModalContainer: {
    position: 'relative',
    padding: 0,
    top: 0,
    zIndex: 1,

    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      top: 120,
      padding: '0 60px'
    }
  },
  innerModalContainer: {
    borderRadius: 4,
    width: '100%',
    padding: 24,
    boxShadow: '0 16px 40px rgba(0,0,0,0.12)',
    backgroundColor: theme.palette.common.white,

    [theme.breakpoints.up('md')]: {
      width: 441,
      padding: '32px 32px 24px 32px'
    }
  },
  modalHeader: {
    margin: 0,
    color: 'rgb(72, 72, 72)'
  },
  form: {
    marginTop: 15
  },
  searchBtnWrapper: {
    textAlign: 'right',
    marginTop: 25
  },
  searchButton: {
    backgroundColor: 'rgb(255, 90, 95)',
    width: '100%',

    '&:hover': {
      backgroundColor: 'rgb(255, 90, 95)'
    },

    [theme.breakpoints.up('md')]: {
      width: '30%'
    }
  }
}))

const selectOptions = [
  {
    name: 'Bodybuilding',
    value: 'bodybuilding'
  },
  {
    name: 'Crossfit',
    value: 'crossfit'
  }
]

const SearchTrainersWindow = () => {
  const classes = useStyles()
  const [value, setSelectValue] = React.useState('')

  const onSportSelectChange = event => {
    setSelectValue(event.target.value)
  }

  return (
    <div className={classes.outerModalContainer}>
      <div className={classes.innerModalContainer}>
        <Typography
          className={classes.modalHeader}
          variant="inherit"
          component="h1"
        >
          Search Trainers
        </Typography>

        <div>
          <form className={classes.form}>
            <InputWithLabel id="place" placeholder="Anywhere" label="where" />
            <SimpleSelect
              id="sport"
              label="Sport"
              options={selectOptions}
              onChange={onSportSelectChange}
              selectedValue={value}
            />
            <div className={classes.searchBtnWrapper}>
              <Button
                className={classes.searchButton}
                size="large"
                variant="contained"
                color="primary"
              >
                Search
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SearchTrainersWindow
