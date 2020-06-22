import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Stepper,
  Step,
  StepLabel,
  Grid,
} from '@material-ui/core';
import {
  PersonalDetailsStep,
  GuruDetailsStep,
  RatesStep,
  SocialMediaStep,
  FinalizationStep,
} from './steps';
import { withFirebase } from '../../core/lib/Firebase';
import AuthContent from '../../components/auth-content';
import { BECOME_GURU_STEPS } from '../../core/config';

const useStyles = makeStyles((theme) => ({
  fullscreen: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    zIndex: theme.zIndex.modal - 1,
    left: 0,
    backgroundColor: '#333333',
  },
  container: {
    backgroundColor: theme.palette.common.white,
    height: '100vh',
    width: '100vw',

    [theme.breakpoints.up('md')]: {
      height: '50rem',
      width: '55rem',
    },
  },
  aside: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  main: {
    position: 'relative',
    overflow: 'hidden',
  },
  mainPanelInner: {
    padding: '42px 16px 32px 16px',

    [theme.breakpoints.up('md')]: {
      padding: 32,
      height: 'calc(100vh - 150px)',
      overflowY: 'auto',
      overflowX: 'hidden',
    },
  },
  stepper: {
    display: 'none',

    [theme.breakpoints.up('md')]: {
      display: 'flex',
      padding: '24px 0',
      marginBottom: 15,
    },
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  authWrapper: {
    padding: 20,
    [theme.breakpoints.up('md')]: {
      padding: 50,
    },
  },
}));

const renderStepContent = (activeStep) => {
  switch (activeStep) {
    case 0:
      return <PersonalDetailsStep />;
    case 1:
      return <GuruDetailsStep />;
    case 2:
      return <RatesStep />;
    case 3:
      return <SocialMediaStep />;
    default: return null;
  }
};

const BecomeAGuru = () => {
  const classes = useStyles();
  const auth = useSelector((state) => state.app.auth);
  const activeStep = useSelector((state) => state.application.general.activeStep);
  const page = useSelector((state) => state.authModal.page);

  return (
    <Grid container className={classes.fullscreen} justify="center" alignItems="center">
      <Grid item container className={classes.container}>
        <Grid
          item
          className={classes.aside}
          xs={4}
          container
          justify="center"
          alignItems="center"
        >
          <img
            className={classes.img}
            src="https://res.cloudinary.com/dl766ebzy/image/upload/v1585642658/guru-page_vsac8h.jpg"
            alt="Become guru"
          />
        </Grid>
        <Grid item xs={12} md={8} className={classes.main}>
          {!auth ? (
            <div className={classes.authWrapper}>
              <AuthContent page={page} />
            </div>
          ) : (
            <>
              <div className={classes.mainPanelInner}>
                <Stepper
                  activeStep={activeStep}
                  className={classes.stepper}
                  alternativeLabel
                >
                  {BECOME_GURU_STEPS.map((label) => (
                    <Step key={label}>
                      <StepLabel classes={{
                        label: classes.stepLabel,
                        active: classes.stepLabel,
                        completed: classes.stepLabel,
                      }}
                      >
                        {label}
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <div className={classes.stepContent}>
                  {renderStepContent(activeStep)}
                  <FinalizationStep />
                </div>
              </div>
            </>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withFirebase(BecomeAGuru);
