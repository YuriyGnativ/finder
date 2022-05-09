import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  InputBase,
  TextField,
  Popover,
  InputAdornment,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import MailIcon from "@mui/icons-material/Mail";
import SearchIcon from "@mui/icons-material/Search";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useForm } from "react-hook-form";
import { fetchData, fetchByMultipleCodes } from "../../redux/thunks/dataThunk";
import { useDispatch } from "react-redux";
import Filters from "../Filters";
import StyledSearch from "../StyledSearch";

const Search = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  const handleOpenFilters = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseFilters = () => {
    setAnchorEl(null);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ search }) => {
    dispatch(
      fetchByMultipleCodes({
        search: [
          ...new Set(
            search
              .split(",")
              .map((i) => i.trim())
              .filter(Boolean)
          ),
        ],
      })
    );
  };
  return (
    <Box
      sx={{
        ml: 5,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          variant="standard"
          placeholder="Search"
          error={errors?.search}
          {...register("search", {
            validate: {
              valid_postcode: (value) => {
                const regex = /^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i;
                const values = value
                  .split(",")
                  .filter((i) => Boolean(i.trim()));
                const tested = values.map((i) => regex.test(i.trim()));
                return !tested.includes(false) || "Wrong postcode format";
              },
            },
            required: "Field is required",
          })}
          helperText={errors?.search?.message || false}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon sx={{ color: "white" }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="start">
                <IconButton sx={{ color: "white" }} onClick={handleOpenFilters}>
                  <FilterAltIcon />
                </IconButton>
                <Popover
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleCloseFilters}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <Filters />
                </Popover>
              </InputAdornment>
            ),
          }}
        />
      </form>
    </Box>
  );
};

const Header = () => {
  const [drawer, toggleDrawler] = React.useState(false);
  const list = (
    <Box sx={{ width: 250 }} role="presentation">
      drawer inner
    </Box>
  );
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar
          // variant="dense"
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={(e) => {
                toggleDrawler(true);
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div">
              header
            </Typography>
            {/* <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{
                ml: 2.5,
                mr: 0,
              }}
            >
              <FilterAltIcon />
            </IconButton> */}
            <Search />

            {/* <StyledSearch /> */}
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ ml: " auto" }}
            >
              <AccountCircleIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <SwipeableDrawer
        anchor="left"
        open={drawer}
        onClose={() => toggleDrawler(false)}
      >
        {list}
      </SwipeableDrawer>
    </>
  );
};

export default Header;
