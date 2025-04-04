import { useState, useEffect } from "react";
import { Box, Divider, Typography } from "@mui/material";
import ImportCard from "../component/pageComponent/SlipVerify/ImportCard";
import DetailCard from "../component/pageComponent/SlipVerify/DetailCard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BlockIcon from "@mui/icons-material/Block";

const App = () => {
  const [isImported, setIsimported] = useState(false);
  const [mock, setMock] = useState({});

  useEffect(() => {
    console.log(mock);
  }, [mock]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        gap: 4,
      }}
    >
      <div style={{ width: "30%", display: "flex", justifyContent: "center" }}>
        <ImportCard
          setIsImported={setIsimported}
          isImported={isImported}
          setMock={setMock}
        />
      </div>

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Divider
            orientation="horizontal"
            sx={{
              width: 100,
              height: 2,
              bgcolor: "gray",
            }}
          />
          {isImported ? (
            <CheckCircleIcon sx={{ color: "green", fontSize: 40 }} />
          ) : (
            <BlockIcon sx={{ color: "red", fontSize: 40 }} />
          )}

          <Divider
            orientation="horizontal"
            sx={{
              width: 100,
              height: 2,
              bgcolor: "gray",
            }}
          />
        </Box>
        <Typography variant="caption" sx={{ color: "white", mt: 1 }}>
          {isImported ? "ready to approve" : "Not ready to approve"}
        </Typography>
      </Box>

      <div style={{ width: "20%", marginTop: 20 }}>
        <DetailCard mockData={mock} />
      </div>
    </Box>
  );
};

export default App;
