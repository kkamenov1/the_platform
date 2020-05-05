import React from 'react';
import PropTypes from 'prop-types';
import cloudinary from 'cloudinary-core';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles({
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  imgWrapper: {
    height: 450,
  },
});

const ImageViewer = ({ image }) => {
  const classes = useStyles();
  const cloudinaryCore = new cloudinary.Cloudinary({
    cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
  });
  const imgSrcDesktopTablet = cloudinaryCore.url(
    image,
    { width: 1000, crop: 'fill' },
  );
  const imgSrcMobile = cloudinaryCore.url(
    image,
    { width: 600, crop: 'fill' },
  );

  return (
    <>
      {image ? (
        <div className={classes.imgWrapper}>
          <picture>
            <source
              media="(max-width: 600px)"
              srcSet={imgSrcMobile}
            />
            <source
              media="(min-width: 601px)"
              srcSet={imgSrcDesktopTablet}
            />
            <img
              src={imgSrcDesktopTablet}
              alt="hero"
              className={classes.img}
            />
          </picture>
        </div>
      ) : (
        <Skeleton variant="rect" height={450} />
      )}
    </>
  );
};

ImageViewer.defaultProps = {
  image: '',
};

ImageViewer.propTypes = {
  image: PropTypes.string,
};

export default ImageViewer;
