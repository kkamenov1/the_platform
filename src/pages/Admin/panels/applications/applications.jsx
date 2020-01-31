import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { animateScroll as scroll } from 'react-scroll';
import api from '../../../../api';
import Hits from './hits';
import SearchBox from './search-box';
import PageSizeSelector from './page-size-selector';
import MockedHits from './mocked-hits';
import { Pagination } from '../../../../core/components';
import {
  setApplications,
  setTotalApplicationsCount,
  setPage,
  setPageSize,
  setApplicationsLoading,
  setQuery,
} from './actions';
import { withFirebase } from '../../../../core/lib/Firebase';

const useStyles = makeStyles({
  container: {
    maxWidth: 1600,
    width: '100%',
    margin: '0 auto',
    padding: '0 20px',
  },
  nbHits: {
    fontSize: 12,
  },
  paginationWrapper: {
    margin: '30px 0 50px 0',
  },
  upperSearchWrapper: {
    position: 'relative',
  },
  pageSelectorWrapper: {
    position: 'absolute',
    top: 0,
    right: 8,
    transform: 'translate(0, -50%)',
  },
});

const Applications = ({ firebase }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const applications = useSelector((state) => state.admin.applications.hits);
  const nbHits = useSelector((state) => state.admin.applications.count);
  const page = useSelector((state) => state.admin.applications.page);
  const pageSize = useSelector((state) => state.admin.applications.pageSize);
  const loading = useSelector((state) => state.admin.applications.loading);
  const query = useSelector((state) => state.admin.applications.query);

  const executeQuery = useCallback(() => {
    dispatch(setApplicationsLoading(true));
    api.applications.get({ query, page, pageSize }).then((response) => {
      dispatch(setApplications(response.data.hits));
      dispatch(setTotalApplicationsCount(response.data.nbHits));
      dispatch(setApplicationsLoading(false));
    });
  }, [query, page, pageSize, dispatch]);

  useEffect(() => {
    executeQuery();
  }, [executeQuery]);

  const handeQueryChange = (event) => {
    dispatch(setQuery(event.target.value));
  };

  const handlePageChange = (pageNumber) => {
    dispatch(setPage(pageNumber));
    scroll.scrollToTop({
      duration: 400,
    });
  };

  const handlePageSizeChange = (event) => {
    dispatch(setPageSize(event.target.value));
  };

  const handleRejectApplication = (applicationID) => {
    firebase.application(applicationID).delete().then(() => {
      executeQuery();
    });
  };

  const handleApproveApplication = async (userID, applicationUID) => {
    const applicationDoc = await firebase.application(applicationUID).get();
    const userDoc = await firebase.user(userID).get();
    await firebase.user(userID).update({
      ...userDoc.data(),
      ...applicationDoc.data(),
    }).then(() => handleRejectApplication(applicationUID));
  };

  return (
    <div className={classes.container}>
      <SearchBox query={query} onQueryChange={handeQueryChange} />

      <div className={classes.upperSearchWrapper}>
        <Typography
          align="center"
          className={classes.nbHits}
          color="textSecondary"
        >
          {`${nbHits} ${nbHits !== 1 ? 'results' : 'result'} found`}
        </Typography>
        <div className={classes.pageSelectorWrapper}>
          <PageSizeSelector
            pageSize={pageSize}
            onPageSizeChange={handlePageSizeChange}
          />
        </div>
      </div>

      <Typography
        align="center"
        component="div"
        paragraph
        variant="body2"
        color="textSecondary"
      />
      {loading ? (
        <MockedHits pageSize={pageSize} />
      ) : (
        <Hits
          hits={applications}
          handleRejectApplication={handleRejectApplication}
          handleApproveApplication={handleApproveApplication}
          loading={loading}
          pageSize={pageSize}
        />
      )}
      <Typography align="center" component="div" className={classes.paginationWrapper}>
        <Pagination
          type="full"
          pageNumber={page}
          maxPage={Math.ceil(nbHits / pageSize)}
          visiblePages={5}
          onPageChange={handlePageChange}
        />
      </Typography>
    </div>
  );
};

Applications.propTypes = {
  firebase: PropTypes.shape({
    application: PropTypes.func.isRequired,
    user: PropTypes.func.isRequired,
  }).isRequired,
};

export default withFirebase(Applications);
