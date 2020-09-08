import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Slide,
  Grid,
  OutlinedInput,
  Typography,
  FormControl,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Form, Field } from 'react-final-form';
import { ModalHeader } from '../../../../core/components';
import { setSocialMediaDetails } from './actions';
import {
  setGeneralFormError,
  setActiveStep,
  setSubmitApplicationLoading,
} from '../../actions';
import api from '../../../../api';
import { getMinimalPrice } from '../../../../core/utils';
import ActionBar from '../../action-bar';

const useStyles = makeStyles({
  outlinedInput: {
    marginBottom: 40,
    paddingLeft: 0,
  },
  input: {
    paddingLeft: 5,
  },
  adornment: {
    width: '25%',
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    paddingLeft: 5,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  icon: {
    marginRight: 3,
    height: 24,
  },
  progressWrapper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) !important',
  },
});

const SocialMediaStep = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.app.auth);
  const socialMedia = useSelector((state) => state.application.socialMedia);
  const personalDetails = useSelector((state) => state.application.personalDetails);
  const guruDetails = useSelector((state) => state.application.guruDetails);
  const rates = useSelector((state) => state.application.rates);
  const activeStep = useSelector((state) => state.application.general.activeStep);
  const isIncreasingSteps = useSelector((state) => state.application.general.isIncreasingSteps);
  const submitApplicationLoading = useSelector((state) => state.application.general.submitApplicationLoading);

  const handleFormSubmit = async (data) => {
    const selectedMethods = rates.methods.filter((method) => method.selected) || [];
    const mappedSelectedMethods = selectedMethods.map((item) => ({
      name: item.name,
      price: item.price,
    }));

    dispatch(setSubmitApplicationLoading(true));
    dispatch(setSocialMediaDetails(data));

    const body = {
      ...personalDetails,
      image: personalDetails.image && personalDetails.image.public_id,
      ...guruDetails,
      certificate: guruDetails.certificate && guruDetails.certificate.public_id,
      ...rates,
      methods: mappedSelectedMethods,
      socialMedia: data,
      occupation: 0,
      available: true,
      userID: auth.uid,
      photoURL: auth.photoURL,
      displayName: auth.displayName,
      priceFrom: getMinimalPrice(selectedMethods),
      rating: 0,
      ratingCount: 0,
      ratingBreakdown: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
    };

    try {
      await api.application.post(body);
      dispatch(setGeneralFormError(null));
    } catch (err) {
      dispatch(setGeneralFormError(err.response.data.error));
    }

    dispatch(setSubmitApplicationLoading(false));
    dispatch(setActiveStep(activeStep + 1));
  };

  return (
    <Slide
      direction={isIncreasingSteps ? 'left' : 'right'}
      in={activeStep === 3}
      mountOnEnter
      unmountOnExit
    >
      {submitApplicationLoading ? (
        <div className={classes.progressWrapper}>
          <CircularProgress size={80} />
        </div>
      ) : (
        <div>
          <ModalHeader
            heading="SOCIAL MEDIA (OPTIONAL)"
            caption="Almost done. Just a couple of social media settings."
          />
          <Form
            onSubmit={handleFormSubmit}
            initialValues={socialMedia}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit} noValidate>
                <Grid container justify="space-between" spacing={4}>
                  <Grid item xs={12} md={6}>
                    <Field name="facebook">
                      {({ input }) => (
                        <FormControl fullWidth>
                          <Typography component="h6" variant="button">
                            Facebook ID
                          </Typography>
                          <OutlinedInput
                            {...input}
                            margin="dense"
                            className={classes.outlinedInput}
                            inputProps={{
                              className: classes.input,
                            }}
                            startAdornment={(
                              <Grid
                                container
                                alignItems="center"
                                className={classes.adornment}
                              >
                                <Grid item className={classes.icon}>
                                  <img
                                    alt="facebook"
                                    src="https://img.icons8.com/ios-filled/24/3b5998/facebook-f.png"
                                  />
                                </Grid>
                                <Grid item>/</Grid>
                              </Grid>
                            )}
                          />
                        </FormControl>
                      )}
                    </Field>

                    <Field name="snapchat">
                      {({ input }) => (
                        <FormControl fullWidth>
                          <Typography component="h6" variant="button">
                            Snapchat ID
                          </Typography>
                          <OutlinedInput
                            {...input}
                            margin="dense"
                            className={classes.outlinedInput}
                            inputProps={{
                              className: classes.input,
                            }}
                            startAdornment={(
                              <Grid
                                container
                                alignItems="center"
                                className={classes.adornment}
                              >
                                <Grid item className={classes.icon}>
                                  <img
                                    alt="snapchat"
                                    src="https://img.icons8.com/ios/24/000000/snapchat.png"
                                  />
                                </Grid>
                                <Grid item>/</Grid>
                              </Grid>
                            )}
                          />
                        </FormControl>
                      )}
                    </Field>

                    <Field name="skype">
                      {({ input }) => (
                        <FormControl fullWidth>
                          <Typography component="h6" variant="button">
                            Skype ID
                          </Typography>
                          <OutlinedInput
                            {...input}
                            margin="dense"
                            className={classes.outlinedInput}
                            inputProps={{
                              className: classes.input,
                            }}
                            startAdornment={(
                              <Grid
                                container
                                alignItems="center"
                                className={classes.adornment}
                              >
                                <Grid item className={classes.icon}>
                                  <img alt="skype" src="https://img.icons8.com/offices/24/000000/skype.png" />
                                </Grid>
                                <Grid item>/</Grid>
                              </Grid>
                          )}
                          />
                        </FormControl>
                      )}
                    </Field>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Field name="instagram">
                      {({ input }) => (
                        <FormControl fullWidth>
                          <Typography component="h6" variant="button">
                            Instagram ID
                          </Typography>
                          <OutlinedInput
                            {...input}
                            margin="dense"
                            className={classes.outlinedInput}
                            inputProps={{
                              className: classes.input,
                            }}
                            startAdornment={(
                              <Grid
                                container
                                alignItems="center"
                                className={classes.adornment}
                              >
                                <Grid item className={classes.icon}>
                                  <img alt="instagram" src="https://img.icons8.com/color/24/000000/instagram-new.png" />
                                </Grid>
                                <Grid item>/</Grid>
                              </Grid>
                            )}
                          />
                        </FormControl>
                      )}
                    </Field>

                    <Field name="tiktok">
                      {({ input }) => (
                        <FormControl fullWidth>
                          <Typography component="h6" variant="button">
                            TikTok ID
                          </Typography>
                          <OutlinedInput
                            {...input}
                            margin="dense"
                            className={classes.outlinedInput}
                            inputProps={{
                              className: classes.input,
                            }}
                            startAdornment={(
                              <Grid
                                container
                                alignItems="center"
                                className={classes.adornment}
                              >
                                <Grid item className={classes.icon}>
                                  <img alt="TikTok" src="https://img.icons8.com/color/24/000000/tiktok.png" />
                                </Grid>
                                <Grid item>/</Grid>
                              </Grid>
                            )}
                          />
                        </FormControl>
                      )}
                    </Field>


                    <Field name="discord">
                      {({ input }) => (
                        <FormControl fullWidth>
                          <Typography component="h6" variant="button">
                            Discord Username
                          </Typography>
                          <OutlinedInput
                            {...input}
                            margin="dense"
                            className={classes.outlinedInput}
                            inputProps={{
                              className: classes.input,
                            }}
                            startAdornment={(
                              <Grid
                                container
                                alignItems="center"
                                className={classes.adornment}
                              >
                                <Grid item className={classes.icon}>
                                  <img alt="discord" src="https://img.icons8.com/color/24/000000/discord-logo.png" />
                                </Grid>
                                <Grid item>/</Grid>
                              </Grid>
                            )}
                          />
                        </FormControl>
                      )}
                    </Field>
                  </Grid>
                </Grid>
                <ActionBar />
              </form>
            )}
          </Form>
        </div>
      )}
    </Slide>
  );
};

export default SocialMediaStep;
