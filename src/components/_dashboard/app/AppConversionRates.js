import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Box, Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../charts';

export default function AppConversionRates({ projects }) {
  const CHART_DATA = [{ data: projects.map((i) => i.id - 10000) }];
  const chartOptions = merge(BaseOptionChart(), {
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `${seriesName}`
        }
      }
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: '28%', borderRadius: 2 }
    },
    xaxis: {
      categories: projects.map((i) => i.name)
    }
  });

  return (
    <Card>
      <CardHeader title="All projects" subheader="Jira" />
      <Box sx={{ mx: 1 }} dir="ltr">
        <ReactApexChart
          type="bar"
          series={CHART_DATA}
          options={chartOptions}
          height={250}
        />
          <ReactApexChart
          type="line"
          series={CHART_DATA}
          options={chartOptions}
          height={200}
        />
      </Box>
    </Card>
  );
}
