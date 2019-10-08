import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  separatorOuter: {
    margin: '16px 0',
  },
  separatorInner: {
    textAlign: 'center',
    overflow: 'hidden',
  },
  textOuter: {
    padding: 16,
    position: 'relative',
  },
  textInner: {
    color: 'rgb(118, 118, 118)',
    margin: 0,

    '&:before': {
      border: '.5px solid #e4e4e4',
      content: '""',
      position: 'absolute',
      top: '50%',
      right: '100%',
      width: 5000,
    },

    '&:after': {
      border: '.5px solid #e4e4e4',
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '100%',
      width: 5000,
    },
  },
});


const OrDivider = () => {
  const classes = useStyles();

  return (
    <div className={classes.separatorOuter}>
      <div className={classes.separatorInner}>
        <span className={classes.textOuter}>
          <span className={classes.textInner}>or</span>
        </span>
      </div>
    </div>
  );
};

export default OrDivider;
