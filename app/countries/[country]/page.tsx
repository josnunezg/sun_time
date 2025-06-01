import { FC } from "react";
import { getCitiesOfCountry } from "~/lib/utils";
import CitiesIndex from "./cities-index";

type PageProps = {
  params: {
    country: string
  }
}

const CountryPage: FC<PageProps> = async ({ params }) => {
  const { country: countrySlug } = await params;
  const { country, cities } = await getCitiesOfCountry(countrySlug);

  return (
    <CitiesIndex country={country} cities={cities} />
  )
}

export default CountryPage;
