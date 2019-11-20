import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Stepper,
  Step,
  StepLabel,
  Grid,
  Button,
} from '@material-ui/core';
import { SimpleButton } from '../../core/components';
import { PersonalDetailsStep, GuruDetailsStep, RatesStep } from './steps';
import {
  setActiveStep,
  setApplicationUID,
  setPersonalDetailsErrors,
  setGuruDetailsErrors,
  setRatesErrors,
  setFormValues,
} from '../../pages/Header/actions';
import { withFirebase } from '../../core/lib/Firebase';

const useStyles = makeStyles((theme) => ({
  left: {
    backgroundImage: 'url("https://res.cloudinary.com/dl766ebzy/image/upload/b_rgb:ee5454,e_colorize:50,o_50/v1571747941/pexels-photo-260352_pjtnsi.jpg")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  right: {
    position: 'relative',
    overflow: 'hidden',
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

const getSteps = () => ['Personal information', 'GURU information', 'Rates'];

const renderStepContent = (activeStep) => {
  switch (activeStep) {
    case 0:
      return <PersonalDetailsStep />;
    case 1:
      return <GuruDetailsStep />;
    case 2:
      return <RatesStep />;
    default: return null;
  }
};

const checkMethodsForEmptyPrices = (methods) => (
  methods.some((method) => {
    const priceParsed = +method.price;
    return isNaN(priceParsed) || priceParsed <= 0;
  })
);

const BecomeAGuru = ({ firebase }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const steps = getSteps();
  const becomeGuruModal = useSelector((state) => state.header.becomeGuruModal);
  const {
    activeStep,
    images,
    location,
    languages,
    day,
    month,
    year,
    applicationUID,
    sport,
    methods,
    introduction,
    certificate,
    duration,
  } = becomeGuruModal;

  const submitPersonalDetailsStep = () => {
    const formErrors = {};
    const filteredImages = (images || [])
      .filter((img) => img.src)
      .map((img) => img.src);
    const dayParsed = parseInt(day, 10);
    const monthParsed = parseInt(month, 10);
    const yearParsed = parseInt(year, 10);
    const birthDate = new Date(yearParsed, monthParsed - 1, dayParsed);

    if (!location) {
      formErrors.location = 'Please enter your location';
    }

    if (!languages.length) {
      formErrors.languages = 'Please select at least one language';
    }

    if (!filteredImages.length) {
      formErrors.images = 'Please select at least one image';
    }

    if (birthDate && birthDate.getMonth() + 1 !== monthParsed) {
      formErrors.birthday = 'Please enter correct birth date';
    }

    if (Object.entries(formErrors).length) {
      dispatch(setPersonalDetailsErrors(formErrors));
      return false;
    }

    // handle the back and forward buttons to the in exact
    // application UID and not to create a new one each time a Continue
    // button is clicked
    if (!applicationUID) {
      const newApplicationUID = firebase.applications().push().key;

      firebase.application(newApplicationUID).set({
        location,
        languages,
        birthday: birthDate.toDateString(),
        images: filteredImages,
      }).then(() => {
        dispatch(setPersonalDetailsErrors({}));
        dispatch(setApplicationUID(newApplicationUID));
      });
    } else {
      firebase.application(applicationUID).update({
        location,
        languages,
        birthday: birthDate.toDateString(),
        images: filteredImages,
      }).then(() => {
        dispatch(setPersonalDetailsErrors({}));
      });
    }

    return true;
  };

  const submitGuruDetailsStep = () => {
    const formErrors = {};

    if (!sport) {
      formErrors.sport = 'Please choose sport';
    }

    if (Object.entries(formErrors).length) {
      dispatch(setGuruDetailsErrors(formErrors));
      return false;
    }

    firebase.application(applicationUID).update({
      sport,
      introduction,
      certificate: certificate && certificate.src,
    }).then(() => {
      dispatch(setGuruDetailsErrors({}));
    });
    return true;
  };

  const submitRatesStep = () => {
    const formErrors = {};
    const selectedMethods = methods.filter((method) => method.selected) || [];
    const durationParsed = +duration;

    if (checkMethodsForEmptyPrices(selectedMethods)) {
      formErrors.methods = 'Please provide a price for each selected method';
    }

    if (!selectedMethods.length) {
      formErrors.methods = 'Please select at least one method';
    }

    if (isNaN(durationParsed) || durationParsed < 1 || durationParsed > 365) {
      formErrors.duration = 'Please enter a valid duration';
    }

    if (Object.entries(formErrors).length) {
      dispatch(setRatesErrors(formErrors));
      return false;
    }

    firebase.application(applicationUID).update({
      methods: selectedMethods,
      duration,
    }).then(() => {
      dispatch(setRatesErrors({}));
    });
    return true;
  };

  const handleNext = () => {
    if (activeStep === 0 && submitPersonalDetailsStep()) {
      dispatch(setActiveStep(activeStep + 1));
      dispatch(setFormValues('isIncreasingSteps', true));
    }

    if (activeStep === 1 && submitGuruDetailsStep()) {
      dispatch(setActiveStep(activeStep + 1));
    }

    if (activeStep === 2 && submitRatesStep()) {
      dispatch(setActiveStep(activeStep + 1));
    }
  };

  const handleBack = () => {
    dispatch(setActiveStep(activeStep - 1));
    dispatch(setFormValues('isIncreasingSteps', false));
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
            <div className={classes.stepContent}>
              {renderStepContent(activeStep)}
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

BecomeAGuru.propTypes = {
  firebase: PropTypes.shape({
    application: PropTypes.func.isRequired,
    applications: PropTypes.func.isRequired,
  }).isRequired,
};

export default withFirebase(BecomeAGuru);
