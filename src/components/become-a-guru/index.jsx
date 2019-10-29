import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Stepper,
  Step,
  StepLabel,
  Typography,
  Grid,
  Button,
} from '@material-ui/core';
import { SimpleButton } from '../../core/components';
import contentSteps from './steps';

const useStyles = makeStyles((theme) => ({
  left: {
    backgroundImage: 'url("https://res.cloudinary.com/dl766ebzy/image/upload/b_rgb:ee5454,e_colorize:50,o_50/v1571747941/pexels-photo-260352_pjtnsi.jpg")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  right: {
    position: 'relative',
  },
  stepper: {
    backgroundColor: 'transparent',
  },
  stepLabel: {
    color: 'rgba(0, 0, 0, 0.60)',
  },
  activeLabel: {
    color: `${theme.palette.common.white} !important`,
  },
  iconContainer: {
    '& > [class *= "active"]': {
      color: '#fb2525',
    },
    '& > [class *= "completed"]': {
      color: '#fb2525',
    },
  },
  padding: {
    padding: 32,
  },
  backBtn: {
    textTransform: 'none',
  },
  controls: {
    padding: 15,
    width: '100%',
    backgroundColor: '#f0f0f0',
  },
}));

function getSteps() {
  return ['Personal information', 'GURU information', 'Rates'];
}

const BecomeAGuru = () => {
  const classes = useStyles();
  const steps = getSteps();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Grid container>

      <Grid item className={classes.left} xs={4} container justify="center" alignItems="center">
        <Stepper
          activeStep={activeStep}
          orientation="vertical"
          className={classes.stepper}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel classes={{
                label: classes.stepLabel,
                active: classes.activeLabel,
                iconContainer: classes.iconContainer,
              }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Grid>

      <Grid item className={classes.right} xs={8}>
        <div>
          <div className={classes.padding}>
            <Typography component="h4" variant="h4">
              APPLY TO BECOME A GURU
            </Typography>

            <div className={classes.stepContent}>
              { contentSteps[activeStep]() }
            </div>
          </div>

          <Grid container className={classes.controls} justify="space-between">
            <Grid item>
              {activeStep !== 0 && (
                <Button onClick={handleBack} className={classes.backBtn}>
                  Back
                </Button>
              )}
            </Grid>

            <Grid item>
              <SimpleButton
                size="large"
                variant="contained"
                color="primary"
                onClick={handleNext}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Continue'}
              </SimpleButton>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
};

export default BecomeAGuru;
