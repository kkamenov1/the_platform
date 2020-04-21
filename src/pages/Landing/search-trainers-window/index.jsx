import React, { useEffect, useState, useRef } from 'react';
import qs from 'qs';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography, Button, FormControl, TextField,
} from '@material-ui/core';
import places from 'places.js';
import { Link } from 'react-router-dom';
import { SimpleSelect } from '../../../core/components';
import sports from '../../../constants/sports';
import { getCategorySlug } from '../../../core/utils';

const useStyles = makeStyles((theme) => ({
  outerModalContainer: {
    position: 'relative',
    padding: 0,
    top: 0,
    zIndex: 1,

    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      top: 120,
      padding: '0 60px',
    },
  },
  innerModalContainer: {
    width: '100%',
    padding: 24,
    boxShadow: theme.shadows['16'],
    backgroundColor: theme.palette.common.white,

    [theme.breakpoints.up('md')]: {
      width: 441,
      padding: '32px 32px 24px 32px',
      borderRadius: theme.shape.borderRadius,
    },
  },
  modalHeader: {
    margin: 0,
    color: theme.palette.text.primary,
  },
  input: {
    width: 'calc(100% - 50px)',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  searchBtnWrapper: {
    marginTop: 25,
  },
}));

const SearchTrainersWindow = () => {
  const classes = useStyles();
  const [sport, setSport] = useState('');
  const [autocompleteInstance, setAutocompleteInstance] = useState();
  const ref = useRef();

  const onSportSelectChange = (event) => {
    setSport(event.target.value);
  };

  useEffect(() => {
    const autocomplete = places({
      container: ref.current,
      type: 'city',
      language: 'en',
      aroundLatLngViaIP: false,
    });

    setAutocompleteInstance(autocomplete);

    autocomplete.on('change', (event) => {
      autocomplete.setVal(event.suggestion.value);
    });

    autocomplete.on('clear', () => {
      autocomplete.setVal('');
    });
  }, [setAutocompleteInstance]);

  const buildUrl = () => {
    const qsObj = {
      q: autocompleteInstance && autocompleteInstance.getVal() ? getCategorySlug(autocompleteInstance.getVal()) : undefined,
      sport: sport || undefined,
    };

    return `/gurus${qs.stringify(qsObj, {
      addQueryPrefix: true,
    })}`;
  };

  return (
    <div className={classes.outerModalContainer}>
      <div className={classes.innerModalContainer}>
        <Typography
          className={classes.modalHeader}
          variant="inherit"
          component="h1"
        >
          Search Gurus
        </Typography>

        <div>
          <TextField
            variant="outlined"
            placeholder="Anywhere"
            margin="dense"
            inputProps={{ ref, className: classes.input }}
            fullWidth
          />
          <SimpleSelect
            id="sport"
            label="Sport"
            name="sport"
            options={sports}
            onChange={onSportSelectChange}
            selectedValue={sport}
          />
          <FormControl className={classes.searchBtnWrapper} fullWidth>
            <Button
              size="large"
              variant="contained"
              color="primary"
              component={Link}
              to={() => buildUrl()}
            >
              Search
            </Button>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default SearchTrainersWindow;
