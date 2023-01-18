import styles from "../Banking.module.css";
import { Box } from "@mui/material";
import React from "react";
import { useAppDispatch } from "../../../app/hooks";

const Transaction = (props: any) => {
  const dispatch = useAppDispatch();

  return (
    <Box>
      <Transaction />
      <button
        className={styles.button}
        onClick={() =>
          props.closeTransactionCreation(
            props.setDisplay,
            props.setTransactionCreation,
            dispatch
          )
        }
      >
        Back
      </button>
    </Box>
  );
};

export default Transaction;
