import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  FormControlLabel,
  Switch,
  Typography,
  Fab,
} from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import { setLocation } from '../../app/actions';
import { toggleMap } from './actions';
import CustomHits from './hits';
import CustomPagination from './custom-pagination';
import { FALLBACK_LOCATION } from '../../core/config';


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

  filterBtn: {
    boxShadow: 'none',
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.grey[400]}`,
  },
}));

const WrapWithHits = ({ children, selectedHit, onHitOver }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
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
      dispatch(setLocation(FALLBACK_LOCATION));
    }
  }, [dispatch]);

  const handleToggleMap = (event) => {
    dispatch(toggleMap(event.target.checked));
  };

  return (
    <div>
      <Grid
        container
        className={classes.toolbar}
        justify="space-between"
        alignItems="center"
      >
        <Grid item>

          <Fab
            variant="extended"
            size="medium"
            color="inherit"
            aria-label="filter"
            className={classes.filterBtn}
          >
            Filter By
            <FilterListIcon />
          </Fab>
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
        <CustomHits selectedHit={selectedHit} onHitOver={onHitOver} showMap={showMap} />
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
