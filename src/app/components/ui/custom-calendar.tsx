"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";
import { cn } from "./utils";

interface CustomCalendarProps {
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  disabled?: (date: Date) => boolean;
  className?: string;
}

const DAYS_OF_WEEK = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTHS = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

export function CustomCalendar({
  selected,
  onSelect,
  disabled,
  className,
}: CustomCalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const startingDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const isDateDisabled = (date: Date) => {
    return disabled ? disabled(date) : false;
  };

  const isSameDay = (date1: Date, date2?: Date) => {
    if (!date2) return false;
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return isSameDay(date, today);
  };

  const handleDateClick = (day: number) => {
    const date = new Date(year, month, day);
    if (!isDateDisabled(date)) {
      onSelect?.(date);
    }
  };

  // Gerar array de dias do mês anterior (para preencher início)
  const prevMonthDays = [];
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    prevMonthDays.push(prevMonthLastDay - i);
  }

  // Gerar array de dias do mês atual
  const currentMonthDays = [];
  for (let i = 1; i <= daysInMonth; i++) {
    currentMonthDays.push(i);
  }

  // Gerar array de dias do próximo mês (para preencher final)
  const totalDays = prevMonthDays.length + currentMonthDays.length;
  const nextMonthDays = [];
  const remainingDays = 7 - (totalDays % 7);
  if (remainingDays < 7) {
    for (let i = 1; i <= remainingDays; i++) {
      nextMonthDays.push(i);
    }
  }

  return (
    <div className={cn("p-4", className)}>
      {/* Header com navegação */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          size="icon"
          onClick={previousMonth}
          className="h-7 w-7"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="text-sm font-medium capitalize">
          {MONTHS[month]} {year}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={nextMonth}
          className="h-7 w-7"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Grid do calendário */}
      <div className="grid grid-cols-7 gap-1">
        {/* Cabeçalho dos dias da semana */}
        {DAYS_OF_WEEK.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-muted-foreground py-2"
          >
            {day}
          </div>
        ))}

        {/* Dias do mês anterior (opacidade reduzida) */}
        {prevMonthDays.map((day, index) => (
          <div
            key={`prev-${index}`}
            className="text-center py-2 text-sm text-muted-foreground opacity-40"
          >
            {day}
          </div>
        ))}

        {/* Dias do mês atual */}
        {currentMonthDays.map((day) => {
          const date = new Date(year, month, day);
          const isDisabled = isDateDisabled(date);
          const isSelected = isSameDay(date, selected);
          const isTodayDate = isToday(date);

          return (
            <button
              key={day}
              onClick={() => handleDateClick(day)}
              disabled={isDisabled}
              className={cn(
                "h-9 w-full text-sm rounded-md transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                isDisabled && "opacity-50 cursor-not-allowed hover:bg-transparent",
                isSelected && "bg-primary text-primary-foreground hover:bg-primary",
                isTodayDate && !isSelected && "bg-accent font-semibold",
              )}
            >
              {day}
            </button>
          );
        })}

        {/* Dias do próximo mês (opacidade reduzida) */}
        {nextMonthDays.map((day, index) => (
          <div
            key={`next-${index}`}
            className="text-center py-2 text-sm text-muted-foreground opacity-40"
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}
