import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  Grid,
  CardMedia,
  Typography,
  CardHeader,
  CardContent,
  Avatar,
} from '@material-ui/core';
import Slider from 'react-slick';
import cloudinary from 'cloudinary-core';
import { plpSliderConfig, FALLBACK_IMAGE } from '../../core/config';
import { useIsMobile } from '../../core/hooks';
import { Badge } from '../../core/components';

const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: 0,
    boxShadow: 'none',
    margin: '24px 0',
  },

  link: {
    textDecoration: 'none',
    display: 'block',
  },

  media: {
    height: 0,
    paddingTop: '65%',
  },

  attribute: {
    textTransform: 'capitalize',
  },

  dot: {
    padding: '0 3px',
    fontWeight: 800,
  },

  introduction: {
    height: 60,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 3,
  },

  cardHeader: {
    padding: '5px 0',
    color: theme.palette.text.primary,
  },

  cardContent: {
    padding: '16px 0',

    '&:last-child': {
      paddingBottom: 16,
    },
  },

  content: {
    paddingLeft: 10,
  },

  mapCard: {
    margin: 0,
    borderRadius: 15,
  },

  firstBadge: {
    marginRight: 10,
    display: 'inline-block',
  },
}));

const Hit = ({
  hit,
  onHitOver,
  showMap,
  isOnMap,
  selectedHit,
}) => {
  const classes = useStyles();
  const sliderRef = React.useRef(null);
  const isMobile = useIsMobile('md');
  const minPriceAttribute = `From $${hit.priceFrom}`;
  const durationAttribute = `For ${hit.duration} days`;
  const attributesForRegularContent = [
    minPriceAttribute,
    durationAttribute,
    hit.languages.join(', '),
  ];
  const cloudinaryCore = new cloudinary.Cloudinary({
    cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
  });
  const attributesForMapContent = [minPriceAttribute, durationAttribute];
  const attributes = isOnMap ? attributesForMapContent : attributesForRegularContent;
  const images = hit.images || [FALLBACK_IMAGE.src];
  const allImages = hit.certificate
    ? [...images, hit.certificate]
    : images;
  const statusText = `${hit.available ? 'AVAILABLE' : 'UNAVAILABLE'}`;

  return (
    <Card
      className={classnames(classes.card, { [classes.mapCard]: isOnMap })}
      key={hit.objectID}
      onMouseEnter={() => onHitOver(hit)}
      onMouseLeave={() => onHitOver(null)}
    >
      <Link to={`/gurus/${hit.objectID}`} className={classes.link}>
        <Grid container>
          <Grid item xs={!showMap || isMobile ? 12 : 5}>
            <Slider
              ref={sliderRef}
              {...plpSliderConfig(
                selectedHit && selectedHit.objectID === hit.objectID,
              )}
            >
              {allImages.map((img) => {
                const imgSrc = cloudinaryCore.url(
                  img,
                  { width: 600, crop: 'fill' },
                );
                return (
                  <CardMedia
                    key={imgSrc}
                    className={classes.media}
                    image={imgSrc}
                    title={hit.displayName}
                  />
                );
              })}
            </Slider>
          </Grid>

          <Grid
            item
            xs={!showMap || isMobile ? 12 : 7}
            className={classes.content}
          >
            <div className={classes.firstBadge}>
              <Badge label={hit.sport} />
            </div>
            <Badge label={statusText} color={hit.available ? 'green' : 'red'} />
            <CardHeader
              avatar={(
                <Avatar src={hit.photoURL} className={classes.avatar} />
                    )}
              title={hit.displayName}
              className={classes.cardHeader}
            />

            <CardContent className={classes.cardContent}>
              <Typography component="div" paragraph>
                {attributes.map((attribute, i) => (
                  <Typography component="span" key={`${attribute}${i}`}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="span"
                      className={classes.attribute}
                    >
                      {attribute}
                    </Typography>
                    {i + 1 !== attributes.length && (
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="span"
                      className={classes.dot}
                    >
                      ·
                    </Typography>
                    )}
                  </Typography>
                ))}
              </Typography>

              {/* {hit.introduction && (
              <Typography
                variant="body2"
                color="textSecondary"
                component="div"
                className={classes.introduction}
              >
                {hit.introduction}
              </Typography>
              )} */}
            </CardContent>
          </Grid>
        </Grid>
      </Link>
    </Card>
  );
};

Hit.defaultProps = {
  isOnMap: false,
  selectedHit: null,
};

Hit.propTypes = {
  hit: PropTypes.shape({
    objectID: PropTypes.string,
    methods: PropTypes.array,
    displayName: PropTypes.string,
    duration: PropTypes.string,
    available: PropTypes.bool,
    occupation: PropTypes.number,
    subscribers: PropTypes.string,
    introduction: PropTypes.string,
    languages: PropTypes.arrayOf(PropTypes.string),
    location: PropTypes.string,
    sport: PropTypes.string,
    photoURL: PropTypes.string,
    certificate: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    priceFrom: PropTypes.number,
  }).isRequired,
  onHitOver: PropTypes.func.isRequired,
  showMap: PropTypes.bool.isRequired,
  isOnMap: PropTypes.bool,
  selectedHit: PropTypes.object,
};

export default Hit;
