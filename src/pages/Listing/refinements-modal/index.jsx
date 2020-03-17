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
} from '@material-ui/core';
import {
  RefinementList,
  SaveFiltersBtn,
  ClearFiltersBtn,
  RangeSlider,
  ResultsNumber,
} from '../widgets';
import { toggleRefinementsModal } from '../actions';
import { useIsMobile } from '../../../core/hooks';

const useStyles = makeStyles({
  title: {
    padding: 24,
  },

  content: {
    padding: '0px 24px',
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
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      keepMounted
    >
      <DialogTitle
        id="scroll-dialog-title"
        className={classes.title}
      >
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            Filters
          </Grid>

          <Grid item>
            <ResultsNumber />
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent dividers className={classes.content}>
        <DialogContentText
          id="scroll-dialog-description"
          tabIndex={-1}
          component="div"
        >
          <RefinementList attribute="sport" header="Sport" divider />
          <RangeSlider attribute="priceFrom" header="Price" divider unit="$" />
          <RangeSlider attribute="duration" header="Duration (Days)" divider />
          <RefinementList attribute="methods.name" header="Methods" divider />
          <RefinementList attribute="languages" header="Languages" />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
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
