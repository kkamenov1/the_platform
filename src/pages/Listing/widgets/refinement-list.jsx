import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connectRefinementList } from 'react-instantsearch-dom';
import { Switch, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  refinementValue: {
    textTransform: 'capitalize',
  },
});

const RefinementList = ({ items, refine }) => {
  const classes = useStyles();
  const sortedItems = items.sort((a, b) => a.label - b.label);

  return (
    <>
      {sortedItems.map(({ label, value, isRefined }) => {
        const handleChange = () => {
          refine(value);
        };

        return (
          <Grid
            key={label}
            container
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography className={classes.refinementValue}>
                {label}
              </Typography>
            </Grid>

            <Grid item>
              <Switch
                checked={isRefined}
                onChange={handleChange}
                color="primary"
              />
            </Grid>
          </Grid>
        );
      })}
    </>
  );
};

RefinementList.defaultProps = {
  items: [],
};

RefinementList.propTypes = {
  items: PropTypes.array,
  refine: PropTypes.func.isRequired,
};

export default connectRefinementList(RefinementList);
