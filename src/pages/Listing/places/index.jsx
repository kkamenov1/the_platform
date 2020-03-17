import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField, withStyles } from '@material-ui/core';
import places from 'places.js';
import connect from './connector';
import { getCategoryName } from '../../../core/utils';


const styles = {
  formControl: {
    width: 'calc(100% - 50px)',
    maxWidth: 350,
  },
  input: {
    width: 'calc(100% - 50px)',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    padding: '15px 30px 15px 14px',
    backgroundColor: 'white',
  },
};

class Places extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autocompleteInstance: undefined,
    };
  }

  componentDidMount() {
    const { refine, defaultRefinement, location } = this.props;
    const autocomplete = places({
      container: this.element,
      type: 'city',
      language: 'en',
      aroundLatLngViaIP: false,
    });

    this.setState({
      autocompleteInstance: autocomplete,
    });

    autocomplete.on('change', (event) => {
      refine(event.suggestion.latlng, event.suggestion.value);
    });

    autocomplete.on('clear', () => {
      refine(defaultRefinement);
    });

    autocomplete.setVal((location && getCategoryName(location)) || '');
    window.addEventListener('popstate', this.handlePopState);
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.handlePopState);
  }

  handlePopState = () => {
    const { location } = this.props;
    const { autocompleteInstance } = this.state;
    autocompleteInstance.setVal((location && getCategoryName(location)) || '');
    autocompleteInstance.close();
  };

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
        className={classes.formControl}
        inputProps={{
          ref: this.createRef,
          className: classes.input,
        }}
      />
    );
  }
}

Places.defaultProps = {
  location: undefined,
};

Places.propTypes = {
  refine: PropTypes.func.isRequired,
  defaultRefinement: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  location: PropTypes.string,
};

export default withStyles(styles)(connect(Places));
