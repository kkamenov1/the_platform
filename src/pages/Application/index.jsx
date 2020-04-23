import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import UIDGenerator from 'uid-generator';
import { Link } from 'react-router-dom';
import {
  Stepper,
  Step,
  StepLabel,
  Grid,
  Fab,
  MobileStepper,
  Button,
} from '@material-ui/core';
import {
  PersonalDetailsStep,
  GuruDetailsStep,
  RatesStep,
  SocialMediaStep,
  Finalization,
} from './steps';
import {
  setActiveStep,
  setApplicationUID,
  setPersonalDetailsErrors,
  setGuruDetailsErrors,
  setRatesErrors,
  setFormValues,
  clearBecomeGuruModal,
} from './actions';
import { setApplicationSubmitted } from '../../app/actions';
import { withFirebase } from '../../core/lib/Firebase';
import { getMinimalPrice } from '../../core/utils';
import { useIsMobile } from '../../core/hooks';
import { LANDING } from '../../constants/routes';
import UserSubmittedApplication from './user-submitted-application';

const useStyles = makeStyles((theme) => ({
  container: {
    height: 'calc(100vh - 80px)',
    backgroundColor: theme.palette.common.white,
  },
  aside: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  center: {
    position: 'relative',
    overflow: 'hidden',
  },
  centerPanelInner: {
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
  fab: {
    minWidth: '140px !important',
  },
  backBtn: {
    boxShadow: 'none',
    border: `1px solid ${theme.palette.common.black}`,
  },
  controls: {
    display: 'none',


    [theme.breakpoints.up('md')]: {
      display: 'flex',
      position: 'absolute',
      bottom: 0,
      left: 0,
      padding: '15px 32px',
      width: '100%',
      backgroundColor: theme.palette.grey['100'],
    },
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}));

const getSteps = () => [
  'Personal Information',
  'GURU Information',
  'Rates',
  'Social Media',
];

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

const checkMethodsForEmptyPrices = (methods) => (
  methods.some((method) => {
    const priceParsed = +method.price;
    return isNaN(priceParsed) || priceParsed <= 0;
  })
);

const BecomeAGuru = ({ firebase }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isMobile = useIsMobile('sm');
  const steps = getSteps();
  const auth = useSelector((state) => state.app.auth);
  const application = useSelector((state) => state.application);
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
    _geoloc,
    subscribers,
    socialMedia,
  } = application;

  const uidgen = new UIDGenerator();

  const submitPersonalDetailsStep = () => {
    const formErrors = {};
    const filteredImages = (images || [])
      .filter((img) => img.publicId)
      .map((img) => img.publicId);
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
      const newApplicationUID = uidgen.generateSync();

      firebase.application(newApplicationUID).set({
        location,
        _geoloc,
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
        _geoloc,
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
      certificate: certificate && certificate.publicId,
    }).then(() => {
      dispatch(setGuruDetailsErrors({}));
    });
    return true;
  };

  const submitRatesStep = () => {
    const formErrors = {};
    const selectedMethods = methods.filter((method) => method.selected) || [];
    const durationParsed = +duration;
    const subscribersParsed = +subscribers;

    if (checkMethodsForEmptyPrices(selectedMethods)) {
      formErrors.methods = 'Please provide a price for each selected method';
    }

    if (!selectedMethods.length) {
      formErrors.methods = 'Please select at least one method';
    }

    if (isNaN(durationParsed) || durationParsed < 1 || durationParsed > 365) {
      formErrors.duration = 'Please enter a valid duration';
    }

    if (isNaN(subscribersParsed) || subscribersParsed < 1 || subscribersParsed > 100) {
      formErrors.subscribers = 'Please enter a valid number';
    }

    if (Object.entries(formErrors).length) {
      dispatch(setRatesErrors(formErrors));
      return false;
    }

    const mappedSelectedMethods = selectedMethods.map((item) => ({
      name: item.name,
      price: item.price,
    }));

    firebase.application(applicationUID).update({
      methods: mappedSelectedMethods,
      duration,
      subscribers,
      occupation: 0,
      available: true,
      userID: auth.uid,
      photoURL: auth.photoURL,
      displayName: auth.displayName,
      priceFrom: getMinimalPrice(selectedMethods),
    }).then(() => {
      dispatch(setRatesErrors({}));
    });
    return true;
  };

  const submitSocialMediaStep = () => {
    firebase.application(applicationUID).update({
      socialMedia,
    }).then(() => {
      // prevent user from submitting another application while having 1 pending
      firebase.user(auth.uid).set({
        hasSubmittedApplication: true,
      }, { merge: true }).then(() => {
        dispatch(setApplicationSubmitted(true));
      });
    });
  };

  const handleNext = () => {
    if (activeStep === 0 && submitPersonalDetailsStep()) {
      dispatch(setActiveStep(activeStep + 1));
      dispatch(setFormValues('isIncreasingSteps', true));
    }

    if (activeStep === 1 && submitGuruDetailsStep()) {
      dispatch(setActiveStep(activeStep + 1));
      dispatch(setFormValues('isIncreasingSteps', true));
    }

    if (activeStep === 2 && submitRatesStep()) {
      dispatch(setActiveStep(activeStep + 1));
      dispatch(setFormValues('isIncreasingSteps', true));
    }

    if (activeStep === 3) {
      submitSocialMediaStep();
      dispatch(setActiveStep(activeStep + 1));
      dispatch(setFormValues('isIncreasingSteps', true));
      dispatch(setFormValues('isFormFinalized', true));
    }

    if (activeStep > 3) {
      dispatch(clearBecomeGuruModal());
    }
  };

  const handleBack = () => {
    dispatch(setActiveStep(activeStep - 1));
    dispatch(setFormValues('isIncreasingSteps', false));
  };

  const generateButtonLabel = () => {
    if (activeStep === steps.length - 1) {
      return 'Finish';
    }

    return 'Next';
  };

  return (
    <>
      <Grid container className={classes.container}>
        <Grid
          item
          className={classes.aside}
          xs={3}
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

        <Grid item className={classes.center} xs={12} md={6}>
          {auth && auth.hasSubmittedApplication ? (
            <UserSubmittedApplication />
          ) : (
            <>
              <div className={classes.centerPanelInner}>
                <Stepper
                  activeStep={activeStep}
                  className={classes.stepper}
                  alternativeLabel
                >
                  {steps.map((label) => (
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
                  <Finalization />
                </div>
              </div>

              {isMobile && (
                <MobileStepper
                  steps={steps.length + 1}
                  position="bottom"
                  variant="text"
                  activeStep={activeStep}
                  nextButton={activeStep <= 3 ? (
                    <Button size="small" onClick={handleNext}>
                      {generateButtonLabel()}
                    </Button>
                  ) : (
                    <Button size="small" component={Link} to={LANDING}>
                      Go Back
                    </Button>
                  )}
                  backButton={(
                    <Button
                      size="small"
                      onClick={handleBack}
                      disabled={activeStep <= 0 || activeStep > 3}
                    >
                      Back
                    </Button>
                  )}
                />
              )}

              <Grid
                container
                className={classes.controls}
                justify="space-between"
                alignItems="center"
              >
                <Grid item>
                  {activeStep > 0 && activeStep <= 3 && (
                  <Fab
                    variant="extended"
                    size="medium"
                    color="inherit"
                    aria-label="back"
                    onClick={handleBack}
                    className={classnames(classes.fab, classes.backBtn)}
                  >
                    Back
                  </Fab>
                  )}
                </Grid>

                <Grid item>
                  {activeStep <= 3 ? (
                    <Fab
                      variant="extended"
                      size="medium"
                      color="primary"
                      aria-label="continue"
                      onClick={handleNext}
                      className={classes.fab}
                    >
                      {generateButtonLabel()}
                    </Fab>
                  ) : (
                    <Fab
                      variant="extended"
                      size="medium"
                      color="primary"
                      aria-label="continue"
                      className={classes.fab}
                      component={Link}
                      to={LANDING}
                    >
                      Go Back
                    </Fab>
                  )}
                </Grid>
              </Grid>
            </>
          )}
        </Grid>

        <Grid
          item
          className={classes.aside}
          xs={3}
          container
          justify="center"
          alignItems="center"
        >
          <img
            className={classes.img}
            src="https://res.cloudinary.com/dl766ebzy/image/upload/v1587566233/guru-page2_yidack.jpg"
            alt="Become guru 2"
          />
        </Grid>
      </Grid>
    </>
  );
};

BecomeAGuru.propTypes = {
  firebase: PropTypes.shape({
    application: PropTypes.func.isRequired,
    applications: PropTypes.func.isRequired,
    user: PropTypes.func.isRequired,
  }).isRequired,
};

export default withFirebase(BecomeAGuru);
