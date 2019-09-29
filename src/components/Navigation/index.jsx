import React from 'react'
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
    paddingBottom: 5
  }
}))

const Navigation = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>

          <Grid container alignItems="center">
            <Grid item xs={6}>
              <Button className={classes.logoLink}>
                <div className={classes.logoWrapper}>
                  <Logo className={classes.logo}/>
                </div>
                <div className={classnames(classes.logoWrapper, classes.arrowWrapper)}>
                  <KeyboardArrowDown className={classes.arrow}/>
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
