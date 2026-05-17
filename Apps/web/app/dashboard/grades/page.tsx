'use client';

import { Search, GraduationCap, Award, FileText } from 'lucide-react';

export default function GradesPage() {
  // Mock data for UI demonstration
  const mockGrades = [
    { id: 1, studentName: 'Jane Smith', studentId: 'S2024001', subject: 'Mathematics', term: 'Q1', score: 95, maxScore: 100, remarks: 'Excellent progress' },
    { id: 2, studentName: 'Michael Chen', studentId: 'S2024002', subject: 'Science', term: 'Q1', score: 88, maxScore: 100, remarks: 'Good understanding' },
    { id: 3, studentName: 'Sarah Jenkins', studentId: 'S2024003', subject: 'History', term: 'Q1', score: 92, maxScore: 100, remarks: 'Outstanding participation' },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-[#2E2C32] tracking-tight">Academic Grades</h1>
          <p className="mt-1 text-sm text-[#798A99]">Review student performance and term evaluations.</p>
        </div>
        <button className="flex items-center px-5 py-2.5 bg-[#35079A] text-white font-semibold rounded-xl hover:bg-[#280575] transition-all shadow-md shadow-indigo-200 hover:-translate-y-0.5">
          <FileText className="w-5 h-5 mr-2" />
          Publish Results
        </button>
      </div>

      <div className="mb-8 relative max-w-md">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#BAA6D8]" />
        <input
          type="text"
          placeholder="Search records..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#35079A] shadow-sm text-sm"
        />
      </div>

      <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-[#FAFAFC]">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-[#798A99] uppercase">Student</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-[#798A99] uppercase">Subject & Term</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-[#798A99] uppercase">Score</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-[#798A99] uppercase">Remarks</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-50">
            {mockGrades.map((grade) => (
              <tr key={grade.id} className="hover:bg-[#FAFAFC] transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-[#35079A] font-bold">
                      {grade.studentName.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-bold text-[#2E2C32]">{grade.studentName}</div>
                      <div className="text-xs text-[#798A99]">{grade.studentId}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-bold text-[#2E2C32]">{grade.subject}</div>
                  <div className="text-xs font-semibold text-[#35079A] bg-indigo-50 inline-block px-2 py-0.5 rounded-md mt-1">{grade.term}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-lg font-extrabold text-[#2E2C32]">{grade.score}</span>
                    <span className="text-sm text-[#798A99]">/{grade.maxScore}</span>
                    {grade.score >= 90 && <Award className="w-4 h-4 ml-2 text-orange-400" />}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-[#798A99]">{grade.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}