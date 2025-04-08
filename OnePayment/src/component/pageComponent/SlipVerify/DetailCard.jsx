import React from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Container,
} from "@mui/material";
import StatusUi from "../../common/StatusIcon";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const secondaryColor = "#757575";

const DetailCard = ({ mockData, sx }) => {
  return (
    <Container maxWidth="md" sx={{ mt: 1 }}>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Box
            sx={{
              width: "100%",
              maxWidth: { xs: "100%", sm: "500px", md: "700px" },
              bgcolor: "#fff",
              minHeight: { xs: "300px", sm: "500px", md: "600px" },
              borderRadius: 3,
              boxShadow: 5,
              textAlign: "center",
              color: "black",
              mx: "auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
              }}
            >
              <StatusUi status={"pending"} />
              <Typography variant="h6">PENDING</Typography>
            </Box>

            <CardContent>
              <Grid
                container
                spacing={1}
                alignItems="center"
                justifyContent="center"
                display="flex"
                flexDirection={"column"}
              >
                <Grid item>
                  <TextField
                    value={mockData.payer || "-"}
                    variant="outlined"
                    size="small"
                    InputProps={{ readOnly: true }}
                    sx={{ bgcolor: "#D9D9D9" }}
                  />
                </Grid>
                <Grid item>
                  <AccountCircleIcon />
                </Grid>
                <Grid item>
                  <ArrowDownwardIcon />
                </Grid>
                <Grid item>
                  <TextField
                    value={mockData.payee || "-"}
                    variant="outlined"
                    size="small"
                    InputProps={{ readOnly: true }}
                    sx={{ bgcolor: "#D9D9D9" }}
                  />
                </Grid>
              </Grid>
              <Box sx={{ textAlign: "left", mt: 2 }}>
                <Typography variant="body2" sx={{ color: secondaryColor }}>
                  Ref. 1
                </Typography>
                <TextField
                  value={mockData.ref1 || "-"}
                  variant="outlined"
                  fullWidth
                  size="small"
                  InputProps={{ readOnly: true }}
                  sx={{ bgcolor: "#D9D9D9" }}
                />

                <Typography
                  variant="body2"
                  sx={{ mt: 1, color: secondaryColor }}
                >
                  Amount
                </Typography>
                <TextField
                  value={mockData.amount || "-"}
                  variant="outlined"
                  fullWidth
                  size="small"
                  InputProps={{ readOnly: true }}
                  sx={{ bgcolor: "#D9D9D9" }}
                />

                <Typography
                  variant="body2"
                  sx={{ mt: 1, color: secondaryColor }}
                >
                  Payee Bank
                </Typography>
                <TextField
                  value={mockData.payeeBank || "-"}
                  variant="outlined"
                  fullWidth
                  size="small"
                  InputProps={{ readOnly: true }}
                  sx={{ bgcolor: "#D9D9D9" }}
                />

                <Box textAlign="center" my={1}>
                  <ArrowDownwardIcon />
                </Box>

                <Typography variant="body2" sx={{ color: secondaryColor }}>
                  Payer Bank
                </Typography>
                <TextField
                  value={mockData.payerBank || "-"}
                  variant="outlined"
                  fullWidth
                  size="small"
                  InputProps={{ readOnly: true }}
                  sx={{ bgcolor: "#D9D9D9" }}
                />
              </Box>
              <Button
                variant="contained"
                color="success"
                maxWidth="sm"
                sx={{
                  mt: 2,
                  borderRadius: 3,

                  textTransform: "none",
                }}
              >
                APPROVE
              </Button>
            </CardContent>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DetailCard;
