import React, {useContext, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {useState, createContext} from "react";
import Card from "./Card";

//trying to do object destructuring on props
export const Cards = ({cardData}: any) => {
    //todo replace the context callback with access to redux store
    // useEffect(() => {
    //     getAllCoins(CardDataCallback, ['ripple', 'bitcoin']);
    // }, []);

    //todo be able to search and click on a coin rendering a new cards to cards

    //todo the context data is changing from 2 to 4 objects but that change is not triggering a re render. need to use
    //consumer but then render is not a function triggers because more than one child
    return (
        <div>
            <div>
                {cardData.map((coinData: any) => (
                    <Card data={coinData}/>
                ))}
            </div>
        </div>
    );
}

export default Cards;