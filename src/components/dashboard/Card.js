import React, {useContext} from 'react';
import ReactDOM from 'react-dom';
import {useState, createContext} from "react";

const Card = (props) => {

    // const myStops = ['rome', 'venice', 'vatican'];
    const divStyle = {
        display: 'inline-block',
        marginRight: '25px',
        padding: '10px',
        backgroundColor: '#4d535c',
        color: '#4fc3f7'
    }

    return (
    <div style={divStyle}>
        <p>{props.data.id}</p>
        <p>{props.data.last}</p>
        <p>{props.data.volume}</p>
        {/*<ul>*/}
        {/*    {props.data.stops.map(myStops => (*/}
        {/*        <li>{myStops}</li>*/}
        {/*    ))}*/}
        {/*</ul>*/}
    </div>
    )
}

export default Card;