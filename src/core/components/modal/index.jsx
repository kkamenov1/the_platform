import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import classnames from 'classnames';

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    width: '100%',
    borderRadius: 0,
  },
  [theme.breakpoints.up('md')]: {
    paperWidthSm900: {
      maxWidth: 900,
    },
  },
  paperWidthSm600: {
    maxWidth: 600,
  },
  modalPadding: {
    padding: '42px 32px 32px 32px',
  },
  closeIconWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 9999,
  },
  closeBtn: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}));

const Modal = ({
  fullScreen,
  open,
  onClose,
  children,
  other,
  noPadding,
}) => {
  const classes = useStyles();

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      classes={{
        paper: classes.dialogPaper,
        paperWidthSm: !noPadding ? classes.paperWidthSm600 : classes.paperWidthSm900,
      }}
      {...other}
    >
      <div className={classnames({ [classes.modalPadding]: !noPadding })}>
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
  noPadding: false,
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
  noPadding: PropTypes.bool,
  other: PropTypes.shape({}),
};

export default Modal;
