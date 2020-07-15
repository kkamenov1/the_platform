import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  FormControl,
  Slide,
  Select,
  MenuItem,
  FormHelperText,
} from '@material-ui/core';
import { Form, Field } from 'react-final-form';
import {
  ModalHeader,
  ImageUploader,
  StandardInputLabel,
} from '../../../../core/components';
import { maxLength } from '../../../../core/form-validators/guru-details.step';
import sports from '../../../../constants/sports';
import { MAX_IMAGE_SIZE } from '../../../../constants/files';
import api from '../../../../api';
import { setGuruDetails } from './actions';
import { setActiveStep, setIncreasingSteps } from '../../actions';
import { GURU_INTRODUCTION_MAX_FIELD_LENGTH } from '../../../../core/config';
import ActionBar from '../../action-bar';

const useStyles = makeStyles({
  vspace: {
    marginTop: 16,
  },
});

const CERTIFICATE_PHOTO_INPUT_ID = 'certificate-photo';

const GuruDetailsStep = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const guruDetails = useSelector((state) => state.application.guruDetails);
  const auth = useSelector((state) => state.app.auth);
  const activeStep = useSelector((state) => state.application.general.activeStep);
  const isIncreasingSteps = useSelector((state) => state.application.general.isIncreasingSteps);

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
            folder: auth ? `/gurus/${auth.uid}` : '/gurus',
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
    document.getElementById(CERTIFICATE_PHOTO_INPUT_ID).value = '';
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

  const validate = (values) => {
    const err = {};
    if (!values.sport) {
      err.sport = 'Required';
    }
    return err;
  };

  const handleFormSubmit = (data) => {
    dispatch(setGuruDetails(data));
    dispatch(setActiveStep(activeStep + 1));
    dispatch(setIncreasingSteps(true));
  };

  return (
    <Slide
      direction={isIncreasingSteps ? 'left' : 'right'}
      in={activeStep === 1}
      mountOnEnter
      unmountOnExit
    >
      <div>
        <ModalHeader
          heading="GURU INFORMATION"
          caption="Tell us more about your gym achievements and coaching background"
        />
        <Form
          onSubmit={handleFormSubmit}
          validate={validate}
          initialValues={guruDetails}
        >
          {({ handleSubmit, invalid }) => (
            <form onSubmit={handleSubmit} noValidate>
              <Field name="sport">
                {({ input, meta }) => (
                  <>
                    <StandardInputLabel
                      required
                      error={Boolean(meta.touched && meta.error)}
                    >
                      Sport
                    </StandardInputLabel>
                    <FormControl fullWidth variant="outlined">
                      <Select
                        margin="dense"
                        inputProps={{
                          ...input,
                          onBlur: (e) => input.onBlur(e),
                        }}
                        error={Boolean(meta.touched && meta.error)}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {sports.map((option) => (
                          <MenuItem value={option.value} key={option.value}>
                            {option.name}
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

              <div className={classes.vspace}>
                <Field
                  name="introduction"
                  validate={maxLength(GURU_INTRODUCTION_MAX_FIELD_LENGTH)}
                >
                  {({ input, meta }) => (
                    <>
                      <StandardInputLabel error={Boolean(meta.touched && meta.error)}>
                        INTRODUCE YOURSELF TO STUDENTS
                      </StandardInputLabel>
                      <TextField
                        multiline
                        rows="6"
                        margin="dense"
                        fullWidth
                        variant="outlined"
                        placeholder={`Max ${GURU_INTRODUCTION_MAX_FIELD_LENGTH} characters...`}
                        {...input}
                        error={Boolean(meta.touched && meta.error)}
                        helperText={((meta.touched && meta.error)
                          || `${input.value.length} / ${GURU_INTRODUCTION_MAX_FIELD_LENGTH}`)}
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
                  inputId={CERTIFICATE_PHOTO_INPUT_ID}
                  label="Certificate"
                  name="certificate"
                />
              </div>
              <ActionBar disabled={invalid} />
            </form>
          )}
        </Form>
      </div>
    </Slide>
  );
};

export default GuruDetailsStep;
