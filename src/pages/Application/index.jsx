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
} from './actions';
import { withFirebase } from '../../core/lib/Firebase';
import { getMinimalPrice } from '../../core/utils';
import { useIsMobile } from '../../core/hooks';
import { LANDING } from '../../constants/routes';
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
      zIndex: 100,
      boxShadow: theme.shadows[20],
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

const checkMethodsForEmptyPrices = (methods) => (
  methods.some((method) => {
    const priceParsed = +method.price;
    return isNaN(priceParsed) || priceParsed <= 0;
  })
);

const BecomeAGuru = ({ firebase }) => {
  const uidgen = new UIDGenerator();
  const classes = useStyles();
  const dispatch = useDispatch();
  const isMobile = useIsMobile('sm');
  const auth = useSelector((state) => state.app.auth);
  const application = useSelector((state) => state.application);
  const page = useSelector((state) => state.authModal.page);

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

  const submitSocialMediaStep = async () => {
    await firebase.application(applicationUID).update({
      socialMedia,
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
  };

  const handleBack = () => {
    dispatch(setActiveStep(activeStep - 1));
    dispatch(setFormValues('isIncreasingSteps', false));
  };

  const generateButtonLabel = () => {
    if (activeStep === BECOME_GURU_STEPS.length - 1) {
      return 'Finish';
    }

    return 'Next';
  };

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
                  <Finalization />
                </div>
              </div>

              {isMobile && (
                <MobileStepper
                  steps={BECOME_GURU_STEPS.length + 1}
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
      </Grid>
    </Grid>
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
