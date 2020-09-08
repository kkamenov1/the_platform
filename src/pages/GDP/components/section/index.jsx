import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  heading: {
    fontWeight: 700,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 40,
  },
  bottomOffsetXl: {
    marginBottom: 40,
  },
});

const Section = ({
  containerId,
  label,
  divider,
  children,
}) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.bottomOffsetXl} id={containerId}>
        {label && (
          <Typography
            component="h2"
            variant="h5"
            className={classes.heading}
          >
            {label}
          </Typography>
        )}

        {children}
      </div>
      {divider && <Divider className={classes.bottomOffsetXl} />}
    </>
  );
};

Section.defaultProps = {
  label: '',
  divider: false,
  children: undefined,
};

Section.propTypes = {
  containerId: PropTypes.string.isRequired,
  label: PropTypes.string,
  divider: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Section;
