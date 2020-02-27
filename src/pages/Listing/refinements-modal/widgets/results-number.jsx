import React from 'react';
import PropTypes from 'prop-types';
import { connectStats } from 'react-instantsearch-dom';
import { formatNumber } from '../../../../core/utils';

const ResultsNumber = ({ nbHits }) => (
  <div>
    {`${formatNumber(nbHits)} ${nbHits !== 1 ? 'results' : 'result'}`}
  </div>
);

ResultsNumber.propTypes = {
  nbHits: PropTypes.number.isRequired,
};

export default connectStats(ResultsNumber);
