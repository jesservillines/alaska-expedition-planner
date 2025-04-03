import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

// Layout components
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import ChartInit from './components/charts/ChartInit';

// Page components
import Dashboard from './pages/Dashboard';
import RoutesDatabase from './pages/RoutesDatabase';
import SeasonalInfo from './pages/SeasonalInfo';
import ExpeditionMap from './pages/ExpeditionMap';
import Calendar from './pages/Calendar';
import SimpleBudgetCalculator from './pages/SimpleBudgetCalculator';
import PackingList from './pages/PackingList';
import LogisticsInfo from './pages/LogisticsInfo';

function App() {
  // Application state
  const [selectedRoutes, setSelectedRoutes] = useState([]);
  const [expeditionDates, setExpeditionDates] = useState({
    start: null,
    end: null,
  });
  const [budgetItems, setBudgetItems] = useState([]);
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ChartInit />
      <Navigation />
      <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 10 }}>
        <Routes>
          <Route path="/" element={<Dashboard 
            selectedRoutes={selectedRoutes}
            expeditionDates={expeditionDates}
          />} />
          <Route path="/routes" element={<RoutesDatabase 
            selectedRoutes={selectedRoutes}
            setSelectedRoutes={setSelectedRoutes}
          />} />
          <Route path="/seasonal-info" element={<SeasonalInfo />} />
          <Route path="/map" element={<ExpeditionMap 
            selectedRoutes={selectedRoutes}
          />} />
          <Route path="/calendar" element={<Calendar 
            expeditionDates={expeditionDates}
            setExpeditionDates={setExpeditionDates}
            selectedRoutes={selectedRoutes}
          />} />
          <Route path="/budget" element={<SimpleBudgetCalculator />} />
          <Route path="/packing" element={<PackingList />} />
          <Route path="/logistics" element={<LogisticsInfo />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
