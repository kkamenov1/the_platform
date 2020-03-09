import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField, withStyles } from '@material-ui/core';
import places from 'places.js';
import connect from './connector';

const styles = {
  input: {
    width: 200,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    padding: '10px 30px 10px 14px',
    transition: 'width 0.4s ease-in-out',
    backgroundColor: 'white',

    '&:focus': {
      width: 350,
      transition: 'width 0.4s ease-in-out',
    },
  },
};

class Places extends Component {
  componentDidMount() {
    const { refine, defaultRefinement } = this.props;

    const autocomplete = places({
      container: this.element,
      type: 'city',
      language: 'en',
      aroundLatLngViaIP: false,
    });

    autocomplete.on('change', (event) => {
      refine(event.suggestion.latlng, event.suggestion.value);
    });

    autocomplete.on('clear', () => {
      refine(defaultRefinement);
    });
  }

  createRef = (c) => (this.element = c);

  render() {
    const { classes } = this.props;
    return (
      <TextField
        type="text"
        variant="outlined"
        id="address-input"
        placeholder="Anywhere"
        margin="none"
        inputProps={{
          ref: this.createRef,
          className: classes.input,
        }}
      />
    );
  }
}

Places.propTypes = {
  refine: PropTypes.func.isRequired,
  defaultRefinement: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(Places));
