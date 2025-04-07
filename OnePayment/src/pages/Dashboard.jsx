import React, { useEffect, useState } from "react";
import { getRequest } from "../utils/requestUtil";
import { Typography, Box } from "@mui/material";
import TotalCard from "../component/common/TotalCard";
import { subDays, subHours } from "date-fns";
import {
  SvgIcon,
  Button,
  CardHeader,
  Container,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import OverviewBudget from ".././component/pageComponent/Dashboard/overview/overview-budget";
import OverviewLatestOrders from ".././component/pageComponent/Dashboard/overview/overview-latest-orders";
import OverviewLatestProducts from ".././component/pageComponent/Dashboard/overview/overview-latest-products";
import OverviewSales from ".././component/pageComponent/Dashboard/overview/overview-sales";
import OverviewTasksProgress from ".././component/pageComponent/Dashboard/overview/overview-tasks-progress";
import OverviewTotalTransactions from ".././component/pageComponent/Dashboard/overview/overview-total-transactions";
import OverviewTotalProfit from ".././component/pageComponent/Dashboard/overview/overview-total-profit";
import OverviewTraffic from ".././component/pageComponent/Dashboard/overview/overview-traffic";
import ArrowPathIcon from "@heroicons/react/24/solid/ArrowPathIcon";
import Swal from "sweetalert2";
const now = new Date();

const Row = {
  display: "flex",
  flexDirection: "row",
  alignSelf: "center",
  width: "100%",
  gap: "10px",
};

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({});
  const [lastTransactions, setLastTransactions] = useState([]);
  const [bestEmployees, setPopular] = useState({});
  const [totalTransactions, setTotalTransactions] = useState({});

  const paths = [
    "/dashboard/summary",
    "/dashboard/lastest-transactions",
    "/dashboard/most-popular",
    "/dashboard/total-transactions",
  ];

  const fetchDashboard = async () => {
    Swal.fire({
      title: "Loading...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const responses = await Promise.all(
        paths.map((path) => getRequest(path))
      );

      Swal.close();

      Swal.fire("Success!", "Fetched all successfully.", "success");

      const [summaryRes, TransactionRes, popularRes, TotalTransactionRes] =
        responses;
      setSummary(summaryRes.data);
      setLastTransactions(TransactionRes.data);
      setPopular(popularRes.data);
      setTotalTransactions(TotalTransactionRes.data);
    } catch (error) {
      Swal.close();

      Swal.fire("Error!", "Unable to fetch total amount.", "error");
    }
  };

  const handlefetchDashboard = async () => {
    Swal.fire({
      title: "Loading...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const responses = await Promise.all(
        paths.map((path) => getRequest(path))
      );
      const [summaryRes, TransactionRes, popularRes, TotalTransactionRes] =
        responses;

      Swal.close();

      Swal.fire("Success!", "Fetched all successfully.", "success");

      setSummary(summaryRes.data);
      setLastTransactions([...TransactionRes.data]);
      setPopular(popularRes.data);
      setTotalTransactions(TotalTransactionRes.data);
    } catch (error) {
      Swal.close();

      Swal.fire("Error!", "Unable to fetch total amount.", "error");
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" gutterBottom style={{ textAlign: "start" }}>
          Dashboard
        </Typography>

        <Box>
          <Button
            color="inherit"
            size="small"
            startIcon={
              <SvgIcon fontSize="small">
                <ArrowPathIcon />
              </SvgIcon>
            }
            onClick={handlefetchDashboard}
          >
            Sync
          </Button>
        </Box>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewBudget
                difference={65}
                positive={true}
                sx={{ height: "100%" }}
                value={bestEmployees}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalTransactions
                difference={16}
                positive={false}
                sx={{ height: "100%" }}
                value={totalTransactions}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTasksProgress sx={{ height: "100%" }} value={75.5} />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalProfit
                sx={{ height: "100%" }}
                value={summary.totalAmount}
              />
            </Grid>
            <Grid xs={12} lg={8}>
              <OverviewSales
                chartSeries={[
                  {
                    name: "This year",
                    data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
                  },
                  {
                    name: "Last year",
                    data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13],
                  },
                ]}
                sx={{ height: "100%" }}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4}>
              <OverviewTraffic
                chartSeries={[63, 15, 22]}
                labels={["Desktop", "Tablet", "Phone"]}
                sx={{ height: "100%" }}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4}>
              <OverviewLatestProducts
                products={[
                  {
                    id: "5ece2c077e39da27658aa8a9",
                    image: "/assets/products/product-1.png",
                    name: "Healthcare Erbology",
                    updatedAt: subHours(now, 6).getTime(),
                  },
                  {
                    id: "5ece2c0d16f70bff2cf86cd8",
                    image: "/assets/products/product-2.png",
                    name: "Makeup Lancome Rouge",
                    updatedAt: subDays(subHours(now, 8), 2).getTime(),
                  },
                  {
                    id: "b393ce1b09c1254c3a92c827",
                    image: "/assets/products/product-5.png",
                    name: "Skincare Soja CO",
                    updatedAt: subDays(subHours(now, 1), 1).getTime(),
                  },
                  {
                    id: "a6ede15670da63f49f752c89",
                    image: "/assets/products/product-6.png",
                    name: "Makeup Lipstick",
                    updatedAt: subDays(subHours(now, 3), 3).getTime(),
                  },
                  {
                    id: "bcad5524fe3a2f8f8620ceda",
                    image: "/assets/products/product-7.png",
                    name: "Healthcare Ritual",
                    updatedAt: subDays(subHours(now, 5), 6).getTime(),
                  },
                ]}
                sx={{ height: "100%" }}
              />
            </Grid>
            <Grid xs={12} md={12} lg={8}>
              <OverviewLatestOrders
                transactions={lastTransactions}
                sx={{ height: "100%" }}
                fetchTransactions={handlefetchDashboard}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
