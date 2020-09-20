import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { StickyContainer } from 'react-sticky';
import { useHistory, useParams } from 'react-router-dom';

import {
  Grid,
  Typography,
  Avatar,
  Divider,
  Slide,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';

import { withFirebase } from '../../core/lib/Firebase';
import {
  setGuru,
  setGuruReviews,
  loadMoreReviews,
  incrementReviewsPage,
  resetReviewsPage,
  setStarRefinement,
  setReviewsCount,
  setRecommendationPercentage,
} from './actions';
import PriceTable from './section-components/price-table';
import Map from './section-components/map';
import NoReviews from './section-components/no-reviews';
import RatingsAndReviews from './section-components/ratings-and-reviews';
import { useIsMobile } from '../../core/hooks';
import {
  Badge,
  ScrollingButton,
  ScrollingLink,
  RatingWithCount,
} from '../../core/components';
import {
  MainInfoContainer,
  ImageViewer,
  QuickInfoContainer,
  Section,
} from './components';
import api from '../../api';
import {
  GDP_REVIEWS_PAGE_SIZE,
  GDP_INITIAL_REVIEWS,
} from '../../core/config';
import { NOT_FOUND } from '../../constants/routes';

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

const GDP = ({ firebase }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { guruID } = useParams();
  const history = useHistory();
  const guru = useSelector((state) => state.gdp.guru);
  const reviewsPage = useSelector((state) => state.gdp.reviewsPage);
  const reviewsCount = useSelector((state) => state.gdp.reviewsCount);
  const recommendationPercentage = useSelector((state) => state.gdp.recommendationPercentage);
  const starRatingRefinement = useSelector((state) => state.gdp.starRatingRefinement);
  const reviews = useSelector((state) => state.gdp.reviews.slice(
    0,
    (reviewsPage * GDP_REVIEWS_PAGE_SIZE) + GDP_INITIAL_REVIEWS,
  ));
  const isMobile = useIsMobile('sm');
  const [stickyMobileSubscribeBtn, setStickyMobileSubscribeBtn] = useState(false);
  const [expandedInfoContainer, setExpandedInfoContainer] = useState(false);
  const {
    languages,
    image,
    sport,
    displayName,
    photoURL,
    duration,
    introduction,
    methods,
    location,
    _geoloc,
    available,
    certificate,
    rating,
    ratingCount,
    ratingBreakdown,
  } = guru;

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
      if (!guruID) {
        return;
      }

      const guruDoc = await firebase.user(guruID).get();
      if (!guruDoc.exists) {
        history.push(NOT_FOUND);
        return;
      }

      dispatch(setGuru(guruDoc.data()));

      if (guruDoc.data().ratingCount) {
        api.reviews.get({
          query: guruID,
          approved: true,
          offset: 0,
          limit: GDP_REVIEWS_PAGE_SIZE + GDP_INITIAL_REVIEWS,
        }).then((response) => {
          dispatch(setGuruReviews(response.data.hits));
          dispatch(setReviewsCount(response.data.nbHits));
        });

        api.reviews.getRecommendationPercentage(guruID)
          .then((response) => {
            dispatch(setRecommendationPercentage(response.data.recommendationPercentage));
          })
          .catch((err) => {
            console.log(err);
            dispatch(setRecommendationPercentage(null));
          });
      }
    })();
  }, [dispatch, firebase, guruID, history]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
          <RatingWithCount
            rating={Math.round(rating)}
            ratingCount={ratingCount}
          />
        </ScrollingLink>
      );
    }
    if (ratingCount === 0) {
      return (
        <div>
          <ScrollingLink containerId="reviews" offset={-80} variant="body2">
            Write review
          </ScrollingLink>
        </div>
      );
    }
    return <Skeleton variant="rect" width={180} height={20} />;
  };

  const loadMore = () => {
    dispatch(incrementReviewsPage());
    const offset = ((reviewsPage + 1) * GDP_REVIEWS_PAGE_SIZE) + GDP_INITIAL_REVIEWS;

    if (offset < reviewsCount) {
      api.reviews.get({
        query: guruID,
        approved: true,
        offset,
        limit: GDP_REVIEWS_PAGE_SIZE,
        rating: starRatingRefinement,
      }).then((response) => {
        dispatch(loadMoreReviews(response.data.hits));
      });
    }
  };

  const handleStarRefinementClick = (selectedRating) => {
    dispatch(resetReviewsPage());
    api.reviews.get({
      query: guruID,
      approved: true,
      offset: 0,
      limit: GDP_REVIEWS_PAGE_SIZE + GDP_INITIAL_REVIEWS,
      rating: selectedRating,
    }).then((response) => {
      dispatch(setStarRefinement(selectedRating));
      dispatch(setGuruReviews(response.data.hits));
      dispatch(setReviewsCount(response.data.nbHits));
    });
  };

  const resetStarRefinement = () => {
    api.reviews.get({
      query: guruID,
      approved: true,
      offset: 0,
      limit: GDP_REVIEWS_PAGE_SIZE + GDP_INITIAL_REVIEWS,
    }).then((response) => {
      dispatch(resetReviewsPage());
      dispatch(setStarRefinement(null));
      dispatch(setGuruReviews(response.data.hits));
      dispatch(setReviewsCount(response.data.nbHits));
    });
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
                  {renderRatings()}
                  {location ? (
                    <ScrollingLink
                      containerId="map"
                      offset={-80}
                      variant="body2"
                      color="inherit"
                    >
                      {location}
                    </ScrollingLink>
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
                {...guru}
                languages={formattedLanguages}
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
              <Section containerId="map" label="Location" divider>
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
              {ratingCount ? (
                <Section containerId="reviews" label="Ratings &amp; Reviews">
                  <RatingsAndReviews
                    reviews={reviews}
                    loadMore={loadMore}
                    reviewsCount={reviewsCount}
                    handleStarRefinementClick={handleStarRefinementClick}
                    resetStarRefinement={resetStarRefinement}
                    guruID={guruID}
                    rating={rating}
                    ratingCount={ratingCount}
                    ratingBreakdown={ratingBreakdown}
                    starRatingRefinement={starRatingRefinement}
                    recommendationPercentage={recommendationPercentage}
                  />
                </Section>
              ) : (
                <Section containerId="reviews" label="Be the first to review this guru">
                  <NoReviews guruID={guruID} />
                </Section>
              )}
            </Typography>
          </Grid>

          {!isMobile ? (
            <Grid item md={4} className={classes.quickInfoContainer}>
              <QuickInfoContainer
                {...guru}
                status={getStatus()}
                expanded={expandedInfoContainer}
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
  firebase: PropTypes.shape({
    user: PropTypes.func.isRequired,
  }).isRequired,
};

export default withFirebase(GDP);
