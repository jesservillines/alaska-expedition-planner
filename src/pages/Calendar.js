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
    
    const baseTime = Date.now();
    const start = dayjs(startDate); // Make sure we use a fresh copy and don't modify the original
    const newActivities = [];
    
    // Find the selected routes
    const blueCollarRoute = selectedRoutes.find(r => r.id === "blue-collar-beatdown");
    const southwestRidgeRoute = selectedRoutes.find(r => r.id === "southwest-ridge");
    
    // April 25 - Day 1: Arrive in Anchorage
    newActivities.push({
      id: baseTime,
      date: start.format('YYYY-MM-DD'),
      type: 'travel',
      title: 'Arrive in Anchorage',
      description: 'Flight arrival, collect gear from REI and Alaska Mountaineering & Hiking, overnight in Anchorage',
      route: '',
    });
    
    // April 26 - Day 2: Travel to Talkeetna & Fly In
    newActivities.push({
      id: baseTime + 1,
      date: start.add(1, 'day').format('YYYY-MM-DD'),
      type: 'travel',
      title: 'Travel to Talkeetna & Fly In',
      description: 'Early drive to Talkeetna, check in with Talkeetna Air Taxi, fly directly to Ruth Gorge basecamp (4500ft), establish camp',
      route: '',
    });
    
    // April 27 - Day 3: Prep for Blue Collar Beatdown
    const day3 = dayjs(startDate).add(2, 'day');
    newActivities.push({
      id: baseTime + 2,
      date: day3.format('YYYY-MM-DD'),
      type: 'approach',
      title: `Approach ${blueCollarRoute?.name || 'Blue Collar Beatdown'}`,
      description: `Scout and prepare for ${blueCollarRoute?.name || 'Blue Collar Beatdown'} on Mt. Dickey. Pack climbing gear and prepare for alpine start.`,
      route: 'blue-collar-beatdown',
    });
    
    // April 28 - Day 4: Climb Blue Collar Beatdown Day 1
    const day4 = dayjs(startDate).add(3, 'day');
    newActivities.push({
      id: baseTime + 3,
      date: day4.format('YYYY-MM-DD'),
      type: 'climb',
      title: `Climb ${blueCollarRoute?.name || 'Blue Collar Beatdown'} Day 1`,
      description: `Alpine start (2am). Begin climb of ${blueCollarRoute?.name || 'Blue Collar Beatdown'}. Establish bivy at ~7500ft if needed.`,
      route: 'blue-collar-beatdown',
    });
    
    // April 29 - Day 5: Climb Blue Collar Beatdown Day 2
    const day5 = dayjs(startDate).add(4, 'day');
    newActivities.push({
      id: baseTime + 4,
      date: day5.format('YYYY-MM-DD'),
      type: 'climb',
      title: `Climb ${blueCollarRoute?.name || 'Blue Collar Beatdown'} Day 2`,
      description: `Complete climb of ${blueCollarRoute?.name || 'Blue Collar Beatdown'}. Summit and descend back to basecamp.`,
      route: 'blue-collar-beatdown',
    });
    
    // April 30 - Day 6: Rest Day
    const day6 = dayjs(startDate).add(5, 'day');
    newActivities.push({
      id: baseTime + 5,
      date: day6.format('YYYY-MM-DD'),
      type: 'rest',
      title: 'Rest Day',
      description: 'Recovery day at basecamp. Jesse fixes splitboard issues. Daniel and Nicholas reorganize group gear for Southwest Ridge.',
      route: '',
    });
    
    // May 1 - Day 7: Approach Southwest Ridge
    const day7 = dayjs(startDate).add(6, 'day');
    newActivities.push({
      id: baseTime + 6,
      date: day7.format('YYYY-MM-DD'),
      type: 'approach',
      title: `Approach ${southwestRidgeRoute?.name || 'Southwest Ridge'}`,
      description: `Move to the base of ${southwestRidgeRoute?.name || 'Southwest Ridge'} of Mount Wake. Prepare for alpine start.`,
      route: 'southwest-ridge',
    });
    
    // May 2 - Day 8: Climb Southwest Ridge Day 1
    const day8 = dayjs(startDate).add(7, 'day');
    newActivities.push({
      id: baseTime + 7,
      date: day8.format('YYYY-MM-DD'),
      type: 'climb',
      title: `Climb ${southwestRidgeRoute?.name || 'Southwest Ridge'} Day 1`,
      description: `Alpine start (1am). Begin climbing the ${southwestRidgeRoute?.name || 'Southwest Ridge'}. Establish high camp at First Col (8,800ft).`,
      route: 'southwest-ridge',
    });
    
    // May 3 - Day 9: Climb Southwest Ridge Day 2
    const day9 = dayjs(startDate).add(8, 'day');
    newActivities.push({
      id: baseTime + 8,
      date: day9.format('YYYY-MM-DD'),
      type: 'climb',
      title: `Climb ${southwestRidgeRoute?.name || 'Southwest Ridge'} Day 2`,
      description: `Summit day on ${southwestRidgeRoute?.name || 'Southwest Ridge'}. Reach Mount Wake summit (11,300ft) and descend to basecamp.`,
      route: 'southwest-ridge',
    });
    
    // May 4 - Day 10: Fly Out
    const day10 = dayjs(startDate).add(9, 'day');
    newActivities.push({
      id: baseTime + 9,
      date: day10.format('YYYY-MM-DD'),
      type: 'fly-out',
      title: 'Fly Out & Return Home',
      description: 'Pack up camp. Radio for pickup. Fly to Talkeetna with gear. Team celebration dinner at Denali Brewing Company. Return to Anchorage for flights home.',
      route: '',
    });
    // Set the activities
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
