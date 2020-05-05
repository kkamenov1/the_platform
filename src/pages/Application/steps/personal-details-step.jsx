import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
  Slide,
  CircularProgress,
} from '@material-ui/core';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import {
  PlacesAutoComplete,
  FormError,
  ModalHeader,
  ImageUploader,
} from '../../../core/components';
import allLanguages from '../../../constants/languages';
import {
  setGuruLocation,
  setFormValues,
  setPersonalDetailsErrors,
  setGeoLocation,
  guruImageLoading,
  guruImageLoaded,
  guruImageAdded,
  guruImageRemoved,
} from '../actions';
import api from '../../../api';
import { MAX_IMAGE_SIZE, KILOBYTE } from '../../../constants/files';

const useStyles = makeStyles({
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: '0 2px',
    height: 19,
  },
  vspace: {
    marginTop: 10,
  },
  select: {
    marginBottom: 4,
  },
  label: {
    transform: 'translate(14px, 12px) scale(1)',
  },
  loadingProgressImage: {
    height: 16,
    marginLeft: 8,
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
const GURU_PHOTO_INPUT_ID = 'guru-photo';


const PersonalDetailsStep = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  const auth = useSelector((state) => state.app.auth);
  const application = useSelector((state) => state.application);
  const {
    image,
    personalDetailsStepFormErrors: errors,
    location,
    languages,
    day,
    month,
    year,
    activeStep,
    isIncreasingSteps,
  } = application;

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleLocationChange = (loc) => {
    dispatch(setGuruLocation(loc));
    dispatch(setPersonalDetailsErrors({ ...errors, location: null }));
  };

  const handleLocationSelect = (loc) => {
    geocodeByAddress(loc)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        dispatch(setGuruLocation(loc));
        dispatch(setGeoLocation(latLng));
        dispatch(setPersonalDetailsErrors({ ...errors, location: null }));
      })
      .catch((error) => {
        dispatch(setPersonalDetailsErrors({ ...errors, location: error }));
      });
  };

  const handleInputChange = (e) => {
    dispatch(setFormValues(e.target.name, e.target.value));

    // handling errors
    if (['day', 'month', 'year'].includes(e.target.name)) {
      dispatch(setPersonalDetailsErrors({ ...errors, birthday: null }));
    }
    dispatch(setPersonalDetailsErrors({ ...errors, [e.target.name]: null }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    if (file) {
      if (!file.type.match('image')) {
        dispatch(setPersonalDetailsErrors({
          ...errors,
          image: 'Selected file should be an image',
        }));
        return;
      }

      const selectedFileMegabytes = file.size / KILOBYTE / KILOBYTE;

      if (selectedFileMegabytes > MAX_IMAGE_SIZE) {
        dispatch(setPersonalDetailsErrors({
          ...errors,
          image: 'Selected file size should not be more than 5MB',
        }));
        return;
      }

      reader.readAsDataURL(file);
      reader.onerror = (error) => {
        dispatch(setPersonalDetailsErrors({
          ...errors,
          image: `File could not be read: + ${error}`,
        }));
      };

      reader.onloadstart = () => {
        dispatch(guruImageLoading());
      };

      reader.onloadend = async () => {
        try {
          const response = await api.assets.upload({
            img: reader.result,
            userID: auth && auth.uid,
          });
          dispatch(guruImageAdded(
            file.size,
            file.name,
            response.data.public_id,
          ));
          dispatch(guruImageLoaded());
          dispatch(setPersonalDetailsErrors({
            ...errors,
            image: null,
          }));
        } catch (error) {
          dispatch(guruImageLoaded());
          dispatch(setPersonalDetailsErrors({
            ...errors,
            image: 'Failed to upload the image. Please try again!',
          }));
        }
      };
    }
    document.getElementById(GURU_PHOTO_INPUT_ID).value = '';
  };

  const handleImageRemove = async (publicId) => {
    dispatch(guruImageLoading());
    try {
      const response = await api.assets.delete({ publicId });

      if (response.data.result !== 'ok') {
        throw new Error('API Error');
      }

      dispatch(setPersonalDetailsErrors({
        ...errors,
        image: null,
      }));
      dispatch(guruImageRemoved());
    } catch (err) {
      dispatch(setPersonalDetailsErrors({
        ...errors,
        image: 'Failed to delete the image. Please try again!',
      }));
    }
    dispatch(guruImageLoaded());
  };

  return (
    <Slide
      direction={isIncreasingSteps ? 'left' : 'right'}
      in={activeStep === 0}
      mountOnEnter
      unmountOnExit
    >
      <div>
        <ModalHeader
          heading="APPLY TO BECOME A GURU"
          caption="Earn money by coaching other people"
        />
        <form>
          <PlacesAutoComplete
            value={location}
            onChange={handleLocationChange}
            onSelect={handleLocationSelect}
            shouldFetchSuggestions={location.length > 1}
          />
          <FormError>
            {errors && errors.location}
          </FormError>

          <FormControl fullWidth variant="outlined">
            <InputLabel
              htmlFor="select-multiple-language"
              ref={inputLabel}
              className={classes.label}
            >
              Languages *
            </InputLabel>
            <Select
              multiple
              value={languages}
              onChange={handleInputChange}
              labelWidth={labelWidth}
              className={classes.select}
              margin="dense"
              inputProps={{
                id: 'select-multiple-language',
                name: 'languages',
              }}
              renderValue={(selected) => (
                <div className={classes.chips}>
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={value}
                      className={classes.chip}
                      color="primary"
                    />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {allLanguages.map((language) => (
                <MenuItem key={language} value={language}>
                  {language}
                </MenuItem>
              ))}
            </Select>
            <FormError>
              {errors && errors.languages}
            </FormError>
          </FormControl>

          <div className={classes.vspace}>
            <Typography component="h6" variant="button">
              Birthday
            </Typography>

            <Grid container spacing={1}>
              <Grid item xs={3} md={2}>
                <TextField
                  variant="outlined"
                  name="day"
                  value={day}
                  onChange={handleInputChange}
                  type="text"
                  label="DD"
                  required
                  margin="dense"
                  inputProps={{ maxLength: 2 }}
                />
              </Grid>

              <Grid item xs={3} md={2}>
                <TextField
                  variant="outlined"
                  name="month"
                  value={month}
                  onChange={handleInputChange}
                  type="text"
                  label="MM"
                  required
                  margin="dense"
                  inputProps={{ maxLength: 2 }}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  variant="outlined"
                  name="year"
                  value={year}
                  onChange={handleInputChange}
                  type="text"
                  label="YYYY"
                  required
                  margin="dense"
                  inputProps={{ maxLength: 4 }}
                />
              </Grid>
            </Grid>
            <FormError>
              {errors && errors.birthday}
            </FormError>
          </div>

          <div className={classes.vspace}>
            <Typography component="h6" variant="button">
              <Grid container alignItems="center">
                <Grid item>
                  Guru Profile Picture *
                </Grid>
                <Grid item>
                  {image.loading && (
                    <div className={classes.loadingProgressImage}>
                      <CircularProgress size={16} />
                    </div>
                  )}
                </Grid>
              </Grid>
            </Typography>

            <ImageUploader
              image={image}
              onImageChange={handleImageChange}
              onImageRemove={handleImageRemove}
              inputId={GURU_PHOTO_INPUT_ID}
            />
            <FormError>
              {errors && errors.image}
            </FormError>
          </div>
        </form>
      </div>
    </Slide>
  );
};

export default PersonalDetailsStep;
