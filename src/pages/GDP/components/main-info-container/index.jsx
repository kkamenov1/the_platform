import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import LanguageIcon from '@material-ui/icons/Language';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import InfoLine from './info-line';

const useStyles = makeStyles({
  secondaryInfo: {
    marginTop: 24,
  },
  sectionIcon: {
    fontSize: 14,
    marginRight: 10,
  },
});

const MainInfoContainer = ({
  priceFrom,
  duration,
  languages,
  subscribers,
  occupation,
}) => {
  const classes = useStyles();

  return (
    <Typography
      component="div"
      className={classes.secondaryInfo}
      id="secondary-info"
    >
      <Grid container justify="space-between">
        <Grid item xs={12} sm={6}>
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

        <Grid item xs={12} sm={6} />

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
};

MainInfoContainer.propTypes = {
  priceFrom: PropTypes.number,
  duration: PropTypes.string,
  languages: PropTypes.string,
  subscribers: PropTypes.string,
  occupation: PropTypes.number,
};

export default MainInfoContainer;
