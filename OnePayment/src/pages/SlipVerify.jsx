import { useState, useEffect } from "react";
import { Box, Container, Divider, Typography, Grid } from "@mui/material";
import ImportCard from "../component/pageComponent/SlipVerify/ImportCard";
import DetailCard from "../component/pageComponent/SlipVerify/DetailCard";
import ProcessingBar from "../component/pageComponent/SlipVerify/ProcessingBar";
import Swal from "sweetalert2";

const SlipVerify = () => {
  const [isImported, setIsimported] = useState(false);
  const [mock, setMock] = useState({});

  useEffect(() => {}, [mock, isImported]);

  return (
    <Container
      maxWidth="xl"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Grid
        container
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Grid
          xs={12}
          md={12}
          lg={4}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <ImportCard
            setIsImported={setIsimported}
            isImported={isImported}
            setMock={setMock}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid
          xs={12}
          sm={12}
          lg={2}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ProcessingBar isImported={isImported} />
        </Grid>
        <Grid
          xs={12}
          sm={12}
          lg={4}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <DetailCard mockData={mock} sx={{ width: "100%" }} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default SlipVerify;
