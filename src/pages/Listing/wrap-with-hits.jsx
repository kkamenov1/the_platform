import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import algoliasearch from 'algoliasearch';
import classnames from 'classnames';
import {
  InstantSearch,
} from 'react-instantsearch-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  FormControlLabel,
  Switch,
  Typography,
} from '@material-ui/core';
import { setLocation, toggleMap } from './actions';
import CustomHits from './hits';
import Places from './places';
import CustomPagination from './pagination';
import { fallbackLocation } from '../../core/config';

const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      background: theme.palette.common.white,
    },
  },
  hitsContainer: {
    width: 840,
    padding: '100px 24px 24px 24px',
    backgroundColor: theme.palette.common.white,
  },

  hitsContainerExpanded: {
    width: '100%',
  },

  map: {
    width: 'calc(100% - 840px)',
    position: 'fixed',
    top: 160,
    right: 0,
  },

  hideMap: {
    display: 'none',
  },

  toolbar: {
    width: '100%',
    position: 'fixed',
    zIndex: 999,
    backgroundColor: theme.palette.common.white,
    height: 80,
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: '0 24px',
  },

  paginationWrapper: {
    margin: '30px 0 50px 0',
  },
}));

const searchClient = algoliasearch( // TODO: move that in env variables
  'K50KABYMX9',
  'b21248284e21ea5c231e9ed63ea2ce19',
);

const WrapWithHits = ({ children }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useSelector((state) => state.listing.currentLocation);
  const showMap = useSelector((state) => state.listing.showMap);

  React.useEffect(() => {
    const geo = navigator.geolocation;

    if (geo) {
      geo.getCurrentPosition((position) => {
        dispatch(setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }));
      });
    } else {
      dispatch(setLocation(fallbackLocation));
    }
  }, [dispatch]);

  const handleToggleMap = (event) => {
    dispatch(toggleMap(event.target.checked));
  };

  return (
    <InstantSearch searchClient={searchClient} indexName="users">
      <div>
        <Grid
          container
          className={classes.toolbar}
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Places defaultRefinement={location} />
          </Grid>

          <Grid item>
            <FormControlLabel
              control={(
                <Switch
                  checked={showMap}
                  onChange={handleToggleMap}
                  value="map"
                  color="primary"
                />
              )}
              label="Show Map"
              labelPlacement="start"
            />
          </Grid>
        </Grid>

        <div className={classnames(classes.hitsContainer, { [classes.hitsContainerExpanded]: !showMap })}>
          <CustomHits showMap={showMap} />
          <Typography align="center" component="div" className={classes.paginationWrapper}>
            <CustomPagination />
          </Typography>
        </div>
        <div className={classnames(classes.map, {
          [classes.hideMap]: !showMap,
        })}
        >
          {children}
        </div>
      </div>
    </InstantSearch>
  );
};

WrapWithHits.defaultProps = {
  children: null,
};

WrapWithHits.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default WrapWithHits;
