import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  collapseContainer: {
    marginTop: 16,
  },
});

const InfoLine = ({ label, children }) => {
  const classes = useStyles();

  return (
    <Grid
      className={classes.collapseContainer}
      container
      justify="space-between"
      alignItems="center"
    >
      <Grid item xs={6}>
        <Typography variant="body2" color="textSecondary">
          {label}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        {children}
      </Grid>
    </Grid>
  );
};

InfoLine.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default InfoLine;
