import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core';
import Slider from 'react-slick';
import { connectHits } from 'react-instantsearch-dom';
import { generateTileSliderConfig, fallbackImage } from '../../core/config';


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

  noPadding: {
    paddingLeft: 0,
  },

  hover: {
    '&:hover div[class*="arrowWrapper"]': {
      display: 'block',
    },
  },
}));

const getMinimalPrice = (methods) => Math.min(
  ...methods.map((item) => Number(item.price)),
);

const Hits = ({ hits, showMap }) => {
  const classes = useStyles();
  const sliderRef = React.useRef(null);

  return (
    <Grid container spacing={!showMap ? 4 : 0}>
      {showMap && <Divider />}
      {hits.map((hit) => {
        const minPriceAttribute = `From $${getMinimalPrice(hit.methods)}`;
        const durationAttribute = `For ${hit.duration} days`;
        const attributes = [
          hit.languages.join(', '),
          minPriceAttribute,
          durationAttribute,
        ];
        const sliderSettings = generateTileSliderConfig(hit, sliderRef);
        const images = hit.images || [fallbackImage.src];
        const allImages = hit.certificate
          ? [...images, hit.certificate]
          : images;

        return (
          <Grid item xs={showMap ? 12 : 3}>
            <Card
              className={classes.card}
              key={hit.objectID}
            >
              <Grid container>
                <Grid item xs={showMap ? 5 : 12} className={classes.hover}>
                  <Slider ref={sliderRef} {...sliderSettings}>
                    {allImages.map((img, i) => (
                      <CardMedia
                        key={i}
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
                  className={
                    classnames(classes.content, { [classes.noPadding]: !showMap })
                  }
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
                        <>
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
                        </>
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
            {showMap && <Divider />}
          </Grid>
        );
      })}
    </Grid>
  );
};

Hits.defaultProps = {
  showMap: true,
};

Hits.propTypes = {
  hits: PropTypes.array.isRequired,
  showMap: PropTypes.bool,
};

export default connectHits(Hits);
