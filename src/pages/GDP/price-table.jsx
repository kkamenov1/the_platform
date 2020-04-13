import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const createData = (name, price) => ({
  name,
  price,
});

const PriceTable = ({ methods = [] }) => {
  const rows = methods.map((method) => createData(method.name, method.price));

  return (
    <TableContainer component={Paper}>
      <Table aria-label="price table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Program</StyledTableCell>
            <StyledTableCell align="left">Price</StyledTableCell>
            <StyledTableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="left">{`$${row.price}`}</StyledTableCell>
              <StyledTableCell align="right">
                <Button variant="contained" color="primary">Subscribe</Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

PriceTable.defaultProps = {
  methods: [],
};

PriceTable.propTypes = {
  methods: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.string,
  })),
};

export default PriceTable;
