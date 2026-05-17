'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LogOut, Home, Users, BookOpen, Calendar, Bell, Settings, DollarSign } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home, roles: ['SuperAdmin', 'Admin', 'Teacher', 'Student'] },
    { name: 'Students', href: '/dashboard/students', icon: Users, roles: ['SuperAdmin', 'Admin', 'Teacher'] },
    { name: 'Classes', href: '/dashboard/classes', icon: BookOpen, roles: ['SuperAdmin', 'Admin', 'Teacher'] },
    { name: 'Attendance', href: '/dashboard/attendance', icon: Calendar, roles: ['SuperAdmin', 'Admin', 'Teacher'] },
    { name: 'Grades', href: '/dashboard/grades', icon: BookOpen, roles: ['SuperAdmin', 'Admin', 'Teacher', 'Student'] },
    { name: 'Fees', href: '/dashboard/fees', icon: DollarSign, roles: ['SuperAdmin', 'Admin', 'Student'] },
    { name: 'Announcements', href: '/dashboard/announcements', icon: Bell, roles: ['SuperAdmin', 'Admin', 'Teacher', 'Student'] },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings, roles: ['SuperAdmin', 'Admin'] },
  ];

  const filteredNavigation = navigation.filter(item => item.roles.includes(user.role));

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 border-b">
            <h1 className="text-xl font-bold text-blue-600">School SMS</h1>
          </div>

          {/* User Info */}
          <div className="p-4 border-b">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                {user.firstName.charAt(0)}{user.lastName.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {filteredNavigation.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </a>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-64">
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
