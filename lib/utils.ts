import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { SUNRISE_SUNSET_API_KEY, SUNRISE_SUNSET_CONTRIES_URL } from "./constants"
import { City, Country, SunriseSunsetData } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getCountries() {
  const response = await fetch(SUNRISE_SUNSET_CONTRIES_URL, {
    headers: {
      Authorization: `Bearer ${SUNRISE_SUNSET_API_KEY}`
    },
    cache: 'force-cache'
  });

  if (!response.ok) {
    throw new Error('There is an error trying to retrieve the countries');
  }

  return await response.json() as Country[]
}

export async function getCitiesOfCountry(countrySlug: string) {
  const response = await fetch(`${SUNRISE_SUNSET_CONTRIES_URL}/${countrySlug}/cities`, {
    headers: {
      Authorization: `Bearer ${SUNRISE_SUNSET_API_KEY}`
    },
    cache: 'force-cache'
  });

  if (!response.ok) {
    throw new Error('There is an error trying to retrieve the countries')
  }

  return await response.json() as { country: Country, cities: City[] }
}


export async function getSunriseAndSunsetOfCity(countrySlug: string, citySlug: string, dateRange: { dateStart?: string, dateEnd?: string } = {}) {

  const response = await fetch(`${SUNRISE_SUNSET_CONTRIES_URL}/${countrySlug}/cities/${citySlug}/sunrise_and_sunset?date_start=${dateRange.dateStart}&date_end=${dateRange.dateEnd}`, {
    headers: {
      Authorization: `Bearer ${SUNRISE_SUNSET_API_KEY}`
    },
    cache: 'no-cache'
  })

  if (!response.ok) {
    throw new Error('There is an error trying to retrieve the sunrise and sunset data of city')
  }

  return await response.json() as { country: Country, city: City, data: SunriseSunsetData[] }
}

export function dateFormat(date: Date) {
  return date.toISOString().split('T')[0];
}

export function formatLargeDate(dateString: string) {
  const date = new Date(dateString);

  const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
  const day = date.toLocaleDateString('en-US', { day: '2-digit' });
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const year = date.getFullYear();

  return `${weekday}, ${month} ${day}, ${year}`;
}

export function formatSmallDate(dateString: string) {
  const date = new Date(dateString);

  const day = date.toLocaleDateString('en-US', { day: '2-digit' });
  const month = date.toLocaleDateString('en-US', { month: 'short' });

  return `${month} ${day}`;
}
