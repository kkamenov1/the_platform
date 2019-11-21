import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
  Input,
  InputAdornment,
  OutlinedInput,
  Slide,
} from '@material-ui/core';
import EventNoteIcon from '@material-ui/icons/EventNote';
import { ModalHeader, FormError } from '../../../core/components';
import { addOnPosition } from '../../../core/utils';
import {
  setGuruDetailsCoachingMethods,
  setFormValues,
} from '../actions';

const useStyles = makeStyles({
  input: {
    width: 30,
  },
  durationInput: {
    paddingLeft: 10,
  },
  tableHeader: {
    height: 50,
  },
  thItem: {
    fontWeight: 600,
    color: '#697b87',
    lineHeight: '50px',
  },
  left: {
    backgroundColor: '#FAFAFA',
    paddingLeft: 10,
  },
  leftItem: {
    padding: '5px 10px',
  },
  right: {
    paddingLeft: 10,
  },
  methodsContainer: {
    borderTop: '1px solid rgb(128, 128, 128)',
  },
  vspace: {
    marginTop: 10,
  },
  note: {
    fontSize: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
});

const RatesStep = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const becomeGuruModal = useSelector((state) => state.becomeGuruModal);

  const {
    methods,
    duration,
    ratesStepFormErrors: errors,
    activeStep,
    isIncreasingSteps,
  } = becomeGuruModal;

  const handleRatesChange = (index) => (event) => {
    dispatch(setGuruDetailsCoachingMethods(
      addOnPosition(index, {
        name: methods[index].name,
        selected: methods[index].selected,
        price: event.target.value,
      }, methods),
    ));
  };

  const handleCheckboxChange = (index) => (event) => {
    dispatch(setGuruDetailsCoachingMethods(
      addOnPosition(index, {
        name: methods[index].name,
        selected: event.target.checked,
        price: methods[index].price,
      }, methods),
    ));
  };

  const handleDurationChange = (event) => {
    dispatch(setFormValues(event.target.name, event.target.value));
  };

  return (
    <Slide
      direction={isIncreasingSteps ? 'left' : 'right'}
      in={activeStep === 2}
      mountOnEnter
      unmountOnExit
    >
      <div>
        <ModalHeader
          heading="SET YOUR GURU RATES"
          caption={`Based on your coaching experience, please set rates for the
          corresponding coaching format`}
        />

        <form>
          <div>
            <Grid
              container
              justify="space-between"
              alignItems="center"
              className={classes.tableHeader}
            >
              <Grid item xs={6} className={classes.left}>
                <Typography className={classes.thItem}>Coaching Method</Typography>
              </Grid>
              <Grid item xs={6} className={classes.right}>
                <Typography className={classes.thItem}>Rates</Typography>
              </Grid>
            </Grid>

            <div className={classes.methodsContainer}>
              {methods
                .map(({ name, selected, price }, i) => (
                  <Grid
                    container
                    justify="space-between"
                    alignItems="center"
                    key={i}
                  >
                    <Grid item xs={6} className={classnames(classes.left, classes.leftItem)}>
                      <FormControlLabel
                        key={i}
                        control={(
                          <Checkbox
                            checked={selected}
                            onChange={handleCheckboxChange(i)}
                            value={selected}
                            color="primary"
                          />
                        )}
                        label={name}
                      />
                    </Grid>
                    <Grid item xs={6} className={classes.right}>
                      <Input
                        value={price}
                        onChange={handleRatesChange(i)}
                        disabled={!selected}
                        inputProps={{
                          className: classes.input,
                        }}
                        startAdornment={
                          <InputAdornment position="start">$</InputAdornment>
                        }
                        endAdornment={
                          <InputAdornment position="end">USD</InputAdornment>
                        }
                      />
                    </Grid>
                  </Grid>
                ))}

              <FormError>
                {errors && errors.methods}
              </FormError>
            </div>

            <div className={classes.vspace}>
              <Typography component="h6" variant="button">
                Duration of the coaching programs
              </Typography>
              <OutlinedInput
                name="duration"
                value={duration}
                onChange={handleDurationChange}
                margin="dense"
                className={classes.durationInput}
                inputProps={{
                  className: classes.input,
                }}
                startAdornment={
                  <EventNoteIcon className={classes.inputIcon} />
              }
                endAdornment={
                  <InputAdornment position="end">days</InputAdornment>
              }
              />

              {errors && errors.duration ? (
                <FormError>
                  {errors && errors.duration}
                </FormError>
              ) : (
                <Typography variant="caption" className={classes.note} component="p">
                  Note: This doesn&apos;t include&nbsp;
                  <strong>Watching exercise</strong>
                  &nbsp;method
                </Typography>
              )}

            </div>
          </div>
        </form>
      </div>
    </Slide>
  );
};

export default RatesStep;
