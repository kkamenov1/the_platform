import React, { useEffect, useCallback } from 'react';
import axios from 'axios';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  TablePagination,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableContainer,
  TableCell,
  Grid,
  Tooltip,
  Zoom,
  Typography,
  Toolbar,
  IconButton,
  Checkbox,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles, lighten } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import {
  setApplications,
  setTotalApplicationsCount,
  setPage,
  setRowsPerPage,
  setSelectedApplications,
  setApplicationsLoading,
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
  progressWrapper: {
    marginTop: 100,
    overflow: 'hidden',
  },
});

const columns = [
  { id: 'applicationUID', label: 'Application ID', minWidth: 300 },
  { id: 'displayName', label: 'Name', minWidth: 170 },
  { id: 'birthday', label: 'Birthday', minWidth: 100 },
  { id: 'location', label: 'Location', minWidth: 170 },
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

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.primary.main,
        backgroundColor: lighten(theme.palette.primary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.primary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, onRejectApplication, onApproveApplication } = props;

  return (
    <Toolbar
      className={classnames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1">
          {`${numSelected} selected`}
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle">
          Applications
        </Typography>
      )}

      {numSelected > 0 && (
        <>
          <Tooltip title="Reject">
            <IconButton aria-label="reject" onClick={onRejectApplication}>
              <ClearIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Approve">
            <IconButton aria-label="approve" onClick={onApproveApplication}>
              <CheckIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRejectApplication: PropTypes.func.isRequired,
  onApproveApplication: PropTypes.func.isRequired,
};

function EnhancedTableHead(props) {
  const { onSelectAllClick, numSelected, rowCount } = props;

  return (
    <TableHead>
      <TableRow>
        {columns.map((headCell, index) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            style={{ minWidth: headCell.minWidth }}
          >
            {index === 0 && (
              <Checkbox
                color="primary"
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={numSelected === rowCount}
                onChange={onSelectAllClick}
                inputProps={{ 'aria-label': 'select all applications' }}
              />
            )}
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const Applications = ({ firebase }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const applications = useSelector((state) => state.admin.applications);
  const totalApplicationsCount = useSelector((state) => state.admin.count);
  const page = useSelector((state) => state.admin.page);
  const rowsPerPage = useSelector((state) => state.admin.rowsPerPage);
  const selectedApplications = useSelector((state) => state.admin.selectedApplications);
  const loading = useSelector((state) => state.admin.loading);

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
    dispatch(setApplicationsLoading(true));
    getApplications();
    firebase
      .applicationCounter()
      .get()
      .then((doc) => {
        const { count } = doc.data();
        dispatch(setTotalApplicationsCount(count));
        dispatch(setApplicationsLoading(false));
      });
  }, [firebase, dispatch, getApplications, page, rowsPerPage]);

  const handleApproveApplication = () => {
    dispatch(setApplicationsLoading(true));
    selectedApplications.forEach((appId) => {
      firebase.application(appId).get().then((doc) => {
        const application = doc.data();
        const { userID } = application;

        firebase
          .user(userID)
          .get()
          .then((d) => {
            const user = d.data();
            const newUser = {
              ...user,
              ...application,
              isGuru: true,
            };

            firebase
              .user(userID)
              .set(newUser, { merge: true })
              .then(() => {
                firebase.application(appId).delete().then(() => {
                  getApplications();
                  dispatch(setTotalApplicationsCount(totalApplicationsCount - selectedApplications.length));
                  dispatch(setSelectedApplications([]));
                  dispatch(setApplicationsLoading(false));
                });
              });
          });
      });
    });
  };

  const handleRejectApplication = () => {
    dispatch(setApplicationsLoading(true));

    const batch = firebase.db.batch();
    selectedApplications.forEach((appId) => {
      const currentAppRef = firebase.application(appId);
      batch.delete(currentAppRef);
    });

    batch.commit().then(() => {
      getApplications();
      dispatch(setTotalApplicationsCount(totalApplicationsCount - selectedApplications.length));
      dispatch(setSelectedApplications([]));
      dispatch(setApplicationsLoading(false));
    });
  };

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

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = applications.map((application) => application.applicationUID);
      dispatch(setSelectedApplications(newSelecteds));
      return;
    }
    dispatch(setSelectedApplications([]));
  };

  const handleCheckboxChange = (applicationUID) => {
    const selectedIndex = selectedApplications.indexOf(applicationUID);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedApplications, applicationUID);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedApplications.slice(1));
    } else if (selectedIndex === selectedApplications.length - 1) {
      newSelected = newSelected.concat(selectedApplications.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedApplications.slice(0, selectedIndex),
        selectedApplications.slice(selectedIndex + 1),
      );
    }

    dispatch(setSelectedApplications(newSelected));
  };

  const isSelected = (applicationUID) => selectedApplications.indexOf(applicationUID) !== -1;

  return (
    <>
      {loading ? (
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.progressWrapper}
        >
          <CircularProgress size={80} />
        </Grid>
      ) : totalApplicationsCount ? (
        <div>
          <EnhancedTableToolbar
            numSelected={selectedApplications.length}
            onRejectApplication={handleRejectApplication}
            onApproveApplication={handleApproveApplication}
          />
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <EnhancedTableHead
                numSelected={selectedApplications.length}
                onSelectAllClick={handleSelectAllClick}
                rowCount={applications.length}
              />
              <TableBody>
                {applications.map((application) => {
                  const isItemSelected = isSelected(application.applicationUID);

                  return (
                    <TableRow
                      key={application.applicationUID}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      selected={isItemSelected}
                      aria-checked={isItemSelected}
                    >
                      {columns.map((column, i) => {
                        const value = application[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {i === 0 && (
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              onChange={() => handleCheckboxChange(application.applicationUID)}
                            />
                            )}
                            {value && renderValue(value, column.id)}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
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
        </div>
      ) : (
        <Typography>There are no applications</Typography>
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
    db: PropTypes.shape({
      batch: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
};


export default withFirebase(Applications);
