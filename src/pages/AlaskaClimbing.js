import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';

function AlaskaClimbing() {
  // We'll use an iframe approach instead of react-pdf which has compatibility issues
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Set a timeout to stop showing the loading indicator after a certain period
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds should be enough for most PDFs to start loading
    
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Paper sx={{ p: 3, m: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Alaska Climbing Guide
        </Typography>
      </Box>
      
      <Typography variant="body1" paragraph>
        This comprehensive climbing guide contains essential information for expeditions in the Alaska Range, including route descriptions,
        approach details, gear recommendations, and safety guidelines. Review this information thoroughly to plan your expedition.
      </Typography>

      <Box sx={{ 
        position: 'relative',
        mt: 3,
        height: 'calc(100vh - 200px)', // Responsive height
        minHeight: '600px',
        width: '100%'
      }}>
        {isLoading && (
          <Box sx={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            bgcolor: 'rgba(255,255,255,0.7)',
            zIndex: 10
          }}>
            <CircularProgress />
          </Box>
        )}

        {error ? (
          <Box>
            <Typography variant="h6" color="error">Error loading PDF</Typography>
            <Typography variant="body1">{error.message}</Typography>
          </Box>
        ) : (
          <iframe
            src="/alaskaeb.pdf"
            title="Alaska Climbing Guide"
            width="100%"
            height="100%"
            style={{ border: 'none' }}
            onError={() => setError({ message: 'Failed to load PDF' })}
          />
        )}
      </Box>
    </Paper>
  );
}

export default AlaskaClimbing;
