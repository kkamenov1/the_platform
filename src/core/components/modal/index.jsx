import React from 'react';
import PropTypes from 'prop-types';
import { Dialog } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  modalWrapper: {
    padding: 32,
  },
});

const Modal = ({
  fullScreen,
  open,
  onClose,
  children,
  other,
}) => {
  const classes = useStyles();
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      {...other}
    >
      <div className={classes.modalWrapper}>
        {children}
      </div>
    </Dialog>
  );
};

Modal.defaultProps = {
  fullScreen: false,
  other: {},
};

Modal.propTypes = {
  fullScreen: PropTypes.bool,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  other: PropTypes.shape({}),
};

export default Modal;
