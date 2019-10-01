import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classnames from 'classnames'
import {
  AppBar,
  Toolbar,
  Link as NavigationLink,
  Grid,
  Button
} from '@material-ui/core'
import { KeyboardArrowDown } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../../svg/logo.svg'
import { NavigationRoutes } from '../../constants/routes'
import MobileDrawerNavigation from '../../components/mobile-drawer-navigation'
import { toggleMobileNavigation } from './actions'


const useStyles = makeStyles(theme => ({
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
    height: 80
  },
  toolBar: {
    height: 'inherit'
  },
  logoWrapper: {
    display: 'inline-block',
    color: theme.palette.common.white
  },
  logo: {
    width: 34,
    height: 34
  },
  navigationWrapper: {
    height: 80,
    display: 'none',

    [theme.breakpoints.up('md')]: {
      display: 'block'
    }
  },
  nav: {
    height: 'inherit'
  },
  navLinkWrapper: {
    height: 'inherit',

    '&:hover': {
      borderBottom: '2px solid white'
    }
  },
  mobileNavOpen: {
    zIndex: 9999,
    backgroundColor: theme.palette.common.white
  },
  navigationLink: {
    color: theme.palette.common.white,
    display: 'flex',
    alignItems: 'center',
    height: 'inherit',
    padding: '0 20px',

    '&:hover': {
      textDecoration: 'none'
    }
  },
  logoLink: {
    padding: 20,
    display: 'inline-block',
    height: 'inherit'
  },
  [theme.breakpoints.up('md')]: {
    arrowWrapper: {
      display: 'none'
    }
  },
  arrow: {
    transform: 'rotate(0)',
    transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
    verticalAlign: 'super'
  },
  rotateArrow: {
    transform: 'rotate(180deg)',
    transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
    fill: 'rgb(118, 118, 118)'
  },
  orangeLogo: {
    '& path': {
      fill: 'rgb(255, 90, 95)'
    }
  }
}))

const Navigation = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const open = useSelector(state => state.header.isMobileNavigationOpen)

  const toggleDrawer = open => event => {
    if (window.innerWidth > 960) return

    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    dispatch(toggleMobileNavigation(open))
  }

  return (
    <div className={classes.root}>
      <MobileDrawerNavigation toggleDrawer={toggleDrawer} open={open} />
      <AppBar position="static" className={classnames(
        classes.appBar, { [classes.mobileNavOpen]: open }
      )}>
        <Toolbar className={classes.toolBar}>

          <Grid container alignItems="center">
            <Grid item xs={6}>
              <Button
                className={classes.logoLink}
                onClick={toggleDrawer(!open)}
                disableRipple
              >
                <div className={classes.logoWrapper}>
                  <Logo className={classnames(
                    classes.logo, { [classes.orangeLogo]: open }
                  )} />
                </div>
                <div className={classnames(classes.logoWrapper, classes.arrowWrapper)}>
                  <KeyboardArrowDown className={classnames(
                    classes.arrow, { [classes.rotateArrow]: open }
                  )} />
                </div>
              </Button>
            </Grid>

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
                {NavigationRoutes.map(navRoute => (
                  <Grid
                    item 
                    key={navRoute.name}
                    className={classes.navLinkWrapper}
                  >
                    <NavigationLink
                      component={Link}
                      to={navRoute.path}
                      className={classes.navigationLink}
                    >
                      {navRoute.name}
                    </NavigationLink>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>

        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navigation
