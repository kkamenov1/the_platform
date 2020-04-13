import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import cloudinary from 'cloudinary-core';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import { CarouselArrow } from '../../core/components';

const useStyles = makeStyles({
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  imgWrapper: {
    height: 450,
  },

  slider: {
    '& .slick-list': {
      height: 450,
    },

    '&:hover div[class*="arrowWrapper"]': {
      display: 'block',
    },
  },
});

const horizonalSliderSettings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <CarouselArrow />,
  prevArrow: <CarouselArrow prevArrow />,
};

const ImageViewer = ({ images, certificate }) => {
  const classes = useStyles();
  const cloudinaryCore = new cloudinary.Cloudinary({
    cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
  });
  const allImages = certificate ? [...images, certificate] : images;
  const slides = allImages.map((img, index) => {
    const imgSrcDesktopTablet = cloudinaryCore.url(
      img,
      { width: 1000, crop: 'fill' },
    );
    const imgSrcMobile = cloudinaryCore.url(
      img,
      { width: 600, crop: 'fill' },
    );
    return (
      <div key={`${img}-horizontal`} className={classes.imgWrapper}>
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
            alt={`guru-${index + 1}`}
            className={classes.img}
          />
        </picture>
      </div>
    );
  });

  return (
    <>
      {images && images.length ? (
        <div className={classes.wrapper}>
          <Slider
            className={classes.slider}
            {...horizonalSliderSettings}
          >
            {slides}
          </Slider>
        </div>
      ) : (
        <Skeleton variant="rect" height={450} />
      )}
    </>
  );
};

ImageViewer.defaultProps = {
  images: [],
  certificate: '',
};

ImageViewer.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  certificate: PropTypes.string,
};

export default ImageViewer;
