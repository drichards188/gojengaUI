import styles from "../Banking.module.css";
import { Box, Container } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectBankingUser } from "../bankingSlice";
import { BankComponents } from "../../views/Banking";
import CustomButton from "../../general/CustomButton";

const BankingToolbar = (props: any) => {
  const dispatch = useAppDispatch();
  const username = useAppSelector(selectBankingUser);

  return (
    <Container className={styles.row}>
      <Box>
        <CustomButton
          label={"Deposit"}
          clickFunction={() => {
            props.setDisplayComponent(BankComponents.Deposit);
            props.setDisplayToolbar(false);
          }}
        />
        <CustomButton
          label={"Pay"}
          clickFunction={() => {
            props.setDisplayComponent(BankComponents.Transaction);
            props.setDisplayToolbar(false);
          }}
        />
        <CustomButton
          label={"Account"}
          clickFunction={() => {
            props.setDisplayComponent(BankComponents.Info);
            props.setDisplayToolbar(false);
          }}
        />
      </Box>
    </Container>
  );
};

export default BankingToolbar;
