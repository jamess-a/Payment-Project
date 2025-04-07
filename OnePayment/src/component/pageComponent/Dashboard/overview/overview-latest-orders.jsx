import { format } from "date-fns";
import PropTypes from "prop-types";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Scrollbar from "../../../common/Scrollbar";
import SeverityPill from "../../../common/Severity-pill";
import StatusBadge from "../../../common/StatusBadge";
import DateFormatter from "../../../../utils/dateFormatter";
import { useNavigate } from "react-router-dom";

const OverviewLatestOrders = (props) => {
  const { transactions = [], sx, fetchTransactions } = props;
  const navigate = useNavigate();

  const handleTransactions = () => {
    navigate("/transactions");
  };

  return (
    <Card sx={sx}>
      <CardHeader title="Latest Transactions" />
      <Scrollbar sx={{ flexGrow: 1, height: 500 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "background.paper" }}>
                <TableCell
                  sx={{
                    position: "sticky",
                    top: 0,
                    backgroundColor: "background.paper",
                    zIndex: 1,
                  }}
                >
                  Transaction Ref.
                </TableCell>
                <TableCell
                  sx={{
                    position: "sticky",
                    top: 0,
                    backgroundColor: "background.paper",
                    zIndex: 1,
                  }}
                >
                  Payer
                </TableCell>
                <TableCell
                  sx={{
                    position: "sticky",
                    top: 0,
                    backgroundColor: "background.paper",
                    zIndex: 1,
                  }}
                  sortDirection="desc"
                >
                  Date
                </TableCell>
                <TableCell
                  sx={{
                    position: "sticky",
                    top: 0,
                    backgroundColor: "background.paper",
                    zIndex: 1,
                  }}
                >
                  Status
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {transactions.map((transactions) => {
                return (
                  <TableRow hover key={transactions.transaction_id}>
                    <TableCell>{transactions.transaction_ref}</TableCell>
                    <TableCell>{transactions.payee}</TableCell>
                    <TableCell>
                      {DateFormatter(transactions.timestamp_thai)}
                    </TableCell>
                    <TableCell>
                      <StatusBadge
                        status_id={transactions.transaction_id}
                        currentStatus={transactions.transaction_status}
                        fetchTransactions={fetchTransactions}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>

      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: "text.secondary",
            fontSize: 14,
          }}
        >
          Showing {transactions.length} of {transactions.length}
        </Box>
        <Button
          color="inherit"
          endIcon={
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          }
          size="small"
          variant="text"
          onClick={handleTransactions}
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewLatestOrders.prototype = {
  transactions: PropTypes.array,
  sx: PropTypes.object,
};

export default OverviewLatestOrders;
