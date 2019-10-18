import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
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
import {
  LabelDivider,
  LinkStyledButton,
  CircularProgressInButton,
  FormError,
  SimpleButton,
} from '../../core/components';
import {
  toggleHeaderModal,
  setLoadingSignUpModal,
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
}));

const INITIAL_STATE = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
};

// eslint-disable-next-line no-useless-escape
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const SignUpForm = ({ firebase }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [inputValues, setInputValues] = useState(INITIAL_STATE);
  const [error, setError] = useState(null);
  const [errorFirstName, setErrorFirstName] = useState(null);
  const [errorLastName, setErrorLastName] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const loading = useSelector((state) => state.header.signUpModal.loading);

  const onSubmit = (event) => {
    event.preventDefault();
    const {
      email, password, firstName, lastName,
    } = inputValues;

    /* check for errors on firstName, lastName */
    if (re.test(email.toLowerCase()) && firstName.trim().length === 0) {
      setErrorFirstName('Invalid first name');
      setErrorLastName(null);
      setError(null);
      return;
    }

    if (re.test(email.toLowerCase()) && lastName.trim().length === 0) {
      setErrorLastName('Invalid last name');
      setErrorFirstName(null);
      setError(null);
      return;
    }

    dispatch(setLoadingSignUpModal(true));

    firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then((authUser) => (
        firebase.user(authUser.user.uid).set({
          email,
          displayName: `${inputValues.firstName} ${inputValues.lastName}`,
          isGuru: false,
          isAdmin: false,
        })))
      .then(() => firebase.doSendEmailVerification())
      .then(() => {
        setInputValues(INITIAL_STATE);

        setError(null);
        setErrorFirstName(null);
        setErrorLastName(null);

        dispatch(setLoadingSignUpModal(false));
        dispatch(toggleHeaderModal(true, POST_SIGNUP));
      })
      .catch((err) => {
        setError(err);
        setErrorFirstName(null);
        setErrorLastName(null);
        dispatch(setLoadingSignUpModal(false));
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
          <FormError>
            {error.message}
          </FormError>
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

        {errorFirstName && <FormError>{errorFirstName}</FormError>}

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

        {errorLastName && <FormError>{errorLastName}</FormError>}

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
          <FormError>
            {error.message}
          </FormError>
        )}

        <FormControl fullWidth className={classes.formControl}>
          <SimpleButton
            variant="contained"
            color="primary"
            onClick={onSubmit}
          >
            Sign up
            <CircularProgressInButton loading={loading} />
          </SimpleButton>
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
    doSendEmailVerification: PropTypes.func.isRequired,
  }).isRequired,
};

export default withFirebase(SignUpForm);
