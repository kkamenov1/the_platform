import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import places from 'places.js';
import connect from './connector';

class Places extends Component {
  componentDidMount() {
    const { refine, defaultRefinement } = this.props;

    const autocomplete = places({
      container: this.element,
      type: 'city',
      aroundLatLngViaIP: false,
    });

    autocomplete.on('change', (event) => {
      refine(event.suggestion.latlng);
    });

    autocomplete.on('clear', () => {
      refine(defaultRefinement);
    });
  }

  createRef = (c) => (this.element = c);

  render() {
    return (
      <TextField
        type="text"
        variant="outlined"
        id="address-input"
        placeholder="Anywhere"
        margin="none"
        inputProps={{
          ref: this.createRef,
          style: { minWidth: 350, padding: '10px 14px' },
        }}
      />
    );
  }
}

Places.propTypes = {
  refine: PropTypes.func.isRequired,
  defaultRefinement: PropTypes.object.isRequired,
};

export default connect(Places);
