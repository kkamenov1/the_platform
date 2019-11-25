import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import BecomeAGuru from '../../components/become-a-guru';
import { Modal } from '../../core/components';
import { toggleBecomeGuruModal, clearBecomeGuruModal } from './actions';
import { withFirebase } from '../../core/lib/Firebase';

const BecomeGuruModal = ({ firebase }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const open = useSelector((state) => state.becomeGuruModal.open);
  const applicationUID = useSelector((state) => state.becomeGuruModal.applicationUID);
  const isFormFinalized = useSelector((state) => state.becomeGuruModal.isFormFinalized);

  const closeModal = () => {
    if (!isFormFinalized) {
      firebase.application(applicationUID).set(null);
    }
    dispatch(toggleBecomeGuruModal(false));
    dispatch(clearBecomeGuruModal());
  };

  return (
    <Modal
      fullScreen={isMobile}
      open={open}
      onClose={closeModal}
      noPadding
    >
      <BecomeAGuru />
    </Modal>
  );
};

BecomeGuruModal.propTypes = {
  firebase: PropTypes.shape({
    application: PropTypes.func.isRequired,
  }).isRequired,
};

export default withFirebase(BecomeGuruModal);
