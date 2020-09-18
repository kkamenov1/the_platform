import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardActions,
  Tooltip,
  IconButton,
  CardContent,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { ReviewContent } from '../../../../core/components';

const useStyles = makeStyles((theme) => ({
  card: {
    height: 500,
    position: 'relative',
  },
  cardContentWrapper: {
    height: 430,
    overflowY: 'auto',
    overflowX: 'hidden',
    visibility: 'visible',
    [theme.breakpoints.up('lg')]: {
      visibility: 'hidden',
    },

    '&:hover': {
      visibility: 'visible',
    },
  },
  cardContent: {
    visibility: 'visible',
  },
  cardActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
}));

const Hit = ({ hit, handleApproveReview, handleRejectReview }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <div className={classes.cardContentWrapper}>
        <CardContent className={classes.cardContent}>
          <ReviewContent {...hit} showAdditionalInfo />
        </CardContent>
      </div>
      <CardActions disableSpacing className={classes.cardActions}>
        <Tooltip title="Approve">
          <IconButton onClick={() => handleApproveReview(hit.reviewUID)}>
            <CheckIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Reject">
          <IconButton onClick={() => handleRejectReview(
            hit.reviewUID,
            hit.imageBefore,
            hit.imageAfter,
          )}
          >
            <ClearIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

Hit.propTypes = {
  hit: PropTypes.shape({
    reviewUID: PropTypes.string.isRequired,
    imageBefore: PropTypes.string,
    imageAfter: PropTypes.string,
  }).isRequired,
  handleRejectReview: PropTypes.func.isRequired,
  handleApproveReview: PropTypes.func.isRequired,
};

export default Hit;
