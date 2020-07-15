import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Modal, ModalHeader } from '../../core/components';
import { useIsMobile } from '../../core/hooks';

const useStyles = makeStyles({
  listItem: {
    padding: '8px 0',
  },
});

const PhotoRequirementsModal = ({ open, onClose }) => {
  const classes = useStyles();
  const isMobile = useIsMobile('sm');

  return (
    <Modal
      fullScreen={isMobile}
      open={open}
      onClose={onClose}
      expanded
    >
      <ModalHeader heading="ADD A PHOTO TO YOUR REVIEW" />
      <Typography>
        If you choose to share a photo of the product,
        we just ask you to consider these requirements:
      </Typography>
      <ul>
        <li className={classes.listItem}>
          <Typography>
            You can upload photos in PNG and JPEG format
          </Typography>
        </li>
        <li className={classes.listItem}>
          <Typography>
            The photo you upload can be a maximum size of 5 MB
          </Typography>
        </li>
        <li className={classes.listItem}>
          <Typography>
            You should only upload images where you own the copyright
          </Typography>
        </li>
        <li className={classes.listItem}>
          <Typography>
            Offensive or inappropriate photos are not allowed
          </Typography>
        </li>
      </ul>
    </Modal>
  );
};

PhotoRequirementsModal.defaultProps = {
  open: false,
};

PhotoRequirementsModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

export default PhotoRequirementsModal;
