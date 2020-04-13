import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';


const useStyles = makeStyles((theme) => ({
  labelWrapper: {
    padding: '3px 0',
  },

  label: {
    textTransform: 'uppercase',
    border: `1px solid ${theme.palette.common.black}`,
    fontWeight: theme.typography.fontWeightMedium,
    borderRadius: 5,
    padding: '2px 5px',
  },
}));

const SportBadge = ({ sport }) => {
  const classes = useStyles();

  return (
    <>
      {sport ? (
        <div className={classes.labelWrapper}>
          <Typography
            variant="body2"
            color="textSecondary"
            component="span"
            className={classes.label}
          >
            {sport}
          </Typography>
        </div>
      ) : (
        <Skeleton variant="rect" width={120} height={30} />
      )}
    </>
  );
};

SportBadge.defaultProps = {
  sport: undefined,
};

SportBadge.propTypes = {
  sport: PropTypes.string,
};

export default SportBadge;
