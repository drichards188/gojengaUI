import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectCoinList, addCoinToDisplayList } from "./dashboardSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CustomButton from "../general/CustomButton";

function List(props: any) {
  const coinData = useAppSelector(selectCoinList);

  const [searchMin, setSearchMin] = useState(0);
  const [searchMax, setSearchMax] = useState(10);

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
    backgroundColor: "rgba(112, 76, 182, 0.1)",
    color: "#BA79F7",
    boxShadow:
      "0px 3px 1px -2px rgba(112,76,182),0px 2px 2px 0px rgba(112,76,182,0.9),0px 1px 5px 0px rgba(82,0,130,0.12)",
  };

  return (
    <ul>
      {filteredData.slice(searchMin, searchMax).map((item: any) => (
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
      {props.input && (
        <CustomButton
          label={"Less"}
          clickFunction={() => {
            if (searchMin >= 10) {
              setSearchMin(searchMin - 10);
              setSearchMax(searchMax - 10);
            }
          }}
        />
      )}

      {props.input && (
        <CustomButton
          label={"More"}
          clickFunction={() => {
            if (searchMax + 10 <= coinData.length) {
              setSearchMin(searchMin + 10);
              setSearchMax(searchMax + 10);
            }
          }}
        />
      )}
    </ul>
  );
}

export default List;
