import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { setGuru } from './actions';
import { withFirebase } from '../../core/lib/Firebase';
import HeroStack from './hero-stack';

const GDP = ({ match, firebase }) => {
  const dispatch = useDispatch();
  const guru = useSelector((state) => state.gdp.guru);

  useEffect(() => {
    (async () => {
      const { id } = match.params;
      const guruDoc = await firebase.user(id).get();
      dispatch(setGuru(guruDoc.data()));
    })();
  }, [dispatch, firebase, match.params]);

  return (
    <div>
      <HeroStack {...guru} />
    </div>
  );
};

GDP.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  firebase: PropTypes.shape({
    user: PropTypes.func.isRequired,
  }).isRequired,
};

export default withFirebase(GDP);
