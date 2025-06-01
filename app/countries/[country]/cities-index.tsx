'use client';

import { ArrowLeft, MapPin } from "lucide-react";
import Link from "next/link";
import { FC, useMemo, useState } from "react";
import AppLayout from "~/components/layouts/app-layout";
import PlaceLink from "~/components/place-link";
import { Input } from "~/components/ui/input";
import { City, Country } from "~/lib/types";
import { getCitiesOfCountry } from "~/lib/utils";

type CitiesIndexProps = {
  country: Country,
  cities: City[]
}

export default function CitiesIndex({ country, cities }: CitiesIndexProps) {
  const [searchText, setSearchText] = useState("");
    const filteredCities = useMemo(() => {
      if (!searchText) return cities;

      return cities.filter((city) => city.name.toLowerCase().includes(searchText.trim().toLowerCase()));
    }, [searchText])

  return (
    <AppLayout>
      <div className="flex flex-col gap-10 px-60">
        <Link href='/countries' className="flex items-center gap-1">
          <ArrowLeft />
          <p>Back to Countries</p>
        </Link>
        <span className="flex items-center gap-2">
          <MapPin className="text-orange-400 w-10 h-10" />
          <p className="text-5xl">{country.name}</p>
        </span>
        <p className="text-2xl text-gray-600">Select a city to view its sunrise and sunset times</p>
        <Input
          className="text-lg py-3 px-4 border-2 border-orange-200 focus:border-orange-400 focus:ring-orange-400 w-2/6"
          placeholder="Search a City"
          onChange={({ target: { value } }) => { setSearchText(value) }}
          type="text"
        />
        <div className="grid grid-cols-5 items-center justify-center gap-5 max-h-96 overflow-y-auto">
          {filteredCities.map(({ name, slug }, index) => (
            <PlaceLink href={`/countries/${country.slug}/${slug}`} key={`${slug}-${index}`} label={name} />
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
