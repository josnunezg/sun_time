import { ArrowLeft, MapPin } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import AppLayout from "~/components/layouts/app-layout";
import { dateFormat, formatLargeDate, formatSmallDate, getSunriseAndSunsetOfCity } from "~/lib/utils";
import CardsSunriseSunset from "./cards-sunrise-sunset";
import DatesTable from "~/components/dates-table";

type PageProps = {
  params: {
    country: string
    city: string
  }
}

const CityPage: FC<PageProps> = async ({ params }) => {
  const { country: countrySlug, city: citySlug } = await params;
  const todayDate = new Date();
  const previousDate = new Date();
  previousDate.setDate(todayDate.getDate() - 11);

  const { country, city, data } = await getSunriseAndSunsetOfCity(countrySlug, citySlug, { dateStart: dateFormat(previousDate), dateEnd: dateFormat(todayDate) });
  const [today, yesterday, ...otherDates] = data;

  return (
    <AppLayout>
      <div className="flex flex-col gap-10 px-60">
        <Link href={`/countries/${country.slug}`} className="flex items-center gap-1">
          <ArrowLeft />
          <p>Back to {country.name}</p>
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
        <div className="flex flex-col gap-4">
          <CardsSunriseSunset yesterday={yesterday} today={today} />
          <div>
            <p className="mb-4 text-3xl">Last 10 days History</p>
            <DatesTable data={otherDates} />
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default CityPage;
