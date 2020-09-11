import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Grid,
  Popper,
  ClickAwayListener,
  Grow,
} from '@material-ui/core';
import { CustomMarker } from 'react-instantsearch-dom-maps';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import {
  usePopupState,
  bindToggle,
  bindPopper,
} from 'material-ui-popup-state/hooks';
import Hit from './hit';

const useStyles = makeStyles((theme) => ({
  marker: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    padding: '4px 10px',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 15,
    boxShadow: theme.shadows[2],
    transform: 'scale(1)',
    transition: 'transform .2s ease-in-out',
    cursor: 'pointer',
  },

  activeMarker: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.black,
    transform: 'scale(1.05)',
    transition: 'transform .2s ease-in-out',
  },

  priceTag: {
    marginRight: 8,
    fontSize: 14,
    fontWeight: theme.typography.fontWeightMedium,
  },

  tagIcon: {
    fontSize: 14,
    transform: 'rotate(90deg)',
  },

  infoWrapper: {
    width: 270,
    cursor: 'pointer',
  },
}));

const CustomMapMarker = ({ hit, onHitOver, selectedHit }) => {
  const classes = useStyles();
  const ref = React.useRef();
  const minPriceAttribute = `$${hit.priceFrom}`;
  const popupState = usePopupState({ variant: 'popper', popupId: 'popper' });

  return (
    <CustomMarker
      key={hit.objectID}
      hit={hit}
      anchor={{ x: 1, y: 5 }}
      onMouseEnter={() => onHitOver(hit)}
      onMouseLeave={() => onHitOver(null)}
      style={{ position: 'relative' }}
    >
      <Grid
        container
        ref={ref}
        justify="center"
        alignItems="center"
        className={classnames(classes.marker, {
          [classes.activeMarker]: selectedHit && selectedHit.objectID === hit.objectID,
        })}
        {...bindToggle(popupState)}
      >
        <Typography
          component="span"
          className={classes.priceTag}
        >
          {minPriceAttribute}
        </Typography>
        <LocalOfferIcon className={classes.tagIcon} />
      </Grid>
      <Popper {...bindPopper(popupState)} transition>
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={() => popupState.close()}>
            <Grow {...TransitionProps} timeout={350}>
              <Typography component="div" className={classes.infoWrapper}>
                <Hit
                  hit={hit}
                  onHitOver={onHitOver}
                  showMap={false}
                  isOnMap
                  selectedHit={selectedHit}
                />
              </Typography>
            </Grow>
          </ClickAwayListener>
        )}
      </Popper>
    </CustomMarker>
  );
};

CustomMapMarker.defaultProps = {
  selectedHit: null,
};


CustomMapMarker.propTypes = {
  hit: PropTypes.shape({
    objectID: PropTypes.string,
    methods: PropTypes.array,
    displayName: PropTypes.string,
    duration: PropTypes.number,
    introduction: PropTypes.string,
    languages: PropTypes.arrayOf(PropTypes.string),
    location: PropTypes.string,
    sport: PropTypes.string,
    priceFrom: PropTypes.number,
  }).isRequired,
  onHitOver: PropTypes.func.isRequired,
  selectedHit: PropTypes.shape({
    objectID: PropTypes.string,
    methods: PropTypes.array,
    displayName: PropTypes.string,
    duration: PropTypes.number,
    introduction: PropTypes.string,
    languages: PropTypes.arrayOf(PropTypes.string),
    location: PropTypes.string,
    sport: PropTypes.string,
    priceFrom: PropTypes.number,
  }),
};

export default CustomMapMarker;
