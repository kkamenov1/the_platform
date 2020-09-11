import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Sticky } from 'react-sticky';
import { Typography, Avatar } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import {
  ScrollingButton,
  ScrollingLink,
  RatingWithCount,
} from '../../../../core/components';
import QuickInfoCollapseContainer from './quick-info-collapse-container';

const useStyles = makeStyles((theme) => ({
  upper: {
    padding: '35px 35px 65px',
    position: 'relative',
    background: 'url(https://res.cloudinary.com/dl766ebzy/image/upload/v1586259091/navi_dqp54m.png) 50% 0 no-repeat',
  },
  userAddress: {
    padding: '10px 15px',
    borderRadius: 3,
    background: 'white',
    position: 'relative',
  },
  addressWrapper: {
    width: 170,
    display: 'inline-block',
    verticalAlign: 'top',
    lineHeight: '14px',
  },
  address: {
    fontSize: 12,
    lineHeight: '14px',
  },
  icon: {
    margin: '2px 7px 0 0',
  },
  avatar: {
    position: 'absolute',
    width: 80,
    height: 80,
    marginTop: -40,
    marginLeft: -40,
    top: '100%',
    left: '50%',
    border: '3px solid white',
  },
  bottom: {
    padding: '60px 20px 20px 20px',
  },
  wrapper: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
      border: '1px solid #e4e4e4',
      background: theme.palette.common.white,
    },
  },
  priceSkeleton: {
    marginBottom: 16,
  },
  ratings: {
    marginBottom: 6,
  },
  nameSkeleton: {
    marginBottom: 6,
  },
  pointer: {
    cursor: 'pointer',
  },
  collapseContainer: {
    marginTop: 16,
  },
}));

const QuickInfoContainer = ({
  photoURL,
  location,
  displayName,
  priceFrom,
  expanded,
  status,
  occupation,
  subscribers,
  sport,
  duration,
  languages,
  rating,
  ratingCount,
}) => {
  const classes = useStyles();

  const renderRatings = () => {
    if (rating && ratingCount > 0) {
      return (
        <ScrollingLink
          containerId="reviews"
          offset={-80}
          variant="body2"
          color="inherit"
          underline="none"
        >
          <RatingWithCount rating={rating} ratingCount={ratingCount} />
        </ScrollingLink>
      );
    }
    if (ratingCount === 0) {
      return (
        <ScrollingLink containerId="reviews" offset={-80} variant="body2">
          Write review
        </ScrollingLink>
      );
    }
    return <Skeleton variant="rect" height={20} />;
  };

  return (
    <Sticky topOffset={-100}>
      {({ style }) => (
        <div className={classes.wrapper} style={{ ...style, top: 100 }}>
          <div className={classes.upper}>
            <Typography component="div" className={classes.userAddress}>
              <LocationOnOutlinedIcon className={classes.icon} />
              {location ? (
                <div className={classes.addressWrapper}>
                  <Typography className={classes.address}>
                    {location}
                  </Typography>
                  <ScrollingLink
                    containerId="map"
                    offset={-80}
                    variant="body2"
                    className={classes.address}
                  >
                    Show on map
                  </ScrollingLink>
                </div>
              ) : (
                <Skeleton
                  variant="rect"
                  height={29}
                  width={170}
                  className={classes.addressWrapper}
                />
              )}
            </Typography>

            <Avatar
              alt={displayName}
              src={photoURL}
              className={classes.avatar}
            />

          </div>
          <div className={classes.bottom}>
            {displayName ? (
              <Typography component="h4" align="center">
                {displayName}
              </Typography>
            ) : (
              <Skeleton
                variant="rect"
                height={24}
                width={262}
                className={classes.nameSkeleton}
              />
            )}
            <Typography component="div" align="center" className={classes.ratings}>
              {renderRatings()}
            </Typography>
            {priceFrom ? (
              <Typography
                variant="body2"
                color="textSecondary"
                align="center"
                paragraph
              >
                {`From $${priceFrom}`}
              </Typography>
            ) : (
              <Skeleton
                variant="rect"
                height={20}
                width={262}
                className={classes.priceSkeleton}
              />
            )}

            <ScrollingButton
              containerId="prices"
              offset={-80}
              label="SUBSCRIBE"
              variant="contained"
              color="primary"
              fullWidth
            />
            <QuickInfoCollapseContainer
              status={status}
              occupation={occupation}
              subscribers={subscribers}
              sport={sport}
              duration={duration}
              languages={languages}
              expanded={expanded}
            />
          </div>
        </div>
      )}
    </Sticky>
  );
};

QuickInfoContainer.defaultProps = {
  location: undefined,
  photoURL: undefined,
  displayName: '',
  priceFrom: undefined,
  occupation: undefined,
  rating: undefined,
  ratingCount: undefined,
};

QuickInfoContainer.propTypes = {
  location: PropTypes.string,
  photoURL: PropTypes.string,
  displayName: PropTypes.string,
  priceFrom: PropTypes.number,
  expanded: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  occupation: PropTypes.number,
  subscribers: PropTypes.string.isRequired,
  sport: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  languages: PropTypes.string.isRequired,
  rating: PropTypes.number,
  ratingCount: PropTypes.number,
};

export default QuickInfoContainer;
