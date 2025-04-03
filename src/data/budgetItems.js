// Budget calculation data for Ruth Gorge expeditions

const budgetItems = {
  transportation: [
    {
      category: "International Travel",
      items: [
        { name: "International Flights to Anchorage", estimate: 800, notes: "Varies by departure location and season", required: true },
        { name: "Baggage Fees", estimate: 150, notes: "For oversized gear and extra bags", required: true }
      ]
    },
    {
      category: "Local Transportation",
      items: [
        { name: "Rental Car (Anchorage to Talkeetna)", estimate: 350, notes: "~$50/day for 7 days", required: false },
        { name: "Alaska Railroad (Anchorage to Talkeetna)", estimate: 120, notes: "Per person, one way", required: false },
        { name: "Talkeetna Shuttle Service", estimate: 100, notes: "Per person, round trip", required: false },
        { name: "Fuel Costs", estimate: 80, notes: "For rental car", required: false }
      ]
    },
    {
      category: "Air Taxi Services",
      items: [
        { name: "Air Taxi (Ruth Gorge Basecamp)", estimate: 650, notes: "Per person, round trip", required: false },
        { name: "Air Taxi (Root Canal/Moose's Tooth)", estimate: 675, notes: "Per person, round trip", required: false },
        { name: "Air Taxi (West Fork Ruth)", estimate: 725, notes: "Per person, round trip", required: false },
        { name: "Air Taxi (747 Pass)", estimate: 750, notes: "Per person, round trip", required: false },
        { name: "Excess Weight Charges", estimate: 150, notes: "Typically $5-7 per pound over 85 lbs limit", required: false }
      ]
    }
  ],
  
  accommodation: [
    {
      category: "Pre/Post Expedition",
      items: [
        { name: "Hotel in Anchorage", estimate: 400, notes: "~$130-200 per night (2-3 nights)", required: false },
        { name: "Lodging in Talkeetna", estimate: 300, notes: "~$100-150 per night (2-3 nights)", required: true },
        { name: "Hostel in Talkeetna", estimate: 120, notes: "~$40-60 per night (2-3 nights)", required: false }
      ]
    }
  ],
  
  food: [
    {
      category: "Expedition Food",
      items: [
        { name: "Freeze-dried Meals", estimate: 350, notes: "~$12 per meal, 2 meals per day, 14 days", required: false },
        { name: "Grocery Supplies", estimate: 250, notes: "For self-prepared meals", required: false },
        { name: "Snacks and Energy Food", estimate: 150, notes: "Bars, trail mix, chocolate, etc.", required: true },
        { name: "Hot Drinks", estimate: 40, notes: "Coffee, tea, hot chocolate, etc.", required: true }
      ]
    },
    {
      category: "Town Meals",
      items: [
        { name: "Restaurant Meals", estimate: 250, notes: "~$35 per day for 7 days in town", required: true }
      ]
    }
  ],
  
  permits: [
    {
      category: "Permits and Registrations",
      items: [
        { name: "National Park Service", estimate: 0, notes: "Registration for Ruth Gorge is free but recommended", required: true }
      ]
    }
  ],
  
  equipment: [
    {
      category: "Equipment Purchases",
      items: [
        { name: "Technical Climbing Gear", estimate: 500, notes: "Budget for new/replacement gear", required: false },
        { name: "Extreme Weather Clothing", estimate: 400, notes: "Specialized items for Alaska conditions", required: false },
        { name: "Camping Equipment", estimate: 300, notes: "Specialized for glacier camping", required: false }
      ]
    },
    {
      category: "Equipment Rentals",
      items: [
        { name: "Satellite Phone", estimate: 200, notes: "~$60-80 per week plus usage", required: false },
        { name: "Avalanche Safety Equipment", estimate: 150, notes: "If not owned", required: false },
        { name: "Glacier Travel Equipment", estimate: 100, notes: "If not owned", required: false }
      ]
    }
  ],
  
  consumables: [
    {
      category: "Fuel and Supplies",
      items: [
        { name: "White Gas / Stove Fuel", estimate: 100, notes: "~$10-25 per quart, 4-5 quarts for 2 weeks", required: true },
        { name: "Batteries", estimate: 40, notes: "For headlamps, GPS, etc.", required: true },
        { name: "Maps and Route Guides", estimate: 50, notes: "Printed materials", required: true }
      ]
    }
  ],
  
  communications: [
    {
      category: "Communications",
      items: [
        { name: "Satellite Phone Minutes", estimate: 100, notes: "Usage charges beyond rental", required: false },
        { name: "InReach/SPOT Subscription", estimate: 50, notes: "Monthly service", required: false }
      ]
    }
  ],
  
  insurance: [
    {
      category: "Insurance",
      items: [
        { name: "Travel Insurance", estimate: 150, notes: "Basic coverage", required: true },
        { name: "Rescue Insurance", estimate: 300, notes: "With evacuation coverage", required: true },
        { name: "Gear Insurance", estimate: 100, notes: "Coverage for expensive equipment", required: false }
      ]
    }
  ],
  
  miscellaneous: [
    {
      category: "Miscellaneous",
      items: [
        { name: "Tips for Air Taxi", estimate: 50, notes: "Optional but customary", required: false },
        { name: "Souvenirs", estimate: 100, notes: "Personal discretion", required: false },
        { name: "Emergency Fund", estimate: 500, notes: "Recommended buffer for unexpected expenses", required: true }
      ]
    }
  ],
  
  calculationNotes: [
    "All estimates are in USD and represent approximate 2025 costs",
    "Actual costs may vary based on season, group size, and specific requirements",
    "Air taxi prices typically increase 3-5% annually",
    "Budget for potential weather delays - extra days can add significant costs",
    "Group size impacts per-person costs - larger groups can share certain expenses"
  ]
};

export default budgetItems;
