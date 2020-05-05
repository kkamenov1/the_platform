import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Grid,
  Typography,
  Avatar,
  Divider,
  Slide,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import { StickyContainer } from 'react-sticky';
import { withFirebase } from '../../core/lib/Firebase';
import { setGuru } from './actions';
import PriceTable from './section-components/price-table';
import Map from './section-components/map';
import { useIsMobile } from '../../core/hooks';
import {
  Badge,
  ScrollingButton,
  ScrollingLink,
} from '../../core/components';
import {
  MainInfoContainer,
  ImageViewer,
  QuickInfoContainer,
  Section,
} from './components';


const useStyles = makeStyles((theme) => ({
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
  caption: {
    fontWeight: 500,
  },
  firstBadge: {
    display: 'inline-block',
    marginRight: 10,
  },
  mobileSubscribe: {
    backgroundColor: theme.palette.common.white,
    padding: 20,
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomOffsetXl: {
    marginBottom: 24,
  },
  imageViewer: {
    position: 'relative',
  },
  certifiedBadge: {
    position: 'absolute',
    top: 16,
    left: 0,
    backgroundColor: theme.palette.common.white,
    padding: '2px 24px',
    fontSize: 11,
    fontWeight: 500,
  },
}));

const GDP = ({ match, firebase }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const guru = useSelector((state) => state.gdp.guru);
  const isMobile = useIsMobile('sm');
  const [stickyMobileSubscribeBtn, setStickyMobileSubscribeBtn] = useState(false);
  const [expandedInfoContainer, setExpandedInfoContainer] = useState(false);

  const handleScroll = () => {
    const pricesElement = document.getElementById('prices');
    const secondaryInfoElement = document.getElementById('secondary-info');
    if (window.scrollY > pricesElement.offsetTop + pricesElement.offsetHeight) {
      setStickyMobileSubscribeBtn(true);
    } else {
      setStickyMobileSubscribeBtn(false);
    }

    if (window.scrollY > secondaryInfoElement.offsetTop + secondaryInfoElement.offsetHeight) {
      setExpandedInfoContainer(true);
    } else {
      setExpandedInfoContainer(false);
    }
  };

  useEffect(() => {
    (async () => {
      const { id } = match.params;
      const guruDoc = await firebase.user(id).get();
      dispatch(setGuru(guruDoc.data()));
    })();
  }, [dispatch, firebase, match.params]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const {
    languages,
    image,
    sport,
    displayName,
    photoURL,
    priceFrom,
    duration,
    introduction,
    methods,
    location,
    _geoloc,
    available,
    occupation,
    subscribers,
    certificate,
    socialMedia,
  } = guru;
  const formattedLanguages = languages.join(', ');
  const getStatus = () => {
    if (available === undefined) {
      return '';
    }
    if (available === true) {
      return 'AVAILABLE';
    }

    return 'UNAVAILABLE';
  };

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
        <Grid container spacing={isMobile ? 0 : 3}>
          <Grid item xs={12} md={8}>
            <Typography component="div" className={classes.imageViewer}>
              <ImageViewer image={image} />
              {certificate && (
              <Typography
                component="div"
                variant="caption"
                className={classes.certifiedBadge}
              >
                CERTIFIED
              </Typography>
              )}
            </Typography>
            <Typography component="div" className={classes.details}>
              <div className={classes.firstBadge}>
                <Badge label={sport} />
              </div>
              <Badge label={getStatus()} color={available ? 'green' : 'red'} />
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
                    <ScrollingLink
                      containerId="map"
                      offset={-80}
                      label={location}
                      variant="body2"
                      color="inherit"
                    />
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
              <MainInfoContainer
                priceFrom={priceFrom}
                duration={duration}
                languages={formattedLanguages}
                subscribers={subscribers}
                occupation={occupation}
                socialMedia={socialMedia}
              />
              <Section containerId="introduction" divider>
                {renderIntroduction()}
              </Section>
              <Section containerId="prices" label="Prices" divider>
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
              </Section>
              {certificate !== null && (
                <Section
                  containerId="certificate"
                  label="Certificate"
                  divider
                >
                  {certificate === '' ? (
                    <Skeleton variant="rect" height={450} />
                  ) : (
                    <ImageViewer image={certificate} />
                  )}
                </Section>
              )}
              <Section containerId="map" label="Location">
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
              </Section>
            </Typography>
          </Grid>

          {!isMobile ? (
            <Grid item md={4} className={classes.quickInfoContainer}>
              <QuickInfoContainer
                photoURL={photoURL}
                location={location}
                displayName={displayName}
                priceFrom={priceFrom}
                status={getStatus()}
                occupation={occupation}
                subscribers={subscribers}
                expanded={expandedInfoContainer}
                sport={sport}
                duration={duration}
                languages={formattedLanguages}
              />
            </Grid>
          ) : (
            <Slide direction="up" in={stickyMobileSubscribeBtn} mountOnEnter unmountOnExit>
              <div className={classes.mobileSubscribe}>
                <ScrollingButton
                  containerId="prices"
                  offset={-80}
                  label="SUBSCRIBE"
                  variant="contained"
                  color="primary"
                  fullWidth
                />
              </div>
            </Slide>
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
