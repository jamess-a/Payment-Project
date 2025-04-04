import React from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Avatar,
  IconButton,
  Box,
  Grid,
} from "@mui/material";
import StatusUi from "../../common/StatusIcon";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const secondaryColor = "#757575";

const DetailCard = ({ mockData }) => {
  return (
    <Card
      sx={{
        maxWidth: 600,
        bgcolor: "#fff",
        borderRadius: 3,
        boxShadow: 5,
        textAlign: "center",
        padding: 2,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <StatusUi status={"pending"} />
        <Typography variant="h6">PENDING</Typography>
      </Box>

      <CardContent>
        {/* User Transfer Info */}
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
            <ArrowDownwardIcon color="success" />
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

        {/* Transaction Details */}
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

          <Typography variant="body2" sx={{ mt: 1, color: secondaryColor }}>
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

          <Typography variant="body2" sx={{ mt: 1, color: secondaryColor }}>
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

        {/* Approve Button */}
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
    </Card>
  );
};

export default DetailCard;
