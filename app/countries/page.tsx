import { getCountries } from "~/lib/utils";
import CountriesIndex from "./countries-index";

export default async function CountriesPage() {
  const countries = await getCountries()

  return (
    <CountriesIndex countries={countries} />
  )
}
