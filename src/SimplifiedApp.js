import React from 'react';
import { Box, Container, Typography, Paper, Grid, Card, CardContent } from '@mui/material';

const SimplifiedApp = () => {
  return (
    <Box sx={{ backgroundColor: '#f5f5f7', minHeight: '100vh', p: 3 }}>
      <Container maxWidth="lg">
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Alaska Expedition Planner
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" gutterBottom>
            Ruth Gorge Glacier Climbing Trip
          </Typography>
        </Paper>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Routes Database
                </Typography>
                <Typography variant="body1">
                  The Ruth Gorge offers world-class technical climbing routes including classics like:
                </Typography>
                <ul>
                  <li>Ham and Eggs (Moose's Tooth) - Grade V, 5.9 WI4 M4</li>
                  <li>Shaken Not Stirred (Moose's Tooth) - Grade V, WI5 M5</li>
                  <li>Japanese Couloir (Mt. Barille) - Grade III, AI3-AI4</li>
                  <li>Southwest Ridge (Peak 11,300) - Grade V, 5.8 M4</li>
                </ul>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Seasonal Information
                </Typography>
                <Typography variant="body1" paragraph>
                  The optimal climbing window for the Ruth Gorge is typically mid-April to early May.
                </Typography>
                <Typography variant="body2">
                  <strong>Benefits of this window:</strong>
                </Typography>
                <ul>
                  <li>Cold enough for solid ice and stable snow</li>
                  <li>Longer days with improving weather patterns</li>
                  <li>May is historically the driest month</li>
                  <li>Reduced likelihood of rockfall and avalanche danger</li>
                </ul>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Logistics
                </Typography>
                <Typography variant="body1" paragraph>
                  Access to the Ruth Gorge requires a bush plane flight from Talkeetna.
                </Typography>
                <Typography variant="body2">
                  <strong>Key logistics points:</strong>
                </Typography>
                <ul>
                  <li>Air taxi services: Talkeetna Air Taxi, K2 Aviation</li>
                  <li>Round-trip flights: $650-$750 per person</li>
                  <li>Weight limit: 125 lbs per person (including body weight)</li>
                  <li>Typical landing zones: Ruth Gorge Basecamp (4,500'), Root Canal (7,200')</li>
                </ul>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Expedition Planning
                </Typography>
                <Typography variant="body1">
                  A well-prepared Ruth Gorge expedition includes:
                </Typography>
                <ul>
                  <li>Weather buffer days (2-3 days for fly-in, 2-3 days for fly-out)</li>
                  <li>Acclimatization days at basecamp</li>
                  <li>Comprehensive glacier camping gear</li>
                  <li>Technical ice and mixed climbing equipment</li>
                  <li>Satellite communication device</li>
                  <li>Food for entire expedition plus contingency days</li>
                </ul>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Paper sx={{ p: 3, mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            This application compiles information from various sources including Mountain Project, American Alpine Journal, 
            and trip reports to help you plan a safe and successful expedition to the Ruth Gorge.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default SimplifiedApp;
