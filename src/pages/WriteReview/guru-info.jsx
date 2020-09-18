import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import cloudinary from 'cloudinary-core';

const useStyles = makeStyles((theme) => ({
  guruInfo: {
    height: 135,
    backgroundColor: '#ebedee',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',

    [theme.breakpoints.up('sm')]: {
      height: 210,
    },
  },
  guruName: {
    fontWeight: 700,
    marginLeft: 30,
    alignSelf: 'center',
    flex: '1 100%',
    letterSpacing: 1.5,
  },
  guruImageHolder: {
    marginRight: 0,

    [theme.breakpoints.up('md')]: {
      marginRight: 50,
    },
  },
}));

const GuruInfo = ({ image, displayName }) => {
  const classes = useStyles();
  const cloudinaryCore = new cloudinary.Cloudinary({
    cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
  });

  const guruImageDesktopTablet = cloudinaryCore.url(
    image,
    { width: 210, height: 210, crop: 'fill' },
  ) || '';
  const guruImageMobile = cloudinaryCore.url(
    image,
    { width: 135, height: 135, crop: 'fill' },
  ) || '';

  return (
    <div className={classes.guruInfo}>
      <Typography component="h4" variant="h6" className={classes.guruName}>
        {displayName}
      </Typography>
      <div className={classes.guruImageHolder}>
        <picture>
          <source
            media="(max-width: 600px)"
            srcSet={guruImageMobile}
          />
          <source
            media="(min-width: 601px)"
            srcSet={guruImageDesktopTablet}
          />
          <img src={guruImageDesktopTablet} alt={displayName} />
        </picture>
      </div>
    </div>
  );
};

GuruInfo.defaultProps = {
  image: '',
  displayName: '',
};

GuruInfo.propTypes = {
  image: PropTypes.string,
  displayName: PropTypes.string,
};

export default GuruInfo;
