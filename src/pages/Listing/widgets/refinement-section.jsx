import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import SectionHeader from './section-header';

const useStyles = makeStyles({
  sectionWrapper: {
    padding: '36px 0',
  },
});

const RefinementSection = ({ header, divider, children }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.sectionWrapper}>
        {header && (
        <SectionHeader>
          {header}
        </SectionHeader>
        )}
        {children}
      </div>
      {divider && <Divider />}
    </>
  );
};

RefinementSection.defaultProps = {
  header: '',
  divider: false,
};

RefinementSection.propTypes = {
  header: PropTypes.string,
  divider: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default RefinementSection;
