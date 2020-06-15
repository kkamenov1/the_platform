/* eslint-disable react/jsx-no-duplicate-props */
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
  Slide,
  TextField,
} from '@material-ui/core';
import EventNoteIcon from '@material-ui/icons/EventNote';
import PersonIcon from '@material-ui/icons/Person';
import { Form, Field } from 'react-final-form';
import { ModalHeader, StandardInputLabel } from '../../../../core/components';
import { setRatesDetails } from './actions';
import { setActiveStep, setIncreasingSteps } from '../../actions';
import ActionBar from '../../action-bar';

const useStyles = makeStyles((theme) => ({
  input: {
    paddingLeft: 8,
  },
  noMargin: {
    marginTop: 0,
  },
  tableHeader: {
    height: 50,
  },
  thItem: {
    fontWeight: 600,
    color: theme.palette.grey['700'],
    lineHeight: '50px',
  },
  left: {
    backgroundColor: theme.palette.grey['50'],
    paddingLeft: 10,
  },
  leftItem: {
    padding: '5px 10px',
  },
  right: {
    paddingLeft: 10,
  },
  methodsContainer: {
    borderTop: `1px solid ${theme.palette.grey['700']}`,
  },
  vspace: {
    marginTop: 16,
  },
  inputIcon: {
    marginRight: 10,
  },
}));

const RatesStep = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const rates = useSelector((state) => state.application.rates);
  const methods = useSelector((state) => state.application.rates.methods);
  const activeStep = useSelector((state) => state.application.general.activeStep);
  const isIncreasingSteps = useSelector((state) => state.application.general.isIncreasingSteps);

  const validate = (values) => {
    const err = {};
    if (!values.duration) {
      err.duration = 'Required';
    }
    if (!values.subscribers) {
      err.subscribers = 'Required';
    }
    return err;
  };

  const handleFormSubmit = (data) => {
    dispatch(setRatesDetails(data));
    dispatch(setActiveStep(activeStep + 1));
    dispatch(setIncreasingSteps(true));
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

        <Form
          onSubmit={handleFormSubmit}
          validate={validate}
          initialValues={rates}
        >
          {({ handleSubmit, values, invalid }) => (
            <form onSubmit={handleSubmit} noValidate>
              <Grid
                container
                justify="space-between"
                alignItems="center"
                className={classes.tableHeader}
              >
                <Grid item xs={6} className={classes.left}>
                  <Typography className={classes.thItem}>Coaching Method *</Typography>
                </Grid>
                <Grid item xs={6} className={classes.right}>
                  <Typography className={classes.thItem}>Rates *</Typography>
                </Grid>
              </Grid>

              <div className={classes.methodsContainer}>
                {methods
                  .map(({ name }, i) => (
                    <Grid
                      container
                      justify="space-between"
                      alignItems="center"
                      key={i}
                    >
                      <Grid
                        item
                        xs={6}
                        className={classnames(
                          classes.left,
                          classes.leftItem,
                        )}
                      >

                        <Field name={`methods.${i}.selected`} type="checkbox">
                          {({ input }) => (
                            <FormControlLabel
                              label={name}
                              control={<Checkbox {...input} color="primary" />}
                            />
                          )}
                        </Field>
                      </Grid>
                      <Grid item xs={6} className={classes.right}>
                        <Field name={`methods.${i}.price`}>
                          {({ input }) => (
                            <Input
                              {...input}
                              disabled={!values.methods[i].selected}
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
                          )}
                        </Field>
                      </Grid>
                    </Grid>
                  ))}
              </div>

              <div className={classes.vspace}>
                <Field name="duration">
                  {({ input, meta }) => (
                    <>
                      <StandardInputLabel
                        required
                        error={Boolean(meta.touched && meta.error)}
                      >
                        Duration of programs
                      </StandardInputLabel>
                      <TextField
                        variant="outlined"
                        {...input}
                        margin="dense"
                        fullWidth
                        className={classes.noMargin}
                        error={Boolean(meta.touched && meta.error)}
                        helperText={
                          (meta.touched && meta.error)
                          || 'Note: This doesn\'t include Watching exercise'
                        }
                        inputProps={{
                          onBlur: (e) => input.onBlur(e),
                          className: classes.input,
                        }}
                        InputProps={{
                          startAdornment: (
                            <EventNoteIcon className={classes.inputIcon} />
                          ),
                          endAdornment: (
                            <InputAdornment position="end">days</InputAdornment>
                          ),
                        }}
                      />
                    </>
                  )}
                </Field>
              </div>

              <div className={classes.vspace}>
                <Field name="subscribers">
                  {({ input, meta }) => (
                    <>
                      <StandardInputLabel
                        required
                        error={Boolean(meta.touched && meta.error)}
                      >
                        MAX SUBSCRIBERS
                      </StandardInputLabel>
                      <TextField
                        variant="outlined"
                        {...input}
                        margin="dense"
                        fullWidth
                        className={classes.noMargin}
                        error={Boolean(meta.touched && meta.error)}
                        helperText={
                          (meta.touched && meta.error)
                          || 'How many people you can train at once?'
                        }
                        inputProps={{
                          onBlur: (e) => input.onBlur(e),
                          className: classes.input,
                        }}
                        InputProps={{
                          startAdornment: (
                            <PersonIcon className={classes.inputIcon} />
                          ),
                        }}
                      />
                    </>
                  )}
                </Field>
              </div>
              <ActionBar disabled={invalid} />
            </form>
          )}
        </Form>
      </div>
    </Slide>
  );
};

export default RatesStep;
