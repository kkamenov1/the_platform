import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  TextField,
  FormControl,
  Slide,
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
} from '../actions';
import sports from '../../../constants/sports';
import { MAX_IMAGE_SIZE } from '../../../constants/files';
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
}));

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

  const handleImageRemove = async (publicId) => {
    const {
      src,
      name,
      publicId: id,
    } = certificate;

    const withLoadingImage = {
      src: null,
      name: null,
      publicId: null,
      loading: true,
    };

    dispatch(setGuruDetailsErrors({ ...errors, certificate: null }));
    dispatch(setFormValues(
      'certificate',
      withLoadingImage,
    ));

    const response = await api.images.deleteImage({ publicId });

    if (response.data.result === 'ok') {
      const withDeletedImage = {
        src: null,
        name: null,
        publicId: null,
        loading: false,
      };
      dispatch(setFormValues(
        'certificate',
        withDeletedImage,
      ));
    } else {
      const withOldImage = {
        src,
        name,
        publicId: id,
        loading: false,
      };
      dispatch(setFormValues(
        'certificate',
        withOldImage,
      ));
      dispatch(setGuruDetailsErrors({
        ...errors,
        certificate: 'There was an error deleting the image. Please try again!',
      }));
    }
  };

  const checkUploadResult = (resultEvent) => {
    if (resultEvent.event === 'success') {
      const { info } = resultEvent;
      dispatch(setFormValues(
        'certificate',
        {
          loading: false,
          src: info.secure_url,
          name: info.original_filename,
          publicId: info.public_id,
        },
      ));
    }
  };

  const widget = window.cloudinary.createUploadWidget({
    cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
    uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
    folder: `gurus/${auth.uid}`,
    maxFiles: 1,
    resourceType: 'image',
    clientAllowedFormats: ['png', 'jpeg'],
    maxFileSize: MAX_IMAGE_SIZE,
    multiple: false,
  }, (error, result) => {
    checkUploadResult(result);
  });

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
              CERTIFICATION
            </Typography>
            <FormControl fullWidth className={classes.formControl}>
              <ImageUploader
                images={[certificate]}
                widget={widget}
                onImageRemove={handleImageRemove}
                fullWidth
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
