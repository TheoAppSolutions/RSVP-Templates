import type { Venue } from "@/lib/event";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export function getVenueQuery(venue: Venue) {
  return encodeURIComponent(venue.address ? `${venue.name}, ${venue.address}` : venue.name);
}

export function getVenueMapSource(venue: Venue) {
  const query = getVenueQuery(venue);
  return GOOGLE_MAPS_API_KEY
    ? `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${query}`
    : `https://maps.google.com/maps?q=${query}&output=embed`;
}

export function getVenueDirectionsUrl(venue: Venue) {
  return `https://www.google.com/maps/dir/?api=1&destination=${getVenueQuery(venue)}`;
}
