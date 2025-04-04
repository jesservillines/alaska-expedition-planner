import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  Chip,
  Alert,
  useTheme
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Group as GroupIcon,
} from '@mui/icons-material';

const ClimberProfiles = ({ 
  climbers, 
  selectedClimbers, 
  onToggleClimber, 
  onSetActiveClimber,
  activeClimber,
  viewMode,
  onSwitchToTeamView,
  getTotalWeight
}) => {
  const theme = useTheme();

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6">
            {viewMode === 'team' ? 'Expedition Team' : `${activeClimber?.name}'s Gear`}
          </Typography>
          <Box>
            <Button 
              variant={viewMode === 'team' ? 'contained' : 'outlined'}
              startIcon={<GroupIcon />}
              onClick={onSwitchToTeamView}
              sx={{ mr: 1 }}
              disabled={viewMode === 'team'}
            >
              Team View
            </Button>
            {selectedClimbers.length > 0 && (
              <Chip 
                label={`${selectedClimbers.length} Climber${selectedClimbers.length > 1 ? 's' : ''}`}
                color="secondary"
                sx={{ ml: 1 }}
              />
            )}
          </Box>
        </Box>
        
        {viewMode === 'team' ? (
          <>
            <Grid container spacing={2} mb={2}>
              {climbers.map(climber => {
                const isSelected = selectedClimbers.some(c => c.id === climber.id);
                return (
                  <Grid item xs={6} sm={4} md={2} key={climber.id}>
                    <Card 
                      variant="outlined" 
                      sx={{ 
                        border: isSelected ? `2px solid ${theme.palette.primary.main}` : '1px solid rgba(0,0,0,0.12)',
                        backgroundColor: isSelected ? 'rgba(0,0,255,0.05)' : 'inherit',
                        position: 'relative'
                      }}
                    >
                      <Box sx={{ position: 'absolute', top: 5, right: 5 }}>
                        {isSelected && (
                          <CheckCircleIcon color="primary" />
                        )}
                      </Box>
                      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                        <Box display="flex" flexDirection="column" alignItems="center">
                          <Avatar 
                            src={climber.image} 
                            sx={{ width: 60, height: 60, mb: 1 }}
                            alt={climber.name}
                          />
                          <Typography variant="subtitle1" fontWeight="bold" align="center">
                            {climber.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" align="center">
                            {climber.role}
                          </Typography>
                          <Typography variant="caption" align="center" sx={{ mt: 0.5 }}>
                            {(climber.weight / 1000).toFixed(1)} kg
                          </Typography>
                          <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                            <Button 
                              variant="outlined" 
                              size="small"
                              onClick={() => onToggleClimber(climber)}
                            >
                              {isSelected ? 'Remove' : 'Add'}
                            </Button>
                            {isSelected && (
                              <Button 
                                variant="outlined" 
                                size="small" 
                                color="secondary"
                                onClick={() => onSetActiveClimber(climber)}
                              >
                                Gear
                              </Button>
                            )}
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
            
            {selectedClimbers.length > 0 && (
              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  Team total weight: {(getTotalWeight() / 1000).toFixed(1)} kg including {selectedClimbers.length} climber{selectedClimbers.length > 1 ? 's' : ''} with body weight
                </Typography>
              </Alert>
            )}
          </>
        ) : (
          // Individual climber view
          activeClimber && (
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4} md={3}>
                  <Box display="flex" flexDirection="column" alignItems="center">
                    <Avatar 
                      src={activeClimber.image} 
                      sx={{ width: 80, height: 80, mb: 1 }}
                      alt={activeClimber.name}
                    />
                    <Typography variant="h6">{activeClimber.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {activeClimber.role} • {activeClimber.specialty}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      Body weight: {(activeClimber.weight / 1000).toFixed(1)} kg
                    </Typography>
                    <Typography variant="body1" fontWeight="bold" color="primary">
                      Total with gear: {/* This will be filled in by the parent component */}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Typography variant="subtitle1">Climber Profile</Typography>
                  <Typography variant="body2" paragraph>
                    {activeClimber.bio}
                  </Typography>
                  
                  <Typography variant="subtitle1">Preset Gear</Typography>
                  <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
                    {activeClimber.presetGear.map((gearItem, index) => (
                      <Chip key={index} label={gearItem} size="small" color="primary" variant="outlined" />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )
        )}
      </CardContent>
    </Card>
  );
};

export default ClimberProfiles;
