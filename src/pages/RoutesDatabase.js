import React, { useState, useMemo } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Card, 
  CardContent, 
  CardActions,
  CardMedia,
  Chip,
  Button, 
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Divider,
  IconButton,
  Tooltip,
  Alert,
  Collapse,
  OutlinedInput
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import InfoIcon from '@mui/icons-material/Info';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
// Using Grid instead of Masonry to avoid dependency issues

import routes from '../data/routes';

// Define peak image URLs for key mountains in Alaska Range
const peakImageMap = {
  "Moose's Tooth": "https://www.mountainproject.com/assets/photos/climb/108553529_large_1494288066.jpg",
  "Mount Barille": "https://www.mountainproject.com/assets/photos/climb/106354868_large_1494101053.jpg",
  "Mount Dickey": "https://www.mountainproject.com/assets/photos/climb/107268953_large_1494175789.jpg",
  "Peak 11,300": "https://i.ytimg.com/vi/s8fhh-ZM2D4/maxresdefault.jpg",
  "Mount Wake": "https://i.ytimg.com/vi/s8fhh-ZM2D4/maxresdefault.jpg",
  "Mount Bradley": "https://www.alpenglowexpeditions.com/wp-content/uploads/2020/11/ruthgorge2-1300x650.jpg",
  "Werewolf Tower": "https://s3-ap-southeast-2.amazonaws.com/elasticbeanstalk-ap-southeast-2-678724467895/images/climbing/home_slides/alaska-ruth-gorge.jpg",
  "Mount Hunter": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/MountHunter.jpg/1200px-MountHunter.jpg",
  "Mount Johnson": "https://www.alpineascents.com/wp-content/uploads/2018/06/Alaska31-1024x684.jpg",
  "The Stump": "https://cdn2.apstatic.com/photos/climb/111827601_large_1494307281.jpg",
  "London Tower": "https://www.mountainproject.com/assets/photos/climb/108262280_medium_1494271896.jpg",
  "Mount Dan Beard": "https://www.mountainproject.com/assets/photos/climb/112547999_large_1494310376.jpg",
  "Mini Moonflower": "https://www.mountainproject.com/assets/photos/climb/112547999_large_1494310376.jpg"
};

// Removed hardcoded routeImageMap in favor of dynamic approach using route IDs

// Function to get the appropriate image URL for a peak
const getPeakImageUrl = (peakName, routeId) => {
  // First check if we have an image file named after the route ID
  // This allows users to simply add a new image file with the route ID name
  if (routeId) {
    const formattedRouteId = routeId.replace(/-/g, '_');
    const localImagePath = `/images/${formattedRouteId}.jpg`;
    
    // We'll return the local image path - if it doesn't exist, the onError handler will catch it
    return localImagePath;
  }
  
  // Then check if we have a specific peak image
  if (peakName && peakImageMap[peakName]) {
    return peakImageMap[peakName];
  }
  
  // Fallback to a general Alaska Range image
  return "https://www.alpineascents.com/wp-content/uploads/2018/06/RuthGorge-1024x685.jpg";
};

const RoutesDatabase = ({ selectedRoutes, setSelectedRoutes }) => {
  const [filters, setFilters] = useState({
    peak: '',
    gradeMin: '',
    gradeMax: '',
    category: '',
    type: '',
    search: '',
    traffic: ''
  });
  
  const [showFilters, setShowFilters] = useState(false);
  const [expandedRoute, setExpandedRoute] = useState(null);

  // Get unique values for filter options
  const peaks = [...new Set(routes.map(route => route.peak))];
  const categories = [...new Set(routes.map(route => route.category))];
  const types = [...new Set(routes.map(route => route.type))];
  const trafficLevels = ['High', 'Medium', 'Low', 'Very Low', 'Extremely Low'];
  
  // Grade options for Alaska Grade system
  const gradeOptions = [
    'Grade I', 'Grade II', 'Grade III', 'Grade IV', 'Grade V', 'Grade VI', 
    'Alaska Grade I', 'Alaska Grade II', 'Alaska Grade III', 
    'Alaska Grade IV', 'Alaska Grade V', 'Alaska Grade VI'
  ];

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const isRouteSelected = (routeId) => {
    return selectedRoutes.some(route => route.id === routeId);
  };

  const handleRouteSelect = (route) => {
    if (isRouteSelected(route.id)) {
      setSelectedRoutes(selectedRoutes.filter(r => r.id !== route.id));
    } else {
      setSelectedRoutes([...selectedRoutes, route]);
    }
  };

  const handleExpandRoute = (routeId) => {
    if (expandedRoute === routeId) {
      setExpandedRoute(null);
    } else {
      setExpandedRoute(routeId);
    }
  };

  // Filter routes based on current filters
  const filteredRoutes = useMemo(() => {
    return routes.filter(route => {
      // Apply each filter
      if (filters.peak && route.peak !== filters.peak) return false;
      if (filters.category && route.category !== filters.category) return false;
      if (filters.type && !route.type.includes(filters.type)) return false;
      if (filters.traffic && !route.trafficLevel.toLowerCase().includes(filters.traffic.toLowerCase())) return false;
      
      // Handle grade filtering - this is complex due to varied grade formats
      if (filters.gradeMin || filters.gradeMax) {
        // Simplistic approach - would need more sophisticated logic for proper grade comparison
        const routeGradeIndex = gradeOptions.findIndex(g => route.grade.includes(g));
        if (filters.gradeMin) {
          const minGradeIndex = gradeOptions.findIndex(g => g === filters.gradeMin);
          if (routeGradeIndex < minGradeIndex) return false;
        }
        if (filters.gradeMax) {
          const maxGradeIndex = gradeOptions.findIndex(g => g === filters.gradeMax);
          if (routeGradeIndex > maxGradeIndex) return false;
        }
      }
      
      // Search in name, peak, characteristics
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          route.name.toLowerCase().includes(searchLower) ||
          route.peak.toLowerCase().includes(searchLower) ||
          route.characteristics.toLowerCase().includes(searchLower) ||
          route.technicalGrade.toLowerCase().includes(searchLower)
        );
      }
      
      return true;
    });
  }, [filters, gradeOptions]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Ruth Gorge Routes Database
        </Typography>
        <Typography variant="body1" paragraph>
          Explore technical climbing routes in the Ruth Gorge area of the Alaska Range.
          Filter by peak, grade, or route type to find your ideal objectives.
        </Typography>
        
        {/* Search Bar */}
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', mb: 3, maxWidth: 600 }}
          elevation={2}
          onSubmit={(e) => e.preventDefault()}
        >
          <IconButton sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <TextField
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search routes by name, peak, or characteristics"
            inputProps={{ 'aria-label': 'search routes' }}
            value={filters.search}
            onChange={(e) => handleFilterChange({ target: { name: 'search', value: e.target.value } })}
            variant="standard"
            fullWidth
            InputProps={{
              disableUnderline: true,
              endAdornment: filters.search ? (
                <IconButton
                  size="small"
                  onClick={() => handleFilterChange({ target: { name: 'search', value: '' } })}
                  sx={{ visibility: filters.search ? 'visible' : 'hidden' }}
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              ) : null,
            }}
          />
        </Paper>
        
        {/* Selected Routes Summary */}
        {selectedRoutes.length > 0 && (
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body1">
              You've selected {selectedRoutes.length} route{selectedRoutes.length > 1 ? 's' : ''}:&nbsp;
              {selectedRoutes.map((r, index) => (
                <React.Fragment key={r.id}>
                  <strong>{r.name}</strong>
                  {index < selectedRoutes.length - 1 ? ', ' : ''}
                </React.Fragment>
              ))}
            </Typography>
          </Alert>
        )}
        
        {/* Filters */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              Route Filters {filters.search && 
                <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  Currently searching for "{filters.search}"
                </Typography>
              }
            </Typography>
            <Button 
              startIcon={<FilterListIcon />} 
              onClick={toggleFilters}
              size="small"
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </Box>
          
          <Collapse in={showFilters}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth size="small">
                  <TextField
                    label="Search"
                    name="search"
                    value={filters.search}
                    onChange={handleFilterChange}
                    placeholder="Search by name, peak, or features"
                    size="small"
                    InputProps={{
                      endAdornment: filters.search ? (
                        <IconButton
                          size="small"
                          onClick={() => handleFilterChange({ target: { name: 'search', value: '' } })}
                        >
                          <ClearIcon fontSize="small" />
                        </IconButton>
                      ) : <SearchIcon color="action" fontSize="small" />,
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Peak</InputLabel>
                  <Select
                    name="peak"
                    value={filters.peak}
                    onChange={handleFilterChange}
                    label="Peak"
                  >
                    <MenuItem value="">All Peaks</MenuItem>
                    {peaks.map(peak => (
                      <MenuItem key={peak} value={peak}>{peak}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                    label="Category"
                  >
                    <MenuItem value="">All Categories</MenuItem>
                    {categories.map(category => (
                      <MenuItem key={category} value={category}>{category}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Route Type</InputLabel>
                  <Select
                    name="type"
                    value={filters.type}
                    onChange={handleFilterChange}
                    label="Route Type"
                  >
                    <MenuItem value="">All Types</MenuItem>
                    {types.map(type => (
                      <MenuItem key={type} value={type}>{type}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Min Grade</InputLabel>
                  <Select
                    name="gradeMin"
                    value={filters.gradeMin}
                    onChange={handleFilterChange}
                    label="Min Grade"
                  >
                    <MenuItem value="">Any Grade</MenuItem>
                    {gradeOptions.map(grade => (
                      <MenuItem key={grade} value={grade}>{grade}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Max Grade</InputLabel>
                  <Select
                    name="gradeMax"
                    value={filters.gradeMax}
                    onChange={handleFilterChange}
                    label="Max Grade"
                  >
                    <MenuItem value="">Any Grade</MenuItem>
                    {gradeOptions.map(grade => (
                      <MenuItem key={grade} value={grade}>{grade}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Traffic Level</InputLabel>
                  <Select
                    name="traffic"
                    value={filters.traffic}
                    onChange={handleFilterChange}
                    label="Traffic Level"
                  >
                    <MenuItem value="">Any Traffic Level</MenuItem>
                    {trafficLevels.map(level => (
                      <MenuItem key={level} value={level}>{level}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  name="search"
                  label="Search Routes"
                  variant="outlined"
                  value={filters.search}
                  onChange={handleFilterChange}
                  placeholder="Search by name, peak, or features"
                />
              </Grid>
            </Grid>
          </Collapse>
        </Paper>
        
        {/* Results count */}
        <Typography variant="body2" sx={{ mb: 2 }}>
          Showing {filteredRoutes.length} of {routes.length} routes
        </Typography>
      </Box>
      
      {/* Routes Display */}
      <Grid container spacing={3}>
        {filteredRoutes.map((route) => (
          <Grid item xs={12} sm={6} md={4} key={route.id}>
            <Card sx={{ mb: 0 }} elevation={2}>
            <CardMedia
              component="img"
              height="200"
              sx={{ objectPosition: 'center' }}
              // Using specific curated images for Alaska Range peaks
              image={getPeakImageUrl(route.peak, route.id)}
              alt={route.peak}
              onError={(e) => {
                // First try to use the peak image as a fallback
                e.target.onerror = (e2) => {
                  // If peak image also fails, use a themed Unsplash image
                  e2.target.onerror = null;
                  e2.target.src = `https://source.unsplash.com/featured/?alaska,mountains,${route.peak.replace(/[^a-zA-Z0-9]/g, '')}`;
                };
                // Try the peak image
                if (peakImageMap[route.peak]) {
                  e.target.src = peakImageMap[route.peak];
                } else {
                  e.target.src = `https://source.unsplash.com/featured/?alaska,mountains,${route.peak.replace(/[^a-zA-Z0-9]/g, '')}`;
                }
              }}
            />
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Typography variant="h5" component="div" gutterBottom>
                  {route.name}
                </Typography>
                <Chip 
                  label={route.category} 
                  size="small" 
                  color={
                    route.category === 'Classic' ? 'primary' : 
                    route.category === 'Modern Classic' ? 'secondary' :
                    route.category === 'Modern' ? 'info' :
                    route.category === 'Elite' ? 'error' : 'default'
                  }
                />
              </Box>
              
              <Typography variant="body2" color="text.secondary" gutterBottom>
                <strong>{route.peak}</strong> • {route.elevation}′
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                <Chip size="small" label={route.grade} />
                <Chip size="small" label={route.technicalGrade} />
                <Chip size="small" label={`${route.verticalGain}'`} />
              </Box>
              
              <Typography variant="body2" paragraph>
                {expandedRoute === route.id 
                  ? route.characteristics 
                  : `${route.characteristics.substring(0, 100)}...`}
              </Typography>
              
              <Collapse in={expandedRoute === route.id}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Crux:
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {route.crux}
                  </Typography>
                  
                  <Typography variant="subtitle2" gutterBottom>
                    Traffic:
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {route.trafficLevel}
                  </Typography>
                  
                  <Typography variant="subtitle2" gutterBottom>
                    Approach:
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {route.approach}
                  </Typography>
                  
                  <Typography variant="subtitle2" gutterBottom>
                    Condition Window:
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {route.conditionWindow}
                  </Typography>
                  
                  <Typography variant="subtitle2" gutterBottom>
                    Notes:
                  </Typography>
                  <Typography variant="body2">
                    {route.notes}
                  </Typography>
                </Box>
              </Collapse>
            </CardContent>
            
            <CardActions>
              <Button 
                size="small" 
                onClick={() => handleExpandRoute(route.id)}
              >
                {expandedRoute === route.id ? 'Show Less' : 'Show More'}
              </Button>
              <Box sx={{ flexGrow: 1 }} />
              <Tooltip title={isRouteSelected(route.id) ? "Remove from expedition" : "Add to expedition"}>
                <IconButton
                  color={isRouteSelected(route.id) ? "primary" : "default"}
                  onClick={() => handleRouteSelect(route)}
                >
                  {isRouteSelected(route.id) ? <RemoveIcon /> : <AddIcon />}
                </IconButton>
              </Tooltip>
            </CardActions>
          </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RoutesDatabase;
