import React from 'react';
import PropTypes from 'prop-types';
import {
  Divider,
  Grid,
  Typography,
  FormControlLabel,
  Switch,
  Fab,
  makeStyles,
} from '@material-ui/core';
import { connectHits } from 'react-instantsearch-dom';
import FilterListIcon from '@material-ui/icons/FilterList';
import { useDispatch, useSelector } from 'react-redux';
import Hit from './hit';
import Places from './places';
import RefinementsModal from './refinements-modal';
import { toggleMap, toggleRefinementsModal } from './actions';
import { ClearFiltersBtn } from './widgets';
import { ReactComponent as NoResultsMagnifier } from '../../svg/no-results-magnifier.svg';
import { useIsMobile } from '../../core/hooks';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    width: '100%',
    zIndex: 1,
    position: 'fixed',
    right: 0,
    left: 0,
    top: 80,
    backgroundColor: theme.palette.common.white,
    height: 80,
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: '0 24px',
  },

  filterBtn: {
    boxShadow: 'none',
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.grey[400]}`,
    marginLeft: 10,

    '&:hover': {
      backgroundColor: theme.palette.common.white,
      border: `1px solid ${theme.palette.common.black}`,
    },
  },

  container: {
    marginTop: 80,
  },

  noResultsContainer: {
    marginTop: 100,
    marginBottom: 20,
  },

  magnifier: {
    width: 140,
    height: 140,
  },
}));

const Hits = ({
  hits,
  onHitOver,
  showMap,
  selectedHit,
}) => {
  const dispatch = useDispatch();
  const currentLocation = useSelector((state) => state.app.location);
  const classes = useStyles();
  const isMobile = useIsMobile('md');
  const location = useSelector((state) => state.router.location);

  const handleToggleMap = (event) => {
    dispatch(toggleMap(event.target.checked));
  };

  const openRefinementsModal = () => {
    dispatch(toggleRefinementsModal(true));
  };

  return (
    <>
      <RefinementsModal />
      <Grid
        container
        className={classes.toolbar}
        justify="space-between"
        alignItems="center"
      >
        <Grid item xs={12} md={6} container alignItems="center">
          <Places
            defaultRefinement={currentLocation}
            query={location.state && location.state.q}
          />
          <Fab
            size="small"
            color="inherit"
            aria-label="filter"
            className={classes.filterBtn}
            onClick={openRefinementsModal}
          >
            <FilterListIcon />
          </Fab>
        </Grid>

        {!isMobile && (
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
        )}
      </Grid>
      {hits && hits.length ? (
        <Grid container spacing={!showMap || isMobile ? 4 : 0} className={classes.container}>
          {hits.map((hit, i) => (
            <Grid
              item
              key={hit.objectID + i}
              xs={showMap || isMobile ? 12 : 3}
              sm={!showMap || isMobile ? 6 : 12}
              md={!showMap || isMobile ? 4 : 12}
              lg={!showMap ? 3 : 12}
            >
              <Hit hit={hit} onHitOver={onHitOver} showMap={showMap} selectedHit={selectedHit} />
              {showMap && !isMobile && <Divider />}
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography
          component="div"
          className={classes.noResultsContainer}
          align="center"
        >
          <Typography component="div" paragraph>
            <NoResultsMagnifier className={classes.magnifier} />
          </Typography>
          <Typography variant="h6" component="h6" paragraph>
            No results found
          </Typography>
          <Typography variant="body2" component="p" paragraph>
            No gurus found for that location. Maybe you can search for other location or try to reset your applied filters.
          </Typography>
          <Typography component="div" paragraph>
            <ClearFiltersBtn variant="outlined" />
          </Typography>
          <Divider />
        </Typography>
      )}
    </>
  );
};

Hits.defaultProps = {
  showMap: true,
  selectedHit: null,
};

Hits.propTypes = {
  hits: PropTypes.array.isRequired,
  showMap: PropTypes.bool,
  onHitOver: PropTypes.func.isRequired,
  selectedHit: PropTypes.object,
};

export default connectHits(Hits);
