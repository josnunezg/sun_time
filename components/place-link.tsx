import { MapPin } from "lucide-react"
import Link from "next/link"

type PlaceLinkProps = {
  href: string
  label: string
}

export default function PlaceLink({ href, label }: PlaceLinkProps) {
  return (
    <Link href={href} className="bg-white p-4 rounded shadow-lg flex items-center gap-2 hover:shadow-xl">
      <MapPin className="text-orange-400" />
      <p className="text-xl font-semibold">{label}</p>
    </Link>
  )
}
