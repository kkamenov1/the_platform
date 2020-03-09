import React from 'react';
import PropTypes from 'prop-types';
import { connectRange } from 'react-instantsearch-dom';
import { Slider, Typography, Divider } from '@material-ui/core';

const valuetext = (value) => `${value} days`;

const RangeSlider = ({
  min,
  max,
  refine,
  currentRefinement,
  canRefine,
  header,
  divider,
  unit,
}) => {
  if (!canRefine || max - min <= 2) {
    return null;
  }

  const handleChange = (event, newValue) => {
    refine({ min: newValue[0], max: newValue[1] });
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
    <>
      <div style={{ padding: '24px 0' }}>
        {header && (
          <Typography variant="button" component="h6">{header}</Typography>
        )}
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
      </div>
      {divider && <Divider />}
    </>
  );
};

RangeSlider.defaultProps = {
  min: 1,
  max: 100,
  header: '',
  divider: false,
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
  header: PropTypes.string,
  divider: PropTypes.bool,
  unit: PropTypes.string,
};

export default connectRange(RangeSlider);
