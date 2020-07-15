/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Rating } from '@material-ui/lab';
import { Form, Field } from 'react-final-form';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
  Typography,
  TextField,
  Link,
} from '@material-ui/core';
import { Link as NavigationLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleReviewGuidelinesModal,
  togglePhotoRequirementsModal,
  setFormStatus,
} from './actions';
import ReviewHeader from './review-header';
import ReviewGuidelinesModal from './review-guidelines-modal';
import { ImageUploader, LoadingButton } from '../../core/components';
import { MAX_IMAGE_SIZE } from '../../constants/files';
import api from '../../api';
import PhotoRequirementsModal from './photo-requirements-modal';
import { REVIEW_PAGE_FORM_STATUS } from '../../core/config';

const useStyles = makeStyles((theme) => ({
  outer: {
    width: '100%',
    maxWidth: 1280,
    margin: '100px auto',

    [theme.breakpoints.up('lg')]: {
      width: '80%',
    },
  },
  section: {
    width: '100%',
    margin: '0 auto ',
    padding: '0 24px',

    [theme.breakpoints.up('lg')]: {
      width: '66%',
      padding: 0,
    },
  },
  rightSubSection: {
    marginTop: 40,
    [theme.breakpoints.up('sm')]: {
      marginTop: 0,
    },

  },
  heading: {
    fontWeight: 700,
    marginBottom: 24,
  },
  formPart: {
    marginTop: 50,
  },
  hr: {
    marginTop: 80,
  },
  legend: {
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: '#000',
    lineHeight: '24px',
  },
  yourReview: {
    letterSpacing: 1.5,
    fontWeight: 700,
    marginBottom: 30,
  },
  btnLink: {
    display: 'block',
    marginBottom: 8,
  },
  textArea: {
    marginTop: 40,
  },
}));

const PHOTO_UPLOAD_BEFORE_ID = 'review-image-before';
const PHOTO_UPLOAD_AFTER_ID = 'review-image-after';
const labels = {
  1: 'Disappointing',
  2: 'Could be better',
  3: 'It\'s okay',
  4: 'Great',
  5: 'Perfect',
};

const ReviewForm = ({ guru }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.app.auth);
  const reviewGuidelinesModalOpen = useSelector((state) => state.review.reviewGuidelinesModalOpen);
  const photoRequirementsModalOpen = useSelector((state) => state.review.photoRequirementsModalOpen);
  const formStatus = useSelector((state) => state.review.formStatus);
  const [value, setValue] = React.useState(null);
  const [hover, setHover] = React.useState(-1);

  const handleFormSubmit = async (data) => {
    dispatch(setFormStatus(REVIEW_PAGE_FORM_STATUS.FORM_SUBMIT_REVIEW_LOADING));
    const body = {
      ...data,
      recommend: Boolean(data.recommend),
      imageBefore: data.imageBefore ? data.imageBefore.public_id : null,
      imageAfter: data.imageAfter ? data.imageAfter.public_id : null,
      userID: auth.uid,
      approvedByAdmin: false,
    };

    try {
      await api.reviews.post(body);
      dispatch(setFormStatus(REVIEW_PAGE_FORM_STATUS.FORM_SUBMITTED));
    } catch (err) {
      if (err.response.data.error === 'DUPLICATE_REVIEW') {
        dispatch(setFormStatus(REVIEW_PAGE_FORM_STATUS.FORM_DUPLICATE_ERROR));
      } else {
        dispatch(setFormStatus(REVIEW_PAGE_FORM_STATUS.FORM_ERROR));
      }
    }
  };

  const validate = (values) => {
    const err = {};

    if (!values.rating) {
      err.rating = 'Please select';
    }
    if (!values.recommend) {
      err.recommend = 'Please select';
    }
    if (!values.summary) {
      err.summary = 'Oh, wait! This field cannot be empty';
    }
    if (!values.review) {
      err.review = 'Oh, wait! This field cannot be empty';
    }
    if (values.review && values.review.length < 50) {
      err.review = 'Write at least 50 characters and help others make a better choice.';
    }
    return err;
  };

  const handleImageChange = (inputID) => (event, input) => {
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
            folder: `/reviews/${auth.uid}`,
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
    document.getElementById(inputID).value = '';
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

  const handleReviewGuidelinesModalChange = (event, open) => {
    event.preventDefault();
    dispatch(toggleReviewGuidelinesModal(open));
  };

  const handlePhotoRequirementsModalChange = (event, open) => {
    event.preventDefault();
    dispatch(togglePhotoRequirementsModal(open));
  };

  return (
    <>
      <ReviewGuidelinesModal
        open={reviewGuidelinesModalOpen}
        onClose={(event) => handleReviewGuidelinesModalChange(event, false)}
      />
      <PhotoRequirementsModal
        open={photoRequirementsModalOpen}
        onClose={(event) => handlePhotoRequirementsModalChange(event, false)}
      />
      <div className={classes.section}>
        <ReviewHeader guru={guru} />
      </div>
      <Form
        onSubmit={handleFormSubmit}
        validate={validate}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Grid
              container
              justify="space-between"
              className={classnames(classes.section, classes.formPart)}
            >
              <Grid item xs={12} sm={5}>
                <Field name="rating" type="radio">
                  {({ input, meta }) => (
                    <FormControl
                      component="fieldset"
                      error={Boolean(
                        meta.error
                        && hover === -1
                        && (!meta.pristine || meta.touched),
                      )}
                    >
                      <FormLabel component="legend" className={classes.legend}>
                        Your overall rating
                      </FormLabel>
                      <Rating
                        {...input}
                        size="large"
                        defaultValue={value}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                          input.onChange(newValue);
                        }}
                        onChangeActive={(event, newHover) => {
                          setHover(newHover);
                        }}
                      />

                      <FormHelperText error={Boolean(
                        meta.error
                        && hover === -1
                        && (!meta.pristine || meta.touched),
                      )}
                      >
                        {value !== null
                          ? labels[hover !== -1 ? hover : value]
                          : hover !== -1 ? labels[hover] : 'Please select'}
                      </FormHelperText>
                    </FormControl>
                  )}
                </Field>
              </Grid>

              <Grid item xs={12} sm={5} className={classes.rightSubSection}>
                <Field name="recommend" type="radio">
                  {({ input, meta }) => (
                    <FormControl
                      component="fieldset"
                      error={Boolean(meta.error && (!meta.pristine || meta.touched))}
                    >
                      <FormLabel component="legend" className={classes.legend}>
                        Do you recommend this guru?
                      </FormLabel>
                      <RadioGroup {...input}>
                        <FormControlLabel
                          value="true"
                          control={<Radio color="primary" />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="false"
                          control={<Radio color="primary" />}
                          label="No"
                        />
                      </RadioGroup>

                      <FormHelperText error={Boolean(meta.error && (!meta.pristine || meta.touched))}>
                        {(!meta.pristine || meta.touched) && meta.error}
                      </FormHelperText>
                    </FormControl>
                  )}
                </Field>
              </Grid>
            </Grid>

            <hr className={classes.hr} />

            <div className={classnames(classes.section, classes.formPart)}>
              <Typography
                component="h6"
                variant="h6"
                className={classes.yourReview}
              >
                YOUR REVIEW
              </Typography>

              <Grid container justify="space-between">
                <Grid item xs={12} sm={5}>
                  <Link
                    href="#"
                    variant="body2"
                    onClick={(event) => handleReviewGuidelinesModalChange(event, true)}
                    underline="always"
                    className={classes.btnLink}
                  >
                    See the review guidelines
                  </Link>

                  <Field name="summary">
                    {({ input, meta }) => (
                      <TextField
                        {...input}
                        label="Summary"
                        margin="dense"
                        variant="outlined"
                        fullWidth
                        required
                        error={Boolean(meta.touched && meta.error)}
                        helperText={((meta.touched && meta.error)
                          || 'What’s your opinion in one sentence? Example: Best guru ever.'
                        )}
                        inputProps={{
                          onBlur: (e) => input.onBlur(e),
                        }}
                      />
                    )}
                  </Field>

                  <Field name="review">
                    {({ input, meta }) => (
                      <TextField
                        {...input}
                        label="Your Review"
                        multiline
                        fullWidth
                        rows={6}
                        variant="outlined"
                        required
                        className={classes.textArea}
                        error={Boolean(meta.touched && meta.error)}
                        helperText={((meta.touched && meta.error)
                          || 'Tell other people more about this guru.'
                        )}
                        inputProps={{
                          onBlur: (e) => input.onBlur(e),
                        }}
                      />
                    )}
                  </Field>
                </Grid>

                <Grid item xs={12} sm={5} className={classes.rightSubSection}>
                  <Link
                    href="#"
                    variant="body2"
                    onClick={(event) => handlePhotoRequirementsModalChange(event, true)}
                    underline="always"
                    className={classes.btnLink}
                  >
                    See the photo requirements
                  </Link>

                  <ImageUploader
                    onImageChange={handleImageChange(PHOTO_UPLOAD_BEFORE_ID)}
                    onImageRemove={handleImageRemove}
                    inputId={PHOTO_UPLOAD_BEFORE_ID}
                    name="imageBefore"
                    label="Photo Before"
                  />

                  <ImageUploader
                    onImageChange={handleImageChange(PHOTO_UPLOAD_AFTER_ID)}
                    onImageRemove={handleImageRemove}
                    inputId={PHOTO_UPLOAD_AFTER_ID}
                    name="imageAfter"
                    label="Photo After"
                  />

                  <Typography variant="caption">
                    You can upload photos before and after working out and
                    tell other people your progress with that guru.
                  </Typography>
                </Grid>
              </Grid>
            </div>

            <div className={classnames(classes.section, classes.formPart)}>
              <Grid container justify="space-between">
                <Grid item xs={12} sm={5}>
                  <Typography>
                    By submitting a review you agree to our&nbsp;
                    <Link
                      underline="always"
                      component={NavigationLink}
                      to="/terms-and-conditions"
                    >
                      Terms and Conditions
                    </Link>
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={5} className={classes.rightSubSection}>
                  <LoadingButton
                    label="SUBMIT REVIEW"
                    loading={formStatus === REVIEW_PAGE_FORM_STATUS.FORM_SUBMIT_REVIEW_LOADING}
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    type="submit"
                  />
                </Grid>
              </Grid>
            </div>
          </form>
        )}
      </Form>
    </>
  );
};

ReviewForm.defaultProps = {
  guru: null,
};

ReviewForm.propTypes = {
  guru: PropTypes.shape({
    displayName: PropTypes.string,
    image: PropTypes.string,
  }),
};

export default ReviewForm;
