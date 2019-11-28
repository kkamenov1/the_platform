import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, FormControl } from '@material-ui/core';
import { InputWithLabel, SimpleSelect } from '../../core/components';
import sports from '../../constants/sports';

const useStyles = makeStyles((theme) => ({
  outerModalContainer: {
    position: 'relative',
    padding: 0,
    top: 0,
    zIndex: 1,

    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      top: 120,
      padding: '0 60px',
    },
  },
  innerModalContainer: {
    borderRadius: theme.shape.borderRadius,
    width: '100%',
    padding: 24,
    boxShadow: theme.shadows['16'],
    backgroundColor: theme.palette.common.white,

    [theme.breakpoints.up('md')]: {
      width: 441,
      padding: '32px 32px 24px 32px',
    },
  },
  modalHeader: {
    margin: 0,
    color: theme.palette.text.primary,
  },
  form: {
    marginTop: 15,
  },
  searchBtnWrapper: {
    marginTop: 25,
  },
}));

const SearchTrainersWindow = () => {
  const classes = useStyles();
  const [value, setSelectValue] = React.useState('');

  const onSportSelectChange = (event) => {
    setSelectValue(event.target.value);
  };

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
              name="sport"
              options={sports}
              onChange={onSportSelectChange}
              selectedValue={value}
            />
            <FormControl className={classes.searchBtnWrapper} fullWidth>
              <Button
                size="large"
                variant="contained"
                color="primary"
              >
                Search
              </Button>
            </FormControl>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchTrainersWindow;
