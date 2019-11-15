import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  TextField,
  FormControl,
} from '@material-ui/core';
import { withFirebase } from '../../../core/lib/Firebase';
import {
  ModalHeader,
  SimpleSelect,
  FormError,
  ImageUploader,
} from '../../../core/components';
import {
  setGuruDetailsFormValues,
  setGuruDetailsCoachingMethods,
  setGuruDetailsErrors,
} from '../../../pages/Header/actions';
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
  const introduction = useSelector((state) => state.header.becomeGuruModal.guruDetailsStep.introduction);
  const methods = useSelector((state) => state.header.becomeGuruModal.guruDetailsStep.methods);
  const sport = useSelector((state) => state.header.becomeGuruModal.guruDetailsStep.sport);
  const certificate = useSelector((state) => state.header.becomeGuruModal.guruDetailsStep.certificate);
  const errors = useSelector((state) => state.header.becomeGuruModal.guruDetailsStep.errors);
  const auth = useSelector((state) => state.app.auth);

  const handleChange = (event) => {
    if (event.target.value.length <= 300) {
      dispatch(setGuruDetailsFormValues(event.target.name, event.target.value));
    }
  };

  const handleCheckboxChange = (name) => (event) => {
    dispatch(setGuruDetailsCoachingMethods(name, event.target.checked));
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

      dispatch(setGuruDetailsFormValues(
        'certificate',
        { loading: true, src: null, name: null },
      ));
      await firebase.doUploadGuruImages(file, auth.uid);
      const url = await firebase.getGuruImageUrl(file.name, auth.uid);

      dispatch(setGuruDetailsFormValues(
        'certificate',
        { loading: false, src: url, name: file.name },
      ));
      dispatch(setGuruDetailsErrors({ ...errors, images: null }));
    }
  };

  const handleImageRemove = async (image) => {
    const imageName = image.name;
    await firebase.doDeleteGuruImage(imageName, auth.uid);
    dispatch(setGuruDetailsFormValues(
      'certificate',
      { loading: false, src: null, name: null },
    ));
  };

  return (
    <>
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

        <div className={classes.vspace}>
          <Typography component="h6" variant="button">
            COACHING METHODS
          </Typography>
          <FormGroup row>
            <FormControlLabel
              control={(
                <Checkbox
                  checked={methods.workout}
                  onChange={handleCheckboxChange('workout')}
                  value={methods.workout}
                  color="primary"
                />
              )}
              label="Workout"
            />

            <FormControlLabel
              control={(
                <Checkbox
                  checked={methods.nutritionPlan}
                  onChange={handleCheckboxChange('nutritionPlan')}
                  value={methods.nutritionPlan}
                  color="primary"
                />
              )}
              label="Nutrition plan"
            />

            <FormControlLabel
              control={(
                <Checkbox
                  checked={methods.workoutAndNutritionPlan}
                  onChange={handleCheckboxChange('workoutAndNutritionPlan')}
                  value={methods.workoutAndNutritionPlan}
                  color="primary"
                />
              )}
              label="Workout & Nutrition plan"
            />

            <FormControlLabel
              control={(
                <Checkbox
                  checked={methods.watchingExercise}
                  onChange={handleCheckboxChange('watchingExercise')}
                  value={methods.watchingExercise}
                  color="primary"
                />
              )}
              label="Watching exercise"
            />

            <FormControlLabel
              control={(
                <Checkbox
                  checked={methods.supplementPlan}
                  onChange={handleCheckboxChange('supplementPlan')}
                  value={methods.supplementPlan}
                  color="primary"
                />
              )}
              label="Supplement plan"
            />

          </FormGroup>
          <FormError>
            {errors && errors.methods}
          </FormError>
        </div>

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
    </>
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
