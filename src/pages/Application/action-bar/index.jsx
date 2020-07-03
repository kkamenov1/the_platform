import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { LANDING } from '../../../constants/routes';
import { useIsMobile } from '../../../core/hooks';
import { BECOME_GURU_STEPS } from '../../../core/config';
import { setActiveStep, setIncreasingSteps } from '../actions';

const useStyles = makeStyles({
  controls: {
    marginTop: 16,
  },

  backBtn: {
    marginBottom: 16,
  },
});

const ActionBar = ({ disabled }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const isMobile = useIsMobile('sm');
  const activeStep = useSelector((state) => state.application.general.activeStep);

  const generateButtonLabel = () => {
    if (activeStep === BECOME_GURU_STEPS.length - 1) {
      return 'Finish';
    }
    return 'Next';
  };

  const handleBack = () => {
    dispatch(setActiveStep(activeStep - 1));
    dispatch(setIncreasingSteps(false));
  };

  return (
    <Grid
      container
      className={classes.controls}
      justify="space-between"
      alignItems="center"
      spacing={isMobile ? 0 : 6}
    >
      <Grid item xs={12} sm={6}>
        {activeStep > 0 && activeStep <= 3 && (
          <Button
            variant="contained"
            color="inherit"
            onClick={handleBack}
            fullWidth
            className={classnames({
              [classes.backBtn]: isMobile,
            })}
          >
            Back
          </Button>
        )}
      </Grid>

      <Grid item xs={12} sm={6}>
        {activeStep <= 3 ? (
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            disabled={disabled}
          >
            {generateButtonLabel()}
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            component={Link}
            fullWidth
            to={LANDING}
          >
            Go Back
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

ActionBar.defaultProps = {
  disabled: false,
};

ActionBar.propTypes = {
  disabled: PropTypes.bool,
};

export default ActionBar;
