import React from "react";
import { useState, createContext } from "react";
import TextField from "@mui/material/TextField";
import List from "./List";
import { Button } from "@mui/material";
import "./Dashboard.scss";

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
        <Button
          onClick={() => {
            searchOnInput();
          }}
        >
          Search
        </Button>
      </div>
      <List input={inputText} />
    </div>
  );
};

function searchOnInput() {
  const matches = [
    {
      id: 1,
      title: "europe",
      stops: ["rome", "venice", "vatican"],
    },
  ];
}

export default SearchBar;
