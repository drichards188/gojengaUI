import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectCoinList, addCoinToDisplayList } from "./dashboardSlice";
import { useNavigate } from "react-router-dom";

function List(props: any) {
  const coinData = useAppSelector(selectCoinList);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  if (coinData == "" || null) {
    alert("coinData is empty");
    navigate("/");
  }

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
    boxShadow:
      "0px 3px 1px -2px rgba(112,76,182),0px 2px 2px 0px rgba(112,76,182,0.9),0px 1px 5px 0px rgba(82,0,130,0.12)",
  };

  //todo add pagination to results
  return (
    <ul>
      {filteredData.slice(0, 10).map((item: any) => (
        <li
          style={divStyle}
          onClick={() => {
            dispatch(addCoinToDisplayList([item.id]));
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
