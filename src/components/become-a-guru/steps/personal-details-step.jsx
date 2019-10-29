/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import classnames from 'classnames';
import {
  FormControl,
  InputLabel,
  Select,
  Chip,
  MenuItem,
  Typography,
  TextField,
  Grid,
  Button,
  CircularProgress,
} from '@material-ui/core';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import PlacesAutoComplete from '../../../core/components/places-autocomplete';
import languages from '../../../constants/languages';
import { withFirebase } from '../../../core/lib/Firebase';


const useStyles = makeStyles({
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: '0 2px',
    height: 19,
    backgroundColor: 'rgb(255, 90, 95)',
    color: 'white',
  },
  formControl: {
    marginTop: 10,
  },
  label: {
    transform: 'translate(14px, 12px) scale(1)',
  },
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


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const INITIAL_STATE = {
  location: '',
  languages: [],
  day: '',
  month: '',
  year: '',
  photoURL: '',
};


const PersonalDetailsStep = ({ firebase }) => {
  const classes = useStyles();

  const [inputValues, setInputValues] = useState(INITIAL_STATE);
  const [isUserSubmittedPhoto, setIsUserSubmittedPhoto] = useState(false);
  const [submittedPhoto, setSubmittedPhoto] = useState(null);
  const [labelWidth, setLabelWidth] = useState(0);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  const imageRef = useRef(null);
  const inputLabel = React.useRef(null);

  const auth = useSelector((state) => state.app.auth);

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);

    if (auth.photoURL) {
      setInputValues({
        ...inputValues,
        photoURL: auth.photoURL,
      });
    }
  }, []);

  const handleLocationChange = (location) => {
    setInputValues({
      ...inputValues,
      location,
    });
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setUploadingPhoto(true);
      firebase.doUploadImage(file, auth.uid).then(() => {
        if (isUserSubmittedPhoto) {
          firebase.doDeleteImage(submittedPhoto.name, auth.uid);
        }

        firebase.doDownloadImage(file.name, auth.uid).then((url) => {
          axios.get(url).then(() => {
            imageRef.current.src = url;
            setIsUserSubmittedPhoto(true);
            setSubmittedPhoto(file);
            setInputValues({
              ...inputValues,
              photoURL: url,
            });
            setUploadingPhoto(false);
          });
        });
      });
    }
  };

  const handleChange = (event) => {
    setInputValues({
      ...inputValues,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form>
      <PlacesAutoComplete
        value={inputValues.location}
        onChange={handleLocationChange}
      />

      <FormControl fullWidth className={classes.formControl} variant="outlined">
        <InputLabel
          htmlFor="select-multiple-language"
          ref={inputLabel}
          className={classes.label}
        >
          Languages
        </InputLabel>
        <Select
          multiple
          value={inputValues.languages}
          onChange={handleChange}
          labelWidth={labelWidth}
          margin="dense"
          inputProps={{
            id: 'select-multiple-language',
            name: 'languages',
          }}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {languages.map((language) => (
            <MenuItem key={language} value={language}>
              {language}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <div className={classes.formControl}>
        <Typography component="h6" variant="button">
          Birthday
        </Typography>

        <Grid container spacing={1}>
          <Grid item xs={2}>
            <TextField
              variant="outlined"
              name="day"
              value={inputValues.day}
              onChange={handleChange}
              type="text"
              placeholder="DD"
              margin="dense"
              inputProps={{ maxLength: 2 }}
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              variant="outlined"
              name="month"
              value={inputValues.month}
              onChange={handleChange}
              type="text"
              placeholder="MM"
              margin="dense"
              inputProps={{ maxLength: 2 }}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              variant="outlined"
              name="year"
              value={inputValues.year}
              onChange={handleChange}
              type="text"
              placeholder="YYYY"
              margin="dense"
              inputProps={{ maxLength: 4 }}
            />
          </Grid>
        </Grid>
      </div>

      <div className={classes.formControl}>
        <Typography component="h6" variant="button">
          Photo
        </Typography>

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
      </div>
    </form>
  );
};

PersonalDetailsStep.propTypes = {
  firebase: PropTypes.shape({
    doUploadImage: PropTypes.func.isRequired,
    doDownloadImage: PropTypes.func.isRequired,
    doDeleteImage: PropTypes.func.isRequired,
  }).isRequired,
};

export default withFirebase(PersonalDetailsStep);
