import styles from "./common.module.css";
import {TextField} from "@mui/material";
import React from "react";

const CustomTextField = (props: any) => {
    return (
        <div>
            <TextField
                data-cy={props.cyLabel}
                id={props.label}
                label={props.label}
                variant="standard"
                type={props.type}
                className={styles.textbox}
                aria-label="Set Password"
                placeholder={props.label}
                value={props.value}
                autoFocus={props.autofocus}
                sx={{
                    "& .MuiInputBase-root": {
                        color: "primary.main",
                    },
                    "& .MuiFormLabel-root": {
                        color: "secondary.main",
                    },
                    "& .MuiFormLabel-root.Mui-focused": {
                        color: "primary.main",
                    },
                }}
                onChange={(e) => props.setter(e.target.value)}
            />
        </div>
    );
};

export default CustomTextField;
