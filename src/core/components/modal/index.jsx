import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
  dialogPaper: {
    width: '100%',
  },
  modalWrapper: {
    padding: 32,
  },
  closeIconWrapper: {
    textAlign: 'right',
    marginBottom: 20,
  },
  closeBtn: {
    padding: 15,
    margin: -20,

    '&:hover': {
      backgroundColor: 'transparent',
    },
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
      classes={{
        paper: classes.dialogPaper,
      }}
      {...other}
    >
      <div className={classes.modalWrapper}>
        <div className={classes.closeIconWrapper}>
          <IconButton
            className={classes.closeBtn}
            disableRipple
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        </div>
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
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  other: PropTypes.shape({}),
};

export default Modal;
