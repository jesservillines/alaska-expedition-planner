import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Box, Typography, Paper, Button, CircularProgress, IconButton } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import DownloadIcon from '@mui/icons-material/Download';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

function AlaskaClimbing() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setIsLoading(false);
  }

  function onDocumentLoadError(error) {
    setError(error);
    setIsLoading(false);
  }

  const goToPreviousPage = () => {
    setPageNumber(prevPageNumber => Math.max(prevPageNumber - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber(prevPageNumber => Math.min(prevPageNumber + 1, numPages || 1));
  };

  const downloadPDF = () => {
    // Create a link to download the PDF
    const link = document.createElement('a');
    link.href = '/alaskaeb.pdf';
    link.download = 'Alaska_Climbing_Guide.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Paper sx={{ p: 3, m: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Alaska Climbing Guide
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<DownloadIcon />} 
          onClick={downloadPDF}
          sx={{ backgroundColor: '#4CAF50' }}
        >
          Download PDF
        </Button>
      </Box>
      
      <Typography variant="body1" paragraph>
        This comprehensive climbing guide contains essential information for expeditions in the Alaska Range, including route descriptions,
        approach details, gear recommendations, and safety guidelines. Review this information thoroughly to plan your expedition.
      </Typography>

      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        mt: 3,
        position: 'relative',
        minHeight: '800px' 
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
          <>
            <Document
              file="/alaskaeb.pdf"
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={<CircularProgress />}
            >
              <Page 
                pageNumber={pageNumber} 
                renderTextLayer={false}
                renderAnnotationLayer={false}
                width={800}
              />
            </Document>

            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              mt: 2, 
              width: '100%' 
            }}>
              <IconButton 
                onClick={goToPreviousPage} 
                disabled={pageNumber <= 1}
                sx={{ mx: 1 }}
              >
                <NavigateBeforeIcon />
              </IconButton>
              
              <Typography variant="body1">
                Page {pageNumber} of {numPages || '...'}
              </Typography>
              
              <IconButton 
                onClick={goToNextPage} 
                disabled={pageNumber >= numPages}
                sx={{ mx: 1 }}
              >
                <NavigateNextIcon />
              </IconButton>
            </Box>
          </>
        )}
      </Box>
    </Paper>
  );
}

export default AlaskaClimbing;
