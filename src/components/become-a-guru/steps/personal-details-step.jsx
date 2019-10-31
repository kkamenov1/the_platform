/* eslint-disable no-await-in-loop */
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
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
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
  photoList: {
    display: 'inline-flex',
    paddingTop: 0,
    paddingBottom: 0,
  },
  photoListItem: {
    paddingLeft: 0,
    paddingRight: 12,
  },
  imageWrapper: {
    background: '#f4f4f4',
    border: '1px dashed #c5d7b5',
  },
  image: {
    width: 100,
    height: 100,
    objectFit: 'cover',
    display: 'block',
    margin: 'auto',
  },
  addPhotoBtn: {
    width: 87,
    height: 72,
    border: '1px solid white',
  },
  addPhotoIcon: {
    fill: 'rgb(255, 90, 95)',
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
};


const PersonalDetailsStep = ({ firebase }) => {
  const classes = useStyles();

  const [inputValues, setInputValues] = useState(INITIAL_STATE);
  const [images, setImages] = useState([]);
  const [labelWidth, setLabelWidth] = useState(0);
  // const [isUserSubmittedPhoto, setIsUserSubmittedPhoto] = useState(false);
  // const [submittedPhoto, setSubmittedPhoto] = useState(null);
  // const [uploadingPhoto, setUploadingPhoto] = useState(false);

  // const imageRef = useRef(null);

  const inputLabel = React.useRef(null);

  const auth = useSelector((state) => state.app.auth);

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
    console.log(images);
  }, [images]);

  const handleLocationChange = (location) => {
    setInputValues({
      ...inputValues,
      location,
    });
  };

  const handlePhotoChange = async (event) => {
    const { files } = event.target;

    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];

      if (!file.type.match('image')) {
        continue;
      }

      setImages([...images, { loading: true, src: null }]);
      await firebase.doUploadImage(file, auth.uid);
      const url = await firebase.getImageUrl(file.name, auth.uid);
      setImages([...images.slice(0, -1), { loading: false, src: url }]);

      // promises.push(
      //   firebase.doUploadImage(file, auth.uid),
      //   firebase.doDownloadImage(file.name, auth.uid),
      // );
      // Promise.all(promises).then((result) => {
      //   const [, url] = result;
      //   setImages([...images.slice(0, -1), { loading: false, src: url }]);
      // });
      // firebase.doUploadImage(file, auth.uid).then(() => {
      //   firebase.doDownloadImage(file.name, auth.uid).then((url) => {
      //     axios.get(url).then(() => {
      //       setImages(...images.slice(0, -1), { loading: false, src: url });
      //     });
      //   });
      // });
    }

    // if (file) {
    //   setUploadingPhoto(true);
    //   firebase.doUploadImage(file, auth.uid).then(() => {
    //     if (isUserSubmittedPhoto) {
    //       firebase.doDeleteImage(submittedPhoto.name, auth.uid);
    //     }

    //     firebase.doDownloadImage(file.name, auth.uid).then((url) => {
    //       axios.get(url).then(() => {
    //         imageRef.current.src = url;
    //         setIsUserSubmittedPhoto(true);
    //         setSubmittedPhoto(file);
    //         setInputValues({
    //           ...inputValues,
    //           photoURL: url,
    //         });
    //         setUploadingPhoto(false);
    //       });
    //     });
    //   });
    // }
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

        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="photos"
          type="file"
          onChange={handlePhotoChange}
          multiple
        />

        <label htmlFor="photos">
          <List className={classes.photoList}>
            <ListItem className={classes.photoListItem}>
              <div className={classes.imageWrapper}>
                {images && images.length ? (
                  <img src={images[0].src} alt="test" className={classes.image} />
                ) : (
                  <Button component="span" disableRipple className={classes.addPhotoBtn}>
                    <AddCircleIcon className={classes.addPhotoIcon} />
                  </Button>
                )}
              </div>
            </ListItem>

            <ListItem className={classes.photoListItem}>
              <div className={classes.imageWrapper}>
                {images && images.length > 1 ? (
                  <img src={images[1].src} alt="test" className={classes.image} />
                ) : (
                  <Button component="span" disableRipple className={classes.addPhotoBtn}>
                    <AddCircleIcon className={classes.addPhotoIcon} />
                  </Button>
                )}
              </div>
            </ListItem>

            <ListItem className={classes.photoListItem}>
              <div className={classes.imageWrapper}>
                {/* {images && images.item.src && images.item.index === item ? (
                    <img src={images.item.src} alt="test" />
                  ) : ( */}
                <Button component="span" disableRipple className={classes.addPhotoBtn}>
                  <AddCircleIcon className={classes.addPhotoIcon} />
                </Button>
                {/* )} */}
              </div>
            </ListItem>

            <ListItem className={classes.photoListItem}>
              <div className={classes.imageWrapper}>
                {/* {images && images.item.src && images.item.index === item ? (
                    <img src={images.item.src} alt="test" />
                  ) : ( */}
                <Button component="span" disableRipple className={classes.addPhotoBtn}>
                  <AddCircleIcon className={classes.addPhotoIcon} />
                </Button>
                {/* )} */}
              </div>
            </ListItem>
          </List>
        </label>
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
