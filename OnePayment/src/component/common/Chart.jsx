import { lazy, Suspense } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";

const ApexChart = lazy(() => import("react-apexcharts"));

const ChartWrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const Chart = ({ options, series, type, height, width }) => {
  return (
    <ChartWrapper>
      <Suspense fallback={<div>Loading chart...</div>}>
        <ApexChart
          options={options}
          series={series}
          type={type}
          height={height}
          width={width}
        />
      </Suspense>
    </ChartWrapper>
  );
};

Chart.propTypes = {
  options: PropTypes.object.isRequired,
  series: PropTypes.array.isRequired,
  type: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Chart;
