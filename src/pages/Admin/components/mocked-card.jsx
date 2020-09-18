import React from 'react';
import classnames from 'classnames';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  '@keyframes wave': {

    '0%': {
      backgroundPosition: '-468px 0',
    },
    '100%': {
      backgroundPosition: '468px 0',
    },
  },
  animated: {
    animation: '$wave 1s infinite linear forwards',
    background: 'linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%)',
    backgroundSize: '800px 104px',
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: '50%',
  },

  title: {
    width: '65%',
    height: 20,
    marginBottom: 5,
  },
  subtitle: {
    width: '90%',
    height: 20,
  },
  media: {
    width: '100%',
    height: 0,
    paddingTop: '75%', // 16:9 => 56.25%
  },
  rightBtn: {
    marginLeft: 'auto',
  },
});

const MockedCard = () => {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader
        avatar={<div className={classnames(classes.circle, classes.animated)} />}
        title={<div className={classnames(classes.title, classes.animated)} />}
        subheader={<div className={classnames(classes.subtitle, classes.animated)} />}
      />
      <div className={classnames(classes.media, classes.animated)} />
      <CardContent>
        <Typography component="div" paragraph>
          <div className={classnames(classes.title, classes.animated)} />
          <div className={classnames(classes.subtitle, classes.animated)} />
        </Typography>

        <Typography component="div" paragraph>
          <div className={classnames(classes.title, classes.animated)} />
          <div className={classnames(classes.subtitle, classes.animated)} />
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <div className={classnames(classes.circle, classes.animated)} />
        <div className={classnames(classes.circle, classes.animated)} />
        <div className={classnames(classes.circle, classes.rightBtn, classes.animated)} />
      </CardActions>
    </Card>
  );
};

export default MockedCard;
