import React, { useEffect, useState } from "react";
import StatusBadges from "./StatusBadge";
import QRCodeGenerator from "./QrcodeGen";
import CloseButton from "./CloseButton";
import QrCodeIcon from "@mui/icons-material/QrCode";
import StatusUi from "./StatusIcon";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Card,
  Box,
  Dialog,
  DialogTitle,
  Typography,
  Icon,
} from "@mui/material";
import Swal from "sweetalert2";
import {
  postRequest,
  getRequest,
  deleteRequest,
} from "../../utils/requestUtil";
import dateformatter from "../../utils/dateFormatter";
import amountformatter from "../../utils/amountFormatter";

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qrLoading, setQrLoading] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [QrModalOpen, SetQrModalOpen] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await getRequest("/transaction/showlogs");
      setTransactions(response.data);
    } catch (error) {
      Swal.fire("Error!", "Unable to fetch transactions.", "error");
    } finally {
      setLoading(false);
    }
  };

  const deleteTransaction = async (transactiondata) => {
    Swal.fire({
      title: "Are you sure?",
      text: ` You will not be able to recover the transaction with ID ${transactiondata.transaction_ref}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteRequest(
            `/transaction/${transactiondata.transaction_id}`
          );
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

  const ColumnStyle = { borderRight: "1px solid #ccc" };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ width: "90%" ,  padding: "8px", mx: "auto" , borderRadius: "0px 0px 12px 12px" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={ColumnStyle}>Transaction Ref.</TableCell>
              <TableCell sx={ColumnStyle}>Staff</TableCell>
              <TableCell sx={ColumnStyle}>Bank</TableCell>
              <TableCell sx={ColumnStyle}>Amount (THB)</TableCell>
              <TableCell sx={ColumnStyle}>Date</TableCell>
              <TableCell sx={{ ...ColumnStyle, width: "100px" }}>
                Status
              </TableCell>
              <TableCell sx={{ ...ColumnStyle, width: "100px" }}>
                Actions
              </TableCell>
              <TableCell sx={{ ...ColumnStyle, width: "70px" }}>
                QR Code
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              textAlign: "center",
              width: "50%",
              maxHeight: "400px",
              overflowY: "auto",
            }}
          >
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : transactions.length > 0 ? (
              transactions.map((transaction) => (
                <TableRow key={transaction.transaction_id}>
                  <TableCell sx={ColumnStyle}>
                    {transaction.transaction_ref}
                  </TableCell>
                  <TableCell sx={ColumnStyle}>
                    {transaction.user_name}
                  </TableCell>
                  <TableCell sx={ColumnStyle}>{transaction.bank_id}</TableCell>
                  <TableCell sx={ColumnStyle}>
                    {amountformatter(transaction.amount)}
                  </TableCell>
                  <TableCell sx={ColumnStyle}>
                    {dateformatter(transaction.timestamp)}
                  </TableCell>
                  <TableCell sx={ColumnStyle}>
                    {
                      <StatusBadges
                        status_id={transaction.id}
                        currentStatus={transaction.status}
                        fetchTransactions={fetchTransactions}
                      />
                    }
                  </TableCell>
                  <TableCell sx={ColumnStyle}>
                    {
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() =>
                          deleteTransaction({
                            transaction_id: transaction.id,
                            transaction_ref: transaction.transaction_ref,
                          })
                        }
                        sx={{ borderRadius: "15px" }}
                      >
                        Delete
                      </Button>
                    }
                  </TableCell>
                  <TableCell sx={ColumnStyle}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        setSelectedTransaction(transaction);
                        SetQrModalOpen(true);
                      }}
                    >
                      <QrCodeIcon />
                    </Button>

                    <Dialog
                      open={QrModalOpen}
                      onClose={() => SetQrModalOpen(false)}
                      fullWidth
                      maxWidth="xs"
                      sx={{
                        "& .MuiDialog-paper": {
                          borderRadius: "20px",
                          padding: "20px",
                          boxShadow: "none",
                        },
                        "& .MuiBackdrop-root": {
                          backgroundColor: "rgba(0, 0, 0, 0.1)",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <StatusUi
                          status={selectedTransaction?.status || "default"}
                        />
                        <CloseButton onClose={() => SetQrModalOpen(false)} />
                      </Box>
                      <DialogTitle
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="h6" gutterBottom sx={{ ml: 2 }}>
                          {" "}
                          {selectedTransaction
                            ? selectedTransaction.transaction_ref
                            : ""}
                        </Typography>
                      </DialogTitle>

                      <Box sx={{ fontSize: "10px" }}>
                        <Typography gutterBottom sx={{ ml: 2 }}>
                          Amount:{" "}
                          {selectedTransaction
                            ? selectedTransaction.amount
                            : "-"}{" "}
                          THB
                        </Typography>
                        <Typography gutterBottom sx={{ ml: 2 }}>
                          Bank id:{" "}
                          {selectedTransaction
                            ? selectedTransaction.bank_id
                            : "-"}
                        </Typography>
                        <Typography gutterBottom sx={{ ml: 2 }}>
                          Time:{" "}
                          {selectedTransaction
                            ? new Date(
                                selectedTransaction.timestamp
                              ).toLocaleString("th-TH", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                                hour12: false,
                                timeZone: "Asia/Bangkok",
                              })
                            : "-"}
                        </Typography>
                      </Box>

                      <Box
                        sx={{ p: 3, display: "flex", justifyContent: "center" }}
                      >
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <div sx={{ textAlign: "center" }}>
                            {qrLoading ? (
                              <CircularProgress
                                sx={{ display: "block", mx: "auto" }}
                              />
                            ) : (
                              selectedTransaction && (
                                <QRCodeGenerator
                                  bankId={selectedTransaction.bank_id}
                                  amount={selectedTransaction.amount}
                                  setQrLoading={setQrLoading}
                                />
                              )
                            )}
                          </div>
                        </Box>
                      </Box>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No transactions available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TransactionsTable;
