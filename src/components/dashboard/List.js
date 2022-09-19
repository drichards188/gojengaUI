import {React, useContext, useEffect, useState} from 'react'
import {CoinDataContext} from "./HomeContainer";
import {CardCallbackContext, CardDataContext} from "./HomeContainer";
import {getAllCoins} from "../../backend/coinGeckoApi";

function List(props) {
    const CardDataCallback = useContext(CardCallbackContext);
    const CardData = useContext(CardDataContext);
    const CoinData = useContext(CoinDataContext);

    const filteredData = CoinData.filter((el) => {
        //if no input the return the original
        if (props.input === '') {
            return el;
        }
        //return the item which contains the user input
        else {
            return el.id.toLowerCase().includes(props.input)
        }
    })

    const divStyle = {
        display: 'inline-block',
        margin: '5px',
        padding: '2px',
        cursor: 'pointer',
        backgroundColor: '#4d535c',
        color: '#4fc3f7'
    }

    return (
        <ul>
            {filteredData.slice(0, 10).map((item) => (
                <li style={divStyle} onClick={() => {
                    alert(item.id);
                    let original = CardData;
                    original.push({"id": "mita", "last": 124, "volume": 1});
                    original.push({"id": "hiya", "last": 124, "volume": 1});
                    CardDataCallback(original);
                }} key={item.id}>{item.id}</li>
            ))}
        </ul>
    )
}

export default List