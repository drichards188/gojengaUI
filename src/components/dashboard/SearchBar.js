import React, {useContext} from 'react';
import ReactDOM from 'react-dom';
import {useState, createContext} from "react";
import TextField from "@mui/material/TextField";
import Card from "./Card";
import List from "./List";
import {Button} from "@mui/material";
import {CoinDataContext} from "./HomeContainer";
import {CardCallbackContext} from "./HomeContainer";

const SearchBar = (props) => {
    const cardDataData = useContext(CoinDataContext);
    const cardDataCallback = useContext(CardCallbackContext);

    const [inputText, setInputText] = useState("");
    let inputHandler = (e) => {
        //convert input text to lower case
        let lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };

    return (
        <div className="main">
            <h1>React Search</h1>
            <div className="search">
                <TextField
                    id="outlined-basic"
                    onChange={inputHandler}
                    variant="outlined"
                    fullWidth
                    label="Search"
                />
                <Button onClick={() => {
                    searchOnInput(cardDataData, cardDataCallback)
                }}>Search</Button>
            </div>
            <List input={inputText}/>
        </div>
    );
}

function searchOnInput(cardData, cardCallback) {

    const matches = [{
        "id": 1,
        "title": "europe",
        "stops": ['rome', 'venice', 'vatican']
    }];

    // // the prop is a callback
    cardCallback(matches);
    // props.setCardCallback[1](matches);
}

export default SearchBar;