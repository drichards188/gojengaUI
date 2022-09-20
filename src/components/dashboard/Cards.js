import React, {useContext, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {useState, createContext} from "react";
import Card from "./Card";
import {getAllCoins} from "../../backend/coinGeckoApi";
// import {CardCallbackContext, CardDataContext} from "./HomeContainer";

// export let CardDataContext = createContext((data) => {return data;});

export const Cards = (props) => {
    const CardDataCallback = useContext(CardCallbackContext);
    const CardData = useContext(CardDataContext);

    //todo replace the context callback with access to redux store
    useEffect(() => {
        getAllCoins(CardDataCallback, ['ripple', 'bitcoin']);
    }, []);

    //todo be able to search and click on a coin rendering a new cards to cards


    //todo the context data is changing from 2 to 4 objects but that change is not triggering a re render. need to use
    //consumer but then render is not a function triggers because more than one child
    return (
            <div>
                <div>
                    {CardData.map(cardData => (
                        <Card data={cardData}/>
                    ))}
                </div>
            </div>
    );
}

export default Cards;