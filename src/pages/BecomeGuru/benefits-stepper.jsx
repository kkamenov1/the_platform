import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Stepper, Step, StepLabel, Typography,
} from '@material-ui/core';

const useStyles = makeStyles({
  steplabel: {
    color: '#000',
    fontSize: 18,
  },
  stepperCaption: {
    color: '#999',
  },
  stepper: {
    backgroundColor: '#f0f0f0',

    '& .MuiStepConnector-lineVertical': {
      minHeight: 100,
    },
  },
});

const getSteps = () => [{
  label: 'Create your account',
  sub: 'Apply to coach and get approved.',
}, {
  label: 'Start your coach lessons',
  sub: 'Accept students and earn money.',
}, {
  label: 'Get paid',
  sub: 'Get paid for every subscriber.',
}];

const BenefitsStepper = () => {
  const classes = useStyles();
  const steps = getSteps();

  return (
    <Stepper
      activeStep={-1}
      orientation="vertical"
      className={classes.stepper}
    >
      {steps.map(({ label, sub }) => (
        <Step key={label}>
          <StepLabel
            classes={{
              label: classes.steplabel,
            }}
            optional={(
              <Typography variant="caption" className={classes.stepperCaption}>
                {sub}
              </Typography>
                    )}
          >
            {label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default BenefitsStepper;
