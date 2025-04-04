// climberProfiles.js
// This file contains predefined climber profiles with their preset gear selections

const climberProfiles = [
  {
    id: 1,
    name: "Jesse Villines",
    role: "Alpinist Splitboarder",
    weight: 75000, // in grams (75kg)
    specialty: "Splitboarding",
    image: "https://via.placeholder.com/100", // placeholder for profile image
    bio: "Aka 'Badger', expert alpinist splitboarder with focus on remote expeditions",
    presetGear: [
      // Technical Climbing Gear
      "Petzl Meteor Climbing Helmet",
      "Petzl Nomic Ice Tools (pair)",
      "Petzl Dart Crampons",
      "Black Diamond Camalot C4 Cams (set)",
      "Petzl GriGri belay device",
      "Petzl Micro Traxion pulley",
      // Splitboard Setup
      "Jones Ultralight Butterfly Splitboard (158cm)",
      "Phantom M6 Bindings (pair)",
      "Phantom Solo Cleats",
      "Phantom Slipper HD",
      "Phantom Rocket Risers",
      "Phantom GT Splitboard Crampons",
      // Mountain Boots
      "Mammut Nordwand 6000 High Boots",
      // Group Items & Personal Gear
      "4-season tent",
      "MSR Reactor 1.7L Stove System", 
      "Hyperlite Mountain Gear Prism 40",
      "Satellite communication device",
      // Other essentials automatically included
    ]
  },
  {
    id: 2,
    name: "Daniel Blumberg",
    role: "Mountain Athlete",
    weight: 70000, // in grams (70kg)
    specialty: "All-around Mountaineering",
    image: "https://via.placeholder.com/100",
    bio: "Aka 'Team Twink', strong overall mountain athlete with diverse expedition experience",
    presetGear: [
      // Technical Climbing
      "Petzl Meteor Climbing Helmet",
      "Petzl Nomic Ice Tools (pair)",
      "Petzl Dart Crampons",
      "Black Diamond Camalot C4 Cams (set)",
      "Black Diamond ATC-Guide belay device",
      // Ski Setup
      "Blizzard Zero G 85 Skis (178cm)",
      "Scarpa F1 XT Ski Boots",
      "La Sportiva G2 Evo 6000m Boots",
      "Climbing skins",
      "Ski poles/collapsible poles",
      // Group Items & Personal Gear
      "MSR Reactor 1.7L Stove System",
      "Rab Latok tent",
      "Patagonia Ascensionist 30L Backpack",
      "Satellite communication device",
      "Outdoor Research Alpine Bivy",
      "Snow pickets",
      "Avalanche beacon",
      "Avalanche probe",
      "Avalanche shovel",
      "First aid kit",
      // Other essentials automatically included
    ]
  },
  {
    id: 3,
    name: "Nicholas Wright",
    role: "Alpine Crusher",
    weight: 82000, // in grams (82kg)
    specialty: "Technical Mountaineering",
    image: "https://via.placeholder.com/100",
    bio: "Aka 'Raw Dawg', generally crushes everything in the mountains with raw power",
    presetGear: [
      // Technical Climbing
      "Petzl Meteor Climbing Helmet",
      "Petzl Nomic Ice Tools (pair)",
      "Petzl Dart Crampons",
      "Black Diamond Camalot C4 Cams (set)",
      "Petzl GriGri belay device",
      "Petzl Nano Traxion pulley",
      // Ski Setup
      "Blizzard Zero G 85 Skis (178cm)",
      "Scarpa Maestrale Ski Boots",
      "Ski crampons",
      // Group Items
      "Sled or pulk",
      "Western Mountaineering Versalite Sleeping Bag (6'0\")",
      "Rope",
      "Double ropes",
      // Other essentials automatically included
    ]
  },
  {
    id: 4,
    name: "Alex Honnold",
    role: "Lead Climber",
    weight: 68000, // in grams (68kg)
    specialty: "Free Soloing",
    image: "https://via.placeholder.com/100", // placeholder for profile image
    bio: "Known for free soloing El Capitan, focuses on ultralight alpine style",
    presetGear: [
      // Technical Climbing
      "Petzl Meteor Climbing Helmet",
      "Black Diamond Camalot C4 Cams (set)",
      "Petzl GriGri belay device",
      "Petzl Micro Traxion pulley",
      // Glacier Travel & Skiing
      "Jones Ultralight Butterfly Splitboard (158cm)",
      "Phantom M6 Bindings (pair)",
      "Phantom Slipper HD",
      "Verts",
      // Other essentials automatically included
    ]
  },
  {
    id: 5,
    name: "Jimmy Chin",
    role: "Photographer/Climber",
    weight: 75000, // in grams (75kg)
    specialty: "Alpine Photography",
    image: "https://via.placeholder.com/100",
    bio: "Filmmaker and photographer specializing in climbing and skiing expeditions",
    presetGear: [
      // Photography gear
      "Camera and lenses",
      // Technical Climbing
      "Petzl Nomic Ice Tools (pair)",
      "Petzl Dart Crampons",
      "Black Diamond ATC-Guide belay device",
      // Glacier Travel & Skiing
      "Blizzard Zero G 95 Skis (178cm)",
      "Scarpa Maestrale Ski Boots",
      "Avalanche beacon",
      "Avalanche probe",
      "Avalanche shovel",
      // Other essentials automatically included
    ]
  },
  {
    id: 6,
    name: "Brette Harrington",
    role: "Technical Climber",
    weight: 54000, // in grams (54kg)
    specialty: "Alpine First Ascents",
    image: "https://via.placeholder.com/100",
    bio: "Known for technical climbing and first ascents in Patagonia and Alaska",
    presetGear: [
      // Technical Climbing
      "Petzl Meteor Climbing Helmet",
      "Petzl Nomic Ice Tools (pair)",
      "Petzl Dart Crampons",
      "Black Diamond Camalot C4 Cams (set)",
      "Black Diamond ATC-Guide belay device",
      // Glacier Travel & Skiing
      "MSR Reactor 1.7L Stove System",
      "Mammut Nordwand 6000 High Boots",
      "Black Diamond Raven Pro Ice Axe (50cm)",
      // Other essentials automatically included
    ]
  },
  {
    id: 7,
    name: "Conrad Anker",
    role: "Expedition Leader",
    weight: 82000, // in grams (82kg)
    specialty: "High Altitude Mountaineering",
    image: "https://via.placeholder.com/100",
    bio: "Veteran mountaineer with expertise in Himalayan and polar expeditions",
    presetGear: [
      // Technical Climbing
      "Petzl Meteor Climbing Helmet",
      "Petzl Nomic Ice Tools (pair)",
      "Petzl Dart Crampons",
      "Black Diamond Camalot C4 Cams (set)",
      "Petzl GriGri belay device",
      "Petzl Nano Traxion pulley",
      // Glacier Travel & Skiing
      "La Sportiva G2 Evo 6000m Boots",
      "Black Diamond Raven Pro Ice Axe (50cm)",
      "NanoTrax motion capture system",
      // Other essentials automatically included
    ]
  },
  {
    id: 8,
    name: "Emily Harrington",
    role: "Sport/Alpine Climber",
    weight: 57000, // in grams (57kg)
    specialty: "Mixed Climbing",
    image: "https://via.placeholder.com/100",
    bio: "Accomplished sport climber and expedition member with Everest experience",
    presetGear: [
      // Technical Climbing
      "Petzl Meteor Climbing Helmet",
      "Black Diamond Camalot C4 Cams (set)",
      "Petzl GriGri belay device",
      // Glacier Travel & Skiing
      "Jones Ultralight Stratos Splitboard (159cm)",
      "Phantom M6 Bindings (pair)",
      "Phantom Slipper HD",
      "Western Mountaineering Versalite Sleeping Bag (6'0\")",
      // Other essentials automatically included
    ]
  }
];

// Essential gear that every climber needs regardless of their profile
const essentialGear = [
  "4-season tent",
  "Sleeping bag",
  "Sleeping pad",
  "Harness",
  "Locking carabiners",
  "Non-locking carabiners",
  "Avalanche beacon",
  "Emergency bivy",
  "First aid kit",
  "Headlamp",
  "Satellite communication device",
  "Water bottle/hydration",
  "Mountaineering boots"
];

export { climberProfiles, essentialGear };
