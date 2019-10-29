import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  Typography,
  Button,
  CircularProgress,
} from '@material-ui/core';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

const useStyles = makeStyles({
  uploadPhotoIconWrapper: {
    height: 46,
    width: 46,
    border: '1px solid #dee2e5',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  userSubmittedImage: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    marginBottom: 0,
    objectFit: 'cover',
    display: 'block',
  },
  uploadPhotoText: {
    fontSize: 14,
    textTransform: 'none',
    color: 'rgb(108, 126, 137)',
    fontWeight: 500,
  },
  uploadPhotoBtn: {
    padding: 0,
    '&:hover': {
      backgroundColor: 'white',
    },
  },
  noDisplay: {
    display: 'none !important',
  },
  photoUploadProgess: {
    width: '45px !important',
    height: '45px !important',
    position: 'absolute',
    top: 0,
    left: 0,
    color: 'rgb(255, 90, 95)',
    display: 'block',
  },
});

const UploadAPhoto = ({
  handlePhotoChange,
  isUserSubmittedPhoto,
  uploadingPhoto,
}) => {
  const classes = useStyles();
  const imageRef = useRef(null);
  const auth = useSelector((state) => state.app.auth);


  return (
    <>
      <input
        accept=".jpg, .png"
        style={{ display: 'none' }}
        id="photo"
        type="file"
        onChange={handlePhotoChange}
      />
      <label htmlFor="photo">
        <Button
          component="span"
          className={classes.uploadPhotoBtn}
          disableRipple
        >
          <div className={classes.uploadPhotoIconWrapper}>
            {!auth.photoURL && !isUserSubmittedPhoto && <AddAPhotoIcon />}
            <img
              alt="add"
              src={auth.photoURL}
              className={classnames(classes.userSubmittedImage, {
                [classes.noDisplay]: !isUserSubmittedPhoto && !auth.photoURL,
              })}
              ref={imageRef}
            />
            <CircularProgress
              className={classnames(classes.photoUploadProgess, {
                [classes.noDisplay]: !uploadingPhoto,
              })}
            />
          </div>
          <Typography
            component="span"
            className={classes.uploadPhotoText}
          >
            {isUserSubmittedPhoto || auth.photoURL ? 'Change the photo' : 'Upload a photo'}
          </Typography>
        </Button>
      </label>
    </>
  );
};

export default UploadAPhoto;
