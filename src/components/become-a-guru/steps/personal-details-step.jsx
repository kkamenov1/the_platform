import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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
} from '@material-ui/core';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import {
  PlacesAutoComplete,
  FormError,
  ModalHeader,
  ImageUploader,
} from '../../../core/components';
import allLanguages from '../../../constants/languages';
import { withFirebase } from '../../../core/lib/Firebase';
import {
  setGuruLocation,
  setFormValues,
  setPersonalDetailsErrors,
  setGeoLocation,
  setImageUploadOnSuccess,
} from '../../../modals/become-guru/actions';
import api from '../../../api';
import { addOnPosition } from '../../../core/utils';

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


const PersonalDetailsStep = ({ firebase }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);

  const auth = useSelector((state) => state.app.auth);
  const becomeGuruModal = useSelector((state) => state.becomeGuruModal);
  const {
    images,
    personalDetailsStepFormErrors: errors,
    location,
    languages,
    day,
    month,
    year,
    activeStep,
    isIncreasingSteps,
  } = becomeGuruModal;

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

  const handleImageRemove = async (publicId, pos) => {
    const {
      src,
      name,
      publicId: id,
    } = images[pos];

    const arrayWithLoadingImage = [...addOnPosition(
      pos,
      {
        src: null,
        name: null,
        publicId: null,
        loading: true,
      },
      images,
    )];

    dispatch(setPersonalDetailsErrors({ ...errors, images: null }));
    dispatch(setFormValues(
      'images',
      arrayWithLoadingImage,
    ));

    const response = await api.images.deleteImage({ publicId });

    if (response.data.result === 'ok') {
      const arrayWithDeletedImage = [...addOnPosition(
        pos,
        {
          src: null,
          name: null,
          publicId: null,
          loading: false,
        },
        images,
      )];
      dispatch(setFormValues(
        'images',
        arrayWithDeletedImage,
      ));
    } else {
      const arrayWithOldImage = [...addOnPosition(
        pos,
        {
          src,
          name,
          publicId: id,
          loading: false,
        },
        images,
      )];
      dispatch(setFormValues(
        'images',
        arrayWithOldImage,
      ));
      dispatch(setPersonalDetailsErrors({
        ...errors,
        images: 'There was an error deleting the image. Please try again!',
      }));
    }
  };

  const checkUploadResult = (resultEvent) => {
    if (resultEvent.event === 'success') {
      const { info } = resultEvent;
      console.log(info);
      dispatch(setImageUploadOnSuccess(info));
    }
  };

  const maxFiles = images.filter((image) => !(image.src)).length;

  const widget = window.cloudinary.createUploadWidget({
    cloudName: 'dl766ebzy', // TODO: change to env variables
    uploadPreset: 'azos0jgv', // TODO: change to env variables
    folder: `gurus/${auth.uid}`,
    maxFiles,
    resourceType: 'image',
    clientAllowedFormats: ['png', 'gif', 'jpeg'],
    maxFileSize: 5000000,
  }, (error, result) => {
    checkUploadResult(result);
  });

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
              Languages
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
                  placeholder="DD"
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
                  placeholder="MM"
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
                  placeholder="YYYY"
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
              Photos
            </Typography>

            <ImageUploader
              images={images}
              widget={widget}
              onImageRemove={handleImageRemove}
            />
            <FormError>
              {errors && errors.images}
            </FormError>
          </div>
        </form>
      </div>
    </Slide>
  );
};

PersonalDetailsStep.propTypes = {
  firebase: PropTypes.shape({
    doUploadGuruImages: PropTypes.func.isRequired,
    getGuruImageUrl: PropTypes.func.isRequired,
    doDeleteGuruImage: PropTypes.func.isRequired,
  }).isRequired,
};

export default withFirebase(PersonalDetailsStep);
