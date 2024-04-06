import React, { useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectBankingUser, createDeleteAsync } from "../../slices/bankingSlice";
import styles from "../general/common.module.css";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../../apis/bankingAPI";

export function Account() {
  const bankingUser = useAppSelector(selectBankingUser);
  const dispatch = useAppDispatch();
  const token = getAccessToken();
  const navigate = useNavigate();

  let createInfoElem = (
    <div className={styles.row}>
      <button
        className={styles.button}
        onClick={() => {
          dispatch(createDeleteAsync({ account: bankingUser, token }));
          // localStorage.removeItem("user");
          // navigate("/login");
        }}
      >
        Delete Account
      </button>
    </div>
  );

  return (
    <div>
      <div className={styles.row} id="welcomeDiv">
        {createInfoElem}
      </div>
    </div>
  );
}

function openDeleteCreation(setDisplay: any, setDeleteCreation: any) {
  setDisplay(false);
  setDeleteCreation(true);
}

function closeDeleteCreation(setDisplay: any, setDeleteCreation: any) {
  setDisplay(true);
  setDeleteCreation(false);
}
