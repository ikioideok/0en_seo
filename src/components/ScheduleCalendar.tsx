import { useState, useMemo, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, CheckCircle2 } from 'lucide-react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

export default function ScheduleCalendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
    const [blockedDates, setBlockedDates] = useState<Set<string>>(new Set());

    // Init Socket & Fetch Data
    useEffect(() => {
        socket.emit('get_calendar_data');

        socket.on('calendar_update', (dates: string[]) => {
            setBlockedDates(new Set(dates));
        });

        return () => {
            socket.off('calendar_update');
        };
    }, []);

    // Constants
    const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'];
    const TIME_SLOTS = [
        '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'
    ];

    // Helper: Local YYYY-MM-DD
    const getLocalYYYYMMDD = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Calendar Logic
    const monthData = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        // Days from previous month to fill the first row
        const prevMonthDays = [];
        for (let i = 0; i < firstDay.getDay(); i++) {
            prevMonthDays.push(null);
        }

        // Days of current month
        const days = [];
        for (let i = 1; i <= lastDay.getDate(); i++) {
            days.push(new Date(year, month, i));
        }

        return [...prevMonthDays, ...days];
    }, [currentDate]);

    // Handlers
    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const isDateDisabled = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Disable past dates
        if (date < today) return true;

        // Disable weekends (0 = Sunday, 6 = Saturday)
        const day = date.getDay();
        if (day === 0 || day === 6) return true;

        // Check against blocked dates from server
        const dateStr = getLocalYYYYMMDD(date);
        if (blockedDates.has(dateStr)) return true;

        return false;
    };

    const handleDateClick = (date: Date | null) => {
        if (!date || isDateDisabled(date)) return;
        setSelectedDate(date);
        setSelectedTimeSlot(null); // Reset time when date changes
    };

    const handleTimeSelect = (time: string) => {
        setSelectedTimeSlot(time);
    };

    const formatDate = (date: Date) => {
        return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
    };

    const handleSubmit = () => {
        if (!selectedDate || !selectedTimeSlot) return;

        const dateStr = getLocalYYYYMMDD(selectedDate);
        const bookingData = {
            date: dateStr,
            time: selectedTimeSlot,
            customer: {
                company: 'Unknown Company (Web)',
                email: 'unknown@example.com'
            }
        };

        socket.emit('submit_booking', bookingData);
        alert(`${formatDate(selectedDate)} ${selectedTimeSlot} で日程を仮押さえしました。\n担当者からの連絡をお待ちください。`);

        // Reset selection
        setSelectedDate(null);
        setSelectedTimeSlot(null);
    };

    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-slate-200 h-full flex flex-col md:flex-row">

            {/* Date Selection (Left) */}
            <div className="p-6 md:p-8 flex-1 border-b md:border-b-0 md:border-r border-slate-200">
                <div className="flex justify-between items-center mb-6">
                    <h4 className="text-xl font-bold text-slate-800">
                        {currentDate.getFullYear()}年 {currentDate.getMonth() + 1}月
                    </h4>
                    <div className="flex gap-2">
                        <button onClick={handlePrevMonth} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600">
                            <ChevronLeft size={20} />
                        </button>
                        <button onClick={handleNextMonth} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600">
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                    {WEEKDAYS.map((day, i) => (
                        <div key={i} className={`text-center text-xs font-bold py-2 ${i === 0 ? 'text-red-400' : i === 6 ? 'text-blue-400' : 'text-slate-400'}`}>
                            {day}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                    {monthData.map((date, i) => {
                        if (!date) return <div key={`empty-${i}`} className="aspect-square" />;

                        const disabled = isDateDisabled(date);
                        const isSelected = selectedDate?.toDateString() === date.toDateString();

                        return (
                            <button
                                key={i}
                                onClick={() => handleDateClick(date)}
                                disabled={disabled}
                                className={`
                  aspect-square rounded-full flex items-center justify-center text-sm relative transition-all
                  ${isSelected ? 'bg-blue-600 text-white shadow-md scale-105' : ''}
                  ${!isSelected && !disabled ? 'hover:bg-blue-50 text-slate-700 font-medium' : ''}
                  ${disabled ? 'text-slate-300 cursor-not-allowed line-through decoration-slate-200' : ''}
                `}
                            >
                                {date.getDate()}
                            </button>
                        );
                    })}
                </div>

                <div className="mt-8 text-xs text-slate-400 text-center">
                    ※ 土日祝日は休業となっております
                </div>
            </div>

            {/* Time Selection (Right) */}
            <div className="p-6 md:p-8 md:w-[280px] bg-slate-50 flex flex-col">
                <h4 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Clock size={20} className="text-blue-500" />
                    時間はいつが良いですか？
                </h4>

                {selectedDate ? (
                    <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                        <p className="text-sm font-bold text-blue-600 mb-4 pb-2 border-b border-blue-100">
                            {formatDate(selectedDate)}
                        </p>
                        {TIME_SLOTS.map((time) => (
                            <button
                                key={time}
                                onClick={() => handleTimeSelect(time)}
                                className={`
                  w-full py-3 px-4 rounded-xl border text-sm font-bold transition-all flex justify-between items-center group
                  ${selectedTimeSlot === time
                                        ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                                        : 'bg-white border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-600'
                                    }
                `}
                            >
                                {time}
                                {selectedTimeSlot === time && <CheckCircle2 size={16} />}
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-center">
                        <p className="text-sm mb-2">左のカレンダーから<br />日付を選択してください</p>
                        <div className="w-12 h-1 bg-slate-200 rounded-full mt-2"></div>
                    </div>
                )}

                {selectedDate && selectedTimeSlot && (
                    <div className="mt-6 pt-6 border-t border-slate-200 animate-in fade-in slide-in-from-bottom-2">
                        <button
                            className="w-full bg-green-500 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-green-400 transition-colors"
                            onClick={handleSubmit}
                        >
                            この日時で確定する
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
