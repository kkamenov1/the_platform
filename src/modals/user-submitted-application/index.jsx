import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Modal } from '../../core/components';
import { useIsMobile } from '../../core/hooks';
import { toggleUserSubmittedApplicationModal } from './actions';
import { ReactComponent as EmailIcon } from '../../svg/mail.svg';

const useStyles = makeStyles((theme) => ({
  heading: {
    marginBottom: 20,
    fontWeight: theme.typography.fontWeightMedium,
  },

  infoText: {
    fontSize: theme.typography.pxToRem(theme.typography.fontSize),
    fontWeight: theme.typography.fontWeightMedium,
    marginBottom: 20,
  },

  icon: {
    height: 75,
    width: 'auto',
    marginBottom: 20,
  },
}));

const UserSubmittedApplicationModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isMobile = useIsMobile('sm');
  const open = useSelector((state) => state.userSubmittedApplicationModal.open);

  const closeModal = () => {
    dispatch(toggleUserSubmittedApplicationModal(false));
  };

  return (
    <Modal
      fullScreen={isMobile}
      open={open}
      onClose={closeModal}
    >
      <Typography
        variant="h5"
        component="h5"
        align="center"
        className={classes.heading}
      >
        Thank you for trying to apply to our gurus platform. Unfortunately,
        there is already a pending application for that user.
      </Typography>

      <Typography component="div" align="center">
        <EmailIcon className={classes.icon} />
      </Typography>

      <Typography className={classes.infoText} align="center">
        Please be patient.
        You will receive an email with the assessment of the application.
      </Typography>
    </Modal>
  );
};


export default UserSubmittedApplicationModal;
