import { ArrowLeft, MapPin } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import AppLayout from "~/components/layouts/app-layout";
import { dateFormat, formatLargeDate, formatSmallDate, getSunriseAndSunsetOfCity } from "~/lib/utils";
import CardsSunriseSunset from "./cards-sunrise-sunset";

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
            <table className="w-full bg-white rounded shadow">
              <thead>
                <tr className="bg-gray-200 text-gray-600 border-b-1">
                  <th className="text-start p-2">Date</th>
                  <th className="text-start p-2">Sunrise</th>
                  <th className="text-start p-2">Sunset</th>
                  <th className="text-start p-2">First Light</th>
                  <th className="text-start p-2">Last Light</th>
                  <th className="text-start p-2">Day Length</th>
                </tr>
              </thead>
              <tbody>
                {otherDates.map((item, index) => (
                  <tr key={`other-dates-item-${index}`} className={index % 2 !== 0 ? 'bg-gray-100' : ''}>
                    <td className="text-start p-2">{formatSmallDate(item.date)}</td>
                    <td className="text-start p-2 text-orange-600">{item.sunrise}</td>
                    <td className="text-start p-2 text-violet-600">{item.sunset}</td>
                    <td className="text-start p-2">{item.first_light}</td>
                    <td className="text-start p-2">{item.last_light}</td>
                    <td className="text-start p-2">{item.day_length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default CityPage;
