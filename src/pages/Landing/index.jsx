import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SearchTrainersWindow from '../../components/search-trainers-window';

const useStyles = makeStyles((theme) => ({
  outerContainer: {
    height: '100vh',
    minHeight: 650,
    maxHeight: 1500,
    position: 'relative',
  },
  innerContainer: {
    height: '100vh',
    minHeight: 650,
    maxHeight: 1500,
    position: 'relative',
    width: '100%',
  },
  outerImageContainer: {
    position: 'relative',
    width: '100%',
    height: 'auto',

    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
    },
  },
  innerImageContainer: {
    display: 'inline-block',
    verticalAlign: 'bottom',
    height: '100%',
    width: '100%',
    backgroundPosition: '50% 50%',
    backgroundRepeat: 'no-repeat',
  },
  image: {
    height: 'auto',
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
    <>
      <main>
        <div className={classes.outerContainer}>
          <div className={classes.innerContainer}>
            <div className={classes.outerImageContainer}>
              <div className={classes.innerImageContainer}>
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
            </div>
            <SearchTrainersWindow />
          </div>
        </div>
      </main>
    </>
  );
};

export default Landing;
