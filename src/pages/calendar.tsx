import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './css/calendar.css';
import { useEffect, useRef, useState } from 'react';
import interactionPlugin from '@fullcalendar/interaction';
import dayjs from 'dayjs';
import { Box } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const start = dayjs().startOf('month');
const end = dayjs().endOf('month');

const dates: string[] = [];

const JAPANESE_STAY_LIST = [
    '当日', // 1
    '1泊2日', // 2
    '2泊3日', // 3
    '3泊4日', // 4
    '4泊5日', // 5
    '5泊6日', // 6
    '6泊7日', // 7
    '7泊8日', // 8
    '8泊9日', // 9
    '9泊10日', // 10
    '10泊11日', // 11
    '11泊12日', // 12
    '12泊13日', // 13
    '13泊14日', // 14
    '14泊15日', // 15
    '15泊16日', // 16
    '16泊17日', // 17
    '17泊18日', // 18
    '18泊19日', // 19
    '19泊20日', // 20
    '20泊21日', // 21
    '21泊22日', // 22
    '22泊23日', // 23
    '23泊24日', // 24
    '24泊25日', // 25
    '25泊26日', // 26
    '26泊27日', // 27
    '27泊28日', // 28
    '28泊29日', // 29
    '29泊30日', // 30
];

function getStockClass(stock: number) {
    if (stock === 0) return 'stock-zero';
    if (stock <= 3) return 'stock-low';
    if (stock < 10) return 'stock-available';
    return 'stock-plenty';
}

let current = start;
while (current.isBefore(end) || current.isSame(end, 'day')) {
    dates.push(current.format('YYYY-MM-DD'));
    current = current.add(1, 'day');
}

const stockList = dates.map((d, i) => ({ date: d, availableStock: i > 20 ? Math.floor(Math.random() * 101) : 0 }));

function renderEventContent(eventInfo: any) {
    const stock = eventInfo.event.extendedProps.availableStock;

    return (
        <div className="text-xs font-bold">
            {stock > 0 ? (
                <p className="text-white gap-1  flex-col-reverse font-semibold min-h-10 flex items-center justify-center">
                    <Box size={12} /> {stock > 10 ? '10+' : stock}
                </p>
            ) : (
                <p className="text-white gap-1 flex-col-reverse font-semibold min-h-10 flex items-center justify-center">
                    <Box size={12} /> {0}
                </p>
            )}
        </div>
    );
}

export default function Calendar() {
    const stockEvents = stockList.map((item) => ({
        title: item.availableStock > 0 ? `在庫：${item.availableStock}` : '在庫なし',
        date: item.date,
        extendedProps: {
            availableStock: item.availableStock,
        },
    }));
    const [night, setNight] = useState('1');

    const calendarRef = useRef<FullCalendar | null>(null);

    useEffect(() => {
        const api = calendarRef.current?.getApi();
        if (!api) return;

        // ✅ default select date
        api.select('2025-12-16');
    }, []);

    return (
        <div className="p-2 max-w-sm mx-auto space-y-2">
            <Select value={night} onValueChange={setNight}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                    {JAPANESE_STAY_LIST.map((d, i) => (
                        <SelectItem key={d} value={`${i + 1}`}>
                            {d}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <FullCalendar
                validRange={{
                    start: '2025-12-01',
                    end: '2026-01-29',
                }}
                dateClick={(arg) => {
                    const startDate = dayjs(arg.dateStr).format('YYYY-MM-DD').toString();
                    const endDate =
                        night === '0'
                            ? undefined
                            : dayjs(arg.dateStr).add(Number(night), 'day').format('YYYY-MM-DD').toString();
                    calendarRef.current!.getApi().select(startDate, endDate);
                }}
                selectable={true}
                ref={calendarRef}
                showNonCurrentDates={true}
                dayCellContent={(arg) => arg.date.getDate()}
                locale="ja"
                height={'auto'}
                headerToolbar={false}
                // fixedWeekCount={false}
                // showNonCurrentDates={false}
                unselectAuto={false}
                dayMaxEventRows={1}
                // dayCellClassNames="fc-day-modern"
                // eventClassNames="fc-event-modern"
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={stockEvents}
                eventContent={renderEventContent}
                eventDidMount={(info) => {
                    info.el.classList.add(getStockClass(info.event.extendedProps.availableStock));

                    info.el.style.borderRadius = '5px';
                    info.el.style.border = 'none';
                }}
            ></FullCalendar>
        </div>
    );
}
