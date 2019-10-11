import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button,
  TextField,
  FormControl,
  Typography,
  InputAdornment,
  IconButton,
  Divider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import { LOGIN_BTN_NAME, POST_SIGNUP } from '../../constants/routes';
import { withFirebase } from '../../core/lib/Firebase';
import SocialLoginButtons from '../social-login-buttons';
import LabelDivider from '../../core/components/label-divider';
import LinkStyledButton from '../../core/components/link-styled-button';
import CircularProgressInButton from '../../core/components/circular-progress-in-button';
import {
  toggleHeaderModal,
  setLoadingSignupModal,
} from '../../pages/Header/actions';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: '8px 0',
  },
  input: {
    '& input': {
      padding: '13.5px 14px',
    },
  },
  submitBtn: {
    backgroundColor: 'rgb(255, 90, 95)',
    padding: '10px 8px',
    textTransform: 'none',
    fontSize: 16,
    color: theme.palette.common.white,

    '&:hover': {
      backgroundColor: 'rgb(255, 90, 95)',
    },
  },
  showPasswordBtn: {
    padding: 0,
    color: theme.palette.common.black,

    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  text: {
    verticalAlign: 'middle',
    color: 'rgb(72, 72, 72)',
  },
  loginText: {
    fontWeight: 800,
  },
  bottomDivider: {
    margin: '16px 0',
  },
  error: {
    fontSize: 14,
  },
}));

const INITIAL_STATE = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
};

const SignUpForm = ({ firebase }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [inputValues, setInputValues] = useState(INITIAL_STATE);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const loading = useSelector((state) => state.header.signupModal.loading);

  const onSubmit = (event) => {
    event.preventDefault();
    const { email, password } = inputValues;
    dispatch(setLoadingSignupModal(true));

    firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then((authUser) => (
        firebase.user(authUser.user.uid).set({
          email,
          firstName: inputValues.firstName,
          lastName: inputValues.lastName,
          isGuru: false,
          isAdmin: false,
        })))
      .then(() => {
        setInputValues(INITIAL_STATE);
        setError(null);
        dispatch(setLoadingSignupModal(false));
        dispatch(toggleHeaderModal(true, POST_SIGNUP));
        setTimeout(() => {
          firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
              dispatch(toggleHeaderModal(false, ''));
            });
        }, 2000);
      })
      .catch((err) => {
        setError(err);
        dispatch(setLoadingSignupModal(false));
      });
  };

  const onChange = (event) => {
    setInputValues({
      ...inputValues,
      [event.target.name]: event.target.value,
    });
  };

  const onLoginClick = () => {
    dispatch(toggleHeaderModal(true, LOGIN_BTN_NAME));
  };

  return (
    <>
      <SocialLoginButtons />
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

        {error && error.code && error.code.includes('email') && (
          <Typography color="error" className={classes.error}>
            {error.message}
          </Typography>
        )}

        <FormControl fullWidth className={classes.formControl}>
          <TextField
            variant="outlined"
            name="firstName"
            value={inputValues.firstName}
            onChange={onChange}
            type="text"
            placeholder="First name"
            className={classes.input}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <PermIdentityOutlinedIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </FormControl>

        <FormControl fullWidth className={classes.formControl}>
          <TextField
            variant="outlined"
            name="lastName"
            value={inputValues.lastName}
            onChange={onChange}
            type="text"
            placeholder="Last name"
            className={classes.input}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <PermIdentityOutlinedIcon fontSize="small" />
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
            placeholder="Create a Password"
            className={classes.input}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    className={classes.showPasswordBtn}
                    onClick={() => setShowPassword(!showPassword)}
                    disableRipple
                  >
                    {showPassword ? (
                      <VisibilityOffOutlinedIcon fontSize="small" />
                    ) : (<VisibilityOutlinedIcon fontSize="small" />)}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>

        {error && error.code && error.code.includes('password') && (
          <Typography color="error" className={classes.error}>
            {error.message}
          </Typography>
        )}

        <FormControl fullWidth className={classes.formControl}>
          <Button
            variant="contained"
            className={classes.submitBtn}
            onClick={onSubmit}
          >
            Sign up
            <CircularProgressInButton loading={loading} />
          </Button>
        </FormControl>

      </form>

      <Divider className={classes.bottomDivider} />

      <div>
        <Typography component="span" className={classes.text}>
          Already have a GYMGURUS account?
        </Typography>
        <LinkStyledButton onClick={onLoginClick}>
          <Typography
            component="span"
            className={classes.loginText}
          >
            Log in
          </Typography>
        </LinkStyledButton>
      </div>
    </>
  );
};

SignUpForm.propTypes = {
  firebase: PropTypes.shape({
    doCreateUserWithEmailAndPassword: PropTypes.func.isRequired,
    user: PropTypes.func.isRequired,
    doSignInWithEmailAndPassword: PropTypes.func.isRequired,
  }).isRequired,
};

export default withFirebase(SignUpForm);
