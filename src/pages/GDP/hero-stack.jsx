import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, CardMedia } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import { GDPVerticalSliderConfig } from '../../core/config';

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
    height: 0,
    paddingTop: '70%',
  },
  mediaVertical: {
    height: 0,
    paddingTop: '85%',
    border: `1px solid ${theme.palette.common.black}`,
  },
}));

const HeroStack = () => {
  const guru = useSelector((state) => state.gdp.guru);
  const classes = useStyles();
  const horizontalSliderSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 1,
  };

  const veritcalSliderSettings = {
    arrows: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
  };

  return (
    <Grid container>
      <Grid item xs={8} className={classes.imageViewer}>
        <div>
          <Slider {...horizontalSliderSettings}>
            {guru && guru.images.length && guru.images.map((img, index) => (
              <CardMedia
                key={img}
                className={classes.mediaHorizontal}
                image={img} // TODO: Load smaller image for mobile devices and smaller for DT via CDN
                title={`guru-image-horizontal-${index + 1}`}
              />
            ))}
          </Slider>
        </div>

        <div className={classes.verticalSliderWrapper}>
          <Slider {...veritcalSliderSettings}>
            {guru && guru.images.length && guru.images.map((img, index) => (
              <CardMedia
                key={img}
                className={classes.mediaVertical}
                image={img} // TODO: Load smaller image for mobile devices and smaller for DT via CDN
                title={`guru-image-vertical-${index + 1}`}
              />
            ))}
          </Slider>
        </div>
      </Grid>
      <Grid item xs={4}>
        data
      </Grid>
    </Grid>
  );
};

export default HeroStack;
