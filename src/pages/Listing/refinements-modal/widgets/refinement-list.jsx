import React from 'react';
import PropTypes from 'prop-types';
import { connectRefinementList } from 'react-instantsearch-dom';
import {
  Switch, Grid, Typography, Divider,
} from '@material-ui/core';

const RefinementList = ({
  items,
  refine,
  header,
  divider,
}) => (
  <>
    <div style={{ padding: '24px 0' }}>
      <Typography variant="button" component="h6" gutterBottom>{header}</Typography>
      {items.map((item) => {
        const handleChange = () => {
          refine(item.value);
        };

        return (
          <Grid
            key={item.label}
            container
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography>
                {item.label}
              </Typography>
            </Grid>

            <Grid item>
              <Switch
                checked={item.isRefined}
                onChange={handleChange}
                color="primary"
              />
            </Grid>
          </Grid>
        );
      })}
    </div>
    {divider && <Divider />}
  </>
);

RefinementList.defaultProps = {
  header: null,
  divider: false,
};

RefinementList.propTypes = {
  items: PropTypes.array.isRequired,
  refine: PropTypes.func.isRequired,
  createURL: PropTypes.func.isRequired,
  header: PropTypes.string,
  divider: PropTypes.bool,
};

export default connectRefinementList(RefinementList);
