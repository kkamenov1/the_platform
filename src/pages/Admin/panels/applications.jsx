import React, { useEffect, useCallback } from 'react';
import axios from 'axios';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography, List, ListItem, Collapse, Grid, Button, CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {
  setApplications,
  toggleApplicationVisibility,
  setApplicationsLoading,
  setMaxPage,
  setPageNumber,
} from '../actions';
import { withFirebase } from '../../../core/lib/Firebase';
import { addOnPosition } from '../../../core/utils';
import { Pagination } from '../../../core/components';
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
  progress: {
    marginTop: 16,
  },
}));

const Applications = ({ firebase }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const applications = useSelector((state) => state.admin.applications);
  const loading = useSelector((state) => state.admin.loading);
  const maxPage = useSelector((state) => state.admin.maxPage);
  const pageNumber = useSelector((state) => state.admin.pageNumber);

  const getApplications = useCallback(() => {
    dispatch(setApplicationsLoading(true));

    axios.get('/api/applications', {
      params: {
        start: (pageNumber - 1) * APPLICATIONS_PER_PAGE,
        limit: APPLICATIONS_PER_PAGE,
      },
    }).then((response) => {
      dispatch(setApplications(response.data));
      dispatch(setApplicationsLoading(false));
    });
  }, [dispatch, pageNumber]);

  useEffect(() => {
    getApplications();

    firebase
      .applicationCounter()
      .get()
      .then((doc) => {
        const { count } = doc.data();
        dispatch(setMaxPage(Math.ceil(count / APPLICATIONS_PER_PAGE)));
      });
  }, [firebase, dispatch, getApplications, pageNumber]);

  const toggleApplicationExpand = (index, open) => {
    dispatch(toggleApplicationVisibility([...addOnPosition(
      index,
      { ...applications[index], open },
      applications,
    )]));
  };

  const handlePageChange = (page) => {
    dispatch(setPageNumber(page));
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
              {`- ${prop.toUpperCase()}${!application[prop] && ' : N / A'}`}
            </Typography>
            {application[prop] && (
              <a href={application[prop]} target="_blank" rel="noopener noreferrer">
                <img src={application[prop]} alt={prop} className={classes.img} />
              </a>
            )}
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
              {application[prop].map((img, index) => (
                <ListItem key={img}>
                  <a href={img} target="_blank" rel="noopener noreferrer">
                    <img src={img} alt={`${prop}-${index + 1}`} className={classes.img} />
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
            {`- ${prop.toUpperCase()} : ${application[prop] ? application[prop] : 'N / A'}`}
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
          firebase.application(applicationUID).delete().then(() => {
            getApplications();
          });
        });
      });
  };

  const handleRejectApplication = (applicationUID) => {
    firebase.application(applicationUID).delete().then(() => {
      getApplications();
    });
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
      {loading ? (
        <Typography
          component="div"
          className={classes.loadingWrapper}
          align="center"
        >
          <CircularProgress size={60} className={classes.progress} />
        </Typography>
      ) : !applications.length ? (
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

          {maxPage && (
            <Typography className={classes.paginationWrapper} align="center">
              <Pagination
                type="full"
                pageNumber={pageNumber}
                maxPage={maxPage}
                onPageChange={handlePageChange}
                visiblePages={5}
              />
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
    applicationCounter: PropTypes.func.isRequired,
  }).isRequired,
};


export default withFirebase(Applications);
