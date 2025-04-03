import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Paper,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme
} from '@mui/material';
import { Line, Bar } from 'react-chartjs-2';
import seasonalInfo from '../data/seasonalInfo';

const SeasonalInfo = () => {
  const theme = useTheme();

  // Configure the climate chart data
  const climateChartData = {
    labels: seasonalInfo.climateChart.months,
    datasets: [
      {
        label: 'High Temp (°F)',
        data: seasonalInfo.climateChart.highTemp,
        borderColor: theme.palette.error.main,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: false,
        tension: 0.2,
        yAxisID: 'y',
      },
      {
        label: 'Low Temp (°F)',
        data: seasonalInfo.climateChart.lowTemp,
        borderColor: theme.palette.primary.main,
        backgroundColor: 'rgba(53, 162, 235, 0.2)',
        fill: false,
        tension: 0.2,
        yAxisID: 'y',
      },
      {
        type: 'bar',
        label: 'Snowfall (inches)',
        data: seasonalInfo.climateChart.snowfall,
        backgroundColor: 'rgba(200, 200, 200, 0.5)',
        borderColor: 'rgba(200, 200, 200, 1)',
        borderWidth: 1,
        yAxisID: 'y1',
      }
    ],
  };

  const climateChartOptions = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Talkeetna Climate Data (Ruth Gorge Proxy)',
      },
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Temperature (°F)'
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Snowfall (inches)'
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Seasonal Conditions
        </Typography>
        <Typography variant="body1" paragraph>
          Understanding the seasonal patterns and climbing windows is crucial for planning a successful expedition
          to the Ruth Gorge. This information is based on historical weather data and climber experiences.
        </Typography>
      </Box>

      {/* Overview Section */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Seasonal Overview
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body1" paragraph>
          {seasonalInfo.overview}
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Optimal Windows
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  Ice & Mixed Routes
                </Typography>
                <Typography variant="body2">
                  {seasonalInfo.optimalWindows.iceRoutes}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  Rock Routes
                </Typography>
                <Typography variant="body2">
                  {seasonalInfo.optimalWindows.rockRoutes}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  Ski Mountaineering
                </Typography>
                <Typography variant="body2">
                  {seasonalInfo.optimalWindows.skiMountaineering}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      {/* Climate Chart */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Climate Data Visualization
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Month</strong></TableCell>
                <TableCell align="right"><strong>High Temp (°F)</strong></TableCell>
                <TableCell align="right"><strong>Low Temp (°F)</strong></TableCell>
                <TableCell align="right"><strong>Precipitation (in)</strong></TableCell>
                <TableCell align="right"><strong>Snowfall (in)</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {seasonalInfo.climateChart.months.map((month, index) => (
                <TableRow key={month} sx={{
                  backgroundColor: 
                    month === 'Apr' || month === 'May' 
                      ? 'rgba(76, 175, 80, 0.08)' 
                      : 'inherit'
                }}>
                  <TableCell><strong>{month}</strong></TableCell>
                  <TableCell align="right">{seasonalInfo.climateChart.highTemp[index]}</TableCell>
                  <TableCell align="right">{seasonalInfo.climateChart.lowTemp[index]}</TableCell>
                  <TableCell align="right">{seasonalInfo.climateChart.precipitation[index]}</TableCell>
                  <TableCell align="right">{seasonalInfo.climateChart.snowfall[index]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          {seasonalInfo.climateChart.notes}
        </Typography>
      </Paper>

      {/* Monthly Conditions Table */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Monthly Conditions
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <TableContainer>
          <Table sx={{ minWidth: 650 }} size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Month</strong></TableCell>
                <TableCell><strong>Temperature</strong></TableCell>
                <TableCell><strong>Precipitation</strong></TableCell>
                <TableCell><strong>Daylight</strong></TableCell>
                <TableCell><strong>Route Conditions</strong></TableCell>
                <TableCell><strong>Notes</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {seasonalInfo.monthlyConditions.map((month) => (
                <TableRow key={month.month} sx={{
                  backgroundColor: 
                    month.month === 'April' || month.month === 'May' 
                      ? 'rgba(76, 175, 80, 0.08)' 
                      : 'inherit'
                }}>
                  <TableCell><strong>{month.month}</strong></TableCell>
                  <TableCell>{month.temperature}</TableCell>
                  <TableCell>{month.precipitation}</TableCell>
                  <TableCell>{month.daylight}</TableCell>
                  <TableCell>{month.routeConditions}</TableCell>
                  <TableCell>{month.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Note: April and May (highlighted) are typically considered the prime climbing window for the Ruth Gorge.
        </Typography>
      </Paper>

      {/* Weather Patterns */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Weather Patterns & Considerations
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Spring Cycles
            </Typography>
            <Typography variant="body2" paragraph>
              {seasonalInfo.weatherPatterns.springCycles}
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Storms & Weather Systems
            </Typography>
            <Typography variant="body2" paragraph>
              {seasonalInfo.weatherPatterns.storms}
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Temperature Patterns
            </Typography>
            <Typography variant="body2" paragraph>
              {seasonalInfo.weatherPatterns.temperatures}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Snowpack & Avalanche Information */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Snowpack & Avalanche Considerations
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Snowpack Depth
            </Typography>
            <Typography variant="body2" paragraph>
              {seasonalInfo.snowpackInfo.depth}
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Stability Patterns
            </Typography>
            <Typography variant="body2" paragraph>
              {seasonalInfo.snowpackInfo.stability}
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Avalanche Risk Factors
            </Typography>
            <Typography variant="body2" paragraph>
              {seasonalInfo.snowpackInfo.avalancheRisk}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default SeasonalInfo;
