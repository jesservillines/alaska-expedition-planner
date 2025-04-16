import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

// Layout components
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import ChartInit from './components/charts/ChartInit';

// Import route data to pre-select default routes
import routesData from './data/routes';

// Page components
import Dashboard from './pages/Dashboard';
import RoutesDatabase from './pages/RoutesDatabase';
import SeasonalInfo from './pages/SeasonalInfo';
import ExpeditionMap from './pages/ExpeditionMap';
import Calendar from './pages/Calendar';
import SimpleBudgetCalculator from './pages/SimpleBudgetCalculator';
import PackingList from './pages/PackingList';
import LogisticsInfo from './pages/LogisticsInfo';
import VolcanicRisks from './pages/VolcanicRisks';
import AlaskaClimbing from './pages/AlaskaClimbing';
import MapTest from './components/MapTest';
import SimpleMap from './components/SimpleMap';

function App() {
  // Find the two default routes we want to pre-select
  const defaultRoutes = routesData.filter(route => 
    route.id === "southwest-ridge" || route.id === "blue-collar-beatdown"
  );
  
  // Default expedition dates: April 25 - May 4, 2025
  const defaultDates = {
    start: new Date(2025, 3, 25), // Month is 0-based, so 3 = April
    end: new Date(2025, 4, 4),   // 4 = May
  };
  
  // Default team members (to be pre-populated in packing list)
  const defaultTeamMembers = [
    {
      id: "jesse-villines",
      name: "Jesse Villines",
      nickname: "Badger",
      role: "Alpinist Splitboarder",
      gear: ["Jones Ultralight Butterfly splitboard", "Phantom hardboot setup", "4-season tent", "MSR Reactor stove"]
    },
    {
      id: "daniel-blumberg",
      name: "Daniel Blumberg",
      nickname: "Team Twink",
      role: "Mountain Athlete",
      gear: ["Blizzard Zero G 85 Skis", "Scarpa F1 XT Ski Boots", "La Sportiva G2 Evo 6000m Boots", "Rab Latok tent"]
    },
    {
      id: "nicholas-wright",
      name: "Nicholas Wright",
      nickname: "Raw Dawg",
      role: "Alpine Crusher",
      gear: ["Blizzard Zero G 85 Skis", "Maestrale boots", "Sled/pulk", "Ropes", "Group cooking gear"]
    }
  ];
  
  // Application state with pre-populated values
  const [selectedRoutes, setSelectedRoutes] = useState(defaultRoutes);
  const [expeditionDates, setExpeditionDates] = useState(defaultDates);
  const [budgetItems, setBudgetItems] = useState([]);
  const [teamMembers, setTeamMembers] = useState(defaultTeamMembers);
  
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
            setSelectedRoutes={setSelectedRoutes}
          />} />
          <Route path="/map-simple" element={<SimpleMap />} />
          <Route path="/map-test" element={<MapTest />} />
          <Route path="/calendar" element={<Calendar 
            expeditionDates={expeditionDates}
            setExpeditionDates={setExpeditionDates}
            selectedRoutes={selectedRoutes}
          />} />
          <Route path="/budget" element={<SimpleBudgetCalculator />} />
          <Route path="/packing" element={<PackingList 
            teamMembers={teamMembers}
            setTeamMembers={setTeamMembers}
          />} />
          <Route path="/logistics" element={<LogisticsInfo />} />
          <Route path="/volcanic-risks" element={<VolcanicRisks />} />
          <Route path="/climbing" element={<AlaskaClimbing />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
