import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectCoinList, addCoinToDisplayList } from "./dashboardSlice";

function List(props: any) {
  const coinData = useAppSelector(selectCoinList);

  const dispatch = useAppDispatch();

  const filteredData = coinData.filter((el: any) => {
    //if no input the return the original
    if (props.input === "") {
      // return el;
    }
    //return the item which contains the user input
    else {
      return el.id.toLowerCase().includes(props.input);
    }
  });

  const divStyle = {
    display: "inline-block",
    margin: "5px",
    padding: "2px",
    cursor: "pointer",
    backgroundColor: "#4d535c",
    color: "#4fc3f7",
  };

  //todo add pagination to results
  return (
    <ul>
      {filteredData.slice(0, 10).map((item: any) => (
        <li
          style={divStyle}
          onClick={() => {
            dispatch(addCoinToDisplayList([item.id]));
            // let original = cardDa;
            // original.push({"id": "mita", "last": 124, "volume": 1});
            // original.push({"id": "hiya", "last": 124, "volume": 1});
            // CardDataCallback(original);
          }}
          key={item.id}
        >
          {item.id}
        </li>
      ))}
    </ul>
  );
}

export default List;
