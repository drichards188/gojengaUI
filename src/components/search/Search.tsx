import * as React from "react";
import {styled, alpha} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import List from "../list/List";
import {useState} from "react";
import {Grid} from "@mui/material";
import "../card/Card.css"
import CloseIcon from '@mui/icons-material/Close';
import styles from "../general/common.module.css";
import Typography from "@mui/material/Typography";

const Search = styled("div")(({theme}) => ({
    position: "relative",
    marginLeft: 0,
    width: "100%",
    color: "#DCDCDD",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    id: "search-input",
    borderRadius: "25px",
    color: "inherit",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "20ch",
            "&:focus": {
                width: "25ch",
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

    // todo typing input has odd reaction

    return (
        <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={10}>
                <Grid container justifyContent="center" alignItems="center" style={{backgroundColor: "rgba(255,255,255,.15)", borderRadius: "25px"}}>
                    <Grid item xs={6}>
                        <Typography fontSize="2.5ch" noWrap style={{overflowWrap: "break-word"}} className={styles.headerCard}>
                            Search For Asset
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={4} md={4} lg={4} style={{paddingTop: "1%"}}>
                        <Grid item className="search" style={{borderRadius: "25px"}}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Search>
                                        <Grid container justifyContent="space-between" alignItems="center">
                                            <SearchIconWrapper>
                                                <SearchIcon/>
                                            </SearchIconWrapper>
                                            <StyledInputBase
                                                data-cy="search-input"
                                                placeholder="Search…"
                                                inputProps={{"aria-label": "search"}}
                                                value={inputText}
                                                onChange={inputHandler}
                                            />
                                            <CloseIcon style={{cursor: "pointer"}} onClick={() => {
                                                setInputText("");
                                            }}/>
                                        </Grid>
                                    </Search>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>
                    <Grid item xs={10}>
                        <List input={inputText}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
        ;
}
