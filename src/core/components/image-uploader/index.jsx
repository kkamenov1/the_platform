import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import {
  Fab,
  Grid,
  Button,
  CircularProgress,
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
  fullWidthProgressWrapper: {
    width: '100%',
  },
  progress: {
    width: '20px !important',
    height: '20px !important',
  },
}));

const ImageUploader = ({
  image,
  onImageRemove,
  onImageChange,
  inputId,
  fullWidth,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.imageWrapper}>
      {image.src ? (
        <div className={classes.imageWrapperInner}>
          <Fab
            color="primary"
            aria-label="add"
            className={classes.deleteImageBtn}
            onClick={onImageRemove}
          >
            <ClearIcon className={classes.deleteIcon} />
          </Fab>
          <img src={image.src} alt={image.name} className={classes.image} />
        </div>
      ) : image.loading ? (
        <div className={classes.photoListItem}>
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
        </div>
      ) : (
        <>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id={inputId}
            type="file"
            onChange={onImageChange}
          />

          <label htmlFor={inputId}>
            <div className={classes.photoListItem}>
              <Button
                className={classnames(classes.addPhotoBtn, {
                  [classes.fullWidth]: fullWidth,
                })}
                component="span"
                disableRipple
              >
                <PhotoCamera className={classes.addPhotoIcon} />
              </Button>
            </div>
          </label>
        </>
      )}
    </div>
  );
};

ImageUploader.defaultProps = {
  fullWidth: false,
};

ImageUploader.propTypes = {
  image: PropTypes.shape({
    src: PropTypes.string,
    loading: PropTypes.bool,
    name: PropTypes.string,
  }).isRequired,
  onImageRemove: PropTypes.func.isRequired,
  onImageChange: PropTypes.func.isRequired,
  inputId: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
};

export default ImageUploader;
