import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Link as ScrollLink } from 'react-scroll';
import { Sticky } from 'react-sticky';
import classnames from 'classnames';
import {
  Typography,
  Avatar,
  Button,
  Link,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';

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
    },
  },

  priceSkeleton: {
    marginBottom: 16,
  },

  nameSkeleton: {
    marginBottom: 6,
  },
  pointer: {
    cursor: 'pointer',
  },
}));

const QuickInfoContainer = ({
  photoURL,
  location,
  displayName,
  priceFrom,
}) => {
  const classes = useStyles();

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
                  <Link
                    variant="body2"
                    className={classnames(classes.address, classes.pointer)}
                    component={ScrollLink}
                    to="map"
                    spy
                    smooth
                    duration={500}
                  >
                    Show on map
                  </Link>
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
              <Typography component="h4" align="center" gutterBottom>
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

            {priceFrom ? (
              <Typography
                variant="body2"
                color="textSecondary"
                className={classes.attribute}
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

            <Button
              variant="contained"
              color="primary"
              fullWidth
              component={ScrollLink}
              to="prices"
              spy
              smooth
              duration={500}
            >
              SUBSCRIBE
            </Button>
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
};

QuickInfoContainer.propTypes = {
  location: PropTypes.string,
  photoURL: PropTypes.string,
  displayName: PropTypes.string,
  priceFrom: PropTypes.number,
};

export default QuickInfoContainer;
