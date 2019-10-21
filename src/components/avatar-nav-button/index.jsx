import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuDropDown from '../menu-drop-down';

const useStyles = makeStyles({
  avatar: {
    width: 30,
    height: 30,
    boxShadow: 'rgb(235, 235, 235) 0px 0px 0px 2px',
  },
  navBtn: {
    display: 'flex',
    alignItems: 'center',
    height: 'inherit',
    padding: '0 20px',
    textTransform: 'none',

    '&:hover': {
      textDecoration: 'none',
    },
  },
});

const AvatarNavButton = () => {
  const classes = useStyles();
  const auth = useSelector((state) => state.app.auth);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        className={classes.navBtn}
        color="primary"
        onClick={handleClick}
        disableRipple
      >
        <Avatar
          alt={auth.displayName}
          className={classes.avatar}
          src={
            auth.photoURL
              ? auth.photoURL
              : 'https://res.cloudinary.com/dl766ebzy/image/upload/v1571401382/no_image_zopdzm.jpg'
          }
        />
      </Button>
      <MenuDropDown
        anchorEl={anchorEl}
        onClose={handleClose}
      />
    </>
  );
};

export default AvatarNavButton;
