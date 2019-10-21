import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
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
  NavigationRoutes,
  HOME_BTN_NAME,
  BECOMEATRAINER_BTN_NAME,
  HELP_BTN_NAME,
} from '../../constants/routes';
import MobileDrawerNavigation from '../../components/mobile-drawer-navigation';
import ModalHeaderProvider from '../../components/modal-header-provider';
import AvatarNavButton from '../../components/avatar-nav-button';
import { Modal } from '../../core/components';
import { toggleMobileNavigation, toggleHeaderModal } from './actions';


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
    backgroundColor: 'transparent',
    boxShadow: 'none',
    height: 80,
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
      borderBottom: '2px solid white',
    },
  },
  mobileNavOpen: {
    zIndex: 9999,
    backgroundColor: theme.palette.common.white,
  },
  headerMobileModalOpen: {
    zIndex: 1,
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
    height: 'inherit',
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
      fill: 'rgb(255, 90, 95)',
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const isMobileNavigationOpen = useSelector((state) => state.header.isMobileNavigationOpen);
  const isHeaderModalOpen = useSelector((state) => state.header.isHeaderModalOpen);
  const headerModalName = useSelector((state) => state.header.headerModalName);
  const auth = useSelector((state) => state.app.auth);

  const toggleDrawer = (open) => (event) => {
    if (!isMobile) return;

    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    dispatch(toggleMobileNavigation(open));
  };

  const toggleModal = (open, modalName) => {
    if (
      modalName !== HOME_BTN_NAME
      && modalName !== HELP_BTN_NAME
      && modalName !== BECOMEATRAINER_BTN_NAME
    ) {
      dispatch(toggleHeaderModal(open, modalName));
    }
  };

  const [, ...navRoutesWithoutHome] = NavigationRoutes;

  return (
    <div className={classes.root}>
      <Modal
        fullScreen={isMobile}
        open={isHeaderModalOpen}
        onClose={() => toggleModal(false, '')}
      >
        <ModalHeaderProvider headerModalName={headerModalName} />
      </Modal>
      <MobileDrawerNavigation toggleDrawer={toggleDrawer} open={isMobileNavigationOpen} />
      <AppBar
        position="static"
        className={classnames(
          classes.appBar,
          {
            [classes.mobileNavOpen]: isMobileNavigationOpen,
            [classes.headerMobileModalOpen]: isHeaderModalOpen,
          },
        )}
      >
        <Toolbar className={classes.toolBar}>

          <Grid container alignItems="center">
            <Grid item xs={6}>
              <Button
                className={classes.logoBtn}
                onClick={toggleDrawer(!isMobileNavigationOpen)}
                disableRipple
              >
                <div className={classes.logoWrapper}>
                  <Logo className={classnames(
                    classes.logo, { [classes.orangeLogo]: isMobileNavigationOpen },
                  )}
                  />
                </div>
                <div className={classnames(classes.logoWrapper, classes.arrowWrapper)}>
                  <KeyboardArrowDown className={classnames(
                    classes.arrow, { [classes.rotateArrow]: isMobileNavigationOpen },
                  )}
                  />
                </div>
              </Button>
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
                  {navRoutesWithoutHome
                    .filter((navRoute) => !auth || !navRoute.shouldHideOnAuth)
                    .map((navRoute) => (
                      <Grid
                        item
                        key={navRoute.name}
                        className={classes.navBtnWrapper}
                      >
                        <Button
                          className={classes.navBtn}
                          disableRipple
                          onClick={() => toggleModal(true, navRoute.name)}
                        >
                          {navRoute.name}
                        </Button>
                      </Grid>
                    ))}

                  {auth && (
                    <Grid
                      item
                      className={classes.navBtnWrapper}
                    >
                      <AvatarNavButton />
                    </Grid>
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

export default Header;
