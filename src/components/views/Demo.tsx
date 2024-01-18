import { Grid } from "@mui/material";

const Demo = () => {
  return (
    <Grid
      container
      direction="column"
      alignItems="flex-start"
      style={{ minHeight: "100vh" }}
    >
      <Grid item md={4}>
        Hi
      </Grid>
      <Grid item md={4}>
        I'm Ultron
      </Grid>
    </Grid>
  );
};

export default Demo;
