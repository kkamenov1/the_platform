/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { KILOBYTE } from '../../../constants/files';

const useStyles = makeStyles({
  preview: {
    display: 'inline-block',
    marginLeft: 20,
    fontSize: 14,
  },
  uploadBtn: {
    border: '1px solid #dde1e4',
    borderRadius: 3,
    outline: 'none',
    color: '#3b3b3b',
    backgroundColor: '#F0F0F0',
    fontWeight: 500,
    fontSize: 14,
    padding: 13,
    transition: 'border .15s',
    cursor: 'pointer',
    '&:hover': {
      border: '1px solid #bac1c5',
      transition: 'border .15s',
    },
  },
  upload: {
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    color: '#019aff',
    padding: 12,
  },
  text: {
    lineHeight: '45px',
  },
  size: {
    fontWeight: 500,
  },
  imageName: {
    maxWidth: 150,
    display: 'inline-block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 1,
    fontWeight: 500,
    fontSize: 14,
  },
  closeIconWrapper: {
    height: 25,
    cursor: 'pointer',
  },
  closeIcon: {
    '& > svg': {
      fontSize: 16,
      color: '#768792',
    },
  },
});

const ImageUploader = ({
  image,
  onImageChange,
  onImageRemove,
  inputId,
}) => {
  const classes = useStyles();

  return (
    <div>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id={inputId}
        type="file"
        onChange={onImageChange}
      />

      <label htmlFor={inputId}>
        <Typography component="span" className={classes.uploadBtn}>
          Upload an image
        </Typography>
      </label>

      {image.publicId ? (
        <>
          <Typography
            component="div"
            className={classnames(classes.preview, classes.upload)}
          >
            <Grid container spacing={1} alignItems="center">
              <Grid item className={classes.imageName}>
                {image.name}
              </Grid>
              <Grid
                item
                className={classes.closeIconWrapper}
                onClick={() => onImageRemove(image.publicId)}
              >
                <Typography component="span" className={classes.closeIcon}>
                  <ClearIcon />
                </Typography>
              </Grid>
            </Grid>
          </Typography>
          <Typography
            component="div"
            className={classnames(classes.preview, classes.text, classes.size)}
          >
            {`${(image.size / KILOBYTE).toFixed(2)} KB`}
          </Typography>
        </>
      ) : (
        <Typography
          component="div"
          className={classnames(classes.preview, classes.text)}
        >
          No file selected.
        </Typography>
      )}
    </div>
  );
};

ImageUploader.propTypes = {
  image: PropTypes.shape({
    name: PropTypes.string,
    publicId: PropTypes.string,
    size: PropTypes.number,
  }).isRequired,
  onImageChange: PropTypes.func.isRequired,
  onImageRemove: PropTypes.func.isRequired,
  inputId: PropTypes.string.isRequired,
};

export default ImageUploader;
