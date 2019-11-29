import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography, List, ListItem, Collapse, Grid, Button,
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { withFirebase } from '../../core/lib/Firebase';
import { setApplications, toggleApplicationVisibility } from './actions';

const useStyles = makeStyles((theme) => ({
  inlineBlock: {
    display: 'inline-block',
  },
  propName: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  appUID: {
    fontWeight: theme.typography.fontWeightBold,
    cursor: 'pointer',
  },
  imgList: {
    display: 'inline-flex',
  },
  img: {
    width: 80,
    height: 80,
    objectFit: 'cover',
  },
  rejectBtn: {
    marginRight: 10,
  },
}));

const Admin = ({ firebase }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const applications = useSelector((state) => state.admin.applications) || {};

  useEffect(() => {
    firebase.applications()
      .on('value', (snapshot) => {
        dispatch(setApplications(snapshot.val()));
      })
  }, [firebase, dispatch]);

  const toggleApplicationExpand = (uid, open) => {
    dispatch(toggleApplicationVisibility(uid, open));
  };

  const renderApplicationInfo = (application, prop) => {
    if (prop !== 'open') {
      if (prop === 'certificate') {
        return (
          <ListItem className={classes.inlineBlock}>
            <Typography
              component="div"
              className={classes.propName}
            >
              {`- ${prop.toUpperCase()}`}
            </Typography>
            <a href={application[prop]} target="_blank" rel="noopener noreferrer">
              <img src={application[prop]} alt={prop} className={classes.img} />
            </a>
          </ListItem>
        );
      }

      if (prop === 'images') {
        return (
          <ListItem className={classes.inlineBlock}>
            <Typography
              component="div"
              className={classes.propName}
            >
              {`- ${prop.toUpperCase()}`}
            </Typography>

            <List className={classes.imgList}>
              {application[prop].map((img) => (
                <ListItem key={img}>
                  <a href={img} target="_blank" rel="noopener noreferrer">
                    <img src={img} alt={prop} className={classes.img} />
                  </a>
                </ListItem>
              ))}
            </List>
          </ListItem>
        );
      }

      if (prop === 'methods') {
        return (
          <ListItem className={classes.inlineBlock}>
            <Typography
              component="div"
              className={classes.propName}
            >
              {`- ${prop.toUpperCase()}`}
            </Typography>

            <List>
              {application[prop].map((method) => (
                <ListItem key={`${method.name}-${method.price}`}>
                  {`${method.name} - ${method.price}$`}
                </ListItem>
              ))}
            </List>
          </ListItem>
        );
      }

      return (
        <ListItem className={classes.inlineBlock}>
          <Typography
            component="div"
            className={classes.propName}
          >
            {`- ${prop.toUpperCase()} : ${application[prop]}`}
          </Typography>
        </ListItem>
      );
    }
    return <></>;
  };

  const handleApproveApplication = (applicationUID, application) => {
    const { userID } = application;

    firebase
      .user(userID)
      .once('value')
      .then((snapshot) => {
        const user = snapshot.val();
        const newUser = {
          ...user,
          ...application,
          isGuru: true,
        };

        firebase.user(userID).set(newUser).then(() => {
          firebase.application(applicationUID).set(null);
        });
      });
  };

  const handleRejectApplication = (applicationUID) => {
    firebase.application(applicationUID).set(null);
  };

  const renderApplicationControls = (applicationUID, application) => (
    <div>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        className={classes.rejectBtn}
        onClick={() => handleRejectApplication(applicationUID)}
      >
        Reject
      </Button>
      <Button
        color="primary"
        variant="contained"
        size="large"
        onClick={() => handleApproveApplication(applicationUID, application)}
      >
        Approve
      </Button>
    </div>
  );

  return (
    <>
      <Typography
        variant="h5"
        component="h3"
        align="center"
      >
        Welcome to the ADMIN panel
      </Typography>

      <div>
        <Typography component="div" variant="h6">
          Applications
        </Typography>

        <List>
          {Object.keys(applications).map((uid) => (
            <ListItem key={uid} className={classes.inlineBlock}>
              <Grid
                container
                alignItems="center"
                className={classes.appUID}
                onClick={() => toggleApplicationExpand(uid, !applications[uid].open)}
              >
                {uid}
                {applications[uid].open ? <ExpandLess /> : <ExpandMore />}
              </Grid>

              <Collapse in={applications[uid].open || false} timeout="auto" unmountOnExit>
                <List>
                  {Object.keys(applications[uid]).map((prop) => (
                    renderApplicationInfo(applications[uid], prop)
                  ))}
                </List>
                {renderApplicationControls(uid, applications[uid])}
              </Collapse>
            </ListItem>
          ))}
        </List>
      </div>
    </>
  );
};

Admin.propTypes = {
  firebase: PropTypes.shape({
    applications: PropTypes.func.isRequired,
    application: PropTypes.func.isRequired,
    user: PropTypes.func.isRequired,
  }).isRequired,
};

export default withFirebase(Admin);
