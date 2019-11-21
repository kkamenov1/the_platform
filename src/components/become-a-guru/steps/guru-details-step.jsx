import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  TextField,
  FormControl,
  Slide,
} from '@material-ui/core';
import { withFirebase } from '../../../core/lib/Firebase';
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
import { KILOBYTE, FILE_MEGABYTES } from '../../../constants/files';

const useStyles = makeStyles({
  vspace: {
    marginTop: 10,
  },
  formControl: {
    marginTop: 8,
    marginBottom: 4,
  },
  note: {
    fontSize: 10,
  },
});

const GuruDetailsStep = ({ firebase }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const becomeGuruModal = useSelector((state) => state.becomeGuruModal);
  const auth = useSelector((state) => state.app.auth);
  const {
    introduction,
    sport,
    certificate,
    guruDetailsStepFormErrors: errors,
    activeStep,
    isIncreasingSteps,
  } = becomeGuruModal;

  const handleChange = (event) => {
    if (event.target.value.length <= 300) {
      dispatch(setFormValues(event.target.name, event.target.value));
    }
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      if (!file.type.match('image')) {
        dispatch(setGuruDetailsErrors({
          ...errors,
          images: 'Selected file should be an image',
        }));
        return;
      }

      const selectedFileMegabytes = file.size / KILOBYTE / KILOBYTE;
      if (selectedFileMegabytes > FILE_MEGABYTES) {
        dispatch(setGuruDetailsErrors({
          ...errors,
          images: 'Selected file size should not be more than 5MB',
        }));
        return;
      }

      dispatch(setFormValues(
        'certificate',
        { loading: true, src: null, name: null },
      ));
      await firebase.doUploadGuruImages(file, auth.uid);
      const url = await firebase.getGuruImageUrl(file.name, auth.uid);

      dispatch(setFormValues(
        'certificate',
        { loading: false, src: url, name: file.name },
      ));
      dispatch(setGuruDetailsErrors({ ...errors, images: null }));
    }
  };

  const handleImageRemove = async (image) => {
    const imageName = image.name;
    await firebase.doDeleteGuruImage(imageName, auth.uid);
    dispatch(setFormValues(
      'certificate',
      { loading: false, src: null, name: null },
    ));
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
            label="Sport"
            name="sport"
            options={sports}
            onChange={handleChange}
            selectedValue={sport}
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
                image={certificate}
                onImageChange={handlePhotoChange}
                onImageRemove={() => handleImageRemove(certificate)}
                inputId="guru-certificate"
                fullWidth
              />
            </FormControl>

            {errors && errors.images ? (
              <FormError>
                {errors && errors.images}
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

GuruDetailsStep.propTypes = {
  firebase: PropTypes.shape({
    doUploadGuruImages: PropTypes.func.isRequired,
    getGuruImageUrl: PropTypes.func.isRequired,
    doDeleteGuruImage: PropTypes.func.isRequired,
  }).isRequired,
};

export default withFirebase(GuruDetailsStep);
