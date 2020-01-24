import React from 'react';
import { TextField, InputAdornment, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { connectSearchBox } from 'react-instantsearch-dom';

const useStyles = makeStyles({
  formWrapper: {
    margin: '24px 0',
  },
  input: {
    minWidth: 370,
  },
});

const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => {
  const classes = useStyles();

  return (
    <Typography
      component="div"
      align="center"
      className={classes.formWrapper}
    >
      <form noValidate action="" role="search">
        <TextField
          variant="outlined"
          name="password"
          value={currentRefinement}
          onChange={(event) => refine(event.currentTarget.value)}
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
      </form>
    </Typography>
  );
};

const CustomSearchBox = connectSearchBox(SearchBox);

export default CustomSearchBox;
