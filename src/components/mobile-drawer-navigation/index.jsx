import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import {
  Drawer,
  Link as NavigationLink,
  List,
  ListItem,
  Divider,
  Typography,
  Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import {
  LANDING,
  HOME_BTN_NAME,
  BECOMEATRAINER_BTN_NAME,
  HELP_BTN_NAME,
  SIGNUP_BTN_NAME,
  LOGIN_BTN_NAME,
} from '../../constants/routes';
import { toggleHeaderModal } from '../../pages/Header/actions';
import { ReactComponent as GymIcon } from '../../svg/gym.svg';

const useStyles = makeStyles((theme) => ({
  drawer: {
    position: 'fixed',
    top: 80,
    left: 0,
    height: '100%',
    padding: 24,
    background: theme.palette.common.white,
  },
  listItem: {
    padding: '12px 0',
    display: 'block',
    position: 'relative',
  },
  navLink: {
    width: '100%',
    display: 'block',
    fontSize: 18,
    color: 'rgb(72, 72, 72)',
    textDecoration: 'none',
  },
  navBtn: {
    textTransform: 'none',
    padding: '6px 6px 6px 0',
  },
  displayBlock: {
    display: 'block',
  },
  divider: {
    margin: '12px 0',
  },
  infoText: {
    fontSize: 13,
    padding: '10px 80px 0 0',
  },
  iconWrapper: {
    width: 40,
    height: 40,
    position: 'absolute',
    top: 0,
    right: 10,
  },
}));

const MobileDrawerNavigation = ({ toggleDrawer, open }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const toggleModal = (openModal, modalName) => {
    if (
      modalName !== HOME_BTN_NAME
      && modalName !== HELP_BTN_NAME
      && modalName !== BECOMEATRAINER_BTN_NAME
    ) {
      dispatch(toggleHeaderModal(openModal, modalName));
    }
  };

  return (
    <Drawer
      anchor="top"
      open={open}
      onClose={toggleDrawer(false)}
      classes={{
        paper: classes.drawer,
      }}
    >
      <nav>
        <List>
          <ListItem className={classes.listItem}>
            <NavigationLink
              component={Link}
              to={LANDING}
              className={classes.navLink}
            >
              <span>{HOME_BTN_NAME}</span>
            </NavigationLink>
          </ListItem>

          <Divider component="li" className={classes.divider} />

          <ListItem className={classes.listItem}>
            <Button
              className={classnames(classes.navLink, classes.navBtn)}
              disableRipple
              onClick={() => toggleModal(true, BECOMEATRAINER_BTN_NAME)}
            >
              <Typography
                component="span"
                className={classes.navLink}
                align="left"
              >
                {BECOMEATRAINER_BTN_NAME}
              </Typography>
              <div className={classes.iconWrapper}>
                <GymIcon />
              </div>
              <Typography
                className={classnames(classes.infoText, classes.displayBlock)}
                component="span"
                align="left"
              >
                Become part of the
                {' '}
                <strong>GYMGURUS</strong>
                {' '}
                family and start earning money today.
              </Typography>
            </Button>
          </ListItem>

          <Divider component="li" className={classes.divider} />

          <ListItem className={classes.listItem}>
            <Button
              className={classnames(classes.navLink, classes.navBtn)}
              disableRipple
              onClick={() => toggleModal(true, HELP_BTN_NAME)}
            >
              <Typography
                component="span"
                className={classes.navLink}
                align="left"
              >
                {HELP_BTN_NAME}
              </Typography>
            </Button>
          </ListItem>

          <ListItem className={classes.listItem}>
            <Button
              className={classnames(classes.navLink, classes.navBtn)}
              disableRipple
              onClick={() => toggleModal(true, SIGNUP_BTN_NAME)}
            >
              <Typography
                component="span"
                className={classes.navLink}
                align="left"
              >
                {SIGNUP_BTN_NAME}
              </Typography>
            </Button>
          </ListItem>

          <ListItem className={classes.listItem}>
            <Button
              className={classnames(classes.navLink, classes.navBtn)}
              disableRipple
              onClick={() => toggleModal(true, LOGIN_BTN_NAME)}
            >
              <Typography
                component="span"
                className={classes.navLink}
                align="left"
              >
                {LOGIN_BTN_NAME}
              </Typography>
            </Button>
          </ListItem>
        </List>
      </nav>
    </Drawer>
  );
};

MobileDrawerNavigation.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default MobileDrawerNavigation;
