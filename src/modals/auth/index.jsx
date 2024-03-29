import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Modal, AuthContent } from '../../core/components';
import { useIsMobile } from '../../core/hooks';
import { toggleAuthModal } from './actions';

const AuthModal = () => {
  const dispatch = useDispatch();
  const isMobile = useIsMobile('sm');
  const open = useSelector((state) => state.authModal.open);
  const page = useSelector((state) => state.authModal.page);

  const closeModal = () => {
    dispatch(toggleAuthModal(false));
  };

  return (
    <Modal
      fullScreen={isMobile}
      open={open}
      onClose={closeModal}
    >
      <AuthContent page={page} open={open} />
    </Modal>
  );
};

export default AuthModal;
