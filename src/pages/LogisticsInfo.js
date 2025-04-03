import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Divider,
  Card,
  CardContent,
  CardMedia,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  FlightTakeoff as FlightTakeoffIcon,
  LocalPhone as LocalPhoneIcon,
  Language as LanguageIcon,
  Email as EmailIcon,
  LocationOn as LocationOnIcon,
  DirectionsCar as DirectionsCarIcon,
  Train as TrainIcon,
  Schedule as ScheduleIcon,
  Warning as WarningIcon,
  ContactPhone as ContactPhoneIcon
} from '@mui/icons-material';

import logistics from '../data/logistics';

const LogisticsInfo = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Expedition Logistics
        </Typography>
        <Typography variant="body1" paragraph>
          Detailed information for planning your Ruth Gorge expedition, including transportation,
          accommodations, and air taxi services.
        </Typography>
      </Box>

      {/* Air Taxi Services Section */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Air Taxi Services
      </Typography>
      <Typography variant="body1" paragraph>
        Bush planes are the primary way to access the Ruth Gorge. These services provide transportation
        from Talkeetna to various landing zones in the Alaska Range.
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {logistics.airTaxis.map((airTaxi, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card elevation={2}>
              <CardMedia
                component="img"
                height="200"
                // Use a placeholder image - would be replaced with actual air taxi photos
                image={`https://source.unsplash.com/featured/?airplane,alaska,${index}`}
                alt={airTaxi.name}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {airTaxi.name}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocalPhoneIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">{airTaxi.phone}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <EmailIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">{airTaxi.email}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LanguageIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                    <Link href={airTaxi.website} target="_blank" rel="noopener noreferrer">
                      {airTaxi.website.replace('https://', '')}
                    </Link>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOnIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">{airTaxi.baseLocation}</Typography>
                  </Box>
                </Box>

                <Typography variant="subtitle2" gutterBottom>
                  Landing Zones:
                </Typography>
                <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Location</TableCell>
                        <TableCell align="right">Elevation</TableCell>
                        <TableCell align="right">Price (RT)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {airTaxi.landingZones.map((zone, zIndex) => (
                        <TableRow key={zIndex}>
                          <TableCell>{zone.name}</TableCell>
                          <TableCell align="right">{zone.elevation}′</TableCell>
                          <TableCell align="right">${zone.price}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Typography variant="subtitle2" gutterBottom>
                  Weight Limits:
                </Typography>
                <Typography variant="body2" paragraph>
                  {airTaxi.weightLimits}
                </Typography>

                <Typography variant="subtitle2" gutterBottom>
                  Notes:
                </Typography>
                <Typography variant="body2">
                  {airTaxi.specialNotes}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Transportation Section */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Transportation
      </Typography>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Getting to Talkeetna
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={3}>
          {logistics.transportation.fromAnchorage.map((transport, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {transport.method === 'Rental Car' ? (
                      <DirectionsCarIcon fontSize="large" color="primary" sx={{ mr: 2 }} />
                    ) : transport.method === 'Alaska Railroad' ? (
                      <TrainIcon fontSize="large" color="primary" sx={{ mr: 2 }} />
                    ) : (
                      <FlightTakeoffIcon fontSize="large" color="primary" sx={{ mr: 2 }} />
                    )}
                    <Typography variant="h6">{transport.method}</Typography>
                  </Box>
                  <Typography variant="body2">{transport.details}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Local Transportation in Talkeetna:
          </Typography>
          <Typography variant="body2">{logistics.transportation.inTalkeetna}</Typography>
        </Box>
      </Paper>

      {/* Permits & Registration */}
      <Typography variant="h5" gutterBottom>
        Permits & Registration
      </Typography>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="body1" paragraph>
          {logistics.permits.denaliNationalPark}
        </Typography>
        <Typography variant="body1" paragraph>
          {logistics.permits.registrationProcess}
        </Typography>

        <Card variant="outlined" sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h6">{logistics.permits.rangerStation.name}</Typography>
            <Typography variant="body2" paragraph>
              {logistics.permits.rangerStation.address}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocalPhoneIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body2">{logistics.permits.rangerStation.phone}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <ScheduleIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body2">{logistics.permits.rangerStation.hours}</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {logistics.permits.rangerStation.notes}
            </Typography>
          </CardContent>
        </Card>
      </Paper>

      {/* Accommodations */}
      <Typography variant="h5" gutterBottom>
        Accommodations
      </Typography>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Talkeetna Lodging Options
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          {logistics.accommodation.talkeetna.map((lodging, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6">{lodging.name}</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Chip label={lodging.type} size="small" />
                    <Typography variant="body2" color="text.secondary">
                      {lodging.priceRange}
                    </Typography>
                  </Box>
                  <Typography variant="body2">{lodging.notes}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Camping Information
          </Typography>
          <Typography variant="body2" paragraph>
            {logistics.accommodation.camping.info}
          </Typography>
          <Typography variant="body2">
            {logistics.accommodation.camping.gear}
          </Typography>
        </Box>
      </Paper>

      {/* Communications */}
      <Typography variant="h5" gutterBottom>
        Communications
      </Typography>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3}>
          {logistics.communications.options.map((option, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {option.type}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {option.notes}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {option.rental}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 3, p: 2, backgroundColor: theme.palette.error.light, color: 'white', borderRadius: 1 }}>
          <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center' }}>
            <WarningIcon sx={{ mr: 1 }} />
            Emergency Contact Information
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Typography variant="body2">
              <strong>Primary:</strong> {logistics.communications.emergencyContact.primary}
            </Typography>
            <Typography variant="body2">
              <strong>Secondary:</strong> {logistics.communications.emergencyContact.secondary}
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Supplies & Gear */}
      <Typography variant="h5" gutterBottom>
        Supplies & Gear
      </Typography>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Talkeetna Supplies</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem>
                <ListItemText 
                  primary="Groceries" 
                  secondary={logistics.supplies.talkeetna.groceries} 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Fuel" 
                  secondary={logistics.supplies.talkeetna.fuel} 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Gear" 
                  secondary={logistics.supplies.talkeetna.gear} 
                />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Anchorage Supplies</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem>
                <ListItemText 
                  primary="Groceries" 
                  secondary={logistics.supplies.anchorage.groceries} 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Fuel" 
                  secondary={logistics.supplies.anchorage.fuel} 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Gear" 
                  secondary={logistics.supplies.anchorage.gear} 
                />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>

        <Box sx={{ mt: 2, p: 2, backgroundColor: theme.palette.warning.light, borderRadius: 1 }}>
          <Typography variant="subtitle1" gutterBottom>
            <WarningIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Important Restrictions
          </Typography>
          <Typography variant="body2">
            {logistics.supplies.restrictions}
          </Typography>
        </Box>
      </Paper>

      {/* Timeline Tips */}
      <Typography variant="h5" gutterBottom>
        Timeline Planning Tips
      </Typography>
      <Paper sx={{ p: 3, mb: 4 }}>
        <List>
          <ListItem>
            <ListItemIcon>
              <ScheduleIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Early Booking" 
              secondary={logistics.timelineTips.planning} 
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <ScheduleIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Weather Buffer" 
              secondary={logistics.timelineTips.flexibility} 
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <ScheduleIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Acclimatization" 
              secondary={logistics.timelineTips.acclimatization} 
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <ScheduleIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Seasonal Timing" 
              secondary={logistics.timelineTips.season} 
            />
          </ListItem>
        </List>
      </Paper>

      {/* Contact Information */}
      <Paper sx={{ p: 3, mb: 4, backgroundColor: theme.palette.primary.light, color: 'white' }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <ContactPhoneIcon sx={{ mr: 1 }} />
          Essential Contacts
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ backgroundColor: 'rgba(255,255,255,0.1)', p: 2, borderRadius: 1 }}>
              <Typography variant="subtitle2">Talkeetna Ranger Station</Typography>
              <Typography variant="body2">{logistics.permits.rangerStation.phone}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ backgroundColor: 'rgba(255,255,255,0.1)', p: 2, borderRadius: 1 }}>
              <Typography variant="subtitle2">{logistics.airTaxis[0].name}</Typography>
              <Typography variant="body2">{logistics.airTaxis[0].phone}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ backgroundColor: 'rgba(255,255,255,0.1)', p: 2, borderRadius: 1 }}>
              <Typography variant="subtitle2">{logistics.airTaxis[1].name}</Typography>
              <Typography variant="body2">{logistics.airTaxis[1].phone}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ backgroundColor: 'rgba(255,255,255,0.1)', p: 2, borderRadius: 1 }}>
              <Typography variant="subtitle2">Emergency</Typography>
              <Typography variant="body2">{logistics.communications.emergencyContact.primary}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default LogisticsInfo;
