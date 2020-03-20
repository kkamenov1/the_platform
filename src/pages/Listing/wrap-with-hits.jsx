import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { setLocation } from '../../app/actions';
import CustomHits from './hits';
import CustomPagination from './custom-pagination';
import { FALLBACK_LOCATION } from '../../core/config';
import { useIsMobile } from '../../core/hooks';


const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      background: theme.palette.common.white,
    },
  },

  hitsContainer: {
    width: 840,
    padding: '0 24px 24px 24px',
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

  paginationWrapper: {
    margin: '30px 0 50px 0',
  },
}));

const WrapWithHits = ({
  children,
  selectedHit,
  onHitOver,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const showMap = useSelector((state) => state.listing.showMap);
  const isMobile = useIsMobile('md');

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

  return (
    <>
      <div className={classnames(classes.hitsContainer, {
        [classes.hitsContainerExpanded]: !showMap || isMobile,
      })}
      >
        <CustomHits
          selectedHit={selectedHit}
          onHitOver={onHitOver}
          showMap={showMap}
        />
        <Typography align="center" component="div" className={classes.paginationWrapper}>
          <CustomPagination />
        </Typography>
      </div>
      <div className={classnames(classes.map, {
        [classes.hideMap]: !showMap || isMobile,
      })}
      >
        {children}
      </div>
    </>
  );
};

WrapWithHits.defaultProps = {
  children: null,
  selectedHit: {},
};

WrapWithHits.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  selectedHit: PropTypes.object,
  onHitOver: PropTypes.func.isRequired,
};

export default WrapWithHits;
