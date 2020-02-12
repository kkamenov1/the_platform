import React from 'react';
import PropTypes from 'prop-types';
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

const useStyles = makeStyles({
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

  dot: {
    padding: '0 3px',
    fontWeight: 800,
  },

  introduction: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 3,
  },
});

const sliderSettings = {
  arrows: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  lazyLoad: true,
};

const Hits = ({ hits }) => {
  const classes = useStyles();

  return (
    <div>
      <Divider />
      {hits.map((hit) => {
        const attributes = [hit.sport, hit.languages.join(', ')];

        return (
          <>
            <Card className={classes.card} key={hit.objectID}>
              <Grid container>
                <Grid item xs={5}>
                  <Slider {...sliderSettings}>
                    {hit.images && hit.images.length ? hit.images.map((img, i) => (
                      <CardMedia
                        key={i}
                        className={classes.media}
                        image={img}
                        title={hit.displayName}
                      />
                    )) : (
                      <CardMedia
                        className={classes.media}
                        image="https://res.cloudinary.com/dl766ebzy/image/upload/v1578058214/no_image_camera_big_lspgbi.jpg"
                        title="No Image"
                      />
                    )}
                  </Slider>
                </Grid>

                <Grid item xs={7}>
                  <CardHeader
                    avatar={(
                      <Avatar src={hit.photoURL} className={classes.avatar} />
                    )}
                    title={hit.displayName}
                  />

                  <CardContent>
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
            <Divider />
          </>
        );
      })}
    </div>
  );
};

Hits.propTypes = {
  hits: PropTypes.array.isRequired,
};

export default connectHits(Hits);
