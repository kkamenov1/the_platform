import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connectRefinementList } from 'react-instantsearch-dom';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { RatingWithCount } from '../../../core/components';

const useStyles = makeStyles({
  wrapper: {
    '&:not(:last-child)': {
      marginBottom: 8,
    },
  },
  btn: {
    textTransform: 'none',
    color: 'black',
    padding: 0,

    '&:hover': {
      backgroundColor: 'transparent',
    },
  },

  isRefined: {
    '& span[class*="ratingCount"]': {
      fontSize: 15,
      fontWeight: 700,
    },
  },
});

const RatingMenu = ({ items, refine }) => {
  const classes = useStyles();
  const sortedItems = items.sort((a, b) => Number(b.label) - Number(a.label));

  return (
    <>
      {sortedItems.map(({
        label, value, count, isRefined,
      }) => (
        <div key={`star-refinement-${label}`} className={classes.wrapper}>
          <Button
            className={classnames(classes.btn, {
              [classes.isRefined]: isRefined,
            })}
            disableRipple
            onClick={(event) => {
              event.preventDefault();
              refine(value);
            }}
          >
            <RatingWithCount
              rating={Number(label)}
              ratingCount={count}
              size="medium"
            />
          </Button>
        </div>
      ))}
    </>
  );
};

RatingMenu.defaultProps = {
  items: [],
};

RatingMenu.propTypes = {
  items: PropTypes.array,
  refine: PropTypes.func.isRequired,
};

export default connectRefinementList(RatingMenu);
