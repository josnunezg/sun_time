'use client'

import { redirect } from "next/navigation"
import { FormEvent, useMemo } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"

export default function QueryForm() {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget);
    const query = formData.get("query") as string
    const dateStart = formData.get("date_start") as string
    const dateEnd = formData.get("date_end") as string
    redirect(`/search?query=${encodeURIComponent(query)}&dateStart=${encodeURIComponent(dateStart)}&dateEnd=${encodeURIComponent(dateEnd)}`)
  }
  const today = useMemo(() => new Date().toISOString().split("T")[0], [])

  return (
    <div className="flex flex-col justify-center items-center">
      <form className="bg-white p-10 shadow rounded flex flex-col gap-2 w-2/5" onSubmit={onSubmit}>
        <p className="text-2xl">Search by Query</p>
        <div className="w-full flex flex-wrap gap-2">
          <Input name="query" className="w-full" type="text" placeholder="Search a city" required />
          <Input name="date_start" className="flex-1" type="date" required max={today} />
          <Input name="date_end" className="flex-1" type="date" required max={today} />
          <Button type="submit" className="bg-orange-500 hover:bg-orange-600 w-full">Search</Button>
        </div>
      </form>
    </div>
  )
}
