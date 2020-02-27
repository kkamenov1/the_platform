import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import {
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
} from '@material-ui/core';
import RefinementList from './widgets/refinement-list';
import SaveFiltersBtn from './widgets/save-filters-btn';
import ClearFiltersBtn from './widgets/clear-filters-btn';
import RangeSlider from './widgets/range-slider';
import ResultsNumber from './widgets/results-number';
import { toggleRefinementsModal } from '../actions';

const useStyles = makeStyles({
  title: {
    padding: 24,
  },

  content: {
    padding: '0px 24px',
  },
});

const RefinementsModal = () => {
  const descriptionElementRef = useRef(null);
  const dispatch = useDispatch();
  const theme = useTheme();
  const classes = useStyles();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const refinementsModalOpen = useSelector((state) => state.listing.refinementsModalOpen);

  useEffect(() => {
    if (refinementsModalOpen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [refinementsModalOpen]);

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
          ref={descriptionElementRef}
        >
          <RefinementList attribute="sport" header="Sport" divider />
          <RangeSlider attribute="duration" header="Duration" divider />
          <RefinementList attribute="methods.name" header="Methods" divider />
          <RefinementList attribute="languages" header="Languages" />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <ClearFiltersBtn />
        <SaveFiltersBtn onClick={closeModal} />
      </DialogActions>
    </Dialog>
  );
};

export default RefinementsModal;
