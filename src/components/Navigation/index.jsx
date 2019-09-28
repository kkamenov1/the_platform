import React from 'react'
import {
  AppBar,
  Toolbar,
  Link as NavigationLink,
  Grid,
  List,
  ListItem
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../../svg/logo.svg'
import { NavigationRoutes, LANDING } from '../../constants/routes'

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
    backgroundColor: 'transparent',
    boxShadow: 'none',
    height: 80
  },
  toolBar: {
    height: 'inherit'
  },
  logo: {
    width: 34,
    height: 34
  },
  list: {
    display: 'inline'
  },
  listItem: {
    display: 'inline'
  },
  navigationLink: {
    color: theme.palette.common.white
  },
  logoLink: {
    padding: 20
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
              <NavigationLink component={Link} to={LANDING} className={classes.logoLink}>
                <Logo className={classes.logo}/>
              </NavigationLink>
            </Grid>

            <Grid item xs={6}>
              <Grid component="nav" container justify="flex-end" alignItems="center">
                <List className={classes.list}>
                  {NavigationRoutes.map(navRoute => (
                    <ListItem key={navRoute.name} className={classes.listItem}>
                      <NavigationLink
                        component={Link}
                        to={navRoute.path}
                        className={classes.navigationLink}
                      >
                        {navRoute.name}
                      </NavigationLink>
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          </Grid>

        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navigation
