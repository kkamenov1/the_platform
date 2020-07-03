import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Slide } from '@material-ui/core';
import { ModalHeader } from '../../../../core/components';
import ActionBar from '../../action-bar';

const useStyles = makeStyles({
  img: {
    width: '100%',
  },
});

const FinalizationStep = () => {
  const classes = useStyles();
  const activeStep = useSelector((state) => state.application.general.activeStep);
  const isIncreasingSteps = useSelector((state) => state.application.general.isIncreasingSteps);
  const generalFormError = useSelector((state) => state.application.general.generalFormError);

  return (
    <Slide
      direction={isIncreasingSteps ? 'left' : 'right'}
      in={activeStep > 3}
      mountOnEnter
      unmountOnExit
    >
      <div>
        {generalFormError ? (
          <ModalHeader
            heading="Oops..."
            caption="Something went wrong submitting your application"
          />
        ) : (
          <>
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
          </>
        )}
        <ActionBar />
      </div>
    </Slide>
  );
};

export default FinalizationStep;
