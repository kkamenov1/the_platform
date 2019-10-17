import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
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
import { withFirebase } from '../../core/lib/Firebase';
import {
  LinkStyledButton,
  SimpleButton,
  FormError,
  CircularProgressInButton,
} from '../../core/components';
import { toggleHeaderModal, setLoadingResetPasswordModal } from '../../pages/Header/actions';
import { LOGIN_BTN_NAME } from '../../constants/routes';

const useStyles = makeStyles({
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
    fontWeight: 800,
  },
  btnContainer: {
    marginTop: 20,
  },
});

const ForgotPasswordForm = ({ firebase }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.header.forgotPasswordModal.loading);
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const openSignInModal = () => {
    dispatch(toggleHeaderModal(true, LOGIN_BTN_NAME));
  };

  const onChange = (event) => {
    setEmail(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(setLoadingResetPasswordModal(true));

    firebase
      .doPasswordReset(email)
      .then(() => {
        setEmail('');
        setError(null);
        dispatch(setLoadingResetPasswordModal(false));
      })
      .catch((err) => {
        setError(err);
        setEmail('');
        dispatch(setLoadingResetPasswordModal(false));
      });
  };

  return (
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

      <Grid container className={classes.btnContainer}>
        <Grid item xs={6}>
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

        <Grid item xs={6}>
          <SimpleButton
            size="large"
            variant="contained"
            color="primary"
            onClick={onSubmit}
          >
            Send reset link
            <CircularProgressInButton loading={loading} />
          </SimpleButton>
        </Grid>
      </Grid>

    </form>
  );
};

ForgotPasswordForm.propTypes = {
  firebase: PropTypes.shape({
    doPasswordReset: PropTypes.func.isRequired,
  }).isRequired,
};

export default withFirebase(ForgotPasswordForm);
