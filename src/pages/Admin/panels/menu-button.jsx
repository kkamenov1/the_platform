import React from 'react';
import PropTypes from 'prop-types';
import {
  Menu,
  MenuItem,
  Button,
} from '@material-ui/core';

const MenuButton = ({ items }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const listItems = items.map((item, index) => (
    <MenuItem
      key={index}
      onClick={handleMenuClose}
    >
      {`${item.name} - ${item.price}$`}
    </MenuItem>
  ));

  return (
    <>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleMenuClick}
      >
        VIEW
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {listItems}
      </Menu>
    </>
  );
};

MenuButton.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.string,
    selected: PropTypes.bool,
  })).isRequired,
};

export default MenuButton;
