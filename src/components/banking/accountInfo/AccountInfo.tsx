import { Account } from "../../account/Account";
import styles from "../Banking.module.css";
import { Box } from "@mui/material";
import React from "react";
import { useAppDispatch } from "../../../app/hooks";

const AccountInfo = (props: any) => {
  const dispatch = useAppDispatch();

  return (
    <Box>
      <Account />
      <button
        className={styles.button}
        onClick={() =>
          props.closeInfoCreation(
            props.setDisplay,
            props.setInfoCreation,
            dispatch
          )
        }
      >
        Back
      </button>
    </Box>
  );
};

export default AccountInfo;
