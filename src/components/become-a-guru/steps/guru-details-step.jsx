import React from 'react';
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
import { ModalHeader, SimpleSelect, FormError } from '../../../core/components';
import {
  setGuruDetailsFormValues,
  setGuruDetailsCoachingMethods,
} from '../../../pages/Header/actions';
import sports from '../../../constants/sports';

const useStyles = makeStyles({
  vspace: {
    marginTop: 10,
  },
});

const GuruDetailsStep = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const introduction = useSelector((state) => state.header.becomeGuruModal.guruDetailsStep.introduction);
  const methods = useSelector((state) => state.header.becomeGuruModal.guruDetailsStep.methods);
  const sport = useSelector((state) => state.header.becomeGuruModal.guruDetailsStep.sport);
  const errors = useSelector((state) => state.header.becomeGuruModal.guruDetailsStep.errors);

  const handleChange = (event) => {
    if (event.target.value.length <= 300) {
      dispatch(setGuruDetailsFormValues(event.target.name, event.target.value));
    }
  };

  const handleCheckboxChange = (name) => (event) => {
    dispatch(setGuruDetailsCoachingMethods(name, event.target.checked));
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
        <FormError>
          {errors && errors.introduction}
        </FormError>

      </form>
    </>
  );
};

export default GuruDetailsStep;
