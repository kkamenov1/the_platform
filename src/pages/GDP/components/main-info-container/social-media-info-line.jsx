import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    marginBottom: 16,
  },
  iconContainer: {
    marginRight: 8,
    height: 16,
  },
  value: {
    fontSize: 14,
  },
});

const mapSocialMediaNameToIconSource = (socialMediaName) => {
  const sanitizedSocialMediaName = socialMediaName.toLowerCase().trim();

  switch (sanitizedSocialMediaName) {
    case 'facebook':
      return 'https://img.icons8.com/ios-filled/16/3b5998/facebook-f.png';
    case 'snapchat':
      return 'https://img.icons8.com/ios/16/000000/snapchat.png';
    case 'skype':
      return 'https://img.icons8.com/offices/16/000000/skype.png';
    case 'instagram':
      return 'https://img.icons8.com/color/16/000000/instagram-new.png';
    case 'tiktok':
      return 'https://img.icons8.com/color/16/000000/tiktok.png';
    case 'discord':
      return 'https://img.icons8.com/color/24/000000/discord-logo.png';
    default:
      return '';
  }
};

const SocialMediaInfoLine = ({ name, value }) => {
  const classes = useStyles();

  return (
    <>
      {value ? (
        <Grid container alignItems="center" className={classes.container}>
          <Grid item className={classes.iconContainer}>
            <img
              src={mapSocialMediaNameToIconSource(name)}
              alt={name}
            />
          </Grid>

          <Grid item>
            <Typography component="span" className={classes.value}>
              {value}
            </Typography>
          </Grid>
        </Grid>
      ) : (
        null
      )}
    </>
  );
};

export default SocialMediaInfoLine;
