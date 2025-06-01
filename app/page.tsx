import { Globe, MapPin, Search, Sun } from "lucide-react";
import Link from "next/link";
import { FormEvent } from "react";
import AppLayout from "~/components/layouts/app-layout";
import { Input } from "~/components/ui/input";
import QueryForm from "./query-form";

export default async function Home() {
  return (
    <AppLayout showHeader>
      <QueryForm />
      <div className="flex justify-center items-center gap-5 mt-5">
        <Link href='/countries' className="flex justify-center items-center bg-white rounded-lg shadow-lg p-8 gap-2 hover:shadow-xl w-2/5">
          <Globe className="text-blue-400" />
          <p className="font-semibold text-xl">Browse by Country</p>
        </Link>
      </div>
    </AppLayout>
  );
}
