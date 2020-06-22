import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography, Grid, CircularProgress, Input, Button,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { Field } from 'react-final-form';
import { KILOBYTE } from '../../../constants/files';
import FormError from '../form-error';
import StandardInputLabel from '../standard-input-label';
import { validateImage } from '../../form-validators/image';

const useStyles = makeStyles({
  preview: {
    display: 'inline-block',
    marginLeft: 20,
    fontSize: 14,
  },
  upload: {
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    color: '#019aff',
    padding: 9,
  },
  text: {
    lineHeight: '45px',
  },
  size: {
    fontWeight: 500,
  },
  imageName: {
    maxWidth: 150,
    display: 'inline-block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 1,
    fontWeight: 500,
    fontSize: 14,
  },
  closeIconWrapper: {
    height: 25,
    cursor: 'pointer',
  },
  closeIcon: {
    '& > svg': {
      fontSize: 16,
      color: '#768792',
    },
  },
  loadingProgressImage: {
    height: 16,
    marginLeft: 8,
  },
});

const ImageUploader = ({
  onImageChange,
  onImageRemove,
  inputId,
  label,
  name,
}) => {
  const classes = useStyles();
  const inputRef = React.useRef(null);
  const triggerDialogBox = (e, input) => {
    inputRef.current.click();
    input.onBlur(e);
  };

  return (
    <div>
      <Field
        name={name}
        validate={validateImage}
      >
        {({ input, meta }) => (
          <>
            <StandardInputLabel error={Boolean(meta.touched && meta.error)}>
              <Grid container alignItems="center">
                <Grid item>
                  {label}
                </Grid>
                <Grid item>
                  {input.value.loading && (
                    <div className={classes.loadingProgressImage}>
                      <CircularProgress size={16} />
                    </div>
                  )}
                </Grid>
              </Grid>
            </StandardInputLabel>

            <Input
              type="file"
              required
              {...input}
              style={{ display: 'none' }}
              inputProps={{
                accept: 'image/*',
                id: inputId,
                type: 'file',
                value: undefined,
                ref: inputRef,
              }}
              onChange={(e) => onImageChange(e, input)}
              error={Boolean(meta.touched && meta.error)}
            />
            <Button
              onClick={(e) => triggerDialogBox(e, input)}
              variant="contained"
              color="primary"
            >
              Upload photo
            </Button>

            {input.value.public_id ? (
              <>
                <Typography
                  component="div"
                  className={classnames(classes.preview, classes.upload)}
                >
                  <Grid container spacing={1} alignItems="center">
                    <Grid item className={classes.imageName}>
                      {input.value.fileName}
                    </Grid>
                    <Grid
                      item
                      className={classes.closeIconWrapper}
                      onClick={() => onImageRemove(input.value.public_id, input)}
                    >
                      <Typography component="span" className={classes.closeIcon}>
                        <ClearIcon />
                      </Typography>
                    </Grid>
                  </Grid>
                </Typography>
                <Typography
                  component="div"
                  className={classnames(classes.preview, classes.text, classes.size)}
                >
                  {`${(input.value.fileSize / KILOBYTE).toFixed(2)} KB`}
                </Typography>
              </>
            ) : (
              <Typography
                component="div"
                className={classnames(classes.preview, classes.text)}
              >
                No file selected.
              </Typography>
            )}

            <FormError>
              {meta.touched && meta.error}
            </FormError>
          </>
        )}
      </Field>
    </div>
  );
};

ImageUploader.propTypes = {
  onImageChange: PropTypes.func.isRequired,
  onImageRemove: PropTypes.func.isRequired,
  inputId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default ImageUploader;
