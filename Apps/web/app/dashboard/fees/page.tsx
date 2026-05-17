'use client';

import { DollarSign, Search, Receipt, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function FeesPage() {
  // Mock data for UI demonstration
  const mockFees = [
    { id: 1, studentName: 'Jane Smith', studentId: 'S2024001', feeType: 'Tuition (Term 1)', amount: 1200.00, status: 'Paid', dueDate: '2024-03-01' },
    { id: 2, studentName: 'Michael Chen', studentId: 'S2024002', feeType: 'Tuition (Term 1)', amount: 1200.00, status: 'Pending', dueDate: '2024-03-01' },
    { id: 3, studentName: 'Sarah Jenkins', studentId: 'S2024003', feeType: 'Transport Fee', amount: 350.00, status: 'Overdue', dueDate: '2024-02-15' },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-[#2E2C32] tracking-tight">Fee Management</h1>
          <p className="mt-1 text-sm text-[#798A99]">Track payments, invoices, and outstanding balances.</p>
        </div>
        <button className="flex items-center px-5 py-2.5 bg-[#F24416] text-white font-semibold rounded-xl hover:bg-[#D93D13] transition-all shadow-md shadow-orange-200 hover:-translate-y-0.5">
          <Receipt className="w-5 h-5 mr-2" />
          Generate Invoice
        </button>
      </div>

      <div className="mb-8 relative max-w-md">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#BAA6D8]" />
        <input
          type="text"
          placeholder="Search invoices or students..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#F24416] shadow-sm text-sm"
        />
      </div>

      <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-[#FAFAFC]">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-[#798A99] uppercase">Student</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-[#798A99] uppercase">Fee Description</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-[#798A99] uppercase">Amount</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-[#798A99] uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-50">
            {mockFees.map((fee) => (
              <tr key={fee.id} className="hover:bg-[#FAFAFC] transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-[#F24416] font-bold">
                      {fee.studentName.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-bold text-[#2E2C32]">{fee.studentName}</div>
                      <div className="text-xs text-[#798A99]">{fee.studentId}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-[#2E2C32]">
                  {fee.feeType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-extrabold text-[#2E2C32]">
                  ${fee.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs font-bold rounded-full items-center ${
                    fee.status === 'Paid' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 
                    fee.status === 'Pending' ? 'bg-amber-50 text-amber-600 border border-amber-100' : 
                    'bg-rose-50 text-rose-600 border border-rose-100'
                  }`}>
                    {fee.status === 'Paid' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                    {fee.status === 'Overdue' && <AlertCircle className="w-3 h-3 mr-1" />}
                    {fee.status}
                  </span>
                  <div className="text-[11px] text-[#798A99] mt-1 ml-1">Due: {fee.dueDate}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}