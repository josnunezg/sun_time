'use client';

import { SunriseSunsetData } from "~/lib/types";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { parse, format } from 'date-fns';
import { useMemo } from "react";

type SunChartProps = {
  data: SunriseSunsetData[]
}

function timeToMinutes(timeStr: string): number {
  if (!timeStr) return 0;

  const parsed = parse(timeStr, 'h:mm:ss a', new Date());
  return parsed.getHours() * 60 + parsed.getMinutes();
}

function minutesToTimeString(minutes: number): string {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const suffix = hrs >= 12 ? 'PM' : 'AM';
  const adjustedHour = ((hrs + 11) % 12 + 1);
  return `${adjustedHour}:${mins.toString().padStart(2, '0')} ${suffix}`;
}

export default function SunChart({ data }: SunChartProps) {
  const chartData = useMemo(() => (
    data.map(entry => {
      const firstLight = timeToMinutes(entry.first_light);
      const sunrise = timeToMinutes(entry.sunrise);
      const sunset = timeToMinutes(entry.sunset);
      const lastLight = timeToMinutes(entry.last_light);

      return {
        date: format(new Date(entry.date), 'MM-dd'),
        firstLightStart: firstLight,
        fullLight: lastLight - firstLight,
        sunriseStart: sunrise,
        daylight: sunset - sunrise,
      };
    })
  ), [data])

  console.log({ chartData })

  return (
    <div className="h-[35rem] p-20 bg-white shadow rounded">
      <p className="text-3xl mb-5">Sun Chart</p>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
        <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis
          domain={[360, 1200]}
          tickFormatter={minutesToTimeString}
          tickCount={10}
        />
        <Tooltip
          formatter={(value: number) => minutesToTimeString(value)}
          labelFormatter={(label: string) => `Fecha: ${label}`}
        />
        <Legend />

        <Area
          type="monotone"
          dataKey="fullLight"
          stackId="1"
          baseLine={0}
          stroke="#8ecae6"
          fill="#8ecae6"
          name="Total Light"
          isAnimationActive={false}
        />

        <Area
          type="monotone"
          dataKey="daylight"
          stackId="1"
          baseLine={0}
          stroke="#ffb703"
          fill="#ffb703"
          name="Direct Sun"
          isAnimationActive={false}
        />
      </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
