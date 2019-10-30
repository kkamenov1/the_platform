import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {
  FormControl,
  InputLabel,
  Select,
  Chip,
  MenuItem,
  Typography,
  TextField,
  Grid,
} from '@material-ui/core';
import PlacesAutoComplete from '../../../core/components/places-autocomplete';
import UploadAPhoto from '../../../core/components/upload-a-photo';
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

        <UploadAPhoto
          onPhotoChange={handlePhotoChange}
          photoURL={inputValues.photoURL}
          isUserSubmittedPhoto={isUserSubmittedPhoto}
          uploadingPhoto={uploadingPhoto}
          imageRef={imageRef}
        />
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
