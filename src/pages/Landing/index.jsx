import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SearchTrainersWindow from './search-trainers-window';

const useStyles = makeStyles((theme) => ({
  imgContainer: {
    height: 'calc(100vh - 267px)',

    [theme.breakpoints.up('md')]: {
      height: '100vh',
    },
  },
  image: {
    height: '100%',
    objectFit: 'cover',
    verticalAlign: 'bottom',
    width: '100%',
    position: 'static',

    [theme.breakpoints.up('md')]: {
      height: '100%',
    },
  },
}));

const Landing = () => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.imgContainer}>
        <img
          alt="landing"
          className={classes.image}
          srcSet="https://res.cloudinary.com/dl766ebzy/image/upload/w_600/v1569695325/landing_epec9x.jpg 600w,
                          https://res.cloudinary.com/dl766ebzy/image/upload/w_960/v1569695325/landing_epec9x.jpg 960w,
                          https://res.cloudinary.com/dl766ebzy/image/upload/w_1280/v1569695325/landing_epec9x.jpg 1280w,
                          https://res.cloudinary.com/dl766ebzy/image/upload/w_1600/v1569695325/landing_epec9x.jpg 1600w,
                          https://res.cloudinary.com/dl766ebzy/image/upload/w_2700/v1569695325/landing_epec9x.jpg 2700w"
          sizes="(max-width: 600px) 800px,
                        (max-width: 960px) 960px,
                        (max-width: 1280px) 1280px,
                        (max-width: 1600px) 1600px,
                        (min-width: 1601px) 2700px"
          src="https://res.cloudinary.com/dl766ebzy/image/upload/w_2700/v1569695325/landing_epec9x.jpg"
        />
      </div>
      <SearchTrainersWindow />
    </div>
  );
};

export default Landing;
