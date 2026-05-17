'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users, BookOpen, Calendar, Bell, PlusCircle, FileText, TrendingUp, Clock, Download, Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Added hrefs to make these clickable routing cards!
  const stats = [
    { name: 'Total Students', value: '1,234', trend: '+12% this month', icon: Users, color: 'text-[#35079A]', bg: 'bg-indigo-50', href: '/dashboard/students' },
    { name: 'Active Classes', value: '42', trend: 'Running smoothly', icon: BookOpen, color: 'text-[#F24416]', bg: 'bg-orange-50', href: '/dashboard/classes' },
    { name: 'Attendance Today', value: '98%', trend: '+2% from yesterday', icon: Calendar, color: 'text-emerald-600', bg: 'bg-emerald-50', href: '/dashboard/attendance' },
    { name: 'New Notifications', value: '12', trend: '4 require attention', icon: Bell, color: 'text-rose-600', bg: 'bg-rose-50', href: '/dashboard/announcements' },
  ];

  const quickActions = [
    { name: 'Add New Student', icon: PlusCircle, color: 'bg-[#35079A] hover:bg-[#280575]', href: '/dashboard/students' },
    { name: 'Mark Attendance', icon: Calendar, color: 'bg-[#F24416] hover:bg-[#D93D13]', href: '/dashboard/attendance' },
    { name: 'Generate Report', icon: FileText, color: 'bg-[#2E2C32] hover:bg-black', href: '/dashboard/grades' },
  ];

  // Simulated PDF Download since backend endpoint doesn't exist yet
  const handleDownloadReport = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      alert('Weekly_Report_May_2026.pdf has been downloaded successfully!');
    }, 1500);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#35079A] to-[#5327AE]">
            Welcome back, {user?.firstName}! 👋
          </h1>
          <p className="mt-2 text-[15px] font-medium text-[#798A99]">
            Here is your daily school overview for {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}.
          </p>
        </div>
      </div>

      {/* Stats Grid - Now Fully Clickable */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <button 
              key={stat.name} 
              onClick={() => router.push(stat.href)}
              className="text-left bg-white rounded-[24px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(53,7,154,0.08)] transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-[#35079A]"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="flex items-center text-xs font-bold text-emerald-500 bg-emerald-50 px-2.5 py-1 rounded-full">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Active
                </div>
              </div>
              <h3 className="text-[#798A99] font-semibold text-sm">{stat.name}</h3>
              <p className="text-3xl font-extrabold text-[#2E2C32] mt-1">{stat.value}</p>
              <p className="text-xs font-medium text-[#BAA6D8] mt-2">{stat.trend}</p>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity Timeline */}
        <div className="lg:col-span-2 bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-[#2E2C32]">Recent Activity</h2>
            <button 
              onClick={() => router.push('/dashboard/announcements')}
              className="text-sm font-bold text-[#35079A] hover:underline focus:outline-none"
            >
              View All Announcements
            </button>
          </div>
          
          <div className="relative border-l-2 border-indigo-50 ml-3 space-y-8">
            {[
              { title: 'New student enrolled', desc: 'Sarah Jenkins was added to Grade 10-A', time: '2 hours ago', color: 'bg-[#35079A]' },
              { title: 'Attendance marked', desc: 'Grade 10-A attendance submitted by John Doe', time: '5 hours ago', color: 'bg-emerald-500' },
              { title: 'Fee payment received', desc: 'Payment of $500 received for Michael Chen', time: '1 day ago', color: 'bg-[#F24416]' },
            ].map((activity, i) => (
              <div key={i} className="relative pl-8 hover:bg-gray-50 p-2 -ml-2 rounded-xl transition-colors cursor-default">
                <div className={`absolute left-[1px] top-3 w-4 h-4 rounded-full border-4 border-white ${activity.color} shadow-sm`}></div>
                <h3 className="text-[15px] font-bold text-[#2E2C32]">{activity.title}</h3>
                <p className="text-sm font-medium text-[#798A99] mt-1">{activity.desc}</p>
                <div className="flex items-center mt-2 text-xs font-semibold text-[#BAA6D8]">
                  <Clock className="w-3 h-3 mr-1" />
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="bg-gradient-to-b from-[#FAFAFC] to-white rounded-[24px] border border-gray-100 p-8 h-fit">
          <h2 className="text-xl font-bold text-[#2E2C32] mb-6">Quick Actions</h2>
          <div className="space-y-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.name}
                  onClick={() => router.push(action.href)}
                  className={`w-full flex items-center p-4 rounded-2xl text-white transition-all duration-200 transform hover:scale-[1.02] shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#35079A] ${action.color}`}
                >
                  <div className="bg-white/20 p-2 rounded-xl mr-4">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-semibold">{action.name}</span>
                </button>
              );
            })}
          </div>
          
          {/* Download PDF Card */}
          <div className="mt-8 p-6 bg-indigo-50 rounded-2xl border border-indigo-100 text-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
              <TrendingUp className="w-6 h-6 text-[#35079A]" />
            </div>
            <h4 className="text-sm font-bold text-[#35079A]">Weekly Report Ready</h4>
            <p className="text-xs text-[#5327AE] mt-1 mb-3">Download the latest insights.</p>
            <button 
              onClick={handleDownloadReport}
              disabled={isDownloading}
              className="flex items-center justify-center w-full text-xs font-bold bg-white text-[#35079A] px-4 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-shadow disabled:opacity-70 focus:outline-none"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}