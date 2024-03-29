import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import {
  Typography, AppBar, Tabs, Tab,
} from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import Applications from './panels/applications';
import Reviews from './panels/reviews';

import { withFirebase } from '../../core/lib/Firebase';

const TabPanel = (props) => {
  const {
    children, value, index, ...other
  } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {children}
    </Typography>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const Admin = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.app.auth);
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    if (!auth || !auth.isAdmin) {
      dispatch(push('/'));
    }
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <>
      <div>
        <AppBar position="static" color="default" component="div">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="admin panel tabs"
          >
            <Tab label="Applications" />
            <Tab label="Reviews" />
          </Tabs>
        </AppBar>

        <SwipeableViews
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0}>
            <Applications />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Reviews />
          </TabPanel>
        </SwipeableViews>
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
