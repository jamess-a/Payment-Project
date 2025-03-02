import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import Swal from "sweetalert2";
import {
  postRequest,
  getRequest,
  deleteRequest,
} from "../../utils/requestUtil";
import QRCodeGenerator from "./QrcodeGen";
import StatusBadge from "./StatusBadge";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qrLoading, setQrLoading] = useState(false);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await getRequest("/transaction/showlogs");
      console.log("Response:", response);
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions", error);
      Swal.fire("Error!", "Unable to fetch transactions.", "error");
    } finally {
      setLoading(false);
    }
  };

  const editStatus = async (status_id, status) => {
    try {
      const response = await postRequest(`/transaction/${status_id}`, {
        status,
      });
      console.log("Response:", response);
      if (response.success) {
        fetchTransactions();
      }
    } catch (error) {
      console.error("Error updating status", error);
      Swal.fire("Error!", "Unable to update status.", "error");
    }
  };

  const deleteTransaction = async (transactionId) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You will not be able to recover the transaction with ID ${transactionId}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteRequest(`/transaction/${transactionId}`);
          console.log("Response:", response);

          if (response.success) {
            Swal.fire(response.message, "", "success");
            fetchTransactions();
          }
        } catch (error) {
          console.error("Error deleting transaction", error);
          Swal.fire(
            "Failed!",
            "The transaction could not be deleted.",
            "error"
          );
        }
      }
    });
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" sx={{ mb: 5, textAlign: "center" }}>
        Transaction List
      </Typography>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={4}>
          {transactions && transactions.length > 0 ? (
            transactions.map((transaction) => (
              <Grid item xs={12} md={4} key={transaction.transaction_id}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      {/* Left Section: Transaction details */}
                      <Box sx={{ flex: 1, mr: 2, textAlign: "left" }}>
                        <Typography variant="h6">
                          Transaction ID: {transaction.transaction_id}
                        </Typography>
                        <Typography variant="body2">
                          Name: {transaction.user_name}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          Bank ID: {transaction.bank_id}
                        </Typography>
                        <Typography variant="body2">
                          Amount: {transaction.amount}
                        </Typography>
                        <Typography variant="body2">
                          Timestamp:{" "}
                          {new Date(transaction.timestamp).toLocaleString()}
                        </Typography>
                        <Typography variant="body2">
                          <StatusBadge
                            status_id={transaction.transaction_id}
                            currentStatus={transaction.status}
                            fetchTransactions={fetchTransactions}
                          />
                        </Typography>

                        <Button
                          variant="contained"
                          color="error"
                          sx={{ mt: 2 }}
                          onClick={() =>
                            deleteTransaction(transaction.transaction_id)
                          }
                        >
                          Delete
                        </Button>
                      </Box>

                      {/* Right Section: QR Code */}
                      <Box
                        sx={{
                          width: "150px",
                          display: "flex",
                          justifyContent: "center",
                          ml: 2,
                        }}
                      >
                        <Card sx={{ width: "100%" }}>
                          <CardContent>
                            {qrLoading ? (
                              <CircularProgress
                                sx={{ display: "block", mx: "auto" }}
                              />
                            ) : (
                              <QRCodeGenerator
                                bankId={transaction.bank_id}
                                amount={transaction.amount}
                                setQrLoading={setQrLoading}
                              />
                            )}
                          </CardContent>
                        </Card>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Box sx={{ display: "flex", justifyContent: "center", ml: 2 }}>
              <Typography
                variant="body2"
                sx={{
                  textAlign: "center",
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#555",
                }}
              >
                No transactions available.
              </Typography>
            </Box>
          )}
        </Grid>
      )}
    </Box>
  );
};

export default Transactions;
