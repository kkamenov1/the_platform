import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connectRange } from 'react-instantsearch-dom';
import { Slider, Typography, Divider } from '@material-ui/core';

const RangeSlider = ({
  min,
  max,
  refine,
  currentRefinement,
  canRefine,
  header,
  divider,
}) => {
  const [values, setValues] = useState([
    currentRefinement.min,
    currentRefinement.max,
  ]);

  useEffect(() => {
    setValues([currentRefinement.min, currentRefinement.max]);
  }, [currentRefinement, min, max]);

  if (!canRefine) {
    return null;
  }

  const handleChange = (event, newValue) => {
    refine({ min: newValue[0], max: newValue[1] });
  };

  const valuetext = (value) => `${value} days`;

  const minSafe = min || 1;
  const maxSafe = max || 100;

  const marks = [
    {
      value: minSafe,
      label: `${minSafe}`,
    },
    {
      value: maxSafe,
      label: `${maxSafe}`,
    },
  ];

  return (
    <>
      <div style={{ padding: '24px 0' }}>
        {header && (
        <Typography variant="button" component="h6">{header}</Typography>
        )}
        <Slider
          value={values}
          min={minSafe}
          max={maxSafe}
          onChange={handleChange}
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
  header: null,
  divider: false,
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
};

export default connectRange(RangeSlider);
