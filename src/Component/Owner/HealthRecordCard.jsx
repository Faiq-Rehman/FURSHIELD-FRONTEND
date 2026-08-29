import { FileText, Calendar, Stethoscope } from 'lucide-react';

export default function HealthRecordCard({ record, title, date, note }) {
  const recordTitle = record?.title || record?.recordType || title || 'Health Record';
  const recordDate = record?.date || record?.visitDate ? new Date(record.date || record.visitDate).toLocaleDateString() : date || 'Recent';
  const recordNote = record?.description || record?.diagnosis || record?.notes || record?.treatment || note || 'No details specified';
  const recordVet = record?.veterinarian || record?.vet?.name || record?.vet?.fullName;

  return (
    <div className="flex gap-3.5 rounded-2xl bg-white p-4 shadow-sm border border-slate-100">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
        <FileText size={19} />
      </span>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <p className="font-bold text-slate-900">{recordTitle}</p>
          <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700">
            <Calendar size={13} />
            {recordDate}
          </span>
        </div>
        <p className="mt-1 text-sm text-slate-600 leading-relaxed">{recordNote}</p>
        {recordVet && (
          <p className="mt-2 text-xs font-medium text-slate-400 flex items-center gap-1">
            <Stethoscope size={13} /> Vet: {recordVet}
          </p>
        )}
      </div>
    </div>
  );
}
