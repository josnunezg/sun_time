import { Sun } from "lucide-react"

type AppLayoutProps = {
  children: React.ReactNode,
  showHeader?: boolean,
  centeder?: boolean
}

export default function AppLayout({ children, showHeader = false, centeder = false }: AppLayoutProps) {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-orange-100 via-sky-50 to-orange-50 ${centeder && 'flex flex-col justify-center'}`}>
      <div className="px-8 py-12">
        {showHeader && (
          <header className="flex flex-col justify-center items-center gap-8">
            <div className="flex justify-center items-center gap-4">
              <Sun className="h-12 w-12 text-orange-400" />
              <h1 className="text-6xl font-extrabold">SunTime</h1>
            </div>
            <div>
              <p className="text-2xl text-gray-700">Discover sunrise and sunset times for any city around the world</p>
            </div>
          </header>
        )}
        <main className="mt-8">
          {children}
        </main>
      </div>
    </div>
  )
}
