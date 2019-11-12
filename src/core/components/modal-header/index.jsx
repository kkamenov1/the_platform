import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  caption: {
    marginBottom: 20,
    color: 'rgb(72, 72, 72)',
    fontWeight: 100,
  },
  heading: {
    color: 'rgb(72, 72, 72)',
    fontWeight: 500,
  },
});

const ModalHeader = ({ heading, caption }) => {
  const classes = useStyles();

  return (
    <>
      <Typography component="h4" variant="h4" className={classes.heading}>
        {heading}
      </Typography>

      {caption && (
        <Typography variant="caption" className={classes.caption} component="p">
          {caption}
        </Typography>
      )}
    </>
  );
};

ModalHeader.defaultProps = {
  caption: null,
};

ModalHeader.propTypes = {
  heading: PropTypes.string.isRequired,
  caption: PropTypes.string,
};

export default ModalHeader;
