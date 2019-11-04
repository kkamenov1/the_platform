import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Stepper,
  Step,
  StepLabel,
  Typography,
  Grid,
  Button,
} from '@material-ui/core';
import UIDGenerator from 'uid-generator';
import { SimpleButton } from '../../core/components';
import contentSteps from './steps';
import {
  setActiveStep,
  setApplicationUID,
  setPersonalDetailsErrors,
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
  heading: {
    color: 'rgb(72, 72, 72)',
    fontWeight: 500,
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
  caption: {
    marginBottom: 20,
    color: 'rgb(72, 72, 72)',
    fontWeight: 100,
  },
}));

function getSteps() {
  return ['Personal information', 'GURU information', 'Rates'];
}

const BecomeAGuru = ({ firebase }) => {
  const uidgen = new UIDGenerator();
  const classes = useStyles();
  const dispatch = useDispatch();
  const steps = getSteps();
  const activeStep = useSelector((state) => state.header.becomeGuruModal.activeStep);
  const guruImages = useSelector((state) => state.header.becomeGuruModal.personalDetailsStep.images);
  const guruLocation = useSelector((state) => state.header.becomeGuruModal.personalDetailsStep.location);
  const guruLanguages = useSelector((state) => state.header.becomeGuruModal.personalDetailsStep.languages);
  const guruDayOfBirth = useSelector((state) => state.header.becomeGuruModal.personalDetailsStep.day);
  const guruMonthOfBirth = useSelector((state) => state.header.becomeGuruModal.personalDetailsStep.month);
  const guruYearOfBirth = useSelector((state) => state.header.becomeGuruModal.personalDetailsStep.year);
  const applicationUID = useSelector((state) => state.header.becomeGuruModal.applicationUID);

  const submitPersonalDetailsStep = () => {
    const formErrors = {};
    const filteredImages = guruImages.filter((img) => img.src);
    const day = parseInt(guruDayOfBirth, 10);
    const month = parseInt(guruMonthOfBirth, 10);
    const year = parseInt(guruYearOfBirth, 10);
    const birthDate = new Date(year, month - 1, day);

    if (!guruLocation) {
      formErrors.location = 'Please enter your location';
    }

    if (!guruLanguages.length) {
      formErrors.languages = 'Please select at least one language';
    }

    if (!filteredImages.length) {
      formErrors.images = 'Please select at least one image';
    }

    if (birthDate && birthDate.getMonth() + 1 !== month) {
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
      uidgen.generate().then((uid) => {
        dispatch(setApplicationUID(uid));

        firebase.application(uid).set({
          location: guruLocation,
          languages: guruLanguages,
          birthday: birthDate.toDateString(),
          images: filteredImages,
        }).then(() => {
          dispatch(setPersonalDetailsErrors({}));
        });
      });
    } else {
      firebase.application(applicationUID).set({
        location: guruLocation,
        languages: guruLanguages,
        birthday: birthDate.toDateString(),
        images: filteredImages,
      }).then(() => {
        dispatch(setPersonalDetailsErrors({}));
      });
    }

    return true;
  };

  const handleNext = () => {
    if (submitPersonalDetailsStep()) {
      dispatch(setActiveStep(activeStep + 1));
    }
  };

  const handleBack = () => {
    dispatch(setActiveStep(activeStep - 1));
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
            <Typography component="h4" variant="h4" className={classes.heading}>
              APPLY TO BECOME A GURU
            </Typography>

            <Typography variant="caption" className={classes.caption} component="p">
              Earn money by coaching other people
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

export default withFirebase(BecomeAGuru);
