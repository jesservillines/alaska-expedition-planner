// Comprehensive packing list for Ruth Gorge expeditions

const packingList = {
  categories: [
    {
      name: "Technical Climbing Gear",
      items: [
        { name: "Ice tools (2)", essential: true, weight: 1000, notes: "Technical tools appropriate for water ice and mixed climbing" },
        { name: "Crampons", essential: true, weight: 1000, notes: "Technical crampons with vertical front points" },
        { name: "Alpine climbing harness", essential: true, weight: 400, notes: "Adjustable to fit over layers" },
        { name: "Climbing helmet", essential: true, weight: 300, notes: "Rated for climbing and mountaineering" },
        { name: "Ice screws", essential: true, weight: 800, notes: "8-12 screws of varying lengths (13-22cm)" },
        { name: "Rock protection", essential: false, weight: 1500, notes: "Set of cams/nuts as appropriate for route" },
        { name: "Double ropes", essential: true, weight: 3600, notes: "2x 60m half ropes preferred for alpine routes" },
        { name: "Personal anchor system", essential: true, weight: 200, notes: "For belays and anchors" },
        { name: "Belay device with guide mode", essential: true, weight: 100, notes: "For belaying and rappelling" },
        { name: "Prusik cords/slings", essential: true, weight: 200, notes: "For crevasse rescue and emergency ascension" },
        { name: "Locking carabiners", essential: true, weight: 400, notes: "6-8 for anchors and belays" },
        { name: "Non-locking carabiners", essential: true, weight: 600, notes: "10-12 for protection" },
        { name: "Alpine draws", essential: true, weight: 400, notes: "6-8 for reducing rope drag" },
        { name: "Cordelette", essential: true, weight: 200, notes: "For anchor building" },
        { name: "Ice pitons", essential: false, weight: 300, notes: "For mixed routes or aid climbing" },
        { name: "V-thread tool", essential: true, weight: 100, notes: "For making Abalakov anchors in ice" }
      ]
    },
    {
      name: "Glacier Travel & Skiing",
      items: [
        { name: "Mountaineering boots", essential: true, weight: 2000, notes: "Double boots with removable liners for cold conditions" },
        { name: "Alpine touring skis/splitboard", essential: false, weight: 3500, notes: "For ski mountaineering objectives" },
        { name: "Climbing skins", essential: false, weight: 500, notes: "Sized for your skis" },
        { name: "Ski crampons", essential: false, weight: 300, notes: "For icy ascents" },
        { name: "Ski poles/collapsible poles", essential: true, weight: 500, notes: "Adjustable with snow baskets" },
        { name: "Ski boots", essential: false, weight: 2500, notes: "AT boots compatible with your bindings" },
        { name: "Avalanche beacon", essential: true, weight: 250, notes: "Digital 3-antenna transceiver" },
        { name: "Avalanche probe", essential: true, weight: 300, notes: "Minimum 240cm length" },
        { name: "Avalanche shovel", essential: true, weight: 600, notes: "Metal blade, collapsible" },
        { name: "Crevasse rescue pulley", essential: true, weight: 100, notes: "For glacier rescue" },
        { name: "Snow pickets", essential: true, weight: 600, notes: "2-3 for glacier travel anchors" },
        { name: "Sled or pulk", essential: false, weight: 5000, notes: "For hauling gear on glacier approaches" }
      ]
    },
    {
      name: "Camping & Living",
      items: [
        { name: "4-season tent", essential: true, weight: 4000, notes: "Expedition-grade with strong poles for high winds" },
        { name: "Sleeping bag", essential: true, weight: 1800, notes: "Rated to at least -20°F/-30°C" },
        { name: "Sleeping pads", essential: true, weight: 900, notes: "Insulated inflatable pad plus foam pad" },
        { name: "Stove system", essential: true, weight: 600, notes: "White gas stove recommended for cold conditions" },
        { name: "Fuel", essential: true, weight: 2000, notes: "~8oz per person per day for melting snow and cooking" },
        { name: "Cooking pot set", essential: true, weight: 800, notes: "With heat exchanger for efficiency" },
        { name: "Eating utensils", essential: true, weight: 100, notes: "Bowl, spoon, insulated mug" },
        { name: "Water bottles", essential: true, weight: 300, notes: "Insulated bottles to prevent freezing" },
        { name: "Water treatment", essential: false, weight: 100, notes: "For melted snow if concerned" },
        { name: "Food", essential: true, weight: 8000, notes: "~1.5-2 lbs per person per day" },
        { name: "Snow saw/shovel", essential: true, weight: 500, notes: "For building camp walls and cutting blocks" },
        { name: "Pee bottle", essential: true, weight: 100, notes: "Dedicated and clearly marked!" },
        { name: "Toilet supplies", essential: true, weight: 500, notes: "WAG bags required for waste management" },
        { name: "Trash bags", essential: true, weight: 100, notes: "Pack out all trash" },
        { name: "Repair kit", essential: true, weight: 300, notes: "Multi-tool, duct tape, tent repair, stove maintenance" },
        { name: "Solar charger", essential: false, weight: 500, notes: "For long expeditions" },
        { name: "Headlamp", essential: true, weight: 100, notes: "Plus spare batteries" }
      ]
    },
    {
      name: "Clothing",
      items: [
        { name: "Base layers (top & bottom)", essential: true, weight: 400, notes: "Synthetic or wool, 1-2 sets" },
        { name: "Mid layer top", essential: true, weight: 300, notes: "Fleece or light synthetic insulation" },
        { name: "Soft shell pants", essential: true, weight: 500, notes: "Wind/water resistant, breathable" },
        { name: "Insulated pants", essential: true, weight: 600, notes: "Down or synthetic fill" },
        { name: "Hard shell pants", essential: true, weight: 400, notes: "Waterproof/breathable with full-length zips" },
        { name: "Insulated jacket", essential: true, weight: 800, notes: "Substantial down or synthetic belay parka" },
        { name: "Hard shell jacket", essential: true, weight: 500, notes: "Waterproof/breathable with hood" },
        { name: "Glove liners", essential: true, weight: 50, notes: "Thin liner gloves for dexterity" },
        { name: "Mid-weight gloves", essential: true, weight: 150, notes: "For active climbing" },
        { name: "Heavy insulated gloves/mittens", essential: true, weight: 300, notes: "Waterproof with insulation" },
        { name: "Warm hat/beanie", essential: true, weight: 100, notes: "Wool or synthetic" },
        { name: "Sun hat", essential: true, weight: 100, notes: "With brim for glacier travel" },
        { name: "Buff/neck gaiter", essential: true, weight: 50, notes: "For face protection" },
        { name: "Balaclava", essential: true, weight: 100, notes: "For extreme cold" },
        { name: "Heavy socks", essential: true, weight: 200, notes: "3-4 pairs, wool or synthetic blend" },
        { name: "Liner socks", essential: false, weight: 100, notes: "To prevent blisters" },
        { name: "Down booties", essential: false, weight: 200, notes: "For camp comfort" },
        { name: "Glacier glasses", essential: true, weight: 50, notes: "Category 4 lenses" },
        { name: "Goggles", essential: true, weight: 150, notes: "For storms and high wind" },
        { name: "Gaiters", essential: true, weight: 200, notes: "Full-height for deep snow" }
      ]
    },
    {
      name: "Navigation & Communication",
      items: [
        { name: "Map & compass", essential: true, weight: 100, notes: "Topo maps of the Ruth Gorge area" },
        { name: "GPS device", essential: false, weight: 200, notes: "With extra batteries" },
        { name: "Satellite phone", essential: false, weight: 300, notes: "For emergency communications" },
        { name: "Satellite messenger (InReach/SPOT)", essential: true, weight: 150, notes: "For tracking and emergency messages" },
        { name: "FRS/GMRS radios", essential: false, weight: 200, notes: "For team communication" },
        { name: "Route descriptions", essential: true, weight: 50, notes: "Printouts of route topos and descriptions" }
      ]
    },
    {
      name: "Medical & Emergency",
      items: [
        { name: "First aid kit", essential: true, weight: 500, notes: "Include altitude medications if needed" },
        { name: "Personal medications", essential: true, weight: 100, notes: "Include backup prescriptions" },
        { name: "Sunscreen", essential: true, weight: 100, notes: "SPF 50+ and lip protection" },
        { name: "Blister treatment", essential: true, weight: 50, notes: "Moleskin, tape, 2nd skin" },
        { name: "Pain relievers", essential: true, weight: 50, notes: "Ibuprofen, acetaminophen" },
        { name: "Emergency shelter", essential: true, weight: 300, notes: "Bivy sack or emergency blanket" },
        { name: "Chemical hand/foot warmers", essential: false, weight: 200, notes: "For extreme cold" }
      ]
    },
    {
      name: "Documentation",
      items: [
        { name: "Passport", essential: true, weight: 0, notes: "Required for international travelers" },
        { name: "Permits/registrations", essential: true, weight: 0, notes: "National Park Service registration" },
        { name: "Insurance documents", essential: true, weight: 0, notes: "Travel and rescue insurance" },
        { name: "Credit cards/cash", essential: true, weight: 0, notes: "For expenses in Talkeetna" },
        { name: "Emergency contacts", essential: true, weight: 0, notes: "List of important numbers" }
      ]
    }
  ],
  
  specialConsiderations: [
    "Weight is crucial for fly-in expeditions - air taxis have strict weight limits (typically 85 lbs per person including body weight).",
    "Temperatures in the Ruth Gorge can drop to -20°F even in spring - gear must be rated appropriately.",
    "The sun can be extremely intense on the glacier - proper eye and skin protection is essential.",
    "Moisture management is critical - ensure sleeping bags and insulating layers stay dry.",
    "Group gear can be distributed among team members to balance weight."
  ],
  
  weightOptimization: [
    "Consider equipment sharing among team members (stoves, tents, ropes, protection).",
    "Evaluate each item's necessity based on your specific objectives and time of year.",
    "Bring repair capabilities rather than redundant items where possible.",
    "Food planning should balance weight with caloric needs (typically 3,000-4,000 calories per day).",
    "Pre-package meals to reduce packaging waste and weight."
  ]
};

export default packingList;
