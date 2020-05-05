import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  TextField,
  FormControl,
  Slide,
  CircularProgress,
  Grid,
} from '@material-ui/core';
import {
  ModalHeader,
  SimpleSelect,
  FormError,
  ImageUploader,
} from '../../../core/components';
import {
  setFormValues,
  setGuruDetailsErrors,
  guruCertificateImageLoading,
  guruCertificateImageLoaded,
  guruCertificateImageAdded,
  guruCertificateImageRemoved,
} from '../actions';
import sports from '../../../constants/sports';
import { MAX_IMAGE_SIZE, KILOBYTE } from '../../../constants/files';
import api from '../../../api';

const useStyles = makeStyles((theme) => ({
  vspace: {
    marginTop: 10,
  },
  formControl: {
    marginTop: 8,
    marginBottom: 4,
  },
  note: {
    fontSize: theme.typography.pxToRem(10),
  },
  loadingProgressImage: {
    height: 16,
    marginLeft: 8,
  },
}));

const CERTIFICATE_PHOTO_INPUT_ID = 'certificate-photo';

const GuruDetailsStep = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const application = useSelector((state) => state.application);
  const auth = useSelector((state) => state.app.auth);
  const {
    introduction,
    sport,
    certificate,
    guruDetailsStepFormErrors: errors,
    activeStep,
    isIncreasingSteps,
  } = application;

  const handleChange = (event) => {
    if (event.target.value.length <= 300) {
      dispatch(setFormValues(event.target.name, event.target.value));
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    if (file) {
      if (!file.type.match('image')) {
        dispatch(setGuruDetailsErrors({
          ...errors,
          certificate: 'Selected file should be an image',
        }));
        return;
      }

      const selectedFileMegabytes = file.size / KILOBYTE / KILOBYTE;

      if (selectedFileMegabytes > MAX_IMAGE_SIZE) {
        dispatch(setGuruDetailsErrors({
          ...errors,
          certificate: 'Selected file size should not be more than 5MB',
        }));
        return;
      }

      reader.readAsDataURL(file);
      reader.onerror = (error) => {
        dispatch(setGuruDetailsErrors({
          ...errors,
          certificate: `File could not be read: + ${error}`,
        }));
      };

      reader.onloadstart = () => {
        dispatch(guruCertificateImageLoading());
      };

      reader.onloadend = async () => {
        try {
          const response = await api.assets.upload({
            img: reader.result,
            userID: auth && auth.uid,
          });
          dispatch(guruCertificateImageAdded(
            file.size,
            file.name,
            response.data.public_id,
          ));
          dispatch(guruCertificateImageLoaded());
          dispatch(setGuruDetailsErrors({
            ...errors,
            certificate: null,
          }));
        } catch (error) {
          dispatch(guruCertificateImageLoaded());
          dispatch(setGuruDetailsErrors({
            ...errors,
            certificate: 'Failed to upload the image. Please try again!',
          }));
        }
      };
    }
    document.getElementById(CERTIFICATE_PHOTO_INPUT_ID).value = '';
  };

  const handleImageRemove = async (publicId) => {
    dispatch(guruCertificateImageLoading());
    try {
      const response = await api.assets.delete({ publicId });

      if (response.data.result !== 'ok') {
        throw new Error('API Error');
      }

      dispatch(setGuruDetailsErrors({
        ...errors,
        certificate: null,
      }));
      dispatch(guruCertificateImageRemoved());
    } catch (err) {
      dispatch(setGuruDetailsErrors({
        ...errors,
        certificate: 'Failed to delete the image. Please try again!',
      }));
    }
    dispatch(guruCertificateImageLoaded());
  };

  return (
    <Slide
      direction={isIncreasingSteps ? 'left' : 'right'}
      in={activeStep === 1}
      mountOnEnter
      unmountOnExit
    >
      <div>
        <ModalHeader
          heading="GURU INFORMATION"
          caption="Tell us more about your gym achievements and coaching background"
        />

        <form>
          <SimpleSelect
            id="guru-sport"
            label="Sport *"
            name="sport"
            options={sports}
            onChange={handleChange}
            selectedValue={sport}
            required
          />

          <FormError>
            {errors && errors.sport}
          </FormError>

          <FormControl fullWidth className={classes.vspace}>
            <Typography component="h6" variant="button">
              INTRODUCE YOURSELF TO STUDENTS
            </Typography>
            <TextField
              multiline
              rows="6"
              margin="dense"
              variant="outlined"
              placeholder="Max 300 characters..."
              onChange={handleChange}
              name="introduction"
              value={introduction}
            />
          </FormControl>

          <div className={classes.vspace}>
            <Typography component="h6" variant="button">
              <Grid container alignItems="center">
                <Grid item>
                  CERTIFICATION
                </Grid>
                <Grid item>
                  {certificate.loading && (
                  <div className={classes.loadingProgressImage}>
                    <CircularProgress size={16} />
                  </div>
                  )}
                </Grid>
              </Grid>
            </Typography>
            <FormControl fullWidth className={classes.formControl}>
              <ImageUploader
                image={certificate}
                onImageChange={handleImageChange}
                onImageRemove={handleImageRemove}
                inputId={CERTIFICATE_PHOTO_INPUT_ID}
              />
            </FormControl>

            {errors && errors.certificate ? (
              <FormError>
                {errors.certificate}
              </FormError>
            ) : (
              <Typography variant="caption" className={classes.note}>
                Note: This field is not necessary but candidates with provided
                certificates have higher chance to become gurus.
              </Typography>
            )}
          </div>

        </form>
      </div>
    </Slide>
  );
};

export default GuruDetailsStep;
