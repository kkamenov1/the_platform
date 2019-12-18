import React, { useEffect, useCallback } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  Paper,
  TablePagination,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Grid,
  Tooltip,
  Zoom,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  setApplications,
  setTotalApplicationsCount,
  setPage,
  setRowsPerPage,
} from '../actions';
import MenuButton from './menu-button';
import {
  APPLICATIONS_PER_PAGE1,
  APPLICATIONS_PER_PAGE2,
  APPLICATIONS_PER_PAGE3,
} from '../../../constants/adminPanel';

import { withFirebase } from '../../../core/lib/Firebase';

const useStyles = makeStyles({
  imgLink: {
    display: 'block',
    width: 50,
    height: 50,
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  introduction: {
    whiteSpace: 'nowrap',
    maxWidth: 170,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    cursor: 'pointer',
  },
});

const columns = [
  { id: 'applicationUID', label: 'Application ID', minWidth: 170 },
  { id: 'displayName', label: 'Name', minWidth: 170 },
  { id: 'birthday', label: 'Birthday', minWidth: 100 },
  { id: 'location', label: 'Location', minWidth: 50 },
  { id: 'languages', label: 'Languages', minWidth: 170 },
  { id: 'images', label: 'Images', minWidth: 170 },
  { id: 'sport', label: 'Sport', minWidth: 100 },
  { id: 'introduction', label: 'Introduction', minWidth: 170 },
  { id: 'certificate', label: 'Certificate', minWidth: 100 },
  { id: 'methods', label: 'Methods', minWidth: 100 },
  {
    id: 'duration', label: 'Duration', minWidth: 100, align: 'right',
  },
];

const createData = ({
  applicationUID,
  displayName,
  birthday,
  location,
  languages,
  images,
  sport,
  introduction,
  certificate,
  methods,
  duration,
}) => ({
  applicationUID,
  displayName,
  birthday,
  location,
  languages,
  images,
  sport,
  introduction,
  certificate,
  methods,
  duration,
});

const Applications = ({ firebase }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const applications = useSelector((state) => state.admin.applications);
  const totalApplicationsCount = useSelector((state) => state.admin.count);
  const page = useSelector((state) => state.admin.page);
  const rowsPerPage = useSelector((state) => state.admin.rowsPerPage);

  const handleChangePage = (event, newPage) => {
    dispatch(setPage(newPage));
  };

  const handleChangeRowsPerPage = (event) => {
    dispatch(setRowsPerPage(+event.target.value));
    dispatch(setPage(0));
  };

  const getApplications = useCallback(() => {
    axios.get('/api/applications', {
      params: {
        start: page * rowsPerPage,
        limit: rowsPerPage,
      },
    }).then((response) => {
      const items = response.data;
      const mappedItems = items.map((item) => createData(item));
      dispatch(setApplications(mappedItems));
    });
  }, [dispatch, page, rowsPerPage]);

  useEffect(() => {
    getApplications();

    firebase
      .applicationCounter()
      .get()
      .then((doc) => {
        const { count } = doc.data();
        dispatch(setTotalApplicationsCount(count));
      });
  }, [firebase, dispatch, getApplications, page, rowsPerPage]);

  // const handleApproveApplication = (application) => {
  //   const { userID, applicationUID } = application;

  //   firebase
  //     .user(userID)
  //     .once('value')
  //     .then((snapshot) => {
  //       const user = snapshot.val();
  //       const newUser = {
  //         ...user,
  //         ...application,
  //         isGuru: true,
  //       };

  //       firebase.user(userID).set(newUser).then(() => {
  //         firebase.application(applicationUID).delete().then(() => {
  //           getApplications();
  //         });
  //       });
  //     });
  // };

  // const handleRejectApplication = (applicationUID) => {
  //   firebase.application(applicationUID).delete().then(() => {
  //     getApplications();
  //   });
  // };

  const renderValue = (value, columnId) => {
    switch (columnId) {
      case 'languages':
        return value.join(', ');

      case 'images':
        return (
          <Grid container>
            {value.map((img, index) => (
              <a
                href={img}
                key={index}
                target="_blank"
                rel="noopener noreferrer"
                className={classes.imgLink}
              >
                <img src={img} alt={`guru-images-${index + 1}`} className={classes.img} />
              </a>
            ))}
          </Grid>
        );

      case 'introduction':
        return (
          <Tooltip title={value} TransitionComponent={Zoom}>
            <div className={classes.introduction}>
              {value}
            </div>
          </Tooltip>
        );

      case 'certificate':
        return (
          <a href={value} target="_blank" rel="noopener noreferrer" className={classes.imgLink}>
            <img src={value} alt="guru-certificate" className={classes.img} />
          </a>
        );

      case 'methods':
        return <MenuButton items={value} />;

      default:
        return value;
    }
  };

  return (
    <>
      {totalApplicationsCount && (
        <Paper>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {applications.map((application) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={application.applicationUID}>
                  {columns.map((column) => {
                    const value = application[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {value && renderValue(value, column.id)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[
              APPLICATIONS_PER_PAGE1,
              APPLICATIONS_PER_PAGE2,
              APPLICATIONS_PER_PAGE3,
            ]}
            component="div"
            count={totalApplicationsCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </>
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
