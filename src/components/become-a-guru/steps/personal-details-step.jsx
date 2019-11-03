import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
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
  List,
  ListItem,
  CircularProgress,
  Fab,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ClearIcon from '@material-ui/icons/Clear';
import { PlacesAutoComplete, FormError } from '../../../core/components';
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
  photoList: {
    display: 'inline-flex',
    paddingTop: 0,
    paddingBottom: 0,
  },
  photoListItem: {
    paddingLeft: 0,
  },
  imageWrapper: {
    background: '#f4f4f4',
    border: '1px dashed rgb(255, 90, 95)',
  },
  image: {
    width: 100,
    height: 100,
    objectFit: 'cover',
    display: 'block',
    margin: 'auto',
  },
  addPhotoBtn: {
    width: 100,
    height: 100,
    border: '1px solid white',
  },
  addPhotoIcon: {
    fill: 'rgb(255, 90, 95)',
  },
  progressWrapper: {
    width: 100,
    height: 100,
  },
  progress: {
    color: 'rgb(255, 90, 95)',
    width: '20px !important',
    height: '20px !important',
  },
  imageWrapperInner: {
    position: 'relative',

    '&:hover > button': {
      display: 'block',
    },
  },
  deleteImageBtn: {
    backgroundColor: 'rgb(255, 90, 95)',
    position: 'absolute',
    top: -10,
    right: -10,
    width: 25,
    height: 25,
    minHeight: 0,
    display: 'none',

    '&:hover': {
      backgroundColor: 'rgb(255, 90, 95)',
    },
  },
  deleteIcon: {
    width: 'inherit',
    height: 'inherit',
  },
});

const FILE_MEGABYTES = 5;
const KILOBYTE = 1024;
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
};

const DEFAULT_IMAGES = [
  { src: null, loading: false, name: null },
  { src: null, loading: false, name: null },
  { src: null, loading: false, name: null },
  { src: null, loading: false, name: null },
];

const PersonalDetailsStep = ({ firebase }) => {
  const classes = useStyles();
  const [inputValues, setInputValues] = useState(INITIAL_STATE);
  const [images, setImages] = useState(DEFAULT_IMAGES);
  const [errorPhotos, setErrorPhotos] = useState(null);
  const [labelWidth, setLabelWidth] = useState(0);

  const inputLabel = React.useRef(null);

  const auth = useSelector((state) => state.app.auth);

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleLocationChange = (location) => {
    setInputValues({
      ...inputValues,
      location,
    });
  };

  const addFirstPossible = (val, arr) => {
    const index = arr.findIndex((obj) => obj.src === null);
    return arr.map((item, idx) => {
      if (idx === index) return val;
      return item;
    });
  };

  const addOnPosition = (pos, val, arr) => arr.map((item, idx) => {
    if (idx === pos) return val;
    return item;
  });

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      if (!file.type.match('image')) {
        setErrorPhotos('Selected file should be an image');
        return;
      }

      const selectedFileMegabytes = file.size / KILOBYTE / KILOBYTE;
      if (selectedFileMegabytes > FILE_MEGABYTES) {
        setErrorPhotos('Selected file size should not be more than 5MB');
        return;
      }

      setImages([...addFirstPossible({ loading: true, src: null }, images)]);
      await firebase.doUploadImage(file, auth.uid);
      const url = await firebase.getImageUrl(file.name, auth.uid);

      setImages([...addFirstPossible({ loading: false, src: url, name: file.name }, images)]);
      setErrorPhotos(null);
    }
  };

  const removePhoto = async (pos) => {
    const imageName = images[pos].name;
    await firebase.doDeleteImage(imageName, auth.uid);
    const arrayWithDeletedImage = [...addOnPosition(
      pos,
      { src: null, loading: false, name: null },
      images,
    )];
    setImages(arrayWithDeletedImage);
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
          Photos
        </Typography>

        <List className={classes.photoList}>
          {images.map((image, index) => (
            <ListItem className={classes.photoListItem} key={index}>
              <div className={classes.imageWrapper}>

                {image.src ? (
                  <div className={classes.imageWrapperInner}>
                    <Fab
                      color="primary"
                      aria-label="add"
                      className={classes.deleteImageBtn}
                      onClick={() => removePhoto(index)}
                    >
                      <ClearIcon className={classes.deleteIcon} />
                    </Fab>
                    <img src={image.src} alt="test" className={classes.image} />
                  </div>
                ) : image.loading ? (
                  <div className={classes.photoListItem}>
                    <div className={classes.imageWrapper}>
                      <Grid
                        container
                        alignItems="center"
                        justify="center"
                        className={classes.progressWrapper}
                      >
                        <CircularProgress className={classes.progress} />
                      </Grid>
                    </div>
                  </div>
                ) : (
                  <>
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id={`photos-${index}`}
                      type="file"
                      onChange={handlePhotoChange}
                    />

                    <label htmlFor={`photos-${index}`}>
                      <div className={classes.photoListItem}>
                        <div className={classes.imageWrapper}>
                          <Button component="span" disableRipple className={classes.addPhotoBtn}>
                            <AddCircleIcon className={classes.addPhotoIcon} />
                          </Button>
                        </div>
                      </div>
                    </label>
                  </>
                )}
              </div>
            </ListItem>
          ))}
        </List>

        {errorPhotos && (
          <FormError>
            {errorPhotos}
          </FormError>
        )}
      </div>
    </form>
  );
};

PersonalDetailsStep.propTypes = {
  firebase: PropTypes.shape({
    doUploadImage: PropTypes.func.isRequired,
    getImageUrl: PropTypes.func.isRequired,
    doDeleteImage: PropTypes.func.isRequired,
  }).isRequired,
};

export default withFirebase(PersonalDetailsStep);
