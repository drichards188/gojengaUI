import {
    Autocomplete,
    Button,
    CircularProgress,
    Grid,
    SnackbarOrigin,
    TextField,
} from "@mui/material";
import Header from "../../components/general/Header";
import React, {useEffect, useState} from "react";
import TradingViewWidget from "../../components/risk/TradingViewChart";
import styles from "../../components/general/common.module.css";
import {
    getAccessToken,
    getCalcSymbols,
    getCompanyName,
    getDiversRec,
} from "../../apis/bankingAPI";
import DiversificationCard from "../../components/general/DiversificationCard";
import {selectStatus} from "../../slices/bankingSlice";
import {useAppSelector} from "../../app/hooks";
import Typography from "@mui/material/Typography";

interface State extends SnackbarOrigin {
    open: boolean;
}

const Diversification = () => {
    const [securityList, setSecurityList] = useState([
        "Symbol",
        "CRM",
        "MSFT",
        "GOOGL",
    ]);
    const [securitySymbol, setSecuritySymbol] = React.useState<string | null>(
        securityList[0]
    );

    const state = useAppSelector(selectStatus);
    const [isLoading, setIsLoading] = React.useState(false);
    const [tvSymbol, setTvSymbol] = React.useState<string | null>();
    const [companyName, setCompanyName] = React.useState<string | null>();
    const [inputValue, setInputValue] = React.useState("");
    const [showTv, setShowTv] = useState(false);
    const [diversRec, setDiversRec] = useState([
        {
            symbol: "CAH",
            name: "Cardinal Health",
            correlation: 0.230304,
        },
        {

            symbol: "CRM",
            name: "Salesforce",
            correlation: 0.5304,
        },
        {
            symbol: "MSFT",
            name: "Microsoft",
            correlation: -0.552,
        },
    ]);
    const jwtToken = getAccessToken();

    const fontColor = "#61429E";

    useEffect(() => {
        async function getAllSymbols() {
            let response = await getCalcSymbols(jwtToken);
            setIsLoading(true);
            if (response.data !== undefined) {
                setIsLoading(false);
                if (!securityList.includes(response.data[0])) {
                    setSecurityList([...securityList, ...response.data]);
                }
            } else {
                setIsLoading(false);
                console.log("--> error getting risk symbols");
            }
        }

        getAllSymbols();
    }, []);

    let loadingCircle: JSX.Element = <></>;
    if (isLoading) {
        loadingCircle = <CircularProgress/>;
    }

    useEffect(() => {
        // alert(`state is ${state}`);
        if (state === "loading") {
            // alert(`state read as ${state}`);
            setIsLoading(true);
        } else {
            setIsLoading(false);
            loadingCircle = <></>;
        }
    }, [state]);

    async function getDiverseRecs(symbol: string, jwtToken: string) {
        let response = await getDiversRec(symbol, jwtToken);
        if (response.data !== "network error") {
            setDiversRec(response.data.result);
        }
    }

    async function getSymbolName(symbol: string) {
        let response = await getCompanyName(symbol, jwtToken);
        if (response.data !== "network error") {
            setCompanyName(response.data.name);
        } else {
            setCompanyName("Fortinet (Offline Mode)");
        }
    }

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="flex-start"
            className={styles.fullscreenHeight}
        >
            <Grid
                item
                xs={12}
                md={12}
                lg={8}
                xl={6}
                className={styles.headerContainer}
            >
                <Header/>
            </Grid>

            <Grid item xs={12} md={12} lg={8}>
                <Grid container justifyContent="center">
                    <Grid item xs={12} md={10}>
                        <Grid
                            container
                            justifyContent="space-between"
                            alignItems="center"
                            className={styles.defaultContainer}
                        >
                            <Grid item xs={12} md={6}>
                                <Typography
                                    variant="h3"
                                    noWrap
                                    style={{overflowWrap: "break-word"}}
                                >
                                    Diversification
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6} style={{padding: "2%"}}>
                                <Grid container>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={securityList}
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
                                            "& .MuiSvgIcon-root": {
                                                color: "#BA79F7",
                                            },
                                            width: 300,
                                        }}
                                        value={securitySymbol}
                                        inputValue={inputValue}
                                        onInputChange={(event, newInputValue) => {
                                            if (newInputValue !== "Symbol") {
                                                setInputValue(newInputValue);
                                            }
                                        }}
                                        onChange={(event: any, newValue: string | null) => {
                                            if (newValue !== "Symbol") {
                                                setSecuritySymbol(newValue);
                                            }
                                        }}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Select Symbol"/>
                                        )}
                                    />
                                    <Button
                                        id="divers-retrieve"
                                        onClick={() => {
                                            if (securitySymbol != null) {
                                                getSymbolName(securitySymbol);
                                                getDiverseRecs(securitySymbol, jwtToken);
                                                setTvSymbol(securitySymbol);
                                                setShowTv(true);
                                            }
                                        }}
                                    >
                                        Retrieve
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                {showTv && (
                    <Grid item xs={12} style={{paddingLeft: "0px"}}>
                        <Grid
                            item
                            xs={12}
                            style={{
                                backgroundColor: "rgba(0,0,0,.5)",
                                color: fontColor,
                                borderRadius: "15px",
                            }}
                        >
                            <h2>Recommendations</h2>
                            <h3>{companyName}</h3>
                            <Grid
                                container
                                spacing={2}
                                alignItems="flex-start"
                                justifyContent="space-evenly"
                            >
                                {diversRec.map((rec: any) => {
                                    return (
                                        <Grid item xs={12} md={4}>
                                            <DiversificationCard
                                                symbol={rec.symbol}
                                                name={rec.name}
                                                corr={rec.correlation}
                                            />
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Grid>
                        <Grid item xs={12} style={{height: "40vh"}}>
                            <TradingViewWidget chartId={tvSymbol}/>
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
};

export default Diversification;
