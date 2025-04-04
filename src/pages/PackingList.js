import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Button,
  TextField,
  IconButton,
  Chip,
  Card,
  CardContent,
  FormControlLabel,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  Alert
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Print as PrintIcon,
  Save as SaveIcon,
  FilterList as FilterListIcon,
  Warning as WarningIcon
} from '@mui/icons-material';

import packingList from '../data/packingList';

const PackingList = () => {
  const theme = useTheme();
  
  // State for managing checked items and filters
  const [checkedItems, setCheckedItems] = useState({});
  const [showOnlyEssential, setShowOnlyEssential] = useState(false);
  const [showWeights, setShowWeights] = useState(true);
  const [customItems, setCustomItems] = useState([]);
  const [openCustomDialog, setOpenCustomDialog] = useState(false);
  const [newCustomItem, setNewCustomItem] = useState({
    name: '',
    category: '',
    essential: false,
    weight: 0,
    notes: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState(
    packingList.categories.reduce((acc, category) => {
      acc[category.name] = true;
      return acc;
    }, {})
  );
  
  // Calculate weight totals
  const getTotalWeight = () => {
    let totalWeight = 0;
    
    // Weight from packingList items
    packingList.categories.forEach(category => {
      category.items.forEach(item => {
        if (checkedItems[`${category.name}-${item.name}`]) {
          totalWeight += item.weight || 0;
        }
      });
    });
    
    // Weight from custom items
    customItems.forEach(item => {
      if (checkedItems[`custom-${item.id}`]) {
        totalWeight += item.weight || 0;
      }
    });
    
    return totalWeight;
  };
  
  // Calculate item counts
  const getItemCounts = () => {
    let totalItems = 0;
    let checkedCount = 0;
    
    // Count packingList items
    packingList.categories.forEach(category => {
      category.items.forEach(item => {
        totalItems++;
        if (checkedItems[`${category.name}-${item.name}`]) {
          checkedCount++;
        }
      });
    });
    
    // Count custom items
    customItems.forEach(item => {
      totalItems++;
      if (checkedItems[`custom-${item.id}`]) {
        checkedCount++;
      }
    });
    
    return { totalItems, checkedCount };
  };
  
  // Handle item checkbox change
  const handleCheckItem = (category, itemName) => {
    const itemKey = `${category}-${itemName}`;
    setCheckedItems({
      ...checkedItems,
      [itemKey]: !checkedItems[itemKey]
    });
  };
  
  // Toggle a category's expanded state
  const toggleCategory = (categoryName) => {
    setExpandedCategories({
      ...expandedCategories,
      [categoryName]: !expandedCategories[categoryName]
    });
  };
  
  // Handle custom item dialog
  const handleOpenCustomDialog = () => {
    setOpenCustomDialog(true);
  };
  
  const handleCloseCustomDialog = () => {
    setOpenCustomDialog(false);
    setNewCustomItem({
      name: '',
      category: '',
      essential: false,
      weight: 0,
      notes: ''
    });
  };
  
  const handleAddCustomItem = () => {
    if (newCustomItem.name) {
      const customItem = {
        ...newCustomItem,
        id: Date.now()
      };
      
      setCustomItems([...customItems, customItem]);
      handleCloseCustomDialog();
    }
  };
  
  const handleDeleteCustomItem = (itemId) => {
    setCustomItems(customItems.filter(item => item.id !== itemId));
    // Also remove from checked items if checked
    const itemKey = `custom-${itemId}`;
    if (checkedItems[itemKey]) {
      const newCheckedItems = { ...checkedItems };
      delete newCheckedItems[itemKey];
      setCheckedItems(newCheckedItems);
    }
  };
  
  // Check if the search term matches an item
  const matchesSearch = (item) => {
    if (!searchTerm) return true;
    
    const search = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(search) ||
      (item.notes && item.notes.toLowerCase().includes(search))
    );
  };
  
  // Auto-check all essential items
  const checkAllEssentialItems = () => {
    const newCheckedItems = { ...checkedItems };
    
    // Check essential packingList items
    packingList.categories.forEach(category => {
      category.items.forEach(item => {
        if (item.essential) {
          newCheckedItems[`${category.name}-${item.name}`] = true;
        }
      });
    });
    
    // Check essential custom items
    customItems.forEach(item => {
      if (item.essential) {
        newCheckedItems[`custom-${item.id}`] = true;
      }
    });
    
    setCheckedItems(newCheckedItems);
  };
  
  // Clear all checked items
  const clearAllCheckedItems = () => {
    setCheckedItems({});
  };
  
  // Print packing list
  const handlePrint = () => {
    window.print();
  };
  
  const { totalItems, checkedCount } = getItemCounts();
  const totalWeight = getTotalWeight();
  const totalWeightLbs = Math.round(totalWeight / 453.59237 * 10) / 10; // Convert grams to pounds
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Expedition Packing List
        </Typography>
        <Typography variant="body1" paragraph>
          A comprehensive gear list for Alaska Range climbing expeditions. Check off items as you pack
          them and track your gear weight.
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {/* Filters and Controls */}
          <Paper sx={{ p: 2, mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Search Items"
                  size="small"
                  fullWidth
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: <FilterListIcon color="action" sx={{ mr: 1 }} />
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={showOnlyEssential}
                        onChange={(e) => setShowOnlyEssential(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Essential Only"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={showWeights}
                        onChange={(e) => setShowWeights(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Show Weights"
                  />
                </Box>
              </Grid>
            </Grid>
          </Paper>
          
          {/* Packing List */}
          {packingList.categories.map((category) => {
            // Filter items based on search and essential filter
            const filteredItems = category.items.filter(item => 
              matchesSearch(item) && (!showOnlyEssential || item.essential)
            );
            
            // Skip empty categories
            if (filteredItems.length === 0) return null;
            
            return (
              <Paper sx={{ mb: 3 }} key={category.name}>
                <Accordion 
                  expanded={expandedCategories[category.name]}
                  onChange={() => toggleCategory(category.name)}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                      <Typography variant="h6">{category.name}</Typography>
                      <Chip 
                        label={`${filteredItems.filter(item => checkedItems[`${category.name}-${item.name}`]).length}/${filteredItems.length}`} 
                        size="small" 
                        color="primary" 
                        sx={{ ml: 2 }}
                      />
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell padding="checkbox"></TableCell>
                            <TableCell>Item</TableCell>
                            {showWeights && <TableCell align="right">Weight</TableCell>}
                            <TableCell>Notes</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {filteredItems.map((item) => (
                            <TableRow 
                              key={item.name}
                              sx={{ 
                                backgroundColor: checkedItems[`${category.name}-${item.name}`] 
                                  ? 'rgba(76, 175, 80, 0.08)' 
                                  : 'inherit'
                              }}
                            >
                              <TableCell padding="checkbox">
                                <Checkbox
                                  checked={Boolean(checkedItems[`${category.name}-${item.name}`])}
                                  onChange={() => handleCheckItem(category.name, item.name)}
                                  color="primary"
                                />
                              </TableCell>
                              <TableCell>
                                {item.name}
                                {item.essential && (
                                  <Chip
                                    label="Essential"
                                    size="small"
                                    color="primary"
                                    variant="outlined"
                                    sx={{ ml: 1 }}
                                  />
                                )}
                              </TableCell>
                              {showWeights && (
                                <TableCell align="right">
                                  {item.weight ? `${item.weight}g (${Math.round(item.weight / 453.59237 * 10) / 10}lb)` : '-'}
                                </TableCell>
                              )}
                              <TableCell>{item.notes}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
              </Paper>
            );
          })}
          
          {/* Custom Items */}
          {customItems.length > 0 && (
            <Paper sx={{ mb: 3 }}>
              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                    <Typography variant="h6">Custom Items</Typography>
                    <Chip 
                      label={`${customItems.filter(item => checkedItems[`custom-${item.id}`]).length}/${customItems.length}`} 
                      size="small" 
                      color="secondary" 
                      sx={{ ml: 2 }}
                    />
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell padding="checkbox"></TableCell>
                          <TableCell>Item</TableCell>
                          <TableCell>Category</TableCell>
                          {showWeights && <TableCell align="right">Weight</TableCell>}
                          <TableCell>Notes</TableCell>
                          <TableCell align="right">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {customItems.map((item) => (
                          <TableRow 
                            key={item.id}
                            sx={{ 
                              backgroundColor: checkedItems[`custom-${item.id}`] 
                                ? 'rgba(76, 175, 80, 0.08)' 
                                : 'inherit'
                            }}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={Boolean(checkedItems[`custom-${item.id}`])}
                                onChange={() => handleCheckItem('custom', item.id)}
                                color="primary"
                              />
                            </TableCell>
                            <TableCell>
                              {item.name}
                              {item.essential && (
                                <Chip
                                  label="Essential"
                                  size="small"
                                  color="primary"
                                  variant="outlined"
                                  sx={{ ml: 1 }}
                                />
                              )}
                            </TableCell>
                            <TableCell>{item.category}</TableCell>
                            {showWeights && (
                              <TableCell align="right">
                                {item.weight ? `${item.weight}g (${Math.round(item.weight / 453.59237 * 10) / 10}lb)` : '-'}
                              </TableCell>
                            )}
                            <TableCell>{item.notes}</TableCell>
                            <TableCell align="right">
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleDeleteCustomItem(item.id)}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>
            </Paper>
          )}
          
          <Box sx={{ mt: 3, mb: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleOpenCustomDialog}
            >
              Add Custom Item
            </Button>
            
            <Box>
              <Button 
                variant="outlined" 
                color="error" 
                onClick={clearAllCheckedItems}
                sx={{ mr: 2 }}
              >
                Clear All
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={checkAllEssentialItems}
              >
                Check Essential Items
              </Button>
            </Box>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={4}>
          {/* Packing Summary */}
          <Card sx={{ mb: 3, position: 'sticky', top: '80px' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Packing Summary
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <List dense>
                <ListItem disablePadding sx={{ mb: 1 }}>
                  <ListItemText 
                    primary={`Items Packed: ${checkedCount}/${totalItems}`}
                    secondary={`${Math.round(checkedCount / totalItems * 100)}% complete`}
                  />
                </ListItem>
                <ListItem disablePadding sx={{ mb: 1 }}>
                  <ListItemText 
                    primary={`Total Weight: ${totalWeight}g (${totalWeightLbs}lb)`}
                    secondary="Includes only checked items"
                  />
                </ListItem>
              </List>
              
              {totalWeightLbs > 50 && (
                <Alert 
                  severity="warning" 
                  icon={<WarningIcon />}
                  sx={{ mt: 2 }}
                >
                  Your gear weight exceeds airline and air taxi limits. Consider reducing weight or planning for excess charges.
                </Alert>
              )}
              
              <Box sx={{ mt: 3 }}>
                <Button
                  variant="outlined"
                  startIcon={<PrintIcon />}
                  onClick={handlePrint}
                  fullWidth
                  sx={{ mb: 1 }}
                >
                  Print Packing List
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<SaveIcon />}
                  fullWidth
                >
                  Save Packing List
                </Button>
              </Box>
            </CardContent>
          </Card>
          
          {/* Weight Constraints Info */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Weight Constraints
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Typography variant="body2" paragraph>
                <strong>Air Taxi Weight Limit:</strong> 125 lbs (56.7kg) per person including body weight.
              </Typography>
              
              <Typography variant="body2" paragraph>
                <strong>Excess Weight Charges:</strong> ~$5-7 per pound over the limit.
              </Typography>
              
              <Typography variant="body2">
                <strong>Airline Checked Bag:</strong> Typically 50 lbs (22.7kg) per bag, with oversize/overweight charges.
              </Typography>
            </CardContent>
          </Card>
          
          {/* Packing Tips */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Packing Tips
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <List dense>
                {packingList.weightOptimization.map((tip, index) => (
                  <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                    <ListItemText primary={tip} />
                  </ListItem>
                ))}
              </List>
              
              <Typography variant="subtitle2" color="primary" sx={{ mt: 2 }}>
                Special Considerations:
              </Typography>
              <List dense>
                {packingList.specialConsiderations.slice(0, 3).map((tip, index) => (
                  <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                    <ListItemText primary={tip} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Custom Item Dialog */}
      <Dialog open={openCustomDialog} onClose={handleCloseCustomDialog}>
        <DialogTitle>Add Custom Item</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={12}>
              <TextField
                label="Item Name"
                value={newCustomItem.name}
                onChange={(e) => setNewCustomItem({ ...newCustomItem, name: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Category"
                value={newCustomItem.category}
                onChange={(e) => setNewCustomItem({ ...newCustomItem, category: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Weight (grams)"
                type="number"
                value={newCustomItem.weight}
                onChange={(e) => setNewCustomItem({ ...newCustomItem, weight: Number(e.target.value) })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Notes"
                value={newCustomItem.notes}
                onChange={(e) => setNewCustomItem({ ...newCustomItem, notes: e.target.value })}
                fullWidth
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={newCustomItem.essential}
                    onChange={(e) => setNewCustomItem({ ...newCustomItem, essential: e.target.checked })}
                    color="primary"
                  />
                }
                label="Mark as Essential Item"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCustomDialog}>Cancel</Button>
          <Button onClick={handleAddCustomItem} variant="contained" color="primary">
            Add Item
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PackingList;
