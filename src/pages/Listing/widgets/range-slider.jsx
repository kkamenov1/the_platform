import React from 'react';
import PropTypes from 'prop-types';
import { connectRange } from 'react-instantsearch-dom';
import { Slider } from '@material-ui/core';

const valuetext = (value) => `${value} days`;

const RangeSlider = ({
  min,
  max,
  refine,
  currentRefinement,
  canRefine,
  unit,
}) => {
  if (!canRefine || max - min <= 2) {
    return null;
  }

  const handleChange = (_event, newValue) => {
    refine({ min: newValue[0] || min, max: newValue[1] || max });
  };

  const marks = [
    {
      value: min,
      label: `${min}${unit}`,
    },
    {
      value: max,
      label: `${max}${unit}`,
    },
  ];

  return (
    <Slider
      min={min}
      max={max}
      defaultValue={Object.values(currentRefinement)}
      onChangeCommitted={handleChange}
      valueLabelDisplay="auto"
      aria-labelledby="range-slider"
      getAriaValueText={valuetext}
      disabled={!canRefine}
      marks={marks}
    />
  );
};

RangeSlider.defaultProps = {
  min: 1,
  max: 100,
  unit: '',
};

RangeSlider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  refine: PropTypes.func.isRequired,
  currentRefinement: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number,
  }).isRequired,
  canRefine: PropTypes.bool.isRequired,
  unit: PropTypes.string,
};

export default connectRange(RangeSlider);
