import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
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
import { getMinimalPrice } from '../../core/utils';
import { generateTileSliderConfig, FALLBACK_IMAGE } from '../../core/config';

const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: 0,
    boxShadow: 'none',
    margin: '24px 0',
  },

  media: {
    height: 0,
    paddingTop: '65%',
  },

  attribute: {
    textTransform: 'capitalize',
  },

  labelWrapper: {
    padding: '3px 0',
  },

  label: {
    textTransform: 'uppercase',
    border: `1px solid ${theme.palette.common.black}`,
    fontWeight: theme.typography.fontWeightMedium,
    borderRadius: 5,
    padding: '2px 5px',
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

  hover: {
    '&:hover div[class*="arrowWrapper"]': {
      display: 'block',
    },
  },

  mapCard: {
    margin: 0,
    borderRadius: 15,
  },
}));

const Hit = ({
  hit,
  onHitOver,
  showMap,
  isOnMap,
}) => {
  const classes = useStyles();
  const sliderRef = React.useRef(null);

  const minPriceAttribute = `From $${getMinimalPrice(hit.methods)}`;
  const durationAttribute = `For ${hit.duration} days`;
  const attributesForRegularContent = [
    hit.languages.join(', '),
    minPriceAttribute,
    durationAttribute,
  ];
  const attributesForMapContent = [minPriceAttribute, durationAttribute];
  const attributes = isOnMap ? attributesForMapContent : attributesForRegularContent;
  const sliderSettings = generateTileSliderConfig(hit, sliderRef);
  const images = hit.images || [FALLBACK_IMAGE.src];
  const allImages = hit.certificate
    ? [...images, hit.certificate]
    : images;

  return (
    <Card
      className={classnames(classes.card, { [classes.mapCard]: isOnMap })}
      key={hit.objectID}
      onMouseEnter={() => onHitOver(hit)}
      onMouseLeave={() => onHitOver(null)}
    >
      <Grid container>
        <Grid item xs={showMap ? 5 : 12} className={classes.hover}>
          <Slider ref={sliderRef} {...sliderSettings}>
            {allImages.map((img) => (
              <CardMedia
                key={img}
                className={classes.media}
                image={img}
                title={hit.displayName}
              />
            ))}
          </Slider>
        </Grid>

        <Grid
          item
          xs={showMap ? 7 : 12}
          className={classes.content}
        >
          <div className={classes.labelWrapper}>
            <Typography
              variant="body2"
              color="textSecondary"
              component="span"
              className={classes.label}
            >
              {hit.sport}
            </Typography>
          </div>
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

            {hit.introduction && (
            <Typography
              variant="body2"
              color="textSecondary"
              component="div"
              className={classes.introduction}
            >
              {hit.introduction}
            </Typography>
            )}
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

Hit.defaultProps = {
  isOnMap: false,
};

Hit.propTypes = {
  hit: PropTypes.shape({
    objectID: PropTypes.string,
    methods: PropTypes.array,
    displayName: PropTypes.string,
    duration: PropTypes.string,
    introduction: PropTypes.string,
    languages: PropTypes.arrayOf(PropTypes.string),
    location: PropTypes.string,
    sport: PropTypes.string,
    photoURL: PropTypes.string,
    certificate: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onHitOver: PropTypes.func.isRequired,
  showMap: PropTypes.bool.isRequired,
  isOnMap: PropTypes.bool,
};

export default Hit;
