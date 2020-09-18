import React from 'react';
import PropTypes from 'prop-types';
import cloudinary from 'cloudinary-core';
import { Typography, Grid } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { format } from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ForwardIcon from '@material-ui/icons/Forward';

const useStyles = makeStyles({
  summary: {
    textTransform: 'uppercase',
    lineHeight: '20px',
    fontWeight: 700,
    letterSpacing: 1.5,
  },
  iconHolder: {
    height: 20,
    marginRight: 5,
  },
  recommend: {
    marginBottom: 16,
  },
  arrow: {
    alignSelf: 'center',
  },
  imagesContainer: {
    marginBottom: 16,
  },
});

const ReviewContent = ({
  rating,
  date,
  summary,
  review,
  recommend,
  guruInfo: { id: guruID },
  userInfo: { id: userID },
  imageBefore,
  imageAfter,
  showAdditionalInfo,
}) => {
  const classes = useStyles();
  const cloudinaryCore = new cloudinary.Cloudinary({
    cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
  });

  return (
    <div>
      <Grid
        container
        justify="space-between"
        direction={showAdditionalInfo ? 'column' : 'row'}
      >
        <Grid item>
          <Rating value={rating} readOnly size="small" />
        </Grid>
        <Grid item>
          <Typography variant="caption" component="p" paragraph>
            {format(new Date(date), 'LLLL d, yyyy')}
          </Typography>
        </Grid>
      </Grid>
      <Typography
        component="h6"
        variant="h6"
        className={classes.summary}
        paragraph
      >
        {summary}
      </Typography>
      <Typography paragraph>
        {review}
      </Typography>
      {recommend && (
      <Grid container alignItems="center" className={classes.recommend}>
        <Grid item className={classes.iconHolder}>
          <CheckCircleIcon fontSize="small" color="primary" />
        </Grid>
        <Grid item>
          <Typography variant="caption">I recommend this guru</Typography>
        </Grid>
      </Grid>
      )}
      {imageBefore && imageAfter && (
      <Grid container justify="space-between" className={classes.imagesContainer}>
        <Grid item>
          <Typography variant="button" component="p">BEFORE</Typography>
          <a
            href={cloudinaryCore.url(
              imageBefore,
              { width: 600, crop: 'fill' },
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={cloudinaryCore.url(
                imageBefore,
                { width: 100, height: 100, crop: 'fill' },
              )}
              alt="before"
            />
          </a>
        </Grid>
        <Grid item className={classes.arrow}>
          <ForwardIcon />
        </Grid>
        <Grid item>
          <Typography variant="button" component="p">AFTER</Typography>
          <a
            href={cloudinaryCore.url(
              imageAfter,
              { width: 600, crop: 'fill' },
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={cloudinaryCore.url(
                imageAfter,
                { width: 100, height: 100, crop: 'fill' },
              )}
              alt="after"
            />
          </a>
        </Grid>
      </Grid>
      )}
      {showAdditionalInfo && (
        <>
          <Typography variant="button">Guru ID:</Typography>
          <Typography paragraph variant="subtitle2">{guruID}</Typography>
          <Typography variant="button">User ID:</Typography>
          <Typography paragraph variant="subtitle2">{userID}</Typography>
        </>
      )}
    </div>
  );
};

ReviewContent.defaultProps = {
  imageBefore: null,
  imageAfter: null,
  showAdditionalInfo: false,
};

ReviewContent.propTypes = {
  rating: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  review: PropTypes.string.isRequired,
  recommend: PropTypes.bool.isRequired,
  guruInfo: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  userInfo: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  imageBefore: PropTypes.string,
  imageAfter: PropTypes.string,
  showAdditionalInfo: PropTypes.bool,
};

export default ReviewContent;
