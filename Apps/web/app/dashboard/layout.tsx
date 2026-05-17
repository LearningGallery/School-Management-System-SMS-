'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LogOut, Home, Users, BookOpen, Calendar, Bell, Settings, DollarSign, GraduationCap } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      router.push('/login');
      return;
    }

    setUser(JSON.parse(userData));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFC]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#35079A]"></div>
      </div>
    );
  }

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home, roles: ['SuperAdmin', 'Admin', 'Teacher', 'Student'] },
    { name: 'Students', href: '/dashboard/students', icon: Users, roles: ['SuperAdmin', 'Admin', 'Teacher'] },
    { name: 'Classes', href: '/dashboard/classes', icon: BookOpen, roles: ['SuperAdmin', 'Admin', 'Teacher'] },
    { name: 'Attendance', href: '/dashboard/attendance', icon: Calendar, roles: ['SuperAdmin', 'Admin', 'Teacher'] },
    { name: 'Grades', href: '/dashboard/grades', icon: GraduationCap, roles: ['SuperAdmin', 'Admin', 'Teacher', 'Student'] },
    { name: 'Fees', href: '/dashboard/fees', icon: DollarSign, roles: ['SuperAdmin', 'Admin', 'Student'] },
    { name: 'Announcements', href: '/dashboard/announcements', icon: Bell, roles: ['SuperAdmin', 'Admin', 'Teacher', 'Student'] },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings, roles: ['SuperAdmin', 'Admin'] },
  ];

  const filteredNavigation = navigation.filter(item => item.roles.includes(user.role));

  return (
    <div className="min-h-screen bg-[#FAFAFC] font-sans">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-72 bg-white border-r border-gray-100 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <button 
            onClick={() => router.push('/dashboard')} 
            className="flex items-center px-8 h-24 w-full text-left cursor-pointer hover:opacity-80 transition-opacity focus:outline-none"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[#35079A] to-[#5327AE] rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 mr-3 shrink-0">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-[#2E2C32] tracking-tight">Edusync</h1>
          </button>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-2 overflow-y-auto mt-4">
            {filteredNavigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3.5 text-sm font-semibold rounded-2xl transition-all duration-200 ${
                    isActive 
                      ? 'bg-[#35079A] text-white shadow-md shadow-indigo-200 translate-x-1' 
                      : 'text-[#798A99] hover:bg-indigo-50 hover:text-[#35079A] hover:translate-x-1'
                  }`}
                >
                  <Icon className={`w-5 h-5 mr-4 ${isActive ? 'text-white' : 'text-[#BAA6D8]'}`} />
                  {item.name}
                </a>
              );
            })}
          </nav>

          {/* User Info & Logout */}
          <div className="p-4 m-4 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-[#F24416] flex items-center justify-center text-white font-bold shadow-md">
                {user.firstName.charAt(0)}{user.lastName.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[#2E2C32] truncate">{user.firstName} {user.lastName}</p>
                <p className="text-xs font-medium text-[#798A99] truncate">{user.role}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-bold text-[#F24416] bg-white rounded-xl border border-orange-100 hover:bg-orange-50 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-72">
        <main className="p-10 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}