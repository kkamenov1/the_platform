import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Slide,
  Grid,
  OutlinedInput,
  Typography,
  FormControl,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ModalHeader } from '../../../core/components';
import { setSocialMediaValue } from '../../../modals/become-guru/actions';

const useStyles = makeStyles({
  outlinedInput: {
    marginBottom: 40,
    paddingLeft: 0,
  },
  input: {
    paddingLeft: 5,
  },
  adornment: {
    width: '25%',
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    paddingLeft: 5,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  icon: {
    marginRight: 3,
    height: 24,
  },
});

const SocialMediaStep = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const becomeGuruModal = useSelector((state) => state.becomeGuruModal);
  const {
    activeStep,
    isIncreasingSteps,
    socialMedia,
  } = becomeGuruModal;

  const {
    facebook,
    instagram,
    snapchat,
    tiktok,
    skype,
    discord,
  } = socialMedia;

  const handleInputChange = (event) => {
    dispatch(setSocialMediaValue(event.target.name, event.target.value));
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
          heading="SOCIAL MEDIA (OPTIONAL)"
          caption="Almost done. Just a couple of social media settings."
        />
        <form>
          <Grid container justify="space-between" spacing={4}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <Typography component="h6" variant="button">
                  Facebook ID
                </Typography>
                <OutlinedInput
                  name="facebook"
                  margin="dense"
                  onChange={handleInputChange}
                  value={facebook}
                  className={classes.outlinedInput}
                  inputProps={{
                    className: classes.input,
                  }}
                  startAdornment={(
                    <Grid
                      container
                      alignItems="center"
                      className={classes.adornment}
                    >
                      <Grid item className={classes.icon}>
                        <img
                          alt="facebook"
                          src="https://img.icons8.com/ios-filled/24/3b5998/facebook-f.png"
                        />
                      </Grid>
                      <Grid item>/</Grid>
                    </Grid>
                  )}
                />
              </FormControl>

              <FormControl fullWidth>
                <Typography component="h6" variant="button">
                  Snapchat ID
                </Typography>
                <OutlinedInput
                  name="snapchat"
                  margin="dense"
                  value={snapchat}
                  onChange={handleInputChange}
                  className={classes.outlinedInput}
                  inputProps={{
                    className: classes.input,
                  }}
                  startAdornment={(
                    <Grid
                      container
                      alignItems="center"
                      className={classes.adornment}
                    >
                      <Grid item className={classes.icon}>
                        <img
                          alt="snapchat"
                          src="https://img.icons8.com/ios/24/000000/snapchat.png"
                        />
                      </Grid>
                      <Grid item>/</Grid>
                    </Grid>
                  )}
                />
              </FormControl>

              <FormControl fullWidth>
                <Typography component="h6" variant="button">
                  Skype ID
                </Typography>
                <OutlinedInput
                  name="skype"
                  margin="dense"
                  value={skype}
                  onChange={handleInputChange}
                  className={classes.outlinedInput}
                  inputProps={{
                    className: classes.input,
                  }}
                  startAdornment={(
                    <Grid
                      container
                      alignItems="center"
                      className={classes.adornment}
                    >
                      <Grid item className={classes.icon}>
                        <img alt="skype" src="https://img.icons8.com/offices/24/000000/skype.png" />
                      </Grid>
                      <Grid item>/</Grid>
                    </Grid>
                  )}
                />
              </FormControl>

            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <Typography component="h6" variant="button">
                  Instagram ID
                </Typography>
                <OutlinedInput
                  name="instagram"
                  margin="dense"
                  value={instagram}
                  onChange={handleInputChange}
                  className={classes.outlinedInput}
                  inputProps={{
                    className: classes.input,
                  }}
                  startAdornment={(
                    <Grid
                      container
                      alignItems="center"
                      className={classes.adornment}
                    >
                      <Grid item className={classes.icon}>
                        <img alt="instagram" src="https://img.icons8.com/color/24/000000/instagram-new.png" />
                      </Grid>
                      <Grid item>/</Grid>
                    </Grid>
                  )}
                />
              </FormControl>

              <FormControl fullWidth>
                <Typography component="h6" variant="button">
                  TikTok ID
                </Typography>
                <OutlinedInput
                  name="tiktok"
                  margin="dense"
                  value={tiktok}
                  onChange={handleInputChange}
                  className={classes.outlinedInput}
                  inputProps={{
                    className: classes.input,
                  }}
                  startAdornment={(
                    <Grid
                      container
                      alignItems="center"
                      className={classes.adornment}
                    >
                      <Grid item className={classes.icon}>
                        <img alt="TikTok" src="https://img.icons8.com/color/24/000000/tiktok.png" />
                      </Grid>
                      <Grid item>/</Grid>
                    </Grid>
                  )}
                />
              </FormControl>

              <FormControl fullWidth>
                <Typography component="h6" variant="button">
                  Discord Username
                </Typography>
                <OutlinedInput
                  name="discord"
                  margin="dense"
                  value={discord}
                  onChange={handleInputChange}
                  className={classes.outlinedInput}
                  inputProps={{
                    className: classes.input,
                  }}
                  startAdornment={(
                    <Grid
                      container
                      alignItems="center"
                      className={classes.adornment}
                    >
                      <Grid item className={classes.icon}>
                        <img alt="discord" src="https://img.icons8.com/color/24/000000/discord-logo.png" />
                      </Grid>
                      <Grid item>/</Grid>
                    </Grid>
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </div>
    </Slide>
  );
};

export default SocialMediaStep;
