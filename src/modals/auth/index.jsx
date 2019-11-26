import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import { Modal, ModalHeader } from '../../core/components';
import SignInForm from '../../components/sign-in-form';
import SignUpForm from '../../components/sign-up-form';
import ForgotPasswordForm from '../../components/forgot-password-form';
import PostSignUp from '../../components/post-sign-up';
import { toggleAuthModal } from './actions';
import {
  SIGN_IN,
  SIGN_UP,
  FORGOT_PASSWORD,
  POST_SIGN_UP,
} from '../../constants/authModalPages';

const renderModalContent = (page) => {
  switch (page) {
    case SIGN_IN:
      return <SignInForm />;
    case SIGN_UP:
      return <SignUpForm />;
    case FORGOT_PASSWORD:
      return (
        <>
          <ModalHeader
            heading="Reset password"
            caption={`Enter the email address associated with your account,
              and we’ll email you a link to reset your password.`}
          />
          <ForgotPasswordForm />
        </>
      );
    case POST_SIGN_UP:
      return <PostSignUp />;
    default:
      return <></>;
  }
};

const AuthModal = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const open = useSelector((state) => state.authModal.open);
  const page = useSelector((state) => state.authModal.page);

  const closeModal = () => {
    dispatch(toggleAuthModal(false, ''));
  };

  return (
    <Modal
      fullScreen={isMobile}
      open={open}
      onClose={closeModal}
    >
      {renderModalContent(page)}
    </Modal>
  );
};

export default AuthModal;
