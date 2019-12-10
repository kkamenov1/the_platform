import React, { useEffect } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography, List, ListItem, Collapse, Grid, Button, CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { setApplications, toggleApplicationVisibility, setApplicationsLoading } from '../actions';
import { withFirebase } from '../../../core/lib/Firebase';


const useStyles = makeStyles((theme) => ({
  inlineBlock: {
    display: 'inline-block',
  },
  paper: {
    width: '100%',
    maxWidth: 960,
    margin: '0 auto',

    [theme.breakpoints.up('md')]: {
      margin: '20px auto',
    },
  },
  mainListItem: {
    padding: 0,
    borderRadius: 4,
    backgroundColor: theme.palette.grey['200'],
    width: '95%',
    margin: '16px auto',
    display: 'block',
  },
  subList: {
    borderTop: `1px solid ${theme.palette.grey['300']}`,
  },
  propName: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  appUID: {
    cursor: 'pointer',
    padding: '12px 16px',
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
  controlsWrapper: {
    textAlign: 'center',
    padding: '16px 0',
  },
}));

const Applications = ({ firebase }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const applications = useSelector((state) => state.admin.applications);
  const loading = useSelector((state) => state.admin.loading);

  useEffect(() => {
    dispatch(setApplicationsLoading(true));

    firebase.applications()
      .on('value', (snapshot) => {
        dispatch(setApplicationsLoading(true));
        dispatch(setApplications(snapshot.val()));
        dispatch(setApplicationsLoading(false));
      }, () => firebase.applications().off());
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
    <div className={classes.controlsWrapper}>
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
    <div className={classes.paper}>
      {loading ? (
        <Typography align="center" component="div">
          <CircularProgress size={60} />
        </Typography>
      ) : !applications ? (
        <Typography align="center" component="div">
          <Typography>There are no applications</Typography>
        </Typography>
      ) : (
        <List>
          {Object.keys(applications).map((uid) => (
            <ListItem key={uid} className={classnames(classes.inlineBlock, classes.mainListItem)}>
              <Grid
                container
                alignItems="center"
                justify="space-between"
                className={classes.appUID}
                onClick={() => toggleApplicationExpand(uid, !applications[uid].open)}
              >
                <Grid item>
                  <Typography component="div" variant="h6">{uid}</Typography>
                </Grid>
                <Grid item>
                  {applications[uid].open ? <ExpandLess /> : <ExpandMore />}
                </Grid>
              </Grid>

              <Collapse in={applications[uid].open || false} timeout="auto" unmountOnExit>
                <List className={classes.subList}>
                  {Object.keys(applications[uid]).map((prop) => (
                    renderApplicationInfo(applications[uid], prop)
                  ))}
                </List>
                {renderApplicationControls(uid, applications[uid])}
              </Collapse>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

Applications.propTypes = {
  firebase: PropTypes.shape({
    applications: PropTypes.func.isRequired,
    application: PropTypes.func.isRequired,
    user: PropTypes.func.isRequired,
  }).isRequired,
};


export default withFirebase(Applications);
