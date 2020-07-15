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

const ReviewGuidelinesModal = ({ open, onClose }) => {
  const classes = useStyles();
  const isMobile = useIsMobile('sm');

  return (
    <Modal
      fullScreen={isMobile}
      open={open}
      onClose={onClose}
      expanded
    >
      <ModalHeader heading="WRITING THE PERFECT REVIEW" />
      <Typography>
        Reviews are one of the best ways for GYMGURUS customers to find
        their perfect guru. We have come up with some tips to ensure
        your reviews are at the top of their game:
      </Typography>
      <ul>
        <li className={classes.listItem}>
          <Typography>
            Say why you like or dislike something.
          </Typography>
        </li>
        <li className={classes.listItem}>
          <Typography>
            Avoid prices - prices may be temporary and may not apply when people read your review.
          </Typography>
        </li>
        <li className={classes.listItem}>
          <Typography>
            Keep it short - detail is great,
            but make sure your review is a manageable length and not off-putting.
          </Typography>
        </li>
        <li className={classes.listItem}>
          <Typography>
            Keep it clean - no matter how much you appreciate the guru you were working out with,
            don&apos;t use use any words you wouldn&apos;t use with your grandmother!
          </Typography>
        </li>
        <li className={classes.listItem}>
          <Typography>
            Focus on the guru - if you have an issue not related
            to the guru itself,
            please direct this to our customer service team to ensure
            they can help you.
          </Typography>
        </li>
      </ul>
      <Typography>
        That&apos;s it! Follow these simple guidelines,
        and you&apos;ll be helping people around the world to find the right product in no time.
      </Typography>
    </Modal>
  );
};

ReviewGuidelinesModal.defaultProps = {
  open: false,
};

ReviewGuidelinesModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

export default ReviewGuidelinesModal;
