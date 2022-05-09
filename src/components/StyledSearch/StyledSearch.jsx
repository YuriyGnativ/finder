import * as React from "react";
import { styled, alpha } from "@mui/material/styles";

import {
  Chip,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { borderRadius } from "@mui/system";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function StyledSearch() {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        // startAdornment={
        //   <Box
        //     sx={{
        //       margin: "0 0.2rem 0 3rem",
        //       maxWidth: "350px",
        //       overflowX: "auto",
        //       display: "flex",
        //       "&::-webkit-scrollbar": {
        //         // backgroundColor: "rgba(255, 255, 255, 0.3)",
        //         // height: "5px",
        //         // width: "15px"
        //         // cursor: "pointer",
        //       },
        //       "&::-webkit-scrollbar": {
        //         height: "8px",
        //       },
        //       "&::-webkit-scrollbar-track": {
        //         backgroundColor: "white",
        //         margin: "56px",
        //         borderRadius: "5px",
        //         paddingTop: "40px",
        //       },
        //       "&::-webkit-scrollbar-thumb": {
        //         backgroundColor: "rgba(25, 118, 210, .73)",
        //         height: "5px",
        //         width: "15px",
        //         borderRadius: "5px",
        //       },
        //     }}
        //   >
        //     {[1, 2, 3,].map((i, index) => {
        //       return <Chip label="AB45 2NT" sx={{ color: "white" }} />;
        //     })}
        //   </Box>
        // }
        // inputProps={{ "aria-label": "search" }}
        // inputProps={{
        //   endAdornment: (
        //     <Chip label="Chip Filled" />

        //   ),
        // }}
      />
    </Search>
  );
}
