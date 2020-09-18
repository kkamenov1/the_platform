import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {
  RefinementList,
  SaveFiltersBtn,
  ClearFiltersBtn,
  RangeSlider,
  ResultsNumber,
  RatingMenu,
  RefinementSection,
} from '../widgets';
import { toggleRefinementsModal } from '../actions';
import { useIsMobile } from '../../../core/hooks';

const useStyles = makeStyles({
  title: {
    padding: 24,
  },

  actions: {
    padding: 16,
  },

  content: {
    padding: '0px 24px',
  },

  dialogContentText: {
    outline: 0,
  },
});

const RefinementsModal = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const isMobile = useIsMobile('sm');
  const refinementsModalOpen = useSelector((state) => state.listing.refinementsModalOpen);

  const closeModal = () => {
    dispatch(toggleRefinementsModal(false));
  };


  return (
    <Dialog
      fullWidth
      fullScreen={isMobile}
      open={refinementsModalOpen}
      onClose={closeModal}
      keepMounted
    >
      <DialogTitle className={classes.title}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            Filters
          </Grid>

          <Grid item>
            {!isMobile ? <ResultsNumber /> : (
              <IconButton
                className={classes.closeBtn}
                disableRipple
                onClick={closeModal}
              >
                <CloseIcon />
              </IconButton>
            )}
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent dividers className={classes.content}>
        <DialogContentText
          tabIndex={-1}
          component="div"
          className={classes.dialogContentText}
        >
          <RefinementSection header="Sport" divider>
            <RefinementList attribute="sport" />
          </RefinementSection>

          <RefinementSection header="Price" divider>
            <RangeSlider attribute="priceFrom" unit="$" />
          </RefinementSection>

          <RefinementSection header="Duration (Days)" divider>
            <RangeSlider attribute="duration" />
          </RefinementSection>

          <RefinementSection header="Methods" divider>
            <RefinementList attribute="methods.name" />
          </RefinementSection>

          <RefinementSection header="Languages" divider>
            <RefinementList attribute="languages" />
          </RefinementSection>

          <RefinementSection header="Rating">
            <RatingMenu attribute="rating" />
          </RefinementSection>
        </DialogContentText>
      </DialogContent>
      <DialogActions className={classes.actions}>
        <ClearFiltersBtn variant="outlined" />
        <SaveFiltersBtn
          variant="contained"
          color="primary"
          onClick={closeModal}
        />
      </DialogActions>
    </Dialog>
  );
};

export default RefinementsModal;
