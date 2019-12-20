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
  const auth = useSelector((state) => state.app.auth);
  const {
    open,
    applicationUID,
    isFormFinalized,
    images,
  } = useSelector((state) => state.becomeGuruModal);

  const closeModal = () => {
    if (!isFormFinalized) {
      /* DELETE UPLOADED IMAGES IN THE STORAGE */
      const selectedImages = (images || []).filter((image) => image.src);
      selectedImages.forEach(async (image) => {
        await firebase.doDeleteGuruImage(image.name, auth.uid);
      });

      /* DELETE RECORD IN DB */
      if (applicationUID) {
        firebase.application(applicationUID).delete();
      }
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
    doDeleteGuruImage: PropTypes.func.isRequired,
  }).isRequired,
};

export default withFirebase(BecomeGuruModal);
