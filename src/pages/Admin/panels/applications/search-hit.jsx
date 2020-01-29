import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  Tooltip,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
}));

const SearchHit = ({ hit, handleRejectApplication }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card>
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
      <CardMedia
        className={classes.media}
        image={(hit.images && hit.images.length && hit.images[0])
          || 'https://res.cloudinary.com/dl766ebzy/image/upload/v1578058214/no_image_camera_big_lspgbi.jpg'}
        title={hit.displayName}
      />
      <CardContent>
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

        <Typography component="div">
          <Typography variant="button">
            Sport
          </Typography>
          <Typography variant="body2" color="textSecondary" component="div">
            {hit.sport}
          </Typography>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip title="Approve">
          <IconButton>
            <CheckIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Reject">
          <IconButton onClick={() => handleRejectApplication(hit.objectID)}>
            <ClearIcon />
          </IconButton>
        </Tooltip>

        <IconButton
          className={classnames(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
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
            <CardMedia
              className={classes.media}
              image={hit.certificate || 'https://res.cloudinary.com/dl766ebzy/image/upload/v1578058214/no_image_camera_big_lspgbi.jpg'}
              title={hit.displayName}
            />
          </Typography>

          <Typography component="div" paragraph>
            <Typography variant="button">
              Methods
            </Typography>

            {hit.methods.map((method) => (
              <Typography variant="body2" color="textSecondary" component="div">
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
        </CardContent>
      </Collapse>
    </Card>
  );
};

SearchHit.propTypes = {
  hit: PropTypes.object.isRequired,
  firebase: PropTypes.shape({
    application: PropTypes.func.isRequired,
  }).isRequired,
};

export default SearchHit;
