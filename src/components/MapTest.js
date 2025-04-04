import React from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { Box, Typography, CircularProgress, Paper } from '@mui/material';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 62.9550,
  lng: -150.1700,
};

function MapTest() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyC4z8Np9U2SScB0EIyJc4xJIiXVZUD9JjY",
    // Try with no additional libraries first
  });

  if (loadError) {
    console.error("Map Load Error:", loadError);
    return (
      <Paper sx={{ p: 3, m: 3 }}>
        <Typography variant="h6" color="error">
          Error loading Google Maps: {loadError.message}
        </Typography>
        <Typography variant="body2">
          Error details have been logged to the console.
        </Typography>
      </Paper>
    );
  }

  if (!isLoaded) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  console.log("Map is loaded, attempting to render...");

  return (
    <Paper sx={{ p: 1, m: 3 }}>
      <Typography variant="h6" gutterBottom>Map Test Component</Typography>
      <Box sx={{ height: '400px', width: '100%' }}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={10}
          center={center}
          options={{
            mapTypeId: 'terrain',
          }}
          onLoad={() => console.log("Map has loaded successfully")}
        />
      </Box>
    </Paper>
  );
}

export default MapTest;
