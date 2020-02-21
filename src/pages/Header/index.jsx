import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Grid,
  Button,
  Hidden,
  useMediaQuery,
} from '@material-ui/core';
import { KeyboardArrowDown } from '@material-ui/icons';

import { ReactComponent as Logo } from '../../svg/logo.svg';
import {
  NavigationRoutes, ADMIN, LANDING, LISTING,
} from '../../constants/routes';
import MobileDrawerNavigation from '../../components/mobile-drawer-navigation';
import AvatarNavButton from '../../components/avatar-nav-button';
import { toggleMobileNavigation } from './actions';
import { toggleBecomeGuruModal } from '../../modals/become-guru/actions';
import { toggleAuthModal } from '../../modals/auth/actions';
import { toggleUserSubmittedApplicationModal } from '../../modals/user-submitted-application/actions';
import {
  SIGN_IN,
  SIGN_UP,
} from '../../constants/authModalPages';
import Places from '../Listing/places';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  appBar: {
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: theme.palette.common.black,
    boxShadow: 'none',
    height: 80,
  },
  headerTransparent: {
    backgroundColor: 'transparent',
  },
  toolBar: {
    height: 'inherit',
  },
  logoWrapper: {
    display: 'inline-block',
    color: theme.palette.common.white,
  },
  logo: {
    width: 34,
    height: 34,
  },
  navigationWrapper: {
    height: 80,
  },
  nav: {
    height: 'inherit',
  },
  navBtnWrapper: {
    height: 'inherit',

    '&:hover': {
      borderBottom: `2px solid ${theme.palette.common.white}`,
    },
  },
  activeLink: {
    borderBottom: `2px solid ${theme.palette.common.white}`,
  },
  mobileNavOpen: {
    backgroundColor: theme.palette.common.white,
  },
  navBtn: {
    color: theme.palette.common.white,
    display: 'flex',
    alignItems: 'center',
    height: 'inherit',
    padding: '0 20px',
    textTransform: 'none',

    '&:hover': {
      textDecoration: 'none',
    },
  },
  logoBtn: {
    display: 'inline-block',
    height: 45,
  },
  [theme.breakpoints.up('md')]: {
    arrowWrapper: {
      display: 'none',
    },
  },
  arrow: {
    transform: 'rotate(0)',
    transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
    verticalAlign: 'super',
  },
  rotateArrow: {
    transform: 'rotate(180deg)',
    transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
    fill: 'rgb(118, 118, 118)',
  },
  orangeLogo: {
    '& path': {
      fill: theme.palette.secondary.light,
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const isMobileNavigationOpen = useSelector((state) => state.header.isMobileNavigationOpen);
  const auth = useSelector((state) => state.app.auth);
  const router = useSelector((state) => state.router);
  const location = useSelector((state) => state.app.location);
  const isAdminPage = router.location.pathname.indexOf(ADMIN) !== -1;
  const isLandingPage = router.location.pathname === LANDING;
  const isListingPage = router.location.pathname.indexOf(LISTING) !== -1;

  const toggleDrawer = (open) => (event) => {
    if (!isMobile) return;

    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    dispatch(toggleMobileNavigation(open));
  };

  const [, ...navRoutesWithoutHome] = NavigationRoutes;

  const openBecomeGuruModal = () => {
    if (auth && !auth.hasSubmittedApplication) {
      dispatch(toggleBecomeGuruModal(true));
    } else if (auth && auth.hasSubmittedApplication) {
      dispatch(toggleUserSubmittedApplicationModal(true));
    } else {
      dispatch(toggleAuthModal(true, SIGN_IN));
    }
  };

  const openSignInModal = () => {
    dispatch(toggleAuthModal(true, SIGN_IN));
  };

  const openSignUpModal = () => {
    dispatch(toggleAuthModal(true, SIGN_UP));
  };

  return (
    <div className={classes.root}>
      <MobileDrawerNavigation toggleDrawer={toggleDrawer} open={isMobileNavigationOpen} />
      <AppBar
        position="static"
        className={classnames(
          classes.appBar,
          {
            [classes.mobileNavOpen]: isMobileNavigationOpen,
            [classes.headerTransparent]: isLandingPage,
          },
        )}
      >
        <Toolbar className={classes.toolBar}>

          <Grid container alignItems="center">
            <Grid item xs={12} md={6} container alignItems="center">
              <Button
                className={classes.logoBtn}
                onClick={toggleDrawer(!isMobileNavigationOpen)}
                disableRipple
              >
                <div className={classes.logoWrapper}>
                  <Link to={LANDING}>
                    <Logo className={classnames(
                      classes.logo, { [classes.orangeLogo]: isMobileNavigationOpen },
                    )}
                    />
                  </Link>
                </div>
                <div className={classnames(classes.logoWrapper, classes.arrowWrapper)}>
                  <KeyboardArrowDown className={classnames(
                    classes.arrow, { [classes.rotateArrow]: isMobileNavigationOpen },
                  )}
                  />
                </div>
              </Button>
              {isListingPage && <Places defaultRefinement={location} />}

            </Grid>


            <Hidden smDown>
              <Grid
                item
                xs={6}
                className={classes.navigationWrapper}
              >
                <Grid
                  container
                  component="nav"
                  justify="flex-end"
                  alignItems="center"
                  className={classes.nav}
                >
                  {!isLandingPage && (
                    <Grid item className={classes.navBtnWrapper}>
                      <Button
                        className={classes.navBtn}
                        disableRipple
                        component={Link}
                        to={LANDING}
                      >
                        Home
                      </Button>
                    </Grid>
                  )}
                  {/* ADMIN */}
                  {auth && auth.isAdmin && (
                    <Grid
                      item
                      className={classnames(classes.navBtnWrapper,
                        { [classes.activeLink]: isAdminPage })}
                    >
                      <Button
                        className={classes.navBtn}
                        disableRipple
                        component={Link}
                        to={ADMIN}
                      >
                        Admin
                      </Button>
                    </Grid>
                  )}

                  {/* BECOME GURU */}
                  {!auth || (auth && !auth.isGuru) ? (
                    <Grid item className={classes.navBtnWrapper}>
                      <Button
                        className={classes.navBtn}
                        disableRipple
                        onClick={openBecomeGuruModal}
                      >
                        {navRoutesWithoutHome[0].name}
                      </Button>
                    </Grid>
                  ) : <></>}

                  {/* HELP */}
                  <Grid item className={classes.navBtnWrapper}>
                    <Button
                      className={classes.navBtn}
                      disableRipple
                      onClick={() => { }}
                    >
                      {navRoutesWithoutHome[1].name}
                    </Button>
                  </Grid>

                  {auth ? (
                    <Grid
                      item
                      className={classes.navBtnWrapper}
                    >
                      <AvatarNavButton />
                    </Grid>
                  ) : (
                    <>
                      {/* SIGN UP */}
                      <Grid item className={classes.navBtnWrapper}>
                        <Button
                          className={classes.navBtn}
                          disableRipple
                          onClick={openSignUpModal}
                        >
                          {navRoutesWithoutHome[2].name}
                        </Button>
                      </Grid>

                      {/* SIGN IN */}
                      <Grid item className={classes.navBtnWrapper}>
                        <Button
                          className={classes.navBtn}
                          disableRipple
                          onClick={openSignInModal}
                        >
                          {navRoutesWithoutHome[3].name}
                        </Button>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Grid>
            </Hidden>
          </Grid>

        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  isLandingPage: PropTypes.bool.isRequired,
};


export default Header;
