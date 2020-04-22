import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { Image, Transformation } from 'cloudinary-react';
import {
  Fab,
  Button,
  List,
  ListItem,
  CircularProgress,
  Grid,
} from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme) => ({
  photoListItem: {
    paddingLeft: 0,
  },
  imageWrapper: {
    backgroundColor: theme.palette.grey['200'],
    border: `1px dashed ${theme.palette.primary.main}`,
  },
  addPhotoBtn: {
    width: 65,
    height: 65,
    border: `1px solid ${theme.palette.common.white}`,

    [theme.breakpoints.up('sm')]: {
      width: 85,
      height: 85,
    },

    [theme.breakpoints.up('md')]: {
      width: 100,
      height: 100,
    },
  },
  fullWidth: {
    width: '100% !important',
  },
  addPhotoIcon: {
    width: 20,
    height: 20,
    fill: theme.palette.primary.main,

    [theme.breakpoints.up('md')]: {
      width: 25,
      height: 25,
    },
  },
  imageWrapperInner: {
    position: 'relative',

    '&:hover > button': {
      display: 'block',
    },
  },
  deleteImageBtn: {
    backgroundColor: theme.palette.primary.main,
    position: 'absolute',
    top: -10,
    right: -10,
    width: 25,
    height: 25,
    minHeight: 0,
    display: 'none',

    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  deleteIcon: {
    width: 'inherit',
    height: 'inherit',
  },
  image: {
    width: 65,
    height: 65,
    objectFit: 'cover',
    display: 'block',
    margin: 'auto',

    [theme.breakpoints.up('sm')]: {
      width: 85,
      height: 85,
    },

    [theme.breakpoints.up('md')]: {
      width: 100,
      height: 100,
    },
  },
  progressWrapper: {
    width: 65,
    height: 65,

    [theme.breakpoints.up('sm')]: {
      width: 85,
      height: 85,
    },

    [theme.breakpoints.up('md')]: {
      width: 100,
      height: 100,
    },
  },
  progress: {
    width: '20px !important',
    height: '20px !important',
  },
  photoList: {
    display: 'inline-flex',
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

const ImageUploader = ({
  images,
  widget,
  fullWidth,
  onImageRemove,
}) => {
  const classes = useStyles();

  const showWidget = () => {
    widget.open();
  };

  return (
    <List className={classes.photoList}>
      {images.map((image, index) => (
        <ListItem className={classes.photoListItem} key={index}>
          <div className={classnames(classes.imageWrapper, {
            [classes.fullWidth]: fullWidth,
          })}
          >
            {image.publicId ? (
              <div className={classes.imageWrapperInner}>
                <Fab
                  color="primary"
                  aria-label="add"
                  className={classes.deleteImageBtn}
                  onClick={() => onImageRemove(image.publicId)}
                >
                  <ClearIcon className={classes.deleteIcon} />
                </Fab>
                <Image publicId={image.publicId} className={classes.image}>
                  <Transformation width="150" height="150" gravity="auto" crop="thumb" />
                </Image>
              </div>
            ) : image.loading ? (
              <Grid
                container
                alignItems="center"
                justify="center"
                className={classnames(classes.progressWrapper, {
                  [classes.fullWidth]: fullWidth,
                })}
              >
                <CircularProgress className={classes.progress} color="primary" />
              </Grid>
            ) : (
              <Button
                className={classnames(classes.addPhotoBtn, {
                  [classes.fullWidth]: fullWidth,
                })}
                component="span"
                disableRipple
                onClick={showWidget}
              >
                <PhotoCamera className={classes.addPhotoIcon} />
              </Button>
            )}
          </div>
        </ListItem>
      ))}
    </List>
  );
};

ImageUploader.defaultProps = {
  fullWidth: false,
};

ImageUploader.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
  fullWidth: PropTypes.bool,
  widget: PropTypes.object.isRequired,
  onImageRemove: PropTypes.func.isRequired,
};

export default ImageUploader;
