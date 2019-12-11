import React, { useEffect, useCallback, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography, List, ListItem, Collapse, Grid, Button, CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Pagination from './pagination';
import {
  setApplications,
  toggleApplicationVisibility,
  setApplicationsLoading,
  setLimit,
} from '../actions';
import { withFirebase } from '../../../core/lib/Firebase';
import { addOnPosition } from '../../../core/utils';
import { APPLICATIONS_PER_PAGE } from '../../../constants/adminPanel';


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
  paginationWrapper: {
    width: '95%',
    margin: 'auto',
  },
  loadingWrapper: {
    marginBottom: 15,
  },
}));

const Applications = ({ firebase }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const applications = useSelector((state) => state.admin.applications);
  const loading = useSelector((state) => state.admin.loading);
  const limit = useSelector((state) => state.admin.limit);
  const [isFinal, setIsFinal] = useState(false);

  const getApplications = useCallback(() => {
    dispatch(setApplicationsLoading(true));

    firebase
      .applications()
      .orderByChild('displayName')
      .limitToLast(limit)
      .once('value')
      .then((snapshot) => {
        const allApplications = [];
        snapshot.forEach((child) => {
          allApplications.push({
            ...child.val(),
            applicationUID: child.key,
          });
        });
        dispatch(setApplications(allApplications));
        dispatch(setApplicationsLoading(false));

        if (allApplications.length % APPLICATIONS_PER_PAGE !== 0) {
          setIsFinal(true);
        }
      });
  }, [firebase, dispatch, limit]);

  useEffect(() => {
    getApplications();
  }, [getApplications]);

  const toggleApplicationExpand = (index, open) => {
    dispatch(toggleApplicationVisibility([...addOnPosition(
      index,
      { ...applications[index], open },
      applications,
    )]));
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

  const handleApproveApplication = (application) => {
    const { userID, applicationUID } = application;

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
          firebase.application(applicationUID).set(null).then(() => {
            getApplications();
          });
        });
      });
  };

  const handleRejectApplication = (applicationUID) => {
    dispatch(setApplicationsLoading(true));
    firebase.application(applicationUID).set(null).then(() => {
      getApplications();
    });
  };

  const handleLoadMore = () => {
    dispatch(setLimit(limit + APPLICATIONS_PER_PAGE));
  };

  const renderApplicationControls = (application) => (
    <div className={classes.controlsWrapper}>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        className={classes.rejectBtn}
        onClick={() => handleRejectApplication(application.applicationUID)}
      >
        Reject
      </Button>
      <Button
        color="primary"
        variant="contained"
        size="large"
        onClick={() => handleApproveApplication(application)}
      >
        Approve
      </Button>
    </div>
  );

  return (
    <div className={classes.paper}>
      {!applications ? (
        <Typography align="center" component="div">
          <Typography>There are no applications</Typography>
        </Typography>
      ) : (
        <>
          <List>
            {applications.map((application, index) => (
              <ListItem
                key={application.applicationUID}
                className={classnames(classes.inlineBlock, classes.mainListItem)}
              >
                <Grid
                  container
                  alignItems="center"
                  justify="space-between"
                  className={classes.appUID}
                  onClick={() => toggleApplicationExpand(index, !application.open)}
                >
                  <Grid item>
                    <Typography component="div" variant="h6">{application.displayName}</Typography>
                  </Grid>
                  <Grid item>
                    {application.open ? <ExpandLess /> : <ExpandMore />}
                  </Grid>
                </Grid>

                <Collapse in={application.open || false} timeout="auto" unmountOnExit>
                  <List className={classes.subList}>
                    {Object.keys(application).map((prop) => (
                      renderApplicationInfo(application, prop)
                    ))}
                  </List>
                  {renderApplicationControls(application)}
                </Collapse>
              </ListItem>
            ))}
          </List>
          {loading && (
            <Typography
              component="div"
              className={classes.loadingWrapper}
              align="center"
            >
              <CircularProgress />
            </Typography>
          )}

          {!isFinal && (
            <Typography className={classes.paginationWrapper} align="center">
              <Pagination onLoadMore={handleLoadMore} />
            </Typography>
          )}
        </>
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
