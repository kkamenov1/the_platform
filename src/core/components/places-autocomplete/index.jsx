import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import PlacesAutocomplete from 'react-places-autocomplete';
import {
  TextField,
  Paper,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';

const useStyles = makeStyles({
  locationWrapper: {
    position: 'relative',
  },
  autoCompleteDropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%',
    maxHeight: 200,
    overflowX: 'hidden',
    overflowY: 'scroll',
    zIndex: 9999,
  },
  loader: {
    width: '20px !important',
    height: '20px !important',
  },
  loaderWrapper: {
    textAlign: 'center',
  },
  suggestion: {
    cursor: 'pointer',
  },
  noMargin: {
    marginTop: 0,
  },
});


const PlacesAutoComplete = ({
  error, onBlur, helperText, ...props
}) => {
  const classes = useStyles();

  return (
    <PlacesAutocomplete {...props}>
      {({
        getInputProps, suggestions, getSuggestionItemProps, loading,
      }) => (
        <div className={classes.locationWrapper}>
          <TextField
            {...getInputProps({
              variant: 'outlined',
              margin: 'dense',
              fullWidth: true,
              required: true,
            })}
            className={classes.noMargin}
            helperText={helperText}
            inputProps={{ onBlur }}
            error={error}
          />
          <Paper className={classes.autoCompleteDropdown}>
            {loading && (
            <div className={classes.loaderWrapper}>
              <CircularProgress className={classes.loader} />
            </div>
            )}

            {suggestions && suggestions.length > 0 ? (
              <List>
                {suggestions.map((suggestion) => (
                  <ListItem
                    button
                    {...getSuggestionItemProps(suggestion)}
                  >
                    <ListItemIcon><RoomIcon /></ListItemIcon>
                    <ListItemText>{suggestion.description}</ListItemText>
                  </ListItem>
                ))}
              </List>
            ) : null}
          </Paper>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

PlacesAutoComplete.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PlacesAutoComplete;
