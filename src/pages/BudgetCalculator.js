import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';

const BudgetCalculator = () => {



  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Expedition Budget Calculator
        </Typography>
        <Typography variant="body1" paragraph>
          Estimate and track the costs for your Alaska Range expedition.
        </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {/* Budget Settings */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Budget Settings
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Number of People"
                  type="number"
                  value={personCount}
                  onChange={(e) => setPersonCount(Math.max(1, parseInt(e.target.value) || 1))}
                  InputProps={{ inputProps: { min: 1 } }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Expedition Duration"
                  type="number"
                  value={expeditionDuration}
                  disabled
                  fullWidth
                  helperText="Based on calendar dates"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Box sx={{ textAlign: 'right' }}>
                  <Button 
                    variant="outlined" 
                    startIcon={<SaveIcon />}
                    sx={{ mr: 1 }}
                  >
                    Save Budget
                  </Button>
                  <Button 
                    variant="outlined" 
                    startIcon={<PrintIcon />}
                  >
                    Print
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* Budget Categories */}
          {Object.keys(budgetItems).map((groupKey) => (
            <Paper sx={{ mb: 3 }} key={groupKey}>
              <Box sx={{ p: 2, backgroundColor: theme.palette.primary.main, color: 'white' }}>
                <Typography variant="h6">
                  {groupKey.charAt(0).toUpperCase() + groupKey.slice(1)}
                </Typography>
              </Box>
              
              {budgetItems[groupKey].map((group) => (
                <Accordion key={`${groupKey}-${group.category}`} defaultExpanded={group.category.includes('Air Taxi')}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1">{group.category}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell padding="checkbox"></TableCell>
                            <TableCell>Item</TableCell>
                            <TableCell align="right">Est. Cost</TableCell>
                            <TableCell align="right">Qty</TableCell>
                            <TableCell align="right">Total</TableCell>
                            <TableCell align="right">Notes</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {group.items.map((item) => {
                            const itemId = `${groupKey}-${group.category}-${item.name}`;
                            const isSelected = selectedItems.some(i => i.id === itemId);
                            const selectedItem = selectedItems.find(i => i.id === itemId);
                            
                            return (
                              <TableRow 
                                key={itemId}
                                sx={{
                                  backgroundColor: isSelected ? 'rgba(25, 118, 210, 0.04)' : 'inherit',
                                  '&:hover': {
                                    backgroundColor: isSelected ? 'rgba(25, 118, 210, 0.08)' : 'rgba(0, 0, 0, 0.04)'
                                  }
                                }}
                              >
                                <TableCell padding="checkbox">
                                  <Checkbox
                                    checked={isSelected}
                                    onChange={() => handleToggleItem(item, groupKey, group.category)}
                                    color="primary"
                                  />
                                </TableCell>
                                <TableCell>
                                  {item.name}
                                  {item.required && (
                                    <Tooltip title="Essential item for most expeditions">
                                      <InfoIcon color="primary" fontSize="small" sx={{ ml: 1, verticalAlign: 'middle' }} />
                                    </Tooltip>
                                  )}
                                </TableCell>
                                <TableCell align="right">${item.estimate}</TableCell>
                                <TableCell align="right">
                                  {isSelected && (
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                      <IconButton 
                                        size="small"
                                        onClick={() => handleQuantityChange(itemId, (selectedItem?.quantity || 1) - 1)}
                                        disabled={(selectedItem?.quantity || 1) <= 1}
                                      >
                                        <RemoveIcon fontSize="small" />
                                      </IconButton>
                                      
                                      <Typography sx={{ mx: 1 }}>
                                        {selectedItem?.quantity || 1}
                                      </Typography>
                                      
                                      <IconButton 
                                        size="small"
                                        onClick={() => handleQuantityChange(itemId, (selectedItem?.quantity || 1) + 1)}
                                      >
                                        <AddIcon fontSize="small" />
                                      </IconButton>
                                    </Box>
                                  )}
                                </TableCell>
                                <TableCell align="right">
                                  {isSelected && `$${selectedItem?.estimate || item.estimate}`}
                                </TableCell>
                                <TableCell>
                                  {item.notes && (
                                    <Tooltip title={item.notes}>
                                      <InfoIcon fontSize="small" color="action" />
                                    </Tooltip>
                                  )}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Paper>
          ))}

          {/* Custom Items */}
          <Paper sx={{ mb: 3 }}>
            <Box sx={{ p: 2, backgroundColor: theme.palette.secondary.main, color: 'white' }}>
              <Typography variant="h6">
                Custom Budget Items
              </Typography>
            </Box>
            
            <Box sx={{ p: 3 }}>
              <Grid container spacing={2} alignItems="flex-end">
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Item Name"
                    value={newCustomItem.name}
                    onChange={(e) => setNewCustomItem({...newCustomItem, name: e.target.value})}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label="Category"
                    value={newCustomItem.category}
                    onChange={(e) => setNewCustomItem({...newCustomItem, category: e.target.value})}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6} sm={2}>
                  <TextField
                    label="Cost"
                    type="number"
                    value={newCustomItem.estimate}
                    onChange={(e) => setNewCustomItem({...newCustomItem, estimate: e.target.value})}
                    InputProps={{ startAdornment: '$' }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6} sm={2}>
                  <TextField
                    label="Quantity"
                    type="number"
                    value={newCustomItem.quantity}
                    onChange={(e) => setNewCustomItem({...newCustomItem, quantity: Math.max(1, parseInt(e.target.value) || 1)})}
                    InputProps={{ inputProps: { min: 1 } }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={1}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleAddCustomItem}
                    fullWidth
                  >
                    <AddIcon />
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Notes"
                    value={newCustomItem.notes}
                    onChange={(e) => setNewCustomItem({...newCustomItem, notes: e.target.value})}
                    fullWidth
                  />
                </Grid>
              </Grid>

              {customItems.length > 0 && (
                <Box sx={{ mt: 3 }}>
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Item</TableCell>
                          <TableCell>Category</TableCell>
                          <TableCell align="right">Cost</TableCell>
                          <TableCell align="right">Qty</TableCell>
                          <TableCell align="right">Total</TableCell>
                          <TableCell align="right">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {customItems.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell align="right">${item.baseEstimate}</TableCell>
                            <TableCell align="right">{item.quantity}</TableCell>
                            <TableCell align="right">${item.estimate}</TableCell>
                            <TableCell align="right">
                              <IconButton 
                                size="small" 
                                color="error"
                                onClick={() => handleRemoveCustomItem(item.id)}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          {/* Summary Card */}
          <Card sx={{ mb: 3, position: 'sticky', top: '80px' }}>
            <CardHeader 
              title="Budget Summary" 
              sx={{ backgroundColor: theme.palette.primary.main, color: 'white' }}
            />
            <CardContent>
              <Box sx={{ height: 300, mb: 3 }}>
                {/* Display a fallback message if there's no data */}
                {Object.keys(groupTotals).length === 0 ? (
                  <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Select budget items to see a budget breakdown
                    </Typography>
                  </Box>
                ) : (
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Category</TableCell>
                          <TableCell align="right">Amount ($)</TableCell>
                          <TableCell align="right">Percentage</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Object.entries(groupTotals).map(([group, total]) => (
                          <TableRow key={group}>
                            <TableCell>
                              {group.charAt(0).toUpperCase() + group.slice(1)}
                            </TableCell>
                            <TableCell align="right">${total.toLocaleString()}</TableCell>
                            <TableCell align="right">
                              {grandTotal > 0 ? Math.round((total / grandTotal) * 100) : 0}%
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Box>
              
              <Divider sx={{ mb: 2 }} />
              
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Category</TableCell>
                      <TableCell align="right">Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.entries(groupTotals).map(([group, total]) => (
                      <TableRow key={group}>
                        <TableCell>
                          {group.charAt(0).toUpperCase() + group.slice(1)}
                        </TableCell>
                        <TableCell align="right">${total.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
              <Box sx={{ mt: 3, p: 2, backgroundColor: theme.palette.grey[100], borderRadius: 1 }}>
                <Typography variant="h6" gutterBottom>
                  Total Budget: ${grandTotal.toLocaleString()}
                </Typography>
                <Typography variant="body1">
                  Per Person: ${perPersonTotal.toLocaleString()} 
                  <Typography variant="caption" sx={{ ml: 1 }}>
                    (for {personCount} {personCount === 1 ? 'person' : 'people'})
                  </Typography>
                </Typography>
              </Box>
            </CardContent>
          </Card>
          
          {/* Budget Tips */}
          <Card>
            <CardHeader 
              title="Budget Tips" 
              sx={{ backgroundColor: theme.palette.secondary.main, color: 'white' }}
            />
            <CardContent>
              <Typography variant="body2" paragraph>
                <strong>Air Taxi Costs:</strong> The largest expense for most Ruth Gorge expeditions is typically the air taxi service.
                Consider coordinating with other teams to share flights.
              </Typography>
              
              <Typography variant="body2" paragraph>
                <strong>Equipment:</strong> Renting specialized gear in Anchorage can be more economical than purchasing or paying excess baggage fees.
              </Typography>
              
              <Typography variant="body2" paragraph>
                <strong>Food Planning:</strong> Pre-packaged meals are convenient but expensive. Consider dehydrating your own meals for significant savings.
              </Typography>
              
              <Typography variant="body2" paragraph>
                <strong>Weather Buffer:</strong> Always budget for 2-3 extra days due to potential weather delays for both fly-in and fly-out.
              </Typography>
              
              <Box sx={{ mt: 2, p: 2, backgroundColor: theme.palette.error.light, color: 'white', borderRadius: 1 }}>
                <Typography variant="subtitle2">
                  <InfoIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Rescue insurance with evacuation coverage is strongly recommended!
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Note: All estimates are approximate and based on 2025 prices. Actual costs may vary depending on your specific itinerary and group size.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default BudgetCalculator;
