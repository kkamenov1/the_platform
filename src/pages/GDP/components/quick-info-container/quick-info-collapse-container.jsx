import React from 'react';
import PropTypes from 'prop-types';
import { Collapse, Typography } from '@material-ui/core';
import { Badge } from '../../../../core/components';
import InfoLine from './info-line';


const QuickInfoCollapseContainer = ({
  status,
  occupation,
  subscribers,
  sport,
  duration,
  languages,
  expanded,
}) => (
  <Collapse in={expanded} timeout="auto" unmountOnExit>
    <InfoLine label="Status">
      <Typography component="div" align="right">
        <Badge
          label={status}
          color={status === 'AVAILABLE' ? 'green' : 'red'}
        />
      </Typography>
    </InfoLine>

    <InfoLine label="Subscribers">
      {occupation !== undefined && subscribers && (
        <Typography variant="body2" color="textSecondary" align="right">
          {`${occupation}/${subscribers}`}
        </Typography>
      )}
    </InfoLine>

    <InfoLine label="Sport">
      <Typography
        variant="body2"
        color="textSecondary"
        style={{ textTransform: 'capitalize' }}
        align="right"
      >
        {sport}
      </Typography>
    </InfoLine>

    <InfoLine label="Duration of Programs">
      {duration && (
        <Typography variant="body2" color="textSecondary" align="right">
          {`${duration} days`}
        </Typography>
      )}
    </InfoLine>

    <InfoLine label="Languages">
      <Typography variant="body2" color="textSecondary" align="right">
        {languages}
      </Typography>
    </InfoLine>
  </Collapse>
);

QuickInfoCollapseContainer.defaultProps = {
  occupation: undefined,
};

QuickInfoCollapseContainer.propTypes = {
  status: PropTypes.string.isRequired,
  occupation: PropTypes.number,
  subscribers: PropTypes.string.isRequired,
  sport: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  languages: PropTypes.string.isRequired,
  expanded: PropTypes.bool.isRequired,
};

export default QuickInfoCollapseContainer;
