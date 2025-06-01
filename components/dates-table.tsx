import { SunriseSunsetData } from "~/lib/types"
import { formatSmallDate } from "~/lib/utils"

type DatesTableProps = {
  data: SunriseSunsetData[]
}

export default function DatesTable({ data }: DatesTableProps) {
  return (
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
        {data.map((item, index) => (
          <tr key={`other-dates-item-${index}`} className={index % 2 !== 0 ? 'bg-gray-100' : ''}>
            <td className="text-start p-2">{item.date ? formatSmallDate(item.date) : "No Data"}</td>
            <td className="text-start p-2 text-orange-600">{item.sunrise ?? "No Data"}</td>
            <td className="text-start p-2 text-violet-600">{item.sunset ?? "No Data"}</td>
            <td className="text-start p-2">{item.first_light ?? "No Data"}</td>
            <td className="text-start p-2">{item.last_light ?? "No Data"}</td>
            <td className="text-start p-2">{item.day_length.includes("NaN:NaN:NaN") ? "No Data" : item.day_length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
