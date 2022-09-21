import {getAllCoins} from "../../backend/coinGeckoApi";

function List(props: any) {

    const coinData = [{last: 1.4, id: 'ripple', volume: 2400},
        {last: 2.5, id: 'bitcoin', volume: 12900}];

    const filteredData = coinData.filter((el) => {
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
                    // let original = cardDa;
                    // original.push({"id": "mita", "last": 124, "volume": 1});
                    // original.push({"id": "hiya", "last": 124, "volume": 1});
                    // CardDataCallback(original);
                }} key={item.id}>{item.id}</li>
            ))}
        </ul>
    )
}

export default List