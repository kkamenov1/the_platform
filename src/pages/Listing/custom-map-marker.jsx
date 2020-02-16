import React from 'react';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { CustomMarker } from 'react-instantsearch-dom-maps';
import { getMinimalPrice } from '../../core/utils';

const useStyles = makeStyles((theme) => ({
  marker: {
    position: 'relative',
    color: theme.palette.common.black,
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.grey[100]}`,
    fontWeight: theme.typography.fontWeightMedium,
    padding: '3px 5px',
    boxShadow: theme.shadows[2],

    '&:after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      width: 8,
      height: 8,
      bottom: -5,
      backgroundColor: theme.palette.common.white,
      borderColor: theme.palette.grey[100],
      borderWidth: '0 1px 1px 0',
      borderStyle: 'solid',
      left: '50%',
      marginLeft: -4,
      transform: 'rotate(45deg)',
    },
  },

  activeMarker: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    border: `1px solid ${theme.palette.common.black}`,

    '&:after': {
      backgroundColor: theme.palette.common.black,
      borderColor: theme.palette.common.black,
    },
  },
}));

const CustomMapMarker = ({ hit, onHitOver, selectedHit }) => {
  const classes = useStyles();
  const minPriceAttribute = `$${getMinimalPrice(hit.methods)}`;

  return (
    <CustomMarker
      key={hit.objectID}
      hit={hit}
      anchor={{ x: 0, y: 5 }}
      onMouseEnter={() => onHitOver(hit)}
      onMouseLeave={() => onHitOver(null)}
    >
      <Typography
        component="div"
        className={classnames(classes.marker, {
          [classes.activeMarker]: selectedHit && selectedHit.objectID === hit.objectID,
        })}
      >
        <span>{minPriceAttribute}</span>
      </Typography>
    </CustomMarker>
  );
};

export default CustomMapMarker;
