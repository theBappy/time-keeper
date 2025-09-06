"use client";

import { useEffect, useState } from "react";
import { Calendar } from "./calendar";
import { today, getLocalTimeZone, parseDate, CalendarDate } from "@internationalized/date";
import { DateValue } from "@react-types/calendar";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  scheduled: {
    day: string;
    isActive: boolean;
  }[];
}

export function RenderCalendar({ scheduled }: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [date, setDate] = useState(() => {
    const dateParam = searchParams.get('date')
    return dateParam ? parseDate(dateParam) : today(getLocalTimeZone())
  }) 

  useEffect(() => {
    const dateParam = searchParams.get("data")
    if(dateParam){
      setDate(parseDate(dateParam))
    }
  }, [searchParams])

  const handleDateChange = (date:DateValue) => {
    setDate(date as CalendarDate)
    const url = new URL(window.location.href)
    url.searchParams.set("date", date.toString());

    router.push(url.toString())
  }

  const isDateUnavailable = (date: DateValue) => {
    const dayOfWeek = date.toDate(getLocalTimeZone()).getDay();

    const adjustedIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    return !scheduled[adjustedIndex].isActive;
  };

  return <Calendar minValue={today(getLocalTimeZone())} isDateUnavailable={isDateUnavailable} 
  value={date}
  onChange={handleDateChange}
  />;
}
