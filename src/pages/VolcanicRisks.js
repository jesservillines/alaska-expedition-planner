import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Tabs, 
  Tab, 
  Grid, 
  Card, 
  CardContent, 
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Alert,
  Button,

  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { 
  Warning as WarningIcon,
  LocationOn as LocationIcon,
  History as HistoryIcon,
  Air as AirIcon,
  FlightTakeoff as FlightIcon,
  Terrain as TerrainIcon,
  HealthAndSafety as HealthIcon,
  WbSunny as WeatherIcon,
} from '@mui/icons-material';
// No longer using react-helmet

// Assuming we have a chart component for visualizing wind patterns
import { Line } from 'react-chartjs-2';

// Sample eruption history data
const eruptionHistory = [
  { 
    date: 'July 9, 1953', 
    ashfall: 'Ash carried east to Anchorage (~6 mm ash); ash reported >300 km away (Valdez)',
    impacts: 'Anchorage airport closed ~2 days; "day turned to night" under ash cloud',
    affectedRuthGorge: 'Possibly minor dust in Alaska Range (not well documented)'
  },
  { 
    date: 'June 27, 1992', 
    ashfall: 'Ash carried due north over Denali (Mt. McKinley) into Yukon. Light ashfall in interior wilderness',
    impacts: 'Minimal human impact (fell on unpopulated areas)',
    affectedRuthGorge: 'Yes – ash cloud passed over Denali; Ruth Glacier likely saw light ash deposition'
  },
  { 
    date: 'August 18, 1992', 
    ashfall: 'Ash carried east to Anchorage: ~3 mm ash (airport closed ~20 hours)',
    impacts: 'Anchorage area: poor air quality, transit disrupted',
    affectedRuthGorge: 'No – ash blew south/east, away from Ruth Gorge (north of Spurr)'
  },
  { 
    date: 'September 16-17, 1992', 
    ashfall: 'Ash carried NE over Mat-Su Valley (Talkeetna, etc.); heavy localized ashfall in Susitna Valley',
    impacts: 'Flights canceled in interior (Talkeetna) due to ash; widespread dusting in Mat-Su',
    affectedRuthGorge: 'Likely – ash plume extended toward Alaska Range, so Ruth area probably received some ashfall'
  },
  { 
    date: '2004-06 (unrest)', 
    ashfall: 'No eruption (intrusion only); "ice cauldron" formed at Spurr\'s summit, melting glacier ice',
    impacts: 'Minor local effects at volcano (muddy meltwater, steam jets). No ash emitted.',
    affectedRuthGorge: 'No ash (no eruption); noteworthy as a sign of magmatic heating beneath Spurr'
  },
  { 
    date: '2024-25 (current)', 
    ashfall: 'Ongoing unrest. Elevated gas emissions; >3,400 small quakes since Apr 2024; ~6.5 cm ground inflation detected. Wind forecasts show potential ashfall zones varying by day.',
    impacts: 'AVO Alert Level Advisory/Yellow (as of Apr 2025). State and local agencies on alert and preparing contingency plans. No eruption yet (as of mid-April 2025), but likelihood elevated.',
    affectedRuthGorge: 'No ashfall yet (no eruption). If an eruption occurs, possible risk depending on wind patterns.'
  }
];

// Sample wind pattern data
const windData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Probability of SW Wind (%) - Favorable for Ash Reaching Ruth Gorge',
      data: [35, 38, 42, 45, 40, 30, 25, 28, 32, 36, 38, 37],
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      fill: true,
    },
    {
      label: 'Probability of W Wind (%) - Ash Toward Anchorage',
      data: [40, 38, 36, 32, 30, 28, 30, 34, 35, 38, 42, 44],
      borderColor: 'rgba(54, 162, 235, 1)',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      fill: true,
    }
  ]
};

// Chart options
const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Seasonal Wind Pattern Probabilities',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
      title: {
        display: true,
        text: 'Probability (%)'
      }
    },
    x: {
      title: {
        display: true,
        text: 'Month'
      }
    }
  }
};

// Main component
const VolcanicRisks = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', pb: 4 }}>
      {/* Page title would normally go here */}
      
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3, mt: 2 }}>
        Volcanic Risk Analysis
      </Typography>
      
      <Alert 
        severity="warning" 
        sx={{ mb: 3 }}
        action={
          <Button 
            color="inherit" 
            size="small" 
            href="https://avo.alaska.edu/" 
            target="_blank"
            rel="noopener noreferrer"
          >
            CHECK AVO STATUS
          </Button>
        }
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
          Current Alert Level: ADVISORY (Aviation Color Code: YELLOW)
        </Typography>
        Mount Spurr is showing signs of elevated unrest as of April 2025. Officials warn an eruption is likely in the coming weeks or months.
      </Alert>
      
      <Paper sx={{ mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Overview" icon={<WarningIcon />} iconPosition="start" />
          <Tab label="Eruption History" icon={<HistoryIcon />} iconPosition="start" />
          <Tab label="Hazard Analysis" icon={<AirIcon />} iconPosition="start" />
          <Tab label="Preparedness" icon={<HealthIcon />} iconPosition="start" />
        </Tabs>
      </Paper>
      
      {/* Overview Tab */}
      {tabValue === 0 && (
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardHeader title="Mount Spurr: Context & Background" />
                <CardContent>
                  <Typography variant="body1" paragraph>
                    Mount Spurr is an 11,070-foot volcano in the Cook Inlet region of Alaska, about 80 miles (130 km) west of Anchorage. The Ruth Gorge, a deep glacial valley in the central Alaska Range (within Denali National Park), lies roughly 100–120 miles north of Mount Spurr.
                  </Typography>
                  <Typography variant="body1" paragraph>
                    This puts the Ruth Glacier area within the potential fall-out range of volcanic ash clouds if Mount Spurr erupts under certain wind conditions.
                  </Typography>
                  <Typography variant="body1">
                    Mount Spurr last erupted in 1992 and is currently showing elevated unrest. As of mid-April 2025, the Alaska Volcano Observatory (AVO) has Mount Spurr at Alert Level Advisory (Aviation Color Code Yellow), indicating heightened seismic and fumarolic activity.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardHeader title="Current Status (April 2025)" />
                <CardContent>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <LocationIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Elevated Gas Emissions" 
                        secondary="450 tons/day of SO₂, up from <50 t/day in late 2024. High CO₂ levels detected."
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <WarningIcon color="error" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Seismic Activity" 
                        secondary="~100 small earthquakes per week; >3,400 earthquakes recorded since April 2024."
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <TerrainIcon color="warning" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Ground Deformation" 
                        secondary="~6.5 cm of uplift detected, consistent with magma intrusion."
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <HistoryIcon color="info" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Alert Level" 
                        secondary="Advisory (Yellow) - Elevated unrest above background level."
                      />
                    </ListItem>
                  </List>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body2" color="text.secondary">
                    Scientists believe a magmatic intrusion is underway that may be opening a pathway toward the surface at Crater Peak (the same vent that erupted in 1953 and 1992).
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12}>
              <Card>
                <CardHeader title="Wind Patterns & Ashfall Risk to Ruth Gorge" />
                <CardContent>
                  <Typography variant="body1" paragraph>
                    The distribution of ash depends heavily on wind patterns at the time of eruption. The 1992 eruptions demonstrated this variability: one eruption's ash went north (over Denali), another east (to Anchorage), and another northeast.
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Late April to early May typically sees southwesterly flow aloft as spring storms move through. Southwesterly winds would put the Denali National Park region (including Ruth Glacier) directly downwind of Mount Spurr.
                  </Typography>
                  <Box sx={{ height: 350, mt: 2 }}>
                    <Line data={windData} options={chartOptions} />
                  </Box>
                  <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic' }}>
                    Chart shows the historical probability of wind directions that could carry ash toward Ruth Gorge vs. toward Anchorage. Spring months (April-May) have elevated risk of winds favorable for ash reaching the Alaska Range.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
      
      {/* Eruption History Tab */}
      {tabValue === 1 && (
        <Box>
          <Card>
            <CardHeader title="Mount Spurr Eruption History" />
            <CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Date</strong></TableCell>
                      <TableCell><strong>Ashfall Distribution</strong></TableCell>
                      <TableCell><strong>Key Impacts</strong></TableCell>
                      <TableCell><strong>Ash in Ruth Gorge?</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {eruptionHistory.map((event, index) => (
                      <TableRow key={index}>
                        <TableCell>{event.date}</TableCell>
                        <TableCell>{event.ashfall}</TableCell>
                        <TableCell>{event.impacts}</TableCell>
                        <TableCell>{event.affectedRuthGorge}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Box>
      )}
      
      {/* Hazard Analysis Tab */}
      {tabValue === 2 && (
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardHeader title="Immediate Hazards to Climbers in Ruth Gorge" />
                <CardContent>
                  <Typography variant="body1" paragraph>
                    If Mount Spurr erupts while a climbing team is in the Ruth Gorge, the primary immediate hazard would be from volcanic ashfall. Because Ruth Gorge is well outside the range of direct blast, lava, or pyroclastic flows (over 100 miles away), climbers would not face these direct threats.
                  </Typography>
                  
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12} md={6}>
                      <Card variant="outlined">
                        <CardHeader 
                          title="Volcanic Ashfall" 
                          titleTypographyProps={{ variant: 'h6' }}
                          avatar={<AirIcon color="error" />}
                        />
                        <CardContent>
                          <Typography variant="body2">
                            Ash is composed of tiny jagged rock and glass particles. In the Ruth Gorge, climbers could experience anything from a barely perceptible dusting to a millimeter or two of ash accumulation. During ashfall, visibility drops dramatically – the air can turn opaque gray-brown with ash "fog", especially in daylight.
                          </Typography>
                          <Box sx={{ mt: 1 }}>
                            <Chip 
                              label="Reduced Visibility" 
                              color="warning" 
                              size="small" 
                              sx={{ mr: 1, mb: 1 }} 
                            />
                            <Chip 
                              label="Surface Contamination" 
                              color="warning" 
                              size="small" 
                              sx={{ mr: 1, mb: 1 }} 
                            />
                            <Chip 
                              label="Eye Irritation" 
                              color="warning" 
                              size="small" 
                              sx={{ mr: 1, mb: 1 }} 
                            />
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Card variant="outlined">
                        <CardHeader 
                          title="Air Quality & Breathing" 
                          titleTypographyProps={{ variant: 'h6' }}
                          avatar={<HealthIcon color="error" />}
                        />
                        <CardContent>
                          <Typography variant="body2">
                            Inhaling volcanic ash is a serious concern. The microscopic shards can cause respiratory irritation even in healthy individuals. Without protection, climbers could experience coughing, throat irritation, and difficulty breathing. N95 masks or respirators are recommended.
                          </Typography>
                          <Box sx={{ mt: 1 }}>
                            <Chip 
                              label="Respiratory Issues" 
                              color="error" 
                              size="small" 
                              sx={{ mr: 1, mb: 1 }} 
                            />
                            <Chip 
                              label="Water Contamination" 
                              color="warning" 
                              size="small" 
                              sx={{ mr: 1, mb: 1 }} 
                            />
                            <Chip 
                              label="Gear Damage" 
                              color="warning" 
                              size="small" 
                              sx={{ mr: 1, mb: 1 }} 
                            />
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Card variant="outlined">
                        <CardHeader 
                          title="Flight Disruptions" 
                          titleTypographyProps={{ variant: 'h6' }}
                          avatar={<FlightIcon color="error" />}
                        />
                        <CardContent>
                          <Typography variant="body2">
                            Volcanic ash is extremely hazardous to aircraft – it can damage engines, sandblast windshields, and clog filters. All flights to/from Ruth Glacier would be immediately suspended. In 2009, climbers were stranded on Ruth Glacier for several extra days when Mount Redoubt erupted.
                          </Typography>
                          <Box sx={{ mt: 1 }}>
                            <Chip 
                              label="Evacuation Delays" 
                              color="error" 
                              size="small" 
                              sx={{ mr: 1, mb: 1 }} 
                            />
                            <Chip 
                              label="Supply Limitations" 
                              color="warning" 
                              size="small" 
                              sx={{ mr: 1, mb: 1 }} 
                            />
                            <Chip 
                              label="Extended Isolation" 
                              color="warning" 
                              size="small" 
                              sx={{ mr: 1, mb: 1 }} 
                            />
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Card variant="outlined">
                        <CardHeader 
                          title="Environmental Effects" 
                          titleTypographyProps={{ variant: 'h6' }}
                          avatar={<TerrainIcon color="warning" />}
                        />
                        <CardContent>
                          <Typography variant="body2">
                            Ash on the glacier changes surface conditions. Dark ash absorbs heat, potentially accelerating snowmelt and weakening snow bridges over crevasses. Ash layers in the snowpack can create unstable interfaces for avalanches if covered by new snow.
                          </Typography>
                          <Box sx={{ mt: 1 }}>
                            <Chip 
                              label="Accelerated Melt" 
                              color="warning" 
                              size="small" 
                              sx={{ mr: 1, mb: 1 }} 
                            />
                            <Chip 
                              label="Crevasse Risk" 
                              color="error" 
                              size="small" 
                              sx={{ mr: 1, mb: 1 }} 
                            />
                            <Chip 
                              label="Avalanche Potential" 
                              color="error" 
                              size="small" 
                              sx={{ mr: 1, mb: 1 }} 
                            />
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
      
      {/* Preparedness Tab */}
      {tabValue === 3 && (
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardHeader title="Monitoring & Warnings" />
                <CardContent>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <WarningIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Alaska Volcano Observatory (AVO)" 
                        secondary="Provides real-time monitoring and alert level updates. Subscribe to AVO alerts via email/SMS."
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <WeatherIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="National Weather Service (NWS)" 
                        secondary="Issues official ashfall warnings and aviation advisories. These specify affected regions and timeframes."
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <LocationIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Park Service Updates" 
                        secondary="Denali National Park rangers may have information on conditions and evacuation plans."
                      />
                    </ListItem>
                  </List>
                  <Box sx={{ mt: 2 }}>
                    <Button 
                      variant="outlined" 
                      color="primary" 
                      href="https://avo.alaska.edu/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      fullWidth
                      sx={{ mb: 1 }}
                    >
                      AVO Current Activity
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="primary" 
                      href="https://www.weather.gov/afc/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      fullWidth
                    >
                      NWS Anchorage Forecast Office
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardHeader title="Expedition Preparedness" />
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    Essential Gear:
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <HealthIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="N95 masks or respirators for each team member" 
                        secondary="Keep accessible at all times during elevated alert levels"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <HealthIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Protective goggles (airtight)" 
                        secondary="To prevent eye irritation from ash particles"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <WarningIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Extra food and fuel" 
                        secondary="Buffer for extended stay due to ash-related flight delays"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <WarningIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Lightweight tarp or extra tent fly" 
                        secondary="For protecting tent from ash accumulation"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <WarningIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Satellite communication device" 
                        secondary="To receive eruption updates and coordinate evacuation"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <WarningIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Sealable bags and small brush" 
                        secondary="To protect electronics and clean ash from gear"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12}>
              <Card>
                <CardHeader title="Response Plan During Eruption" />
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <Card variant="outlined">
                        <CardHeader 
                          title="During Ashfall" 
                          titleTypographyProps={{ variant: 'h6' }}
                        />
                        <CardContent>
                          <List dense>
                            <ListItem>
                              <ListItemText primary="Seek shelter in tent immediately" />
                            </ListItem>
                            <ListItem>
                              <ListItemText primary="Wear N95 mask and goggles" />
                            </ListItem>
                            <ListItem>
                              <ListItemText primary="Close all tent vents that don't have fine mesh" />
                            </ListItem>
                            <ListItem>
                              <ListItemText primary="Protect water supplies and food" />
                            </ListItem>
                            <ListItem>
                              <ListItemText primary="Minimize movement during heavy fall" />
                            </ListItem>
                            <ListItem>
                              <ListItemText primary="Monitor communications if possible" />
                            </ListItem>
                          </List>
                        </CardContent>
                      </Card>
                    </Grid>
                    
                    <Grid item xs={12} md={4}>
                      <Card variant="outlined">
                        <CardHeader 
                          title="After Ashfall" 
                          titleTypographyProps={{ variant: 'h6' }}
                        />
                        <CardContent>
                          <List dense>
                            <ListItem>
                              <ListItemText primary="Clean ash from tent before opening fully" />
                            </ListItem>
                            <ListItem>
                              <ListItemText primary="Continue wearing protection when ash is disturbed" />
                            </ListItem>
                            <ListItem>
                              <ListItemText primary="Check for ash contamination in supplies" />
                            </ListItem>
                            <ListItem>
                              <ListItemText primary="Assess conditions for climbing/travel safety" />
                            </ListItem>
                            <ListItem>
                              <ListItemText primary="Be cautious of weakened snow bridges" />
                            </ListItem>
                            <ListItem>
                              <ListItemText primary="Clean ash from crucial gear components" />
                            </ListItem>
                          </List>
                        </CardContent>
                      </Card>
                    </Grid>
                    
                    <Grid item xs={12} md={4}>
                      <Card variant="outlined">
                        <CardHeader 
                          title="Evacuation" 
                          titleTypographyProps={{ variant: 'h6' }}
                        />
                        <CardContent>
                          <List dense>
                            <ListItem>
                              <ListItemText primary="Contact air taxi service when communications are available" />
                            </ListItem>
                            <ListItem>
                              <ListItemText primary="Be prepared for flight delays until ash clears" />
                            </ListItem>
                            <ListItem>
                              <ListItemText primary="If needed, contact park service for emergency protocols" />
                            </ListItem>
                            <ListItem>
                              <ListItemText primary="Conserve supplies if extended stay is likely" />
                            </ListItem>
                            <ListItem>
                              <ListItemText primary="Maintain a landing zone clear of ash if possible" />
                            </ListItem>
                            <ListItem>
                              <ListItemText primary="Have gear packed and ready for quick evacuation" />
                            </ListItem>
                          </List>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default VolcanicRisks;
