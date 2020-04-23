import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { BECOME_GURU_APPLY } from '../../constants/routes';

const BecomeGuru = () => (
  <div>
    <Button
      variant="contained"
      color="primary"
      component={Link}
      to={BECOME_GURU_APPLY}
    >
      APPLY NOW
    </Button>
  </div>
);

export default BecomeGuru;
