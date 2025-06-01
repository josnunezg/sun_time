import AppLayout from "~/components/layouts/app-layout";
import { getQuerySearch } from "~/lib/utils";
import SunChart from "./sun-chart";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import DatesTable from "~/components/dates-table";

interface SearchPage {
  searchParams: {
    query: string
    dateStart: string
    dateEnd: string
  }
}

export default async function SearchPage({ searchParams }: SearchPage) {
  const { query, dateStart, dateEnd } = searchParams;
  const { country, city, data } = await getQuerySearch(query, dateStart, dateEnd)

  return (
    <AppLayout>
      <div className="flex flex-col gap-5 px-60">
        <Link href="/" className="flex items-center gap-1">
          <ArrowLeft />
          <p>Back to Home</p>
        </Link>
        <span className="flex gap-4 items-center">
          <span className="rounded-full bg-orange-400 w-14 h-14 flex justify-center items-center">
            <MapPin className="text-white w-8 h-8" />
          </span>
          <span>
            <p className="text-5xl">{city.name}</p>
            <p className="text-3xl text-gray-400">{country.name}</p>
          </span>
        </span>
        <SunChart data={data} />
        <DatesTable data={data} />
      </div>
    </AppLayout>
  )
}
