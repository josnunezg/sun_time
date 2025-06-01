'use client'

import { Hourglass, MoonStar, Sun, Sunrise, Sunset } from 'lucide-react';
import { useState, ReactNode } from 'react';
import { SunriseSunsetData } from "~/lib/types"
import { formatLargeDate } from '~/lib/utils';

type CardsSunriseSunsetProps = {
  today: SunriseSunsetData,
  yesterday: SunriseSunsetData
}

function ButtonTab({ label, handleClick, isActive }: { label: string, handleClick(): void, isActive?: boolean }) {
  return (
    <button
      onClick={handleClick}
      className={`py-4 w-48 rounded ${isActive ? 'shadow bg-white' : 'text-gray-500 bg-orange-100'}`}
    >
      {label}
    </button>
  )
}

type RecordDataItem =  { icon: ReactNode, title: string, time: string, timeColor: string, iconWrapperColor: string }

function RecordDataItem({ icon, title, time, timeColor, iconWrapperColor }: RecordDataItem) {
  return (
    <div className='flex gap-2 items-center py-4'>
      <span className={`w-14 h-14 rounded-full flex justify-center items-center ${iconWrapperColor}`}>
        {icon}
      </span>
      <span>
        <p className='text-gray-400 text-sm'>{title}</p>
        <p className={`font-bold text-xl ${timeColor}`}>{time}</p>
      </span>
    </div>
  )
}



function CardSunriseSunset({ record, title }: { record: SunriseSunsetData, title: string }) {
  const dateItems: RecordDataItem[] = [
    { time: record.sunrise, icon: <Sunrise className='text-white' />, timeColor: 'text-orange-500', iconWrapperColor: 'bg-gradient-to-br from-orange-400 to-yellow-400', title: 'Sunrise' },
    { time: record.sunset, icon: <Sunset className='text-white' />, timeColor: 'text-violet-500', iconWrapperColor: 'bg-gradient-to-br from-violet-400 to-indigo-400', title: 'Sunset' },
    { time: record.first_light, icon: <Sun className='text-sky-500' />, timeColor: 'text-sky-500', iconWrapperColor: 'bg-sky-100', title: 'First Light' },
    { time: record.last_light, icon: <MoonStar className='text-indigo-500' />, timeColor: 'text-indigo-500', iconWrapperColor: 'bg-indigo-100', title: 'Last Light' },
    { time: record.dawn, icon: <Sun className='text-orange-500' />, timeColor: 'text-orange-500', iconWrapperColor: 'bg-orange-100', title: 'Dawn' },
    { time: record.dusk, icon: <MoonStar className='text-violet-500' />, timeColor: 'text-violet-500', iconWrapperColor: 'bg-violet-100', title: 'Dusk' },
    { time: record.solar_noon, icon: <Sun className='text-amber-500' />, timeColor: 'text-amber-500', iconWrapperColor: 'bg-amber-100', title: 'Solar Noon' },
    { time: record.day_length, icon: <Hourglass className='text-green-500' />, timeColor: 'text-green-500', iconWrapperColor: 'bg-green-100', title: 'Day Length' },
  ]
  return (
    <div className='bg-white shadow p-8'>
      <h3 className='text-3xl'>{title}</h3>
      <p className='text-lg text-gray-500'>{formatLargeDate(record.date)}</p>
      <div className='grid grid-cols-2'>
        {dateItems.map((item, index) => (
          <RecordDataItem {...item} key={`record-data-item-${index}`} />
        ))}
      </div>
    </div>
  )
}

export default function CardsSunriseSunset({ today, yesterday }: CardsSunriseSunsetProps) {
  const [currentTab, setCurrentTab] = useState<"today" | "yesterday">("today");

  const setTab = (tabName: "today" | "yesterday") => () => {
    setCurrentTab(tabName);
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex'>
        <ButtonTab label='Today' handleClick={setTab("today")} isActive={currentTab === "today"} />
        <ButtonTab label='Yesterday' handleClick={setTab("yesterday")} isActive={currentTab === "yesterday"}/>
      </div>
      {
        currentTab === "today" && <CardSunriseSunset record={today} title="Today's Sun Schedule"/>
      }
      {
        currentTab === "yesterday" && <CardSunriseSunset record={yesterday} title="Yesterday's Sun Schedule" />
      }
    </div>
  )
}
