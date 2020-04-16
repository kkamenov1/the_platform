import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  bottomOffsetS: {
    marginBottom: 16,
  },
});

const InfoLine = ({ icon, label, children }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.bottomOffsetS}>
      <Grid item xs={8}>
        <Grid container alignItems="center">
          <Grid item>
            {icon}
          </Grid>
          <Grid item>
            <Typography variant="body2">
              {label}
            </Typography>
          </Grid>
        </Grid>

      </Grid>
      <Grid item xs={4}>
        {children}
      </Grid>
    </Grid>
  );
};

InfoLine.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default InfoLine;
