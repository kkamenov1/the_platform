import React from 'react';
import PropTypes from 'prop-types';
import { connectStats } from 'react-instantsearch-dom';
import { Button } from '@material-ui/core';
import { formatNumber } from '../../../../core/utils';

const SaveFiltersBtn = ({ nbHits, onClick }) => (
  <Button
    color="primary"
    onClick={onClick}
  >
    {`See ${formatNumber(nbHits)} ${nbHits !== 1 ? 'results' : 'result'}`}
  </Button>
);

SaveFiltersBtn.propTypes = {
  nbHits: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default connectStats(SaveFiltersBtn);
