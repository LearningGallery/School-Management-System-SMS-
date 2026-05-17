'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Calendar, CheckCircle2, Clock, Plus } from 'lucide-react';
import { format } from 'date-fns';

export default function AttendancePage() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  useEffect(() => {
    loadSessions();
  }, [selectedDate]);

  const loadSessions = async () => {
    setLoading(true);
    try {
      const response = await api.get('/attendance/sessions', {
        params: { date: selectedDate }
      });
      setSessions(response.data);
    } catch (error) {
      console.error('Failed to load attendance:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-[#2E2C32] tracking-tight">Daily Attendance</h1>
          <p className="mt-1 text-sm text-[#798A99]">Track and manage student classroom attendance records.</p>
        </div>
        <button className="flex items-center px-5 py-2.5 bg-[#F24416] text-white font-semibold rounded-xl hover:bg-[#D93D13] transition-all shadow-md shadow-orange-200 hover:-translate-y-0.5">
          <Plus className="w-5 h-5 mr-2" />
          Mark Attendance
        </button>
      </div>

      {/* Controls */}
      <div className="mb-8 p-6 bg-white rounded-[24px] border border-gray-50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-indigo-50 p-3 rounded-xl">
            <Calendar className="w-6 h-6 text-[#35079A]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#2E2C32]">Filter by Date</h3>
            <p className="text-xs text-[#798A99]">Select a date to view logs</p>
          </div>
        </div>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-4 py-2.5 bg-[#FAFAFC] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#35079A] text-sm font-medium text-[#2E2C32]"
        />
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#35079A]"></div>
        </div>
      ) : sessions.length === 0 ? (
        <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 p-16 text-center">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-10 h-10 text-gray-300" />
          </div>
          <h3 className="text-lg font-bold text-[#2E2C32]">No records found</h3>
          <p className="text-[#798A99] mt-1">There are no attendance sessions logged for this date.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {sessions.map((session) => (
            <div key={session.id} className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 p-6 hover:-translate-y-1 transition-transform duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-emerald-50 rounded-xl p-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#2E2C32]">{session.subject}</h3>
                    <p className="text-xs font-semibold text-[#35079A]">{session.classroomName}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 mt-6 pt-6 border-t border-gray-50">
                <div className="flex items-center text-sm text-[#798A99]">
                  <Clock className="w-4 h-4 mr-2 text-[#BAA6D8]" />
                  {session.startTime} - {session.endTime}
                </div>
                <div className="flex items-center text-sm text-[#798A99]">
                  <div className="w-6 h-6 rounded-full bg-orange-100 text-[#F24416] flex items-center justify-center text-[10px] font-bold mr-2 border border-orange-200">
                    {session.teacherName.charAt(0)}
                  </div>
                  Prof. {session.teacherName}
                </div>
              </div>

              <div className="mt-6 bg-[#FAFAFC] p-4 rounded-xl flex items-center justify-between">
                <span className="text-xs font-bold text-[#798A99]">Present</span>
                <div className="text-right">
                  <span className="text-xl font-extrabold text-[#2E2C32]">{session.presentCount}</span>
                  <span className="text-sm font-medium text-[#BAA6D8]">/{session.totalRecords}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}