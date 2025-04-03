import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';

const SimpleBudgetCalculator = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Expedition Budget Calculator
        </Typography>
        <Typography variant="body1" paragraph>
          Estimate and track the costs for your Alaska Range expedition.
        </Typography>
        
        <Paper sx={{ p: 4, mb: 3 }}>
          <Typography variant="h5" gutterBottom>
            Budget Breakdown for Alaska Range Expedition
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Expense Category</TableCell>
                  <TableCell align="right">Estimated Cost ($)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Air Taxi (Talkeetna to Ruth Gorge)</TableCell>
                  <TableCell align="right">1,200</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Food (per person for 14 days)</TableCell>
                  <TableCell align="right">350</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Lodging in Talkeetna (2 nights)</TableCell>
                  <TableCell align="right">200</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Equipment Rentals</TableCell>
                  <TableCell align="right">500</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Rescue Insurance</TableCell>
                  <TableCell align="right">160</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Total (per person)</strong></TableCell>
                  <TableCell align="right"><strong>2,410</strong></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        
        <Paper sx={{ p: 4, mt: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Budget Planning Tips
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Air Taxi:</strong> The largest expense (typically $1,200 per person). Consider coordinating with other teams to share flights for lower costs.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Equipment:</strong> Renting specialized gear in Anchorage can be more economical than purchasing or paying excess baggage fees.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Food Planning:</strong> Pre-packaged meals are convenient but expensive. Consider dehydrating your own meals for significant savings.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Weather Buffer:</strong> Always budget for 2-3 extra days due to potential weather delays for both fly-in and fly-out.
          </Typography>
        </Paper>
        
        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Note: All estimates are approximate and based on 2025 prices. Actual costs may vary depending on your specific itinerary and group size.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default SimpleBudgetCalculator;
