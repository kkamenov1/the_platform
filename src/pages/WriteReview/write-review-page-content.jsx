import React from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { REVIEW_PAGE_FORM_STATUS } from '../../core/config';
import SubmittedReview from './submitted-review';
import ReviewForm from './review-form';
import ErrorPage from './error-page';
import { setFormStatus } from './actions';

const WriteReviewPageContent = ({ guru }) => {
  const dispatch = useDispatch();
  const formStatus = useSelector((state) => state.review.formStatus);
  const { guruID } = useParams();

  const handleTryAgainClick = () => {
    dispatch(setFormStatus(REVIEW_PAGE_FORM_STATUS.FORM_INITIAL));
  };

  switch (formStatus) {
    case REVIEW_PAGE_FORM_STATUS.FORM_SUBMITTED:
      return <SubmittedReview guru={guru} />;
    case REVIEW_PAGE_FORM_STATUS.FORM_ERROR:
      return (
        <ErrorPage
          heading="Oops!"
          caption="Something went wrong while submitting the form. Please try again."
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleTryAgainClick}
          >
            TRY AGAIN
          </Button>
        </ErrorPage>
      );
    case REVIEW_PAGE_FORM_STATUS.FORM_DUPLICATE_ERROR:
      return (
        <ErrorPage
          caption={`You have already submitted a review for ${guru.displayName}.`}
        >
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`/gurus/${guruID}`}
          >
            RETURN
          </Button>
        </ErrorPage>
      );
    default: return <ReviewForm guru={guru} />;
  }
};

WriteReviewPageContent.defaultProps = {
  guru: null,
};

WriteReviewPageContent.propTypes = {
  guru: PropTypes.shape({
    displayName: PropTypes.string,
    image: PropTypes.string,
  }),
};

export default WriteReviewPageContent;
