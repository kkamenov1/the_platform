import React from 'react';
import classnames from 'classnames';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Fade } from 'react-reveal';
import ApplyButton from './apply-button';
import Consent from './consent';
import BenefitsStepper from './benefits-stepper';

const useStyles = makeStyles((theme) => ({
  blackBg: {
    backgroundColor: '#000',
  },
  greyBg: {
    backgroundColor: '#f0f0f0',
  },
  innerSection: {
    position: 'relative',
    width: '60%',
    maxWidth: 800,
    margin: '0 auto',
    padding: '96px 0',

    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  heading: {
    color: '#fafafa',
    fontWeight: 700,

    [theme.breakpoints.down('xs')]: {
      fontSize: 30,
      textAlign: 'center',
    },
  },
  actionContainer: {
    padding: '48px 0',
  },
  btnHolder: {
    textAlign: 'center',
    width: '50%',

    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  joinUs: {
    [theme.breakpoints.down('xs')]: {
      fontSize: 24,
    },
  },
  sports: {
    position: 'absolute',
    display: 'flex',
    bottom: -50,
    left: '50%',
    transform: 'translate(-50%, 0)',
  },
  img: {
    width: '100%',
    border: '1px solid #fafafa',
    borderRadius: 5,
  },
  imgHolder: {
    width: 100,
    height: 100,

    '&:not(:last-child)': {
      marginRight: 16,
    },
  },
  computerSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 370,

    [theme.breakpoints.down('xs')]: {
      height: 220,
    },
  },
  computerImg: {
    maxWidth: '100%',
    marginTop: -15,
  },
  signUpHeading: {
    marginBottom: 36,
    fontWeight: 700,
  },
}));

const BecomeGuru = () => {
  const classes = useStyles();
  return (
    <div>
      <section className={classes.blackBg}>
        <div className={classes.innerSection}>
          <Typography component="h1" variant="h3" className={classes.heading}>
            We only work with the top gym maniacs globally.
          </Typography>

          <div className={classes.actionContainer}>
            <div className={classes.btnHolder}>
              <ApplyButton />
            </div>
            <Consent />
          </div>

          <div className={classes.sports}>
            <div className={classes.imgHolder}>
              <img
                src="https://res.cloudinary.com/dl766ebzy/image/upload/v1593764804/crossfit_gg0xid.jpg"
                alt="crossfit"
                className={classes.img}
              />
            </div>

            <div className={classes.imgHolder}>
              <img
                src="https://res.cloudinary.com/dl766ebzy/image/upload/v1593766528/bodybuilding_traar0.jpg"
                alt="crossfit"
                className={classes.img}
              />
            </div>
          </div>
        </div>
      </section>

      <Fade bottom>
        <section>
          <div className={classes.innerSection}>
            <Typography
              component="h2"
              variant="h4"
              align="center"
              className={classes.joinUs}
            >
              Join GYMGURUS.
              <br />
              Make a living coaching people all around the world. Right this instant.
            </Typography>
          </div>
        </section>
      </Fade>

      <Fade bottom>
        <section className={classnames(classes.blackBg, classes.computerSection)}>
          <img
            src="https://res.cloudinary.com/dl766ebzy/image/upload/v1593768709/computer_image.e687f36_e9s5vm.png"
            alt="computer"
            className={classes.computerImg}
          />
        </section>
      </Fade>

      <Fade bottom>
        <section>
          <Grid
            container
            className={classes.innerSection}
            justify="space-between"
            spacing={4}
          >
            <Grid item xs={12} sm={4}>
              <Grid
                container
                justify="center"
                alignItems="center"
                direction="column"
              >
                <img
                  src="https://res.cloudinary.com/dl766ebzy/image/upload/v1593777405/calendar_kpoyou.png"
                  alt="calendar"
                />
                <Typography component="h6" variant="h6" align="center">
                  Earn on your schedule
                </Typography>
                <Typography component="p" align="center" variant="caption">
                  GYMGURUS always has customers online, earn any time 24/7.
                </Typography>
              </Grid>

            </Grid>

            <Grid item xs={12} sm={4}>
              <Grid
                container
                justify="center"
                alignItems="center"
                direction="column"
              >
                <img
                  src="https://res.cloudinary.com/dl766ebzy/image/upload/v1593777411/money_hunzdt.png"
                  alt="money"
                />
                <Typography component="h6" variant="h6" align="center">
                  Make money
                </Typography>
                <Typography component="p" align="center" variant="caption">
                  You can make money based on what kind of workout programs you are offering
                  and how many subscribers you have.
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Grid
                container
                justify="center"
                alignItems="center"
                direction="column"
              >
                <img
                  src="https://res.cloudinary.com/dl766ebzy/image/upload/v1593777416/clock_i9xlcy.png"
                  alt="clock"
                />
                <Typography component="h6" variant="h6" align="center">
                  Get paid fast
                </Typography>
                <Typography component="p" align="center" variant="caption">
                  You will receive the payment immediately after a student is subscribed to you.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </section>
      </Fade>

      <Fade bottom>
        <section className={classes.greyBg}>
          <Grid container className={classes.innerSection} spacing={4} justify="space-between">
            <Grid item xs={12} sm={6}>
              <Typography
                component="h4"
                variant="h5"
                className={classes.signUpHeading}
              >
                Sign up today and start making money.
              </Typography>
              <ApplyButton />
              <Consent />
            </Grid>

            <Grid item xs={12} sm={6}>
              <BenefitsStepper />
            </Grid>
          </Grid>
        </section>
      </Fade>
    </div>
  );
};

export default BecomeGuru;
