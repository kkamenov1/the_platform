import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import {
  Drawer,
  List,
  ListItem,
  Divider,
  Typography,
  Button,
  Grid,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import {
  ADMIN,
  LANDING,
  PROFILE,
  DASHBOARD,
} from '../../constants/routes';
import { toggleAuthModal } from '../../modals/auth/actions';
import { toggleBecomeGuruModal } from '../../modals/become-guru/actions';
import { ReactComponent as GymIcon } from '../../svg/gym.svg';
import { ReactComponent as DashboardIcon } from '../../svg/dashboard.svg';
import { ReactComponent as ProfileIcon } from '../../svg/profile.svg';
import { withFirebase } from '../../core/lib/Firebase';
import {
  SIGN_IN,
  SIGN_UP,
} from '../../constants/authModalPages';


const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: '1 !important',
  },
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
    fontSize: theme.typography.pxToRem(18),
    color: theme.palette.text.primary,
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
    fontSize: theme.typography.pxToRem(theme.typography.fontSize),
    padding: '10px 80px 0 0',
  },
  iconWrapper: {
    width: 40,
    height: 40,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  icon: {
    width: 30,
    height: 30,
  },
}));

const MobileDrawerNavigation = ({
  toggleDrawer, open, firebase,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.app.auth);

  const openBecomeGuruModal = () => {
    dispatch(toggleBecomeGuruModal(true));
  };

  const openSignInModal = () => {
    dispatch(toggleAuthModal(true, SIGN_IN));
  };

  const openSignUpModal = () => {
    dispatch(toggleAuthModal(true, SIGN_UP));
  };

  return (
    <Drawer
      anchor="top"
      open={open}
      onClose={toggleDrawer(false)}
      classes={{
        root: classes.root,
        paper: classes.drawer,
      }}
    >
      <nav>
        <List>
          <ListItem className={classes.listItem}>
            <Link
              to={LANDING}
              className={classes.navLink}
              onClick={toggleDrawer(false)}
            >
              Home
            </Link>
          </ListItem>

          <Divider component="li" className={classes.divider} />

          {auth && (
            <>
              {auth.isAdmin && (
                <ListItem className={classes.listItem}>
                  <Link
                    to={ADMIN}
                    className={classes.navLink}
                    onClick={toggleDrawer(false)}
                  >
                    Admin
                  </Link>
                </ListItem>
              )}

              <ListItem className={classes.listItem}>
                <Link
                  to={PROFILE}
                  className={classes.navLink}
                  onClick={toggleDrawer(false)}
                >
                  <Grid container justify="space-between" alignItems="center">
                    <Grid item>
                      <Typography component="span" className={classes.navLink}>
                        Profile
                      </Typography>
                    </Grid>

                    <Grid item>
                      <ProfileIcon className={classes.icon} />
                    </Grid>
                  </Grid>
                </Link>
              </ListItem>

              <ListItem className={classes.listItem}>
                <Link
                  to={DASHBOARD}
                  className={classes.navLink}
                  onClick={toggleDrawer(false)}
                >
                  <Grid container justify="space-between" alignItems="center">
                    <Grid item>
                      <Typography component="span" className={classes.navLink}>
                        Dashboard
                      </Typography>
                    </Grid>

                    <Grid item>
                      <DashboardIcon className={classes.icon} />
                    </Grid>
                  </Grid>
                </Link>
              </ListItem>

              <Divider component="li" className={classes.divider} />
            </>
          )}

          <ListItem className={classes.listItem}>
            <Button
              className={classnames(classes.navLink, classes.navBtn)}
              disableRipple
              onClick={openBecomeGuruModal}
            >
              <Typography
                component="span"
                className={classes.navLink}
                align="left"
              >
                Become a GURU
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
              onClick={() => {}}
            >
              <Typography
                component="span"
                className={classes.navLink}
                align="left"
              >
                Help
              </Typography>
            </Button>
          </ListItem>

          {!auth ? (
            <>
              <ListItem className={classes.listItem}>
                <Button
                  className={classnames(classes.navLink, classes.navBtn)}
                  disableRipple
                  onClick={openSignUpModal}
                >
                  <Typography
                    component="span"
                    className={classes.navLink}
                    align="left"
                  >
                    Sign up
                  </Typography>
                </Button>
              </ListItem>

              <ListItem className={classes.listItem}>
                <Button
                  className={classnames(classes.navLink, classes.navBtn)}
                  disableRipple
                  onClick={openSignInModal}
                >
                  <Typography
                    component="span"
                    className={classes.navLink}
                    align="left"
                  >
                    Log in
                  </Typography>
                </Button>
              </ListItem>
            </>
          ) : (
            <ListItem className={classes.listItem}>
              <Button
                className={classnames(classes.navLink, classes.navBtn)}
                disableRipple
                onClick={firebase.doSignOut}
              >
                <Typography
                  component="span"
                  className={classes.navLink}
                  align="left"
                >
                  Log Out
                </Typography>
              </Button>
            </ListItem>
          )}

        </List>
      </nav>
    </Drawer>
  );
};

MobileDrawerNavigation.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  firebase: PropTypes.shape({
    doSignOut: PropTypes.func.isRequired,
  }).isRequired,
};

export default withFirebase(MobileDrawerNavigation);
