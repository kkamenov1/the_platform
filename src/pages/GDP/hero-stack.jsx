import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid, Button,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useSelector, useDispatch } from 'react-redux';
import Img from 'react-image';
import { setActiveImageIndex } from './actions';

const useStyles = makeStyles((theme) => ({
  imageViewer: {
    position: 'relative',
  },
  verticalSliderWrapper: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 100,
  },
  mediaHorizontal: {
    width: '100%',
    height: 600,
    objectFit: 'cover',
  },
  mediaVertical: {
    width: '100%',
    height: 100,
    objectFit: 'cover',
  },
  imgBtn: {
    padding: 0,
    border: `1px solid ${theme.palette.common.black}`,
    borderRadius: 0,

    '&:not(:last-child)': {
      marginBottom: 10,
    },
  },
  heroImage: {
    width: '100%',
    height: 0,
    paddingTop: '70%',
  },
}));

const HeroStack = ({ images }) => {
  const dispatch = useDispatch();
  const activeImageIndex = useSelector((state) => state.gdp.activeImageIndex);
  const classes = useStyles();

  const handleImageChange = (index) => {
    dispatch(setActiveImageIndex(index));
  };

  return (
    <Grid container>
      <Grid item xs={8} className={classes.imageViewer}>
        <div>
          {images.length ? (
            <Img
              key={activeImageIndex}
              className={classes.mediaHorizontal}
              src={images[activeImageIndex]} // TODO: Load smaller image for mobile devices and smaller for DT via CDN
              alt={`guru-horizontal-${activeImageIndex}`}
            />
          ) : (
            <Skeleton
              variant="rect"
              className={classes.heroImage}
              animation="wave"
            />
          )}
        </div>

        <div className={classes.verticalSliderWrapper}>
          {images.map((img, index) => (
            <Button
              key={img}
              fullWidth
              className={classes.imgBtn}
              onClick={() => handleImageChange(index)}
            >
              <Img
                className={classes.mediaVertical}
                src={img} // TODO: Load smaller image for mobile devices and smaller for DT via CDN
                alt={`guru-vertical-${index}`}
              />
            </Button>
          ))}
        </div>
      </Grid>
      <Grid item xs={4}>
        data
      </Grid>
    </Grid>
  );
};

HeroStack.defaultProps = {
  images: [],
};

HeroStack.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
};

export default HeroStack;
