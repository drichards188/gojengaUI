import styles from "../Banking.module.css";
import { Box } from "@mui/material";
import React from "react";
import { useAppDispatch } from "../../../app/hooks";

const Deposit = (props: any) => {
  const dispatch = useAppDispatch();

  return (
    <Box>
      <Deposit />
      <button
        className={styles.button}
        onClick={() =>
          props.closeDepositCreation(
            props.setDisplay,
            props.setDepositCreation,
            dispatch
          )
        }
      >
        Back
      </button>
    </Box>
  );
};

export default Deposit;
