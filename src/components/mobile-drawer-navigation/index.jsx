import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Drawer,
  Link as NavigationLink,
  List,
  ListItem,
  Divider,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { NavigationRoutes } from '../../constants/routes';
import { ReactComponent as DBIcon } from '../../svg/dumbbell.svg';

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
          {NavigationRoutes.map((navRoute, i) => (
            <React.Fragment key={`test + ${i}`}>
              <ListItem className={classes.listItem}>
                <NavigationLink
                  component={Link}
                  to={navRoute.path}
                  className={classes.navLink}
                >
                  <span>{navRoute.name}</span>
                  {i === 1 && (
                    <>
                      <div className={classes.iconWrapper}>
                        <DBIcon />
                      </div>
                      <Typography className={classes.infoText}>
                        Become part of the
                        {' '}
                        <strong>GYMGURUS</strong>
                        {' '}
family and start earning money today.
                      </Typography>
                    </>
                  )}
                </NavigationLink>

              </ListItem>
              {(i === 0 || i === 1) && (
                <Divider component="li" className={classes.divider} />
              )}
            </React.Fragment>
          ))}
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
