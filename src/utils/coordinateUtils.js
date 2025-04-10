/**
 * Alaska Expedition Planner - Coordinate Conversion Utilities
 * 
 * This file contains utility functions to convert between different coordinate formats
 * needed for the Alaska Expedition Planner map display.
 */

// Transform coordinates from the accurate format to the format expected by the map
// This is based on the observed difference between the two coordinate systems
export function transformCoordinates(coords) {
  if (!coords) return null;
  
  // Convert coordinates format for compatibility with the existing map implementation
  // The adjustment values are based on analyzing the difference between the working
  // coordinates in the old system and the new accurate coordinates
  const longitudeAdjustment = 0.5616; // Approximate conversion factor
  
  return {
    lat: coords.lat,
    lng: coords.lng + longitudeAdjustment
  };
}

// Transform an entire route's coordinates (start and summit)
export function transformRouteCoordinates(route) {
  if (!route) return null;
  
  return {
    ...route,
    start: transformCoordinates(route.start),
    summit: transformCoordinates(route.summit)
  };
}

// For debugging purposes - helps find the conversion factor between coordinate systems
export function calculateCoordinateDifference(oldCoord, newCoord) {
  return {
    latDiff: oldCoord.lat - newCoord.lat,
    lngDiff: oldCoord.lng - newCoord.lng
  };
}
