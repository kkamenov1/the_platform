import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { animateScroll as scroll } from 'react-scroll';
import api from '../../../../api';
import {
  SearchBox,
  PageSizeSelector,
  MockedHits,
} from '../../components';
import Hits from './hits';
import { Pagination } from '../../../../core/components';
import {
  setReviews,
  setPageReviews,
  setQueryReviews,
  setPageSizeReviews,
  setReviewsLoading,
  setTotalReviewsCount,
} from './actions';
import { withFirebase } from '../../../../core/lib/Firebase';

const useStyles = makeStyles({
  container: {
    maxWidth: 1600,
    width: '100%',
    margin: '0 auto',
    padding: '0 20px',
  },
  nbHits: {
    fontSize: 12,
  },
  paginationWrapper: {
    margin: '30px 0 50px 0',
  },
  upperSearchWrapper: {
    position: 'relative',
  },
  pageSelectorWrapper: {
    position: 'absolute',
    top: 0,
    right: 8,
    transform: 'translate(0, -50%)',
  },
  paperWidthSm600: {
    maxWidth: 600,
  },
});

const Reviews = ({ firebase }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const reviews = useSelector((state) => state.admin.reviews.hits);
  const nbHits = useSelector((state) => state.admin.reviews.count);
  const page = useSelector((state) => state.admin.reviews.page);
  const pageSize = useSelector((state) => state.admin.reviews.pageSize);
  const loading = useSelector((state) => state.admin.reviews.loading);
  const query = useSelector((state) => state.admin.reviews.query);

  const executeQuery = useCallback(() => {
    dispatch(setReviewsLoading(true));
    api.reviews.get({
      query,
      offset: (page - 1) * pageSize,
      limit: pageSize,
      approved: false,
    }).then((response) => {
      dispatch(setReviews(response.data.hits));
      dispatch(setTotalReviewsCount(response.data.nbHits));
      dispatch(setReviewsLoading(false));
    });
  }, [query, page, pageSize, dispatch]);

  useEffect(() => {
    executeQuery();
  }, [executeQuery]);

  const handeQueryChange = (event) => {
    dispatch(setQueryReviews(event.target.value));
  };

  const handlePageChange = (pageNumber) => {
    dispatch(setPageReviews(pageNumber));
    scroll.scrollToTop({
      duration: 400,
    });
  };

  const handlePageSizeChange = (event) => {
    dispatch(setPageSizeReviews(event.target.value));
  };

  const triggerSnackbar = (variant, message) => {
    enqueueSnackbar(message, { variant });
  };

  const handleRejectReview = async (
    reviewUID,
    imageBefore,
    imageAfter,
  ) => {
    await firebase.review(reviewUID).delete();
    executeQuery();
    triggerSnackbar('error', 'Review deleted');

    /* DELETE UPLOADED IMAGES IN CLOUDINARY */
    if (imageBefore) {
      await api.assets.delete({ publicId: imageBefore });
    }
    if (imageAfter) {
      await api.assets.delete({ publicId: imageAfter });
    }
    // TODO: SEND EMAIL TO USER FOR REJECTED REVIEW
  };


  const handleApproveReview = async (reviewUID) => {
    await firebase.review(reviewUID).update({
      approved: true,
    });
    executeQuery();
    triggerSnackbar('success', 'Review approved');
    // TODO: SEND EMAIL TO USER FOR APPROVED REVIEW
  };

  return (
    <div className={classes.container}>
      <SearchBox query={query} onQueryChange={handeQueryChange} />

      <div className={classes.upperSearchWrapper}>
        <Typography
          align="center"
          className={classes.nbHits}
          color="textSecondary"
        >
          {`${nbHits} ${nbHits !== 1 ? 'results' : 'result'} found`}
        </Typography>
        {nbHits > 0 && (
          <div className={classes.pageSelectorWrapper}>
            <PageSizeSelector
              pageSize={pageSize}
              onPageSizeChange={handlePageSizeChange}
            />
          </div>
        )}
      </div>

      <Typography
        align="center"
        component="div"
        paragraph
        variant="body2"
        color="textSecondary"
      />
      {loading ? (
        <MockedHits pageSize={pageSize} />
      ) : (
        <Hits
          hits={reviews}
          handleRejectReview={handleRejectReview}
          handleApproveReview={handleApproveReview}
        />
      )}
      <Typography align="center" component="div" className={classes.paginationWrapper}>
        <Pagination
          type="full"
          pageNumber={page}
          maxPage={Math.ceil(nbHits / pageSize)}
          visiblePages={5}
          onPageChange={handlePageChange}
        />
      </Typography>
    </div>
  );
};

Reviews.propTypes = {
  firebase: PropTypes.shape({
    review: PropTypes.func.isRequired,
    user: PropTypes.func.isRequired,
  }).isRequired,
};

export default withFirebase(Reviews);
