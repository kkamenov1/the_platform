import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  FormControl,
  TextField,
  Typography,
  InputAdornment,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import { withFirebase } from '../../lib/Firebase';
import LinkStyledButton from '../link-styled-button';
import FormError from '../form-error';
import LoadingButton from '../loading-button';
import ModalHeader from '../modal-header';
import { toggleAuthModal } from '../../../modals/auth/actions';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: '8px 0',

    '&:first-child': {
      margin: '0 0 8px 0',
    },
  },
  input: {
    '& input': {
      padding: '13.5px 14px',
    },
  },
  signupText: {
    fontWeight: theme.typography.fontWeightBold,
  },
  btnContainer: {
    marginTop: 20,
  },
}));

const ForgotPasswordForm = ({ firebase, open }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const openSignInModal = () => {
    dispatch(toggleAuthModal(open));
  };

  const onChange = (event) => {
    setEmail(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    firebase
      .doPasswordReset(email)
      .then(() => {
        setEmail('');
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setEmail('');
        setLoading(false);
      });
  };

  return (
    <>
      <ModalHeader
        heading="Reset password"
        caption={`Enter the email address associated with your account,
              and we’ll email you a link to reset your password.`}
      />
      <form>
        <FormControl fullWidth className={classes.formControl}>
          <TextField
            variant="outlined"
            name="email"
            value={email}
            onChange={onChange}
            type="email"
            error={error}
            placeholder="Email address"
            className={classes.input}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <EmailOutlinedIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </FormControl>

        <FormError>
          {error && error.message}
        </FormError>

        <Grid
          container
          className={classes.btnContainer}
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <LinkStyledButton onClick={openSignInModal}>
              <KeyboardArrowLeftIcon />
              <Typography
                component="span"
                className={classes.signupText}
              >
                Back to Login
              </Typography>
            </LinkStyledButton>
          </Grid>

          <Grid item>
            <LoadingButton
              size="large"
              variant="contained"
              color="primary"
              onClick={onSubmit}
              label="Send reset link"
              loading={loading}
            />
          </Grid>
        </Grid>

      </form>
    </>
  );
};

ForgotPasswordForm.propTypes = {
  firebase: PropTypes.shape({
    doPasswordReset: PropTypes.func.isRequired,
  }).isRequired,
  open: PropTypes.bool.isRequired,
};

export default withFirebase(ForgotPasswordForm);
