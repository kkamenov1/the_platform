import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';


const useStyles = makeStyles((theme) => ({
  labelWrapper: {
    padding: '3px 0',
    display: 'inline-block',
  },

  label: {
    textTransform: 'uppercase',
    border: `1px solid ${theme.palette.common.black}`,
    fontWeight: theme.typography.fontWeightMedium,
    borderRadius: 5,
    padding: '2px 5px',
  },

  green: {
    border: `1px solid ${theme.palette.success.main}`,
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
  },

  red: {
    border: `1px solid ${theme.palette.error.main}`,
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
  },
}));

const Badge = ({ label, color }) => {
  const classes = useStyles();

  return (
    <div className={classes.labelWrapper}>
      {label ? (
        <Typography
          variant="body2"
          color="textSecondary"
          component="span"
          className={classnames(classes.label, {
            [classes.green]: color === 'green',
            [classes.red]: color === 'red',
          })}
        >
          {label}
        </Typography>
      ) : (
        <Skeleton variant="rect" width={120} height={30} />
      )}
    </div>
  );
};

Badge.defaultProps = {
  label: undefined,
  color: undefined,
};

Badge.propTypes = {
  label: PropTypes.string,
  color: PropTypes.string,
};

export default Badge;
