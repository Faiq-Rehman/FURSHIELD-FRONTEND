import { Bell } from 'lucide-react';
export default function Notification() { return <button className="relative rounded-xl p-2 text-slate-600 hover:bg-emerald-50" aria-label="Notifications"><Bell size={20}/><span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-amber-400"/></button>; }
