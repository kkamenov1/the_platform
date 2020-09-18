import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Menu, MenuItem, Divider, Button,
} from '@material-ui/core';
import { withFirebase } from '../../core/lib/Firebase';
import {
  PROFILE,
  DASHBOARD,
} from '../../constants/routes';

const useStyles = makeStyles((theme) => ({
  menu: {
    width: 280,
  },
  menuItem: {
    minHeight: 0,
    padding: 0,
  },
  item: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: theme.typography.pxToRem(theme.typography.fontSize),
    textDecoration: 'none',
    textTransform: 'none',
    minWidth: 0,
    padding: '10px 16px',
    display: 'block',
    width: '100%',
    textAlign: 'left',
  },
}));

const MenuDropDown = ({ onClose, anchorEl, firebase }) => {
  const classes = useStyles();

  return (
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={onClose}
      classes={{
        paper: classes.menu,
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      elevation={0}
      getContentAnchorEl={null}
    >
      <MenuItem className={classes.menuItem}>
        <Button component={Link} to={PROFILE} className={classes.item}>Profile</Button>
      </MenuItem>
      <Divider />

      <MenuItem className={classes.menuItem}>
        <Button component={Link} to={DASHBOARD} className={classes.item}>Dashboard</Button>
      </MenuItem>
      <Divider />

      <MenuItem className={classes.menuItem}>
        <Button
          disableRipple
          className={classes.item}
          onClick={firebase.doSignOut}
        >
          Log Out
        </Button>
      </MenuItem>
    </Menu>
  );
};

MenuDropDown.defaultProps = {
  anchorEl: null,
};

MenuDropDown.propTypes = {
  onClose: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  anchorEl: PropTypes.object,
  firebase: PropTypes.shape({
    doSignOut: PropTypes.func.isRequired,
  }).isRequired,
};

export default withFirebase(MenuDropDown);
