// Logistics information for Ruth Gorge expeditions

const logistics = {
  airTaxis: [
    {
      name: "Talkeetna Air Taxi",
      website: "https://www.talkeetnaair.com",
      phone: "+1-907-733-2218",
      email: "info@talkeetnaair.com",
      baseLocation: "Talkeetna, AK",
      landingZones: [
        { name: "Ruth Gorge Basecamp (Donnelly Landing)", elevation: 4500, price: 650, notes: "Main gorge floor, access to Mt. Dickey, Barrill, Bradley, etc." },
        { name: "Root Canal (Moose's Tooth)", elevation: 7200, price: 675, notes: "Narrow glacier below Moose's Tooth (Ham & Eggs, Shaken Not Stirred)" },
        { name: "Mountain House/Sheldon Amphitheater", elevation: 5600, price: 650, notes: "Popular landing spot in the Ruth Amphitheater, with historic Mountain House shelter" },
        { name: "West Fork Ruth", elevation: 6500, price: 725, notes: "Access to Mt. Wake (Peak 11,300), Huntington, other west side objectives" }
      ],
      weightLimits: "125 lbs per person (including body weight) - additional costs apply for extra weight",
      specialNotes: "Has caches of white gas available at common basecamps ($25/gallon). Offers sat phone rental."
    },
    {
      name: "K2 Aviation",
      website: "https://www.flyk2.com",
      phone: "+1-907-733-2291",
      email: "info@flyk2.com",
      baseLocation: "Talkeetna, AK",
      landingZones: [
        { name: "Ruth Glacier", elevation: 4500, price: 650, notes: "Standard Ruth Gorge landing" },
        { name: "Root Canal", elevation: 7200, price: 675, notes: "Access to Moose's Tooth routes" },
        { name: "Pika Glacier/Little Switzerland", elevation: 5800, price: 660, notes: "Southern area with moderate peak objectives" }
      ],
      weightLimits: "125 lbs per person (including body weight) - excess charges apply",
      specialNotes: "Offers glacier-to-glacier shuttle flights (e.g. Ruth↔Kahiltna) for approximately $175"
    }
  ],
  
  permits: {
    denaliNationalPark: "Special Use Permits are not required for small private groups climbing in the Ruth Gorge area. However, registration with the park service is recommended.",
    registrationProcess: "While not mandatory for the Ruth Gorge (unlike Denali itself), it's advisable to register with the Talkeetna Ranger Station before and after your trip for safety purposes.",
    rangerStation: {
      name: "Talkeetna Ranger Station",
      address: "Mile 1.3, Talkeetna Spur Road, Talkeetna, AK",
      phone: "+1-907-733-2231",
      hours: "8am-4:30pm daily in climbing season (April-July)",
      notes: "Good source of up-to-date route condition information and safety advice."
    }
  },
  
  accommodation: {
    talkeetna: [
      { name: "Talkeetna Roadhouse", type: "B&B/Hostel", priceRange: "$$", notes: "Historic climber hangout with bunkrooms and shared facilities. Popular with climbers." },
      { name: "Sheldon Air Service Bunkhouse", type: "Hostel", priceRange: "$", notes: "Basic accommodation for climbers, often full during peak season." },
      { name: "Swiss Alaska Inn", type: "Hotel", priceRange: "$$", notes: "Clean rooms with private bathrooms, walking distance to town." }
    ],
    camping: {
      info: "Camping is permitted at the Talkeetna Spur Wayside just outside town. Free but no facilities. In the Ruth Gorge itself, you'll be camping on the glacier at your air taxi dropoff point.",
      gear: "Must be fully self-sufficient with winter camping gear. Temperatures even in May can drop well below freezing at night."
    }
  },
  
  communications: {
    options: [
      { 
        type: "Satellite Phone", 
        notes: "Most reliable form of communication. Can be rented in Talkeetna or Anchorage. Some air services offer rental.",
        rental: "Approximately $60-80 per week plus usage charges"
      },
      {
        type: "InReach/SPOT Devices",
        notes: "Popular for emergency communication and location tracking. Two-way messaging with InReach.",
        rental: "InReach rental available in Anchorage (~$30-40/week + subscription)"
      },
      {
        type: "Radio",
        notes: "Air taxis monitor specific frequencies, coordinated when dropped off. FRS/GMRS for party communication.",
        rental: "Air taxi frequency information provided with flight; bring your own FRS/GMRS radios"
      }
    ],
    emergencyContact: {
      primary: "Denali National Park Dispatch: 907-733-9103",
      secondary: "Your air taxi service is often the first point of contact in emergencies"
    }
  },
  
  supplies: {
    talkeetna: {
      groceries: "Talkeetna has limited grocery options. Cubby's Marketplace has basic supplies at higher prices than Anchorage.",
      fuel: "White gas (Coleman fuel) and canister fuel available at outdoor shops in Talkeetna, but selection is limited and prices high.",
      gear: "Very limited climbing gear available in Talkeetna - bring everything from Anchorage or home."
    },
    anchorage: {
      groceries: "Stock up in Anchorage at Fred Meyer, Carrs-Safeway, or Natural Pantry before heading to Talkeetna.",
      fuel: "REI and Alaska Mountaineering & Hiking in Anchorage have full selection of stove fuels.",
      gear: "REI and Alaska Mountaineering & Hiking in Anchorage are best options for last-minute gear purchases."
    },
    restrictions: "Air taxis prohibit butane/propane canisters on flights. White gas is allowed in limited quantity. TAT sells white gas cached at basecamp ($25/gal). Some groups mail supplies ahead to Talkeetna for pickup."
  },
  
  transportation: {
    fromAnchorage: [
      {
        method: "Rental Car", 
        details: "2.5 hour drive from Anchorage to Talkeetna. All major rental agencies at airport. AWD/4WD recommended."
      },
      {
        method: "Alaska Railroad",
        details: "Daily service to Talkeetna during summer season (mid-May to mid-September). Winter service is limited."
      },
      {
        method: "Shuttle Service",
        details: "Talkeetna Shuttle offers scheduled and charter service from Anchorage. Reservation recommended."
      }
    ],
    inTalkeetna: "Talkeetna is a small town - everything is within walking distance. Some accommodations offer pickup from train station."
  },
  
  timelineTips: {
    planning: "Book air taxi reservations at least 3-6 months in advance for prime season dates.",
    flexibility: "Build flexibility into your schedule - weather delays are common. Plan for 2-3 potential fly-in days and 2-3 potential fly-out days.",
    acclimatization: "Consider spending 1-2 nights at basecamp before attempting major objectives, especially if flying directly to higher camps like Root Canal.",
    season: "For routes like Ham and Eggs, arrive mid-to-late April. For rock routes, late May to June is better."
  }
};

export default logistics;
