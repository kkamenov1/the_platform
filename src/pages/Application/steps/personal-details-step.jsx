import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormControl,
  Select,
  Chip,
  MenuItem,
  TextField,
  Slide,
  FormHelperText,
} from '@material-ui/core';
import { Form, Field } from 'react-final-form';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import {
  PlacesAutoComplete,
  ModalHeader,
  ImageUploader,
  StandardInputLabel,
} from '../../../core/components';
import allLanguages from '../../../constants/languages';
import {
  setGuruLocation,
  setPersonalDetailsErrors,
  setGeoLocation,
  setPersonalDetails,
} from '../actions';
import api from '../../../api';
import { MAX_IMAGE_SIZE } from '../../../constants/files';

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
    marginTop: 16,
  },
  select: {
    marginBottom: 4,
  },
  noMargin: {
    marginTop: 0,
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
  const auth = useSelector((state) => state.app.auth);
  const application = useSelector((state) => state.application);
  const {
    personalDetailsStepFormErrors: errors,
    location,
    languages,
    birthday,
    activeStep,
    isIncreasingSteps,
  } = application;

  const handleLocationSelect = (loc) => {
    geocodeByAddress(loc)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        dispatch(setGuruLocation(loc));
        dispatch(setGeoLocation(latLng));
        // dispatch(setPersonalDetailsErrors({ ...errors, location: null }));
      })
      .catch((error) => {
        dispatch(setPersonalDetailsErrors({ ...errors, location: error }));
      });
  };

  const handleImageChange = (event, input) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    if (file) {
      if (!file.type.match('image')) {
        input.onChange({
          loading: false,
          error: 'Selected file should be an image',
        });
        return;
      }

      if (file.size > MAX_IMAGE_SIZE) {
        input.onChange({
          loading: false,
          error: 'Selected file size should not be more than 5MB',
        });
        return;
      }

      reader.readAsDataURL(file);
      reader.onerror = (error) => {
        input.onChange({
          loading: false,
          error: `File could not be read: + ${error}`,
        });
      };

      reader.onloadstart = () => {
        input.onChange({ loading: true });
      };

      reader.onloadend = async () => {
        try {
          const response = await api.assets.upload({
            img: reader.result,
            userID: auth && auth.uid,
          });
          input.onChange({
            loading: false,
            fileSize: file.size,
            fileName: file.name,
            public_id: response.data.public_id,
          });
        } catch (error) {
          input.onChange({
            loading: false,
            error: 'Failed to upload the image. Please try again!',
          });
        }
      };
    }
    document.getElementById(GURU_PHOTO_INPUT_ID).value = '';
  };

  const handleImageRemove = async (publicId, input) => {
    input.onChange({ loading: true });
    try {
      const response = await api.assets.delete({ publicId });
      if (response.data.result !== 'ok') {
        throw new Error('API Error');
      }

      input.onChange({
        loading: false,
        public_id: null,
        fileName: null,
        fileSize: null,
        error: null,
      });
    } catch (err) {
      input.onChange({
        ...input.value,
        loading: false,
        error: 'Failed to delete the image. Please try again!',
      });
    }
  };

  const handleFormSubmit = (data) => {
    dispatch(setPersonalDetails(data));
  };

  const validate = (values) => {
    const err = {};
    if (!values.location) {
      err.location = 'Required';
    }
    if (!values.languages.length) {
      err.languages = 'Required';
    }
    if (!values.birthday) {
      err.birthday = 'Required';
    }
    if (!values.image.public_id) {
      err.image = 'Required';
    }
    return err;
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
        <Form
          onSubmit={handleFormSubmit}
          validate={validate}
          initialValues={application}
        >
          {({ handleSubmit, values }) => (
            <form onSubmit={handleSubmit} noValidate>
              <Field name="location">
                {({ input, meta }) => (
                  <>
                    <StandardInputLabel
                      required
                      error={Boolean(meta.touched && meta.error)}
                    >
                      Location
                    </StandardInputLabel>
                    <PlacesAutoComplete
                      {...input}
                      onSelect={(loc) => handleLocationSelect(loc, input)}
                      error={Boolean(meta.touched && meta.error)}
                      helperText={
                        (meta.touched && meta.error)
                        || 'Let your clients know your location'
                      }
                      onBlur={(e) => input.onBlur(e)}
                    />
                  </>
                )}
              </Field>

              <div className={classes.vspace}>

                <Field name="languages">
                  {({ input, meta }) => (
                    <>
                      <StandardInputLabel
                        required
                        error={Boolean(meta.touched && meta.error)}
                      >
                        Languages
                      </StandardInputLabel>
                      <FormControl fullWidth variant="outlined">
                        <Select
                          multiple
                          className={classes.select}
                          margin="dense"
                          inputProps={{
                            ...input,
                            onBlur: (e) => input.onBlur(e),
                          }}
                          error={Boolean(meta.touched && meta.error)}
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
                        {meta.touched && meta.error && (
                          <FormHelperText
                            required
                            error={Boolean(meta.touched && meta.error)}
                          >
                            {meta.error}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </>
                  )}
                </Field>
              </div>

              <div className={classes.vspace}>
                <Field name="birthday">
                  {({ input, meta }) => (
                    <>
                      <StandardInputLabel
                        required
                        error={Boolean(meta.touched && meta.error)}
                      >
                        Birthday
                      </StandardInputLabel>
                      <TextField
                        variant="outlined"
                        {...input}
                        margin="dense"
                        type="date"
                        className={classes.noMargin}
                        error={Boolean(meta.touched && meta.error)}
                        helperText={(meta.touched && meta.error)}
                        inputProps={{
                          onBlur: (e) => input.onBlur(e),
                        }}
                      />
                    </>
                  )}
                </Field>
              </div>

              <div className={classes.vspace}>
                <ImageUploader
                  onImageChange={handleImageChange}
                  onImageRemove={handleImageRemove}
                  inputId={GURU_PHOTO_INPUT_ID}
                  label="Guru Profile Picture *"
                />
              </div>
              <pre>{JSON.stringify(values, 0, 2)}</pre>
            </form>
          )}
        </Form>
      </div>
    </Slide>
  );
};

export default PersonalDetailsStep;
