import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
  Avatar,
  IconButton,
  Typography,
  Tooltip,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import cloudinary from 'cloudinary-core';
import {
  ADMIN_PANEL_SLIDER_CONFIG,
  FALLBACK_IMAGE,
} from '../../../../core/config';


const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '75%', // 16:9 => 56.25%
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  userid: {
    width: '80%',
  },
  cardActions: {
    background: theme.palette.grey[50],
  },
}));

const SearchHit = ({
  hit,
  handleRejectApplication,
  handleApproveApplication,
  toggleModal,
  showDetails,
}) => {
  const cloudinaryCore = new cloudinary.Cloudinary({
    cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
  });
  const classes = useStyles();
  const sliderRef = useRef(null);
  const Content = (
    <>
      <CardHeader
        avatar={(
          <Avatar src={hit.photoURL} className={classes.avatar} />
        )}
        title={hit.displayName}
        subheader={(
          <Tooltip title={hit.userID}>
            <Typography
              variant="body2"
              color="textSecondary"
              component="div"
              noWrap
              className={classes.userid}
            >
              {hit.userID}
            </Typography>
          </Tooltip>
        )}
      />
      <Slider ref={sliderRef} {...ADMIN_PANEL_SLIDER_CONFIG}>
        {showDetails && hit.images && hit.images.length ? hit.images.map((img, i) => {
          const imgSrc = cloudinaryCore.url(
            img,
            { width: 600, crop: 'fill' },
          );
          return (
            <CardMedia
              key={i}
              className={classes.media}
              image={imgSrc}
              title={hit.displayName}
            />
          );
        }) : !showDetails && hit.images && hit.images[0] ? (
          <CardMedia
            className={classes.media}
            image={cloudinaryCore.url(
              hit.images[0],
              { width: 600, crop: 'fill' },
            )}
            title={hit.displayName}
          />
        ) : (
          <CardMedia
            className={classes.media}
            image={FALLBACK_IMAGE.src}
            title={FALLBACK_IMAGE.alt}
          />
        )}
      </Slider>
      <CardContent>
        <Typography component="div" paragraph>
          <Typography variant="button">
            ID
          </Typography>
          <Tooltip title={hit.applicationUID}>
            <Typography variant="body2" color="textSecondary" noWrap component="div">
              {hit.applicationUID}
            </Typography>
          </Tooltip>
        </Typography>
        <Typography component="div" paragraph>
          <Typography variant="button">
            Location
          </Typography>
          <Tooltip title={hit.location}>
            <Typography variant="body2" color="textSecondary" noWrap component="div">
              {hit.location}
            </Typography>
          </Tooltip>
        </Typography>

        {showDetails && (
          <>
            <Typography component="div" paragraph>
              <Typography variant="button">
                Languages
              </Typography>
              <Typography variant="body2" color="textSecondary" noWrap component="div">
                {hit.languages.join(', ')}
              </Typography>
            </Typography>

            <Typography component="div" paragraph>
              <Typography variant="button">
                Birthday
              </Typography>
              <Typography variant="body2" color="textSecondary" component="div">
                {new Date(hit.birthday).toLocaleDateString()}
              </Typography>
            </Typography>

            <Typography component="div" paragraph>
              <Typography variant="button">
                Sport
              </Typography>
              <Typography variant="body2" color="textSecondary" component="div">
                {hit.sport}
              </Typography>
            </Typography>

            <Typography component="div" paragraph>
              <Typography variant="button">
                Introduction
              </Typography>
              <Tooltip title={hit.introduction ? hit.introduction : 'No introduction'}>
                <Typography variant="body2" color="textSecondary" component="div" noWrap>
                  {hit.introduction ? hit.introduction : 'No introduction'}
                </Typography>
              </Tooltip>
            </Typography>

            <Typography component="div" paragraph>
              <Typography variant="button">
                Certificate
              </Typography>
              {hit.certificate ? (
                <a
                  href={cloudinaryCore.url(hit.certificate)}
                  title="Certificate"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Typography variant="body2" color="textSecondary" component="div" noWrap>
                    CLICK TO VIEW
                  </Typography>
                </a>
              ) : (
                <Typography variant="body2" color="textSecondary" component="div" noWrap>
                  No Certificate
                </Typography>
              )}
            </Typography>

            <Typography component="div" paragraph>
              <Typography variant="button">
                Methods
              </Typography>

              {hit.methods.map((method, i) => (
                <Typography
                  key={i}
                  variant="body2"
                  color="textSecondary"
                  component="div"
                >
                  {`${method.name} - $${method.price}`}
                </Typography>
              ))}
            </Typography>

            <Typography component="div" paragraph>
              <Typography variant="button">
                Duration
              </Typography>
              <Typography variant="body2" color="textSecondary" component="div">
                {`${hit.duration} days`}
              </Typography>
            </Typography>

            <Typography component="div" paragraph>
              <Typography variant="button">
                Subscribers
              </Typography>
              <Typography variant="body2" color="textSecondary" component="div">
                {hit.subscribers}
              </Typography>
            </Typography>
          </>
        )}
      </CardContent>
    </>
  );

  return (
    <Card>
      {showDetails ? (
        Content
      ) : (
        <CardActionArea onClick={() => toggleModal(true, hit)} disableRipple>
          {Content}
        </CardActionArea>
      )}

      <CardActions disableSpacing className={classes.cardActions}>
        <Tooltip title="Approve">
          <IconButton onClick={() => handleApproveApplication(hit)}>
            <CheckIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Reject">
          <IconButton onClick={() => handleRejectApplication(hit)}>
            <ClearIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

SearchHit.defaultProps = {
  toggleModal: () => {},
  showDetails: false,
};

SearchHit.propTypes = {
  hit: PropTypes.shape({
    applicationUID: PropTypes.string.isRequired,
    methods: PropTypes.arrayOf(PropTypes.shape({
      price: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
    languages: PropTypes.arrayOf(PropTypes.string).isRequired,
    birthday: PropTypes.string.isRequired,
    sport: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    subscribers: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    introduction: PropTypes.string,
    displayName: PropTypes.string.isRequired,
    userID: PropTypes.string.isRequired,
    certificate: PropTypes.string,
    photoURL: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    slideIndex: PropTypes.number,
  }).isRequired,
  handleRejectApplication: PropTypes.func.isRequired,
  handleApproveApplication: PropTypes.func.isRequired,
  toggleModal: PropTypes.func,
  showDetails: PropTypes.bool,
};

export default SearchHit;
