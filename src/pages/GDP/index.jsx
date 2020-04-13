import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Grid,
  Typography,
  Avatar,
  Link,
  Divider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import LanguageIcon from '@material-ui/icons/Language';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import { Link as ScrollLink } from 'react-scroll';
import { StickyContainer } from 'react-sticky';
import { withFirebase } from '../../core/lib/Firebase';
import { setGuru, setGuruLoading } from './actions';
import ImageViewer from './image-viewer';
import QuickInfoContainer from './quick-info-container';
import PriceTable from './price-table';
import { SportBadge } from '../../core/components';
import { useIsMobile } from '../../core/hooks';
import Map from './map';


const useStyles = makeStyles((theme) => ({
  imageViewer: {
    position: 'relative',
  },
  wrapper: {
    [theme.breakpoints.up('md')]: {
      maxWidth: 960,
      margin: '20px auto 0 auto',
    },
  },

  details: {
    padding: 15,
  },

  avatar: {
    width: 70,
    height: 70,
  },
  secondaryInfo: {
    marginTop: 16,
  },
  bottomOffsetXl: {
    marginBottom: 24,
  },

  bottomOffsetS: {
    marginBottom: 16,
  },
  sectionIcon: {
    fontSize: 14,
    marginRight: 10,
  },
  sectionText: {
    display: 'inline-block',
  },
  caption: {
    fontWeight: 500,
  },
  pointer: {
    cursor: 'pointer',
  },
}));

const GDP = ({ match, firebase }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const guru = useSelector((state) => state.gdp.guru);
  const isMobile = useIsMobile('sm');

  useEffect(() => {
    (async () => {
      dispatch(setGuruLoading(true));
      const { id } = match.params;
      const guruDoc = await firebase.user(id).get();
      dispatch(setGuru(guruDoc.data()));
      dispatch(setGuruLoading(false));
    })();
  }, [dispatch, firebase, match.params]);

  const {
    languages,
    images,
    certificate,
    sport,
    displayName,
    photoURL,
    priceFrom,
    duration,
    introduction,
    methods,
    location,
    _geoloc,
  } = guru;
  const formattedLanguages = languages.join(', ');

  const renderIntroduction = () => {
    if (introduction === null) {
      return (
        <>
          <Divider className={classes.bottomOffsetXl} />
          <Skeleton
            variant="rect"
            height={100}
            className={classes.bottomOffsetXl}
          />
        </>
      );
    }

    if (introduction !== '') {
      return (
        <>
          <Divider className={classes.bottomOffsetXl} />
          <Typography variant="body2" className={classes.bottomOffsetXl}>
            {introduction}
          </Typography>
        </>
      );
    }

    return null;
  };

  return (
    <div className={classes.wrapper}>
      <StickyContainer>
        <Grid container className={classes.content} spacing={isMobile ? 0 : 3}>
          <Grid item xs={12} md={8}>
            <ImageViewer images={images} certificate={certificate} />
            <Typography component="div" className={classes.details}>
              <SportBadge sport={sport} />

              <Grid container justify="space-between" alignItems="center">
                <Grid item>
                  {!displayName ? (
                    <Skeleton variant="rect" width={320} height={40} />
                  ) : (
                    <Typography component="h1" variant="h4">
                      {displayName}
                    </Typography>
                  )}
                  {location ? (
                    <Link
                      className={classes.pointer}
                      variant="body2"
                      color="inherit"
                      component={ScrollLink}
                      to="map"
                      spy
                      smooth
                      duration={500}
                    >
                      {location}
                    </Link>
                  ) : (
                    <Skeleton variant="rect" width={180} height={20} />
                  )}
                </Grid>
                <Grid item>
                  <Avatar
                    alt={displayName}
                    src={photoURL}
                    className={classes.avatar}
                  />
                </Grid>
              </Grid>

              <Typography component="div" className={classes.secondaryInfo}>
                <Typography component="div" className={classes.bottomOffsetS}>
                  <CreditCardIcon className={classes.sectionIcon} />
                  {priceFrom ? (
                    <Typography
                      variant="body2"
                      className={classes.sectionText}
                    >
                      {`From $${priceFrom}`}
                    </Typography>
                  ) : (
                    <Skeleton
                      variant="rect"
                      width={100}
                      height={17}
                      className={classes.sectionText}
                    />
                  )}
                </Typography>

                <Typography component="div" className={classes.bottomOffsetS}>
                  <HourglassEmptyIcon className={classes.sectionIcon} />
                  {duration ? (
                    <Typography
                      variant="body2"
                      className={classes.sectionText}
                    >
                      {`${duration} days`}
                    </Typography>
                  ) : (
                    <Skeleton
                      variant="rect"
                      width={100}
                      height={17}
                      className={classes.sectionText}
                    />
                  )}
                </Typography>

                <Typography component="div" className={classes.bottomOffsetS}>
                  <LanguageIcon className={classes.sectionIcon} />
                  {languages && languages.length ? (
                    <Typography
                      variant="body2"
                      className={classes.sectionText}
                    >
                      {formattedLanguages}
                    </Typography>
                  ) : (
                    <Skeleton
                      variant="rect"
                      width={200}
                      height={17}
                      className={classes.sectionText}
                    />
                  )}
                </Typography>
              </Typography>

              {renderIntroduction()}

              <Divider className={classes.bottomOffsetXl} />

              <div className={classes.bottomOffsetXl} id="prices">
                <Typography
                  component="h6"
                  variant="h6"
                  paragraph
                >
                  Prices
                </Typography>

                {methods && methods.length ? (
                  <PriceTable methods={methods} />
                ) : (
                  <Skeleton variant="rect" height={120} />
                )}

                {duration ? (
                  <Typography variant="caption" className={classes.caption}>
                    {`NOTE: All listed prices are for ${duration} days`}
                  </Typography>
                ) : (
                  <Skeleton variant="rect" height={14} width={230} />
                )}
              </div>

              <Divider className={classes.bottomOffsetXl} />

              <div id="map">
                <Typography
                  component="h6"
                  variant="h6"
                  paragraph
                >
                  Location
                </Typography>
                {_geoloc ? (
                  <Map
                    location={_geoloc}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: '100%' }} />}
                    containerElement={<div style={{ height: '400px' }} />}
                    mapElement={<div style={{ height: '100%' }} />}
                  />
                ) : (
                  <Skeleton variant="rect" height={400} />
                )}
              </div>
            </Typography>
          </Grid>

          {!isMobile && (
            <Grid item md={4} className={classes.quickInfoContainer}>
              <QuickInfoContainer
                photoURL={photoURL}
                location={location}
                displayName={displayName}
                priceFrom={priceFrom}
              />
            </Grid>
          )}
        </Grid>
      </StickyContainer>
    </div>
  );
};

GDP.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  firebase: PropTypes.shape({
    user: PropTypes.func.isRequired,
  }).isRequired,
};

export default withFirebase(GDP);
