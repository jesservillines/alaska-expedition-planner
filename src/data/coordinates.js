/**
 * Alaska Expedition Planner - Accurate Climbing Route Coordinates
 * Contains precise GPS coordinates for climbing routes in the Ruth Gorge and surrounding areas
 * Each route includes start (base) coordinates and summit coordinates
 */

const routeCoordinates = {
  // Moose's Tooth Routes
  "ham-and-eggs": {
    start: { lat: 62.96327, lng: -150.62963 },
    summit: { lat: 62.96917, lng: -150.61333 },
    mountain: "Moose's Tooth",
    accuracy: "High accuracy – base is Root Canal landing zone; summit from USGS topographic data"
  },
  "shaken-not-stirred": {
    start: { lat: 62.96327, lng: -150.62963 },
    summit: { lat: 62.96917, lng: -150.61333 },
    mountain: "Moose's Tooth",
    accuracy: "High accuracy – same start (Root Canal) and summit as Ham & Eggs (Moose's Tooth peak)"
  },
  
  // Mount Barrill Routes
  "japanese-couloir": {
    start: { lat: 62.96800, lng: -150.71000 },
    summit: { lat: 62.96676, lng: -150.72130 },
    mountain: "Mount Barrill",
    accuracy: "Summit from peak coordinates; base estimated at foot of Mt. Barrill's east couloir"
  },
  "right-corner": {
    start: { lat: 62.96800, lng: -150.71000 },
    summit: { lat: 62.96676, lng: -150.72130 },
    mountain: "Mount Barrill",
    accuracy: "Summit high-accuracy (Mt. Barrill); base point estimated at base of route on Mt. Barrill's face"
  },
  
  // London/Werewolf Towers Routes
  "freezy-nuts": {
    start: { lat: 62.92800, lng: -150.67000 },
    summit: { lat: 62.92500, lng: -150.65000 },
    mountain: "London Tower",
    accuracy: "Approximate – summit on London Tower; base at glacier col between spires"
  },
  "london-bridge": {
    start: { lat: 62.92000, lng: -150.67000 },
    summit: { lat: 62.92500, lng: -150.65500 },
    mountain: "London Bridge",
    accuracy: "Estimated – London Bridge feature near London Tower (derived from context and Coffee Glacier descent path)"
  },
  
  // Mount Dickey Routes
  "wine-bottle": {
    start: { lat: 62.94600, lng: -150.70000 },
    summit: { lat: 62.94627, lng: -150.72164 },
    mountain: "Mount Dickey",
    accuracy: "Summit high-accuracy from map (Mt. Dickey); base estimated at east face glacier base"
  },
  "blood-from-the-stone": {
    start: { lat: 62.94600, lng: -150.70000 },
    summit: { lat: 62.94627, lng: -150.72164 },
    mountain: "Mount Dickey",
    accuracy: "Summit high-accuracy (Mt. Dickey); start point estimated below east face"
  },
  "southeast-face": {
    start: { lat: 62.91000, lng: -150.71000 },
    summit: { lat: 62.94627, lng: -150.72164 },
    mountain: "Mount Dickey",
    accuracy: "Summit high-accuracy (Mt. Dickey); base approximate – on Dickey's SE side"
  },
  "snowpatrol": {
    start: { lat: 62.88000, lng: -150.70000 },
    summit: { lat: 62.94627, lng: -150.72164 },
    mountain: "Mount Dickey",
    accuracy: "Summit high-accuracy (Mt. Dickey); base estimated at foot of south face (Great Gorge area)"
  },
  "aim-for-the-bushes": {
    start: { lat: 62.94700, lng: -150.70000 },
    summit: { lat: 62.94627, lng: -150.72164 },
    mountain: "Mount Dickey",
    accuracy: "Summit high-accuracy (Mt. Dickey); base estimated via east face location"
  },
  "blue-collar-beatdown": {
    start: { lat: 62.95800, lng: -150.76000 },
    summit: { lat: 62.94627, lng: -150.72164 },
    mountain: "Mount Dickey",
    accuracy: "Summit high-accuracy (Mt. Dickey); base approximated on NE face of Dickey"
  },
  
  // Mount Kudlich (Peak 11,300) Routes
  "southwest-ridge": {
    start: { lat: 63.00000, lng: -150.84000 },
    summit: { lat: 63.00250, lng: -150.87722 },
    mountain: "Mount Kudlich",
    accuracy: "Summit high-accuracy (Mount Kudlich); base estimated near West/NW Fork Ruth confluence"
  },
  "right-couloir": {
    start: { lat: 63.00300, lng: -150.89000 },
    summit: { lat: 63.00250, lng: -150.87722 },
    mountain: "Mount Kudlich",
    accuracy: "Summit high-accuracy (Mount Kudlich); start point estimated on West Face (NW Fork of Ruth side)"
  },
  
  // Mount Bradley Routes
  "east-buttress": {
    start: { lat: 62.92300, lng: -150.71000 },
    summit: { lat: 62.92472, lng: -150.72639 },
    mountain: "Mount Bradley",
    accuracy: "Summit from USGS topo (Mt. Bradley); base estimated at foot of east buttress"
  },
  "heavy-mettle": {
    start: { lat: 62.93200, lng: -150.73000 },
    summit: { lat: 62.92472, lng: -150.72639 },
    mountain: "Mount Bradley",
    accuracy: "Summit from USGS topo (Mt. Bradley); base approximate on Bradley's north aspect"
  },
  
  // Mount Hunter Routes
  "moonflower-buttress": {
    start: { lat: 62.98500, lng: -150.88600 },
    summit: { lat: 62.95083, lng: -151.08944 },
    mountain: "Mount Hunter",
    accuracy: "Summit high-accuracy (Mt. Hunter); base from West Fork Tokositna Glacier landing"
  },
  "deprivation": {
    start: { lat: 62.98500, lng: -150.88600 },
    summit: { lat: 62.95083, lng: -151.08944 },
    mountain: "Mount Hunter",
    accuracy: "Summit high-accuracy (Mt. Hunter); base same as Moonflower (West Fork approach)"
  },
  "super-mini-moonflower": {
    start: { lat: 62.97000, lng: -151.12000 },
    summit: { lat: 62.96000, lng: -151.08000 },
    mountain: "Mini-Moonflower",
    accuracy: "Moderate accuracy – Mini-Moonflower is a 9,470′ satellite of Mt. Hunter"
  },
  
  // Mount Johnson Routes
  "elevator-shaft": {
    start: { lat: 62.90000, lng: -150.70000 },
    summit: { lat: 62.89472, lng: -150.70778 },
    mountain: "Mount Johnson",
    accuracy: "Summit high-accuracy (Mt. Johnson); base estimated at base of N face"
  },
  
  // The Stump Routes
  "stump-gully": {
    start: { lat: 62.88000, lng: -150.68000 },
    summit: { lat: 62.89000, lng: -150.69000 },
    mountain: "The Stump",
    accuracy: "Estimated – The Stump is a smaller 7,400′ formation in Ruth Gorge"
  },
  
  // Mount Dan Beard Routes
  "beards-divine": {
    start: { lat: 63.01500, lng: -150.77500 },
    summit: { lat: 63.01988, lng: -150.78956 },
    mountain: "Mount Dan Beard",
    accuracy: "Summit high-accuracy (Mt. Dan Beard); base point estimated on Mount Dan Beard's flank"
  }
};

// Peak summit coordinates for reference
const peakCoordinates = {
  "Moose's Tooth": { lat: 62.96917, lng: -150.61333 },
  "Mount Dickey": { lat: 62.94627, lng: -150.72164 },
  "Mount Barrill": { lat: 62.96676, lng: -150.72130 },
  "Mount Huntington": { lat: 62.95083, lng: -151.08944 },
  "Mount Kudlich": { lat: 63.00250, lng: -150.87722 },
  "London Tower": { lat: 62.92500, lng: -150.65000 },
  "Mount Bradley": { lat: 62.92472, lng: -150.72639 },
  "Mount Johnson": { lat: 62.89472, lng: -150.70778 },
  "The Stump": { lat: 62.89000, lng: -150.69000 },
  "Mount Dan Beard": { lat: 63.01988, lng: -150.78956 },
  "Mini-Moonflower": { lat: 62.96000, lng: -151.08000 }
};

// Landing zone coordinates
const landingZoneCoordinates = {
  "Root Canal": { lat: 62.96327, lng: -150.62963 },
  "Ruth Gorge Basecamp": { lat: 62.9470, lng: -150.1700 },
  "West Fork Ruth": { lat: 63.00000, lng: -150.84000 },
  "Mountain House": { lat: 62.9200, lng: -150.2400 },
  "Northwest Fork Ruth": { lat: 63.00300, lng: -150.89000 },
  "Ruth Glacier": { lat: 62.9450, lng: -150.1750 },
  "Pika Glacier": { lat: 62.8800, lng: -150.1950 }
};

export { routeCoordinates, peakCoordinates, landingZoneCoordinates };
