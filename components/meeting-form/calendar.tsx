"use client";

import { useCalendar, useLocale } from "react-aria";
import { useCalendarState } from "react-stately";
import { createCalendar } from "@internationalized/date";
import { CalendarProps, DateValue } from "@react-types/calendar";
import { CalendarHeader } from "./calender-header";
import { CalendarGrid } from "./calendar-grid";

export function Calendar(props: CalendarProps<DateValue> & {
  isDateUnavailable?: (date: DateValue) => boolean;
}) {
  const { locale } = useLocale();
  let state = useCalendarState({
    ...props,
    visibleDuration: { months: 1 },
    createCalendar,
    locale,
  });

  let { calendarProps, prevButtonProps, nextButtonProps, title } = useCalendar(
    props,
    state
  );

  return (
    <div {...calendarProps} className="inline-block">
      <CalendarHeader
        state={state}
        calendarProps={calendarProps}
        nextButtonProps={nextButtonProps}
        prevButtonProps={prevButtonProps}
      />

      <div className="flex gap-8">
        <CalendarGrid isDateUnavailable={props.isDateUnavailable} state={state} />
      </div>
    </div>
  );
}
