'use client';

import { useMemo, useState } from "react";
import { ArrowLeft, Globe } from "lucide-react";
import Link from "next/link";
import AppLayout from "~/components/layouts/app-layout";
import PlaceLink from "~/components/place-link";
import { Country } from "~/lib/types";
import { Input } from "~/components/ui/input";

type CountriesIndexProps = {
  countries: Country[]
}

export default function CountriesIndex({ countries }: CountriesIndexProps) {
  const [searchText, setSearchText] = useState("");
  const filteredCountries = useMemo(() => {
    if (!searchText) return countries;

    return countries.filter((country) => country.name.toLowerCase().includes(searchText.trim().toLowerCase()));
  }, [searchText])

  return (
    <AppLayout>
      <div className="flex flex-col gap-10 px-60">
        <Link href='/' className="flex items-center gap-1">
          <ArrowLeft />
          <p>Back to Home</p>
        </Link>
        <span className="flex items-center gap-2">
          <Globe className="text-blue-400 w-10 h-10" />
          <p className="text-5xl">Select a Country</p>
        </span>
        <p className="text-2xl text-gray-600">Choose a country to view its cities and their sunrise/sunset times</p>
        <Input
          className="text-lg py-3 px-4 border-2 border-orange-200 focus:border-orange-400 focus:ring-orange-400 w-2/6"
          placeholder="Search a Country"
          onChange={({ target: { value } }) => { setSearchText(value) }}
          type="text"
        />
        <div className="grid grid-cols-5 items-center justify-center gap-5 max-h-96 overflow-y-auto">
          {filteredCountries.map(({ name, slug }, index) => (
            <PlaceLink href={`/countries/${slug}`} key={`${slug}-${index}`} label={name} />
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
