import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import LanguageIcon from '@material-ui/icons/Language';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import InfoLine from './info-line';
import SocialMediaInfoLine from './social-media-info-line';

const useStyles = makeStyles({
  secondaryInfo: {
    margin: '24px 0',
  },
  sectionIcon: {
    fontSize: 14,
    marginRight: 10,
  },
  verticalLine: {
    top: 0,
    left: '50%',
  },
});

const MainInfoContainer = ({
  priceFrom,
  duration,
  languages,
  subscribers,
  occupation,
  socialMedia,
}) => {
  const classes = useStyles();

  return (
    <Typography
      component="div"
      className={classes.secondaryInfo}
      id="secondary-info"
    >
      <Grid container justify="space-between" style={{ position: 'relative' }}>
        <Grid item xs={12} sm={6} style={{ paddingRight: 16 }}>
          <InfoLine
            icon={<PersonOutlineIcon className={classes.sectionIcon} />}
            label="Subscribers"
          >
            {subscribers && occupation !== undefined ? (
              <Typography variant="body2" align="right">
                {`${occupation}/${subscribers}`}
              </Typography>
            ) : (
              <Skeleton variant="rect" height={24} />
            )}
          </InfoLine>
          <InfoLine
            icon={<CreditCardIcon className={classes.sectionIcon} />}
            label="Price"
          >
            {priceFrom ? (
              <Typography variant="body2" align="right">
                {`From $${priceFrom}`}
              </Typography>
            ) : (
              <Skeleton variant="rect" height={24} />
            )}
          </InfoLine>
          <InfoLine
            icon={<HourglassEmptyIcon className={classes.sectionIcon} />}
            label="Programs duration"
          >
            {duration ? (
              <Typography variant="body2" align="right">
                {`${duration} days`}
              </Typography>
            ) : (
              <Skeleton variant="rect" height={24} />
            )}
          </InfoLine>
          <InfoLine
            icon={<LanguageIcon className={classes.sectionIcon} />}
            label="Languages"
          >
            {languages ? (
              <Typography variant="body2" align="right">
                {languages}
              </Typography>
            ) : (
              <Skeleton variant="rect" height={24} />
            )}
          </InfoLine>
        </Grid>

        {socialMedia ? (
          <>
            {Object.keys(socialMedia).length ? (
              <Divider
                orientation="vertical"
                absolute
                className={classes.verticalLine}
              />
            ) : null}

            <Grid item xs={12} sm={6} style={{ paddingLeft: 16 }}>
              <SocialMediaInfoLine
                name="facebook"
                value={socialMedia.facebook}
              />

              <SocialMediaInfoLine
                name="instagram"
                value={socialMedia.instagram}
              />

              <SocialMediaInfoLine
                name="skype"
                value={socialMedia.skype}
              />

              <SocialMediaInfoLine
                name="snapchat"
                value={socialMedia.snapchat}
              />

              <SocialMediaInfoLine
                name="tiktok"
                value={socialMedia.tiktok}
              />

              <SocialMediaInfoLine
                name="discord"
                value={socialMedia.discord}
              />
            </Grid>
          </>
        ) : (
          <>
            <Divider
              orientation="vertical"
              absolute
              className={classes.verticalLine}
            />
            <Grid item xs={12} sm={6} style={{ paddingLeft: 16 }}>
              <Skeleton variant="rect" height={160} />
            </Grid>
          </>
        )}
      </Grid>
    </Typography>
  );
};

MainInfoContainer.defaultProps = {
  priceFrom: '',
  duration: '',
  languages: '',
  subscribers: '',
  occupation: undefined,
  socialMedia: {},
};

MainInfoContainer.propTypes = {
  priceFrom: PropTypes.number,
  duration: PropTypes.string,
  languages: PropTypes.string,
  subscribers: PropTypes.string,
  occupation: PropTypes.number,
  socialMedia: PropTypes.shape({
    facebook: PropTypes.string,
    skype: PropTypes.string,
    snapchat: PropTypes.string,
    instagram: PropTypes.string,
    tiktok: PropTypes.string,
    discord: PropTypes.string,
  }),
};

export default MainInfoContainer;
