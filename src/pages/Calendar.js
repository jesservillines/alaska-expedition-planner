import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Card,
  CardContent,
  Divider,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  useTheme,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Edit as EditIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  FlightTakeoff as FlightTakeoffIcon,
  Terrain as TerrainIcon,
  Hotel as HotelIcon,
  Hiking as HikingIcon,
  AcUnit as AcUnitIcon,
  LocalAirport as LocalAirportIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import routes from '../data/routes';

// Activity type icons
const activityIcons = {
  'travel': <FlightTakeoffIcon />,
  'climb': <TerrainIcon />,
  'rest': <HotelIcon />,
  'approach': <HikingIcon />,
  'weather-day': <AcUnitIcon />,
  'fly-in': <LocalAirportIcon />,
  'fly-out': <LocalAirportIcon />,
};

const Calendar = ({ expeditionDates, setExpeditionDates, selectedRoutes }) => {
  const theme = useTheme();
  
  // State for calendar
  const [startDate, setStartDate] = useState(expeditionDates.start ? dayjs(expeditionDates.start) : dayjs());
  const [endDate, setEndDate] = useState(expeditionDates.end ? dayjs(expeditionDates.end) : dayjs().add(14, 'day'));
  const [calendarDays, setCalendarDays] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(dayjs().month());
  const [currentYear, setCurrentYear] = useState(dayjs().year());
  
  // State for activities
  const [activities, setActivities] = useState([]);
  const [openActivityDialog, setOpenActivityDialog] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [newActivity, setNewActivity] = useState({
    type: 'travel',
    title: '',
    description: '',
    route: '',
  });
  
  // Update expedition dates when user changes them
  useEffect(() => {
    if (startDate && endDate) {
      setExpeditionDates({
        start: startDate.toDate(),
        end: endDate.toDate(),
      });
    }
  }, [startDate, endDate, setExpeditionDates]);
  
  // Auto-generate example itinerary when component mounts with selected routes
  useEffect(() => {
    // Only generate if we have routes selected and no activities yet
    if (selectedRoutes && selectedRoutes.length > 0 && activities.length === 0) {
      // Call the example itinerary function as if the button was pressed
      generateExampleItinerary();
    }
  }, [selectedRoutes, activities.length]);
  
  // Generate days for the current month view
  useEffect(() => {
    const firstDayOfMonth = dayjs().year(currentYear).month(currentMonth).startOf('month');
    const lastDayOfMonth = dayjs().year(currentYear).month(currentMonth).endOf('month');
    
    // Get the day of the week for the first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDayOfMonth.day();
    
    // Calculate days from previous month to show
    const daysFromPrevMonth = firstDayOfWeek;
    
    // Generate array of days
    const days = [];
    
    // Add days from previous month
    for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
      days.push({
        date: firstDayOfMonth.subtract(i + 1, 'day'),
        isCurrentMonth: false,
      });
    }
    
    // Add days from current month
    for (let i = 0; i < lastDayOfMonth.date(); i++) {
      days.push({
        date: firstDayOfMonth.add(i, 'day'),
        isCurrentMonth: true,
      });
    }
    
    // Add days from next month to complete the calendar grid
    const remainingDays = 42 - days.length; // 6 rows * 7 days = 42
    for (let i = 0; i < remainingDays; i++) {
      days.push({
        date: lastDayOfMonth.add(i + 1, 'day'),
        isCurrentMonth: false,
      });
    }
    
    setCalendarDays(days);
  }, [currentMonth, currentYear]);
  
  // Find activities for a specific date
  const getDayActivities = (date) => {
    return activities.filter(activity => 
      dayjs(activity.date).format('YYYY-MM-DD') === date.format('YYYY-MM-DD')
    );
  };
  
  // Handle month navigation
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  
  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  
  // Activity dialog handlers
  const handleOpenActivityDialog = (day, activity = null) => {
    setSelectedDay(day);
    if (activity) {
      setSelectedActivity(activity);
      setNewActivity({ ...activity });
    } else {
      setSelectedActivity(null);
      setNewActivity({
        type: 'travel',
        title: '',
        description: '',
        route: '',
      });
    }
    setOpenActivityDialog(true);
  };
  
  const handleCloseActivityDialog = () => {
    setOpenActivityDialog(false);
    setSelectedDay(null);
    setSelectedActivity(null);
  };
  
  const handleActivityChange = (field, value) => {
    setNewActivity({
      ...newActivity,
      [field]: value,
    });
  };
  
  const handleSaveActivity = () => {
    const activityToSave = {
      ...newActivity,
      id: selectedActivity ? selectedActivity.id : Date.now(),
      date: selectedDay.format('YYYY-MM-DD'),
    };
    
    if (selectedActivity) {
      // Update existing activity
      setActivities(activities.map(activity => 
        activity.id === selectedActivity.id ? activityToSave : activity
      ));
    } else {
      // Add new activity
      setActivities([...activities, activityToSave]);
    }
    
    handleCloseActivityDialog();
  };
  
  const handleDeleteActivity = (activityId) => {
    setActivities(activities.filter(activity => activity.id !== activityId));
    handleCloseActivityDialog();
  };
  
  // Generate example itinerary based on selected routes
  const generateExampleItinerary = () => {
    if (!startDate || !endDate) return;
    
    const start = startDate;
    const newActivities = [];
    
    // Add Anchorage arrival
    newActivities.push({
      id: Date.now(),
      date: start.format('YYYY-MM-DD'),
      type: 'travel',
      title: 'Arrive in Anchorage',
      description: 'Flight arrival, collect bags, overnight in Anchorage',
      route: '',
    });
    
    // Add travel to Talkeetna
    newActivities.push({
      id: Date.now() + 1,
      date: start.add(1, 'day').format('YYYY-MM-DD'),
      type: 'travel',
      title: 'Travel to Talkeetna',
      description: 'Drive to Talkeetna, check in with air taxi, overnight in Talkeetna',
      route: '',
    });
    
    // Add fly-in
    newActivities.push({
      id: Date.now() + 2,
      date: start.add(2, 'day').format('YYYY-MM-DD'),
      type: 'fly-in',
      title: 'Fly to Ruth Gorge',
      description: 'Weather dependent flight to basecamp, establish camp',
      route: '',
    });
    
    // Add acclimatization day
    newActivities.push({
      id: Date.now() + 3,
      date: start.add(3, 'day').format('YYYY-MM-DD'),
      type: 'approach',
      title: 'Acclimatization & Recon',
      description: 'Glacier travel practice, route reconnaissance',
      route: '',
    });
    
    // Add climbing days for selected routes
    let dayOffset = 4;
    selectedRoutes.forEach((route, index) => {
      // Add approach day
      newActivities.push({
        id: Date.now() + dayOffset,
        date: start.add(dayOffset, 'day').format('YYYY-MM-DD'),
        type: 'approach',
        title: `Approach ${route.name}`,
        description: `Ski/travel to base of ${route.name}`,
        route: route.id,
      });
      
      // Add climbing day(s) - assume 1-2 days depending on route grade
      const climbDays = route.grade.includes('VI') ? 2 : 1;
      for (let i = 0; i < climbDays; i++) {
        newActivities.push({
          id: Date.now() + dayOffset + i + 1,
          date: start.add(dayOffset + i + 1, 'day').format('YYYY-MM-DD'),
          type: 'climb',
          title: `Climb ${route.name}`,
          description: `Climbing day on ${route.name} (${route.grade}, ${route.technicalGrade})`,
          route: route.id,
        });
      }
      
      // Add rest day after climbing
      newActivities.push({
        id: Date.now() + dayOffset + climbDays + 1,
        date: start.add(dayOffset + climbDays + 1, 'day').format('YYYY-MM-DD'),
        type: 'rest',
        title: 'Rest Day',
        description: 'Recovery day at basecamp',
        route: '',
      });
      
      dayOffset += climbDays + 2;
    });
    
    // Add weather contingency days
    newActivities.push({
      id: Date.now() + dayOffset,
      date: start.add(dayOffset, 'day').format('YYYY-MM-DD'),
      type: 'weather-day',
      title: 'Weather Contingency',
      description: 'Extra day for weather delays',
      route: '',
    });
    
    // Add fly-out
    newActivities.push({
      id: Date.now() + dayOffset + 1,
      date: start.add(dayOffset + 1, 'day').format('YYYY-MM-DD'),
      type: 'fly-out',
      title: 'Fly from Ruth Gorge',
      description: 'Weather dependent flight to Talkeetna',
      route: '',
    });
    
    // Add travel home
    newActivities.push({
      id: Date.now() + dayOffset + 2,
      date: start.add(dayOffset + 2, 'day').format('YYYY-MM-DD'),
      type: 'travel',
      title: 'Travel Home',
      description: 'Flights from Anchorage',
      route: '',
    });
    
    setActivities(newActivities);
  };
  
  // Get route object by ID
  const getRouteById = (routeId) => {
    return routes.find(route => route.id === routeId) || null;
  };
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Expedition Calendar
          </Typography>
          <Typography variant="body1" paragraph>
            Plan your Ruth Gorge expedition timeline including travel days, climbing windows, and contingency days.
          </Typography>
        </Box>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={9}>
            {/* Calendar Tools */}
            <Paper sx={{ p: 2, mb: 3 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={5}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <IconButton onClick={handlePrevMonth} size="small">
                      <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6">
                      {dayjs().month(currentMonth).format('MMMM')} {currentYear}
                    </Typography>
                    <IconButton onClick={handleNextMonth} size="small">
                      <ArrowForwardIcon />
                    </IconButton>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={7}>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <DatePicker
                      label="Start Date"
                      value={startDate}
                      onChange={(newValue) => setStartDate(newValue)}
                      format="MM/DD/YYYY"
                      slotProps={{ textField: { size: 'small', fullWidth: true } }}
                    />
                    <DatePicker
                      label="End Date"
                      value={endDate}
                      onChange={(newValue) => setEndDate(newValue)}
                      format="MM/DD/YYYY"
                      slotProps={{ textField: { size: 'small', fullWidth: true } }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Paper>
            
            {/* Calendar */}
            <Paper sx={{ p: 2, mb: 3 }}>
              <Grid container spacing={1}>
                {/* Weekday Headers */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                  <Grid item xs={12/7} key={`header-${index}`}>
                    <Box sx={{ p: 1, textAlign: 'center' }}>
                      <Typography variant="subtitle2">{day}</Typography>
                    </Box>
                  </Grid>
                ))}
                
                {/* Calendar Days */}
                {calendarDays.map((day, index) => {
                  const dayActivities = getDayActivities(day.date);
                  const isSelected = startDate && endDate && 
                    day.date.isAfter(startDate.subtract(1, 'day')) && 
                    day.date.isBefore(endDate.add(1, 'day'));
                  
                  return (
                    <Grid item xs={12/7} key={`day-${index}`}>
                      <Paper 
                        elevation={0}
                        sx={{ 
                          p: 1, 
                          height: 120, 
                          backgroundColor: !day.isCurrentMonth 
                            ? 'rgba(0,0,0,0.05)' 
                            : isSelected 
                              ? 'rgba(25, 118, 210, 0.08)'
                              : 'inherit',
                          border: '1px solid',
                          borderColor: 'divider',
                          overflow: 'hidden',
                          position: 'relative'
                        }}
                      >
                        <Box sx={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center',
                          mb: 1
                        }}>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              fontWeight: day.date.format('DD') === dayjs().format('DD') && 
                                        day.date.format('MM') === dayjs().format('MM') &&
                                        day.date.format('YYYY') === dayjs().format('YYYY')
                                ? 'bold' : 'normal',
                              color: !day.isCurrentMonth ? 'text.disabled' : 'text.primary'
                            }}
                          >
                            {day.date.format('D')}
                          </Typography>
                          <IconButton 
                            size="small" 
                            onClick={() => handleOpenActivityDialog(day.date)}
                            sx={{ opacity: 0.6, '&:hover': { opacity: 1 } }}
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Box>
                        
                        <Box sx={{ overflow: 'hidden' }}>
                          {dayActivities.map((activity) => (
                            <Box 
                              key={activity.id}
                              sx={{ 
                                p: 0.5, 
                                mb: 0.5, 
                                borderRadius: 1,
                                backgroundColor: 
                                  activity.type === 'climb' ? 'rgba(76, 175, 80, 0.1)' :
                                  activity.type === 'travel' ? 'rgba(255, 152, 0, 0.1)' :
                                  activity.type === 'rest' ? 'rgba(33, 150, 243, 0.1)' :
                                  activity.type === 'approach' ? 'rgba(156, 39, 176, 0.1)' :
                                  activity.type === 'weather-day' ? 'rgba(244, 67, 54, 0.1)' :
                                  activity.type === 'fly-in' || activity.type === 'fly-out' ? 'rgba(0, 188, 212, 0.1)' :
                                  'rgba(189, 189, 189, 0.1)',
                                cursor: 'pointer',
                                '&:hover': {
                                  backgroundColor: 
                                    activity.type === 'climb' ? 'rgba(76, 175, 80, 0.2)' :
                                    activity.type === 'travel' ? 'rgba(255, 152, 0, 0.2)' :
                                    activity.type === 'rest' ? 'rgba(33, 150, 243, 0.2)' :
                                    activity.type === 'approach' ? 'rgba(156, 39, 176, 0.2)' :
                                    activity.type === 'weather-day' ? 'rgba(244, 67, 54, 0.2)' :
                                    activity.type === 'fly-in' || activity.type === 'fly-out' ? 'rgba(0, 188, 212, 0.2)' :
                                    'rgba(189, 189, 189, 0.2)'
                                }
                              }}
                              onClick={() => handleOpenActivityDialog(day.date, activity)}
                            >
                              <Typography variant="caption" noWrap>
                                {activity.title}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </Paper>
                    </Grid>
                  );
                })}
              </Grid>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={3}>
            {/* Expedition Summary */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Expedition Summary
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Typography variant="body2" gutterBottom>
                  <strong>Duration:</strong> {startDate && endDate ? 
                    `${endDate.diff(startDate, 'day') + 1} days` : 
                    'Not set'}
                </Typography>
                
                <Typography variant="body2" gutterBottom>
                  <strong>Selected Routes:</strong> {selectedRoutes.length}
                </Typography>
                
                <Typography variant="body2" gutterBottom>
                  <strong>Planned Activities:</strong> {activities.length}
                </Typography>
                
                <Button 
                  variant="outlined" 
                  fullWidth 
                  sx={{ mt: 2 }}
                  onClick={generateExampleItinerary}
                  disabled={!startDate || !endDate || selectedRoutes.length === 0}
                >
                  Generate Example Itinerary
                </Button>
              </CardContent>
            </Card>
            
            {/* Activity Legend */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Activity Types
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <List dense disablePadding>
                  <ListItem disablePadding sx={{ mb: 1 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      {activityIcons['travel']}
                    </ListItemIcon>
                    <ListItemText primary="Travel" secondary="Flights, driving" />
                  </ListItem>
                  <ListItem disablePadding sx={{ mb: 1 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      {activityIcons['climb']}
                    </ListItemIcon>
                    <ListItemText primary="Climb" secondary="Climbing days" />
                  </ListItem>
                  <ListItem disablePadding sx={{ mb: 1 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      {activityIcons['rest']}
                    </ListItemIcon>
                    <ListItemText primary="Rest" secondary="Recovery days" />
                  </ListItem>
                  <ListItem disablePadding sx={{ mb: 1 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      {activityIcons['approach']}
                    </ListItemIcon>
                    <ListItemText primary="Approach" secondary="Glacier travel, recon" />
                  </ListItem>
                  <ListItem disablePadding sx={{ mb: 1 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      {activityIcons['weather-day']}
                    </ListItemIcon>
                    <ListItemText primary="Weather" secondary="Contingency days" />
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      {activityIcons['fly-in']}
                    </ListItemIcon>
                    <ListItemText primary="Flights" secondary="Air taxi days" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
            
            {/* Planning Tips */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Planning Tips
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <List dense disablePadding>
                  <ListItem disablePadding sx={{ mb: 1 }}>
                    <ListItemText 
                      primary="Include buffer days for weather delays" 
                      secondary="Air taxis often need 2-3 day windows" 
                    />
                  </ListItem>
                  <ListItem disablePadding sx={{ mb: 1 }}>
                    <ListItemText 
                      primary="Plan for rest days between climbs" 
                      secondary="Especially after Grade V or harder routes" 
                    />
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemText 
                      primary="Early starts are essential" 
                      secondary="Plan alpine starts (1-3am) for many routes" 
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        {/* Activity Dialog */}
        <Dialog open={openActivityDialog} onClose={handleCloseActivityDialog} maxWidth="sm" fullWidth>
          <DialogTitle>
            {selectedActivity ? 'Edit Activity' : 'Add Activity'} for {selectedDay?.format('MMMM D, YYYY')}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 1, pb: 1 }}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Activity Type</InputLabel>
                <Select
                  value={newActivity.type}
                  label="Activity Type"
                  onChange={(e) => handleActivityChange('type', e.target.value)}
                >
                  <MenuItem value="travel">Travel</MenuItem>
                  <MenuItem value="climb">Climbing</MenuItem>
                  <MenuItem value="rest">Rest Day</MenuItem>
                  <MenuItem value="approach">Approach</MenuItem>
                  <MenuItem value="weather-day">Weather Day</MenuItem>
                  <MenuItem value="fly-in">Fly In</MenuItem>
                  <MenuItem value="fly-out">Fly Out</MenuItem>
                </Select>
              </FormControl>
              
              <TextField 
                fullWidth
                label="Title"
                value={newActivity.title}
                onChange={(e) => handleActivityChange('title', e.target.value)}
                sx={{ mb: 2 }}
              />
              
              <TextField 
                fullWidth
                label="Description"
                value={newActivity.description}
                onChange={(e) => handleActivityChange('description', e.target.value)}
                multiline
                rows={2}
                sx={{ mb: 2 }}
              />
              
              {newActivity.type === 'climb' && (
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Route</InputLabel>
                  <Select
                    value={newActivity.route}
                    label="Route"
                    onChange={(e) => handleActivityChange('route', e.target.value)}
                  >
                    <MenuItem value="">No specific route</MenuItem>
                    {selectedRoutes.map(route => (
                      <MenuItem key={route.id} value={route.id}>{route.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            {selectedActivity && (
              <Button 
                onClick={() => handleDeleteActivity(selectedActivity.id)} 
                color="error"
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            )}
            <Button onClick={handleCloseActivityDialog}>Cancel</Button>
            <Button onClick={handleSaveActivity} variant="contained">Save</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </LocalizationProvider>
  );
};

export default Calendar;
