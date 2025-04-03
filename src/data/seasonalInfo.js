// Data extracted from the document about seasonal patterns and climbing windows

const seasonalInfo = {
  overview: `The Alaska Range's climbing season is typically late spring, when weather and daylight become favorable but cold conditions still preserve snow and ice. April and May are historically the prime window for routes in the Ruth Gorge and surrounding peaks. During this period, temperatures begin to moderate from the deep winter cold, storms become less frequent, and the snowpack starts to consolidate - all of which contribute to better climbing and ski conditions.`,
  
  monthlyConditions: [
    {
      month: "March",
      temperature: "Very cold (-20°F to 15°F)",
      precipitation: "Moderate snowfall",
      daylight: "Increasing (10-12 hours)",
      snowpack: "Deep, unconsolidated powder",
      routeConditions: "Too cold for most parties, unconsolidated snow on routes",
      notes: "Early season. Very cold nights and unconsolidated snow. Only suitable for the most cold-tolerant teams."
    },
    {
      month: "April",
      temperature: "Cold to moderate (-10°F to 25°F)",
      precipitation: "Lighter snowfall, more settled weather patterns",
      daylight: "Good (13-15 hours)",
      snowpack: "Beginning to consolidate with freeze-thaw cycles",
      routeConditions: "Mid to late April offers excellent conditions for ice routes",
      notes: "Late April is prime time for the classic ice routes like Ham and Eggs. Improving weather with cold enough conditions to maintain good ice."
    },
    {
      month: "May",
      temperature: "Moderate (10°F to 35°F)",
      precipitation: "Driest month on average",
      daylight: "Excellent (16-18 hours)",
      snowpack: "Well consolidated but beginning to soften on sunny aspects",
      routeConditions: "Early May continues prime season; later in month ice routes deteriorate",
      notes: "First half of May continues the prime window. Later in May, warm temperatures can melt out ice and increase rockfall and avalanche danger."
    },
    {
      month: "June",
      temperature: "Moderate to warm (20°F to 45°F)",
      precipitation: "Increasing cloud cover and moisture",
      daylight: "Maximum (18-20 hours)",
      snowpack: "Rapidly deteriorating, wet snow common",
      routeConditions: "Better for rock routes than ice/snow routes",
      notes: "Warmer, wetter weather deteriorates route conditions for ice climbs. Greater likelihood of rain at lower elevations."
    }
  ],
  
  optimalWindows: {
    iceRoutes: "Mid-April to early May offers the best balance: cold enough for solid ice and stable snow, but with longer days and fewer storms.",
    rockRoutes: "Late May through June, when walls are clear of snow and ice.",
    skiMountaineering: "Late April to mid-May, when snowpack has consolidated but before too much melt."
  },
  
  weatherPatterns: {
    springCycles: "In spring, a typical diurnal freeze-thaw cycle begins to stabilize the snowpack – especially on solar aspects. Snow can bond well in the cold nights, yielding good climbing in early morning, but strong sun on fresh snow can trigger wet avalanches by afternoon.",
    storms: "Even during the prime season, large storm systems can still occur, potentially trapping climbers for days. Weather forecasts beyond 3-4 days are notoriously unreliable in the Alaska Range.",
    temperatures: "Temperature swings can be dramatic. Many experienced parties target late April into the first half of May because too late in the season can bring warm temps that melt out ice and increase rockfall and avalanche danger."
  },
  
  snowpackInfo: {
    depth: "The Alaska Range snowpack is deep through winter (Talkeetna averages ~120″ of snow annually, mostly Dec–Mar), leading to significant avalanche hazard after storms.",
    stability: "In mid-winter, cold temperatures can create persistent weak layers, and any new snow or wind-loading may result in slab avalanches on steep slopes. Come spring, a typical diurnal freeze-thaw cycle begins to stabilize the snowpack.",
    avalancheRisk: "Avalanche risk never disappears: it evolves. During a spring high-pressure spell, snow can bond well in the cold nights, yielding good climbing in early morning, but strong sun on fresh snow can trigger wet avalanches by afternoon."
  },
  
  climateChart: {
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    highTemp: [11, 18, 25, 38, 52, 62, 65, 63, 54, 40, 24, 14],
    lowTemp: [-2, 2, 8, 24, 36, 46, 51, 48, 40, 29, 14, 1],
    precipitation: [1.7, 1.4, 1.1, 0.9, 0.7, 1.3, 2.6, 3.3, 2.9, 2.1, 1.5, 1.8],
    snowfall: [21, 19, 14, 8, 1, 0, 0, 0, 0, 6, 14, 20],
    notes: "Talkeetna monthly climate trends – a proxy for the Ruth Gorge area climate. Temperatures shown in °F, precipitation in inches."
  }
};

export default seasonalInfo;
