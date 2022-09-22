import React, {useContext} from 'react';
import ReactDOM from 'react-dom';
import {useState, createContext} from "react";
import TextField from "@mui/material/TextField";
import Card from "./Card";
import List from "./List";
import {Button} from "@mui/material";

const SearchBar = (props: any) => {

    const [inputText, setInputText] = useState("");
    let inputHandler = (e: any) => {
        //convert input text to lower case
        let lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };

    return (
        <div className="main">
            <div className="search">
                <TextField
                    id="outlined-basic"
                    onChange={inputHandler}
                    variant="outlined"
                    fullWidth
                    label="Search"
                />
                <Button onClick={() => {
                    searchOnInput()
                }}>Search</Button>
            </div>
            <List input={inputText}/>
        </div>
    );
}

function searchOnInput() {

    const matches = [{
        "id": 1,
        "title": "europe",
        "stops": ['rome', 'venice', 'vatican']
    }];

    // // the prop is a callback
    // cardCallback(matches);
    // props.setCardCallback[1](matches);
}

export default SearchBar;