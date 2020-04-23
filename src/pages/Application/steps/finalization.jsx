import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Slide } from '@material-ui/core';
import { ModalHeader } from '../../../core/components';

const useStyles = makeStyles({
  img: {
    width: '100%',
  },
});

const Finalization = () => {
  const classes = useStyles();
  const application = useSelector((state) => state.application);
  const {
    activeStep,
    isIncreasingSteps,
  } = application;

  return (
    <Slide
      direction={isIncreasingSteps ? 'left' : 'right'}
      in={activeStep > 3}
      mountOnEnter
      unmountOnExit
    >
      <div>
        <ModalHeader
          heading="THANK YOU FOR APPLYING"
          caption={`We will get back to you within 48 hours if we accept
          your application. Please check your email.`}
        />
        <img
          src="https://res.cloudinary.com/dl766ebzy/image/upload/v1574339507/email_c1gb9i.gif"
          alt="check-email"
          className={classes.img}
        />
      </div>
    </Slide>
  );
};

export default Finalization;
