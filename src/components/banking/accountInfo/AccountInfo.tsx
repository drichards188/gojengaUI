import { Account } from "../../account/Account";
import styles from "../Banking.module.css";
import { Box } from "@mui/material";
import React from "react";
import { useAppDispatch } from "../../../app/hooks";
import { BankComponents } from "../Banking";
import { setMessage } from "../bankingSlice";

const AccountInfo = (props: any) => {
  const dispatch = useAppDispatch();

  return (
    <Box>
      <Account />
      <button
        className={styles.button}
        onClick={() => {
          props.setDisplayComponent(BankComponents.None);
          props.setDisplayToolbar(true);
          dispatch(setMessage(""));
        }}
      >
        Back
      </button>
    </Box>
  );
};

export default AccountInfo;
