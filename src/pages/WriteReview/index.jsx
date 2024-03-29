import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { setGuru } from './actions';
import WriteReviewPageContent from './write-review-page-content';
import { withFirebase } from '../../core/lib/Firebase';
import { AuthContent } from '../../core/components';
import { NOT_FOUND } from '../../constants/routes';

const useStyles = makeStyles((theme) => ({
  outer: {
    width: '100%',
    maxWidth: 1280,
    margin: '100px auto',

    [theme.breakpoints.up('lg')]: {
      width: '80%',
    },
  },
  authWrapper: {
    width: '95%',
    maxWidth: 560,
    margin: '0 auto',

    [theme.breakpoints.up('lg')]: {
      width: '50%',
    },
  },
}));

const WriteReview = ({ firebase }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const guru = useSelector((state) => state.review.guru);
  const auth = useSelector((state) => state.app.auth);
  const page = useSelector((state) => state.authModal.page);
  const { guruID } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (auth) {
      (async () => {
        const guruDoc = await firebase.user(guruID).get();
        if (guruDoc.exists) {
          dispatch(setGuru(guruDoc.data()));
        } else {
          history.push(NOT_FOUND);
        }
      })();
    }
  }, [dispatch, firebase, guruID, auth, history]);

  return (
    <div className={classes.outer}>
      {!auth ? (
        <div className={classes.authWrapper}>
          <AuthContent page={page} />
        </div>
      ) : (
        <WriteReviewPageContent guru={guru} />
      )}
    </div>
  );
};

WriteReview.propTypes = {
  firebase: PropTypes.shape({
    user: PropTypes.func.isRequired,
    reviews: PropTypes.func.isRequired,
  }).isRequired,
};

export default withFirebase(WriteReview);
