"use client";

import React, { useState, useEffect, useRef } from "react";
import { AgendaEvent } from "@/lib/cms-store";
import { CaretLeft, CaretRight, MapPinLine } from "@phosphor-icons/react";
import gsap from "gsap";

export default function CalendarView({ events }: { events: AgendaEvent[] }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<AgendaEvent | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (calendarRef.current) {
      gsap.fromTo(
        ".calendar-day",
        { opacity: 0, scale: 0.9, y: 10 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, stagger: 0.01, ease: "power2.out" }
      );
    }
  }, [currentDate]);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getEventsForDay = (day: number) => {
    const dateStringStr = `${day.toString().padStart(2, "0")} ${monthNames[currentDate.getMonth()].toUpperCase()} ${currentDate.getFullYear()}`;
    // simple matching, assuming event date string is like "20 AGUSTUS 2026"
    return events.filter(e => e.date.includes(dateStringStr) || e.date.includes(day.toString() + " " + monthNames[currentDate.getMonth()].toUpperCase()));
  };

  return (
    <div className="w-full max-w-6xl mx-auto" ref={calendarRef}>
      <div className="bg-white/80 backdrop-blur-2xl rounded-[3rem] border border-zinc-200 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between p-8 md:p-12 border-b border-zinc-100 relative overflow-hidden bg-zinc-50/50">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#a0f4c8]/30 blur-[80px] rounded-full pointer-events-none" />
          
          <h2 className="text-4xl md:text-6xl font-heading font-black text-[#012d1d] flex items-center gap-4 relative z-10 mb-6 md:mb-0">
            {monthNames[currentDate.getMonth()]} 
            <span className="text-[#0e6c4a]">
              {currentDate.getFullYear()}
            </span>
          </h2>
          
          <div className="flex gap-3 relative z-10">
            <button
              onClick={prevMonth}
              className="w-14 h-14 rounded-full bg-white hover:bg-[#012d1d] hover:text-white text-[#012d1d] flex items-center justify-center transition-all duration-300 border border-zinc-200 shadow-sm hover:scale-110"
            >
              <CaretLeft size={24} weight="bold" />
            </button>
            <button
              onClick={nextMonth}
              className="w-14 h-14 rounded-full bg-white hover:bg-[#012d1d] hover:text-white text-[#012d1d] flex items-center justify-center transition-all duration-300 border border-zinc-200 shadow-sm hover:scale-110"
            >
              <CaretRight size={24} weight="bold" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="p-8 md:p-12">
          <div className="grid grid-cols-7 gap-2 md:gap-6 mb-8">
            {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((day, i) => (
              <div key={day} className={`text-center font-mono font-bold uppercase tracking-[0.2em] text-xs md:text-sm ${i === 0 || i === 6 ? 'text-red-500' : 'text-zinc-400'}`}>
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2 md:gap-6">
            {/* Empty slots for start of month */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square rounded-3xl bg-zinc-50 opacity-50" />
            ))}

            {/* Days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dayEvents = getEventsForDay(day);
              const hasEvent = dayEvents.length > 0;
              const isToday = 
                new Date().getDate() === day &&
                new Date().getMonth() === currentDate.getMonth() &&
                new Date().getFullYear() === currentDate.getFullYear();

              return (
                <div
                  key={day}
                  onClick={() => hasEvent && setSelectedEvent(dayEvents[0])}
                  className={`calendar-day aspect-square rounded-[2rem] p-4 flex flex-col justify-between transition-all duration-300 group ${
                    hasEvent 
                      ? "bg-[#eafaf1] hover:bg-[#a0f4c8] cursor-pointer shadow-sm hover:shadow-xl hover:scale-105 hover:-translate-y-2 border border-[#a0f4c8]/50" 
                      : "bg-white hover:bg-zinc-50 border border-zinc-100"
                  } ${isToday ? "ring-2 ring-[#0e6c4a] ring-offset-4 ring-offset-white" : ""}`}
                >
                  <span className={`text-2xl md:text-4xl font-heading font-black transition-colors ${
                    hasEvent ? 'text-[#0e6c4a] group-hover:text-[#012d1d]' : 'text-zinc-300'
                  }`}>
                    {day}
                  </span>
                  
                  {hasEvent && (
                    <div className="mt-auto flex justify-end">
                      <div className="w-3 h-3 rounded-full bg-[#0e6c4a] group-hover:bg-[#012d1d] shadow-[0_0_10px_rgba(14,108,74,0.3)] transition-colors" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-xl" onClick={() => setSelectedEvent(null)}>
          <div 
            className="bg-white rounded-[3rem] p-10 max-w-lg w-full shadow-2xl relative border border-zinc-200 overflow-hidden transform transition-all"
            onClick={e => e.stopPropagation()}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#a0f4c8]/20 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="relative z-10">
              <div className="inline-block text-xs font-bold font-mono px-4 py-2 bg-[#a0f4c8] text-[#012d1d] rounded-full mb-6 tracking-widest uppercase shadow-sm">
                {selectedEvent.date}
              </div>
              
              <h3 className="text-4xl font-heading font-black text-[#012d1d] mb-4 leading-tight">
                {selectedEvent.title}
              </h3>
              
              <p className="text-[#414844] text-lg mb-8 leading-relaxed font-sans">
                {selectedEvent.desc}
              </p>
              
              <div className="flex items-center gap-4 text-[#012d1d] p-6 rounded-3xl bg-zinc-50 border border-zinc-200">
                <div className="w-12 h-12 rounded-full bg-[#a0f4c8]/30 flex items-center justify-center text-[#0e6c4a]">
                  <MapPinLine size={24} weight="bold" />
                </div>
                <span className="font-semibold text-lg">{selectedEvent.location}</span>
              </div>
              
              <button 
                onClick={() => setSelectedEvent(null)}
                className="mt-10 w-full bg-[#012d1d] text-white hover:bg-[#0e6c4a] font-black text-lg py-4 rounded-2xl transition-colors shadow-xl"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
