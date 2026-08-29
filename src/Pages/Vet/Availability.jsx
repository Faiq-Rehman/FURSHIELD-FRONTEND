import { useState } from 'react';
import { Clock, Calendar, CheckCircle } from 'lucide-react';

export default function VetAvailability() {
  const [schedule, setSchedule] = useState({
    monday: { active: true, start: '09:00', end: '17:00' },
    tuesday: { active: true, start: '09:00', end: '17:00' },
    wednesday: { active: true, start: '09:00', end: '17:00' },
    thursday: { active: true, start: '09:00', end: '17:00' },
    friday: { active: true, start: '09:00', end: '13:00' },
    saturday: { active: true, start: '10:00', end: '15:00' },
    sunday: { active: false, start: '10:00', end: '14:00' }
  });
  const [saved, setSaved] = useState(false);

  const toggleDay = (day) => {
    setSchedule({
      ...schedule,
      [day]: { ...schedule[day], active: !schedule[day].active }
    });
  };

  const handleTimeChange = (day, field, val) => {
    setSchedule({
      ...schedule,
      [day]: { ...schedule[day], [field]: val }
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-4xl font-bold text-slate-900">Practice Availability</h1>
        <p className="mt-1 text-sm text-slate-500">Set working hours and consultation availability for clients.</p>
      </div>

      {saved && (
        <div role="status" className="rounded-xl bg-emerald-50 p-4 text-sm font-semibold text-emerald-800 flex items-center gap-2">
          <CheckCircle size={18} /> Working schedule saved successfully!
        </div>
      )}

      <form onSubmit={handleSave} className="rounded-3xl bg-white p-7 shadow-sm border border-slate-100 space-y-5">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
          <Clock className="text-emerald-700" size={20} />
          <h2 className="font-bold text-slate-900 text-lg">Weekly Schedule</h2>
        </div>

        <div className="space-y-3">
          {Object.keys(schedule).map((day) => {
            const info = schedule[day];
            return (
              <div key={day} className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-50">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={info.active}
                    onChange={() => toggleDay(day)}
                    className="h-4 w-4 rounded text-emerald-700 focus:ring-emerald-500"
                  />
                  <span className="font-bold text-sm text-slate-800 capitalize w-24">{day}</span>
                </div>

                {info.active ? (
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                    <input
                      type="time"
                      value={info.start}
                      onChange={(e) => handleTimeChange(day, 'start', e.target.value)}
                      className="rounded-lg border border-slate-200 bg-white px-2 py-1"
                    />
                    <span>to</span>
                    <input
                      type="time"
                      value={info.end}
                      onChange={(e) => handleTimeChange(day, 'end', e.target.value)}
                      className="rounded-lg border border-slate-200 bg-white px-2 py-1"
                    />
                  </div>
                ) : (
                  <span className="text-xs font-semibold text-slate-400 italic">Unavailable / Closed</span>
                )}
              </div>
            );
          })}
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-emerald-800 py-3 font-bold text-white hover:bg-emerald-900"
        >
          Save Schedule Settings
        </button>
      </form>
    </div>
  );
}
