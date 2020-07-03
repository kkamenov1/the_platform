import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Fab } from '@material-ui/core';
import { Link as NavigationLink } from 'react-router-dom';
import { BECOME_GURU_APPLY } from '../../constants/routes';

const useStyles = makeStyles((theme) => ({
  fab: {
    width: '80%',

    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
}));

const ApplyButton = () => {
  const classes = useStyles();

  return (
    <Fab
      className={classes.fab}
      variant="extended"
      size="large"
      color="primary"
      component={NavigationLink}
      to={BECOME_GURU_APPLY}
    >
      APPLY NOW
    </Fab>
  );
};

export default ApplyButton;
