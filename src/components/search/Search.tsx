import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import List from "../list/List";
import { useState } from "react";
import { Grid } from "@mui/material";
import "../card/Card.css"

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "25px",
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
  const [inputText, setInputText] = useState("");
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
      <Grid item xs={12}>
        Search For Asset
      </Grid>
      <Grid item xs={10} sm={10} md={8} lg={6}>
        <Grid item xs={12} className="search" style={{borderRadius:"25px"}}>
          <Search>
            <Grid container justifyContent="space-between" alignItems="center">
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                  data-cy="search-input"
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={inputText}
                onChange={inputHandler}
              />
              <a
                style={{ cursor: "pointer", color: "#222222", marginRight:"1%" }}
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
