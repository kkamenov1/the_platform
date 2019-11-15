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
  List,
  ListItem,
} from '@material-ui/core';
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
  setPersonalDetailsFormValues,
  setPersonalDetailsErrors,
} from '../../../pages/Header/actions';
import { FILE_MEGABYTES, KILOBYTE } from '../../../constants/files'

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
  vspace: {
    marginTop: 10,
  },
  select: {
    marginBottom: 4,
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

const PersonalDetailsStep = ({ firebase }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);

  const auth = useSelector((state) => state.app.auth);
  const images = useSelector((state) => state.header.becomeGuruModal.personalDetailsStep.images);
  const errors = useSelector((state) => state.header.becomeGuruModal.personalDetailsStep.errors);

  const location = useSelector((state) => state.header.becomeGuruModal.personalDetailsStep.location);
  const languages = useSelector((state) => state.header.becomeGuruModal.personalDetailsStep.languages);
  const day = useSelector((state) => state.header.becomeGuruModal.personalDetailsStep.day);
  const month = useSelector((state) => state.header.becomeGuruModal.personalDetailsStep.month);
  const year = useSelector((state) => state.header.becomeGuruModal.personalDetailsStep.year);


  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleLocationChange = (loc) => {
    dispatch(setGuruLocation(loc));
    dispatch(setPersonalDetailsErrors({ ...errors, location: null }));
  };

  const handleInputChange = (e) => {
    dispatch(setPersonalDetailsFormValues(e.target.name, e.target.value));

    // handling errors
    if (e.target.name === 'day' || e.target.name === 'month' || e.target.name === 'year') {
      dispatch(setPersonalDetailsErrors({ ...errors, birthday: null }));
      return;
    }
    dispatch(setPersonalDetailsErrors({ ...errors, [e.target.name]: null }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      if (!file.type.match('image')) {
        dispatch(setPersonalDetailsErrors({
          ...errors,
          images: 'Selected file should be an image',
        }));
        return;
      }

      const selectedFileMegabytes = file.size / KILOBYTE / KILOBYTE;
      if (selectedFileMegabytes > FILE_MEGABYTES) {
        dispatch(setPersonalDetailsErrors({
          ...errors,
          images: 'Selected file size should not be more than 5MB',
        }));
        return;
      }

      dispatch(setPersonalDetailsFormValues(
        'images',
        [...addFirstPossible({ loading: true, src: null }, images)],
      ));
      await firebase.doUploadGuruImages(file, auth.uid);
      const url = await firebase.getGuruImageUrl(file.name, auth.uid);

      dispatch(setPersonalDetailsFormValues(
        'images',
        [...addFirstPossible({ loading: false, src: url, name: file.name }, images)],
      ));
      dispatch(setPersonalDetailsErrors({ ...errors, images: null }));
    }
  };

  const handleImageRemove = async (pos) => {
    const imageName = images[pos].name;
    await firebase.doDeleteGuruImage(imageName, auth.uid);
    const arrayWithDeletedImage = [...addOnPosition(
      pos,
      { src: null, loading: false, name: null },
      images,
    )];
    dispatch(setPersonalDetailsFormValues(
      'images',
      arrayWithDeletedImage,
    ));
  };

  return (
    <>
      <ModalHeader
        heading="APPLY TO BECOME A GURU"
        caption="Earn money by coaching other people"
      />
      <form>
        <PlacesAutoComplete
          value={location}
          onChange={handleLocationChange}
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
                  <Chip key={value} label={value} className={classes.chip} />
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
            <Grid item xs={2}>
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

            <Grid item xs={2}>
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

          <List className={classes.photoList}>
            {images.map((image, index) => (
              <ListItem className={classes.photoListItem} key={index}>
                <ImageUploader
                  image={image}
                  onImageChange={handleImageChange}
                  onImageRemove={() => handleImageRemove(index)}
                  inputId={`guru-photo-${index}`}
                />
              </ListItem>
            ))}
          </List>
          <FormError>
            {errors && errors.images}
          </FormError>
        </div>
      </form>
    </>
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
