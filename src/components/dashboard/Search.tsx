import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import List from "./List";
import { useState } from "react";
import { Button, Grid, Menu, MenuItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { setMessage, setRefreshToken, setToken } from "../banking/bankingSlice";
import { useAppDispatch } from "../../app/hooks";
import { triggerLogout } from "../banking/bankingAPI";
import Header from "../../etc/Header";

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

export default function SearchAppBar() {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");
  const dispatch = useAppDispatch();
  let inputHandler = (e: any) => {
    //convert input text to lower case
    let lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={6} sm={4} md={12}>
        <Grid item xs={4}>
          <Search>
            <Grid container justifyContent="space-between" alignItems="center">
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={inputText}
                onChange={inputHandler}
              />
              <a
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setInputText("");
                }}
              >
                X
              </a>
            </Grid>
          </Search>
        </Grid>

        <Grid item xs={12}>
          <List input={inputText} />
        </Grid>
      </Grid>
    </Grid>
  );
}
