import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  Select,
  MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  formControl: {
    minWidth: 60,
  },
});

const PageSizeSelector = ({ pageSize, onPageSizeChange }) => {
  const classes = useStyles();

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <Select
        labelId="page-selector-label"
        value={pageSize}
        onChange={onPageSizeChange}
        margin="dense"
      >
        <MenuItem value={8}>8</MenuItem>
        <MenuItem value={16}>16</MenuItem>
        <MenuItem value={32}>32</MenuItem>
      </Select>
    </FormControl>
  );
};

PageSizeSelector.defaultProps = {
  pageSize: 8,
};

PageSizeSelector.propTypes = {
  pageSize: PropTypes.number,
  onPageSizeChange: PropTypes.func.isRequired,
};

export default PageSizeSelector;
