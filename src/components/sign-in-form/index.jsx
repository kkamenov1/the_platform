import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  FormControl,
  TextField,
  Button,
  Typography,
  Divider,
  InputAdornment,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { withFirebase } from '../../core/lib/Firebase';
import LabelDivider from '../../core/components/label-divider';
import LinkStyledButton from '../../core/components/link-styled-button';
import SignUpLink from '../sign-up-link';
import { FORGOT_PASSWORD_BTN_NAME } from '../../constants/routes';
import { toggleHeaderModal } from '../../pages/Header/actions';
import SocialLoginButtons from '../social-login-buttons';

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
  submitBtn: {
    backgroundColor: 'rgb(255, 90, 95)',
    padding: '9px 8px',
    textTransform: 'none',
    fontSize: 16,
    color: theme.palette.common.white,

    '&:hover': {
      backgroundColor: 'rgb(255, 90, 95)',
    },
  },
  showPasswordWrapper: {
    textAlign: 'right',
  },
  forgotPasswordWrapper: {
    textAlign: 'center',
  },
  bottomDivider: {
    margin: '8px 0 16px 0',
  },
}));

const INITIAL_STATE = {
  email: '',
  password: '',
};

const SignInForm = ({ firebase }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [inputValues, setInputValues] = useState(INITIAL_STATE);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const openForgotPasswordModal = () => {
    dispatch(toggleHeaderModal(true, FORGOT_PASSWORD_BTN_NAME));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const { email, password } = inputValues;

    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setInputValues(INITIAL_STATE);
        setError(null);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };

  const onChange = (event) => {
    setInputValues({
      ...inputValues,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <SocialLoginButtons />
      <div>
        <LabelDivider label="or" />
        <form>
          <FormControl fullWidth className={classes.formControl}>
            <TextField
              variant="outlined"
              name="email"
              value={inputValues.email}
              onChange={onChange}
              type="email"
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

          <FormControl fullWidth className={classes.formControl}>
            <TextField
              variant="outlined"
              name="password"
              value={inputValues.password}
              onChange={onChange}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className={classes.input}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LockOutlinedIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>

          <div className={classes.showPasswordWrapper}>
            <LinkStyledButton
              onClick={() => setShowPassword(!showPassword)}
            >
              Show password
            </LinkStyledButton>
          </div>

          {error && <Typography color="error">{error.message}</Typography>}

          <FormControl fullWidth className={classes.formControl}>
            <Button
              variant="contained"
              className={classes.submitBtn}
              onClick={onSubmit}
            >
              Log in
            </Button>
          </FormControl>

          <div className={classes.forgotPasswordWrapper}>
            <LinkStyledButton onClick={openForgotPasswordModal}>
              {FORGOT_PASSWORD_BTN_NAME}
            </LinkStyledButton>
          </div>
        </form>

        <Divider className={classes.bottomDivider} />
        <SignUpLink />
      </div>
    </div>
  );
};

SignInForm.propTypes = {
  firebase: PropTypes.shape({
    doSignInWithEmailAndPassword: PropTypes.func.isRequired,
  }).isRequired,
};

export default withFirebase(SignInForm);
