import React from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    margin: '24px 0',
  },
  input: {
    minWidth: '100%',
    [theme.breakpoints.up('sm')]: {
      minWidth: 370,
    },
  },
}));

const SearchBox = ({ query, onQueryChange }) => {
  const classes = useStyles();

  return (
    <Typography
      component="div"
      align="center"
      className={classes.formWrapper}
    >
      <TextField
        variant="outlined"
        name="password"
        value={query}
        onChange={onQueryChange}
        type="search"
        placeholder="Search..."
        margin="dense"
        className={classes.input}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
      />
    </Typography>
  );
};

SearchBox.defaultProps = {
  query: '',
};

SearchBox.propTypes = {
  query: PropTypes.string,
  onQueryChange: PropTypes.func.isRequired,
};

export default SearchBox;
