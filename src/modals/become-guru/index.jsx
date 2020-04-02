import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import BecomeAGuru from '../../components/become-a-guru';
import { Modal } from '../../core/components';
import { useIsMobile } from '../../core/hooks';
import { toggleBecomeGuruModal, clearBecomeGuruModal } from './actions';
import { withFirebase } from '../../core/lib/Firebase';
import api from '../../api';

const BecomeGuruModal = ({ firebase }) => {
  const dispatch = useDispatch();
  const isMobile = useIsMobile('sm');
  const {
    open,
    applicationUID,
    isFormFinalized,
    images,
    certificate,
  } = useSelector((state) => state.becomeGuruModal);

  const closeModal = async () => {
    dispatch(toggleBecomeGuruModal(false));
    if (!isFormFinalized) {
      /* DELETE UPLOADED IMAGES IN THE STORAGE */
      const selectedImages = (images || []).filter((image) => image.publicId);
      selectedImages.forEach(async (image) => {
        await api.images.deleteImage({ publicId: image.publicId });
      });
      if (certificate.publicId) {
        await api.images.deleteImage({ publicId: certificate.publicId });
      }

      /* DELETE RECORD IN DB */
      if (applicationUID) {
        await firebase.application(applicationUID).delete();
      }
    }
    dispatch(clearBecomeGuruModal());
  };

  return (
    <Modal
      fullScreen={isMobile}
      open={open}
      onClose={closeModal}
      noPadding
      expanded
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
