'use client';

import { useState, useEffect } from 'react';
import { User, Bell, Lock, Save, Shield } from 'lucide-react';

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-[#2E2C32] tracking-tight">System Settings</h1>
        <p className="mt-1 text-sm text-[#798A99]">Manage your account preferences and security settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Settings Navigation Sidebar */}
        <div className="md:col-span-1 space-y-2">
          <button className="w-full flex items-center px-4 py-3 bg-[#35079A] text-white rounded-2xl font-bold shadow-md shadow-indigo-200 transition-all">
            <User className="w-5 h-5 mr-3" />
            My Profile
          </button>
          <button className="w-full flex items-center px-4 py-3 text-[#798A99] hover:bg-white hover:text-[#35079A] rounded-2xl font-semibold transition-all">
            <Bell className="w-5 h-5 mr-3" />
            Notifications
          </button>
          <button className="w-full flex items-center px-4 py-3 text-[#798A99] hover:bg-white hover:text-[#35079A] rounded-2xl font-semibold transition-all">
            <Lock className="w-5 h-5 mr-3" />
            Security & Password
          </button>
        </div>

        {/* Settings Content Area */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Profile Card */}
          <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between bg-[#FAFAFC]">
              <h2 className="text-lg font-bold text-[#2E2C32]">Profile Information</h2>
              <span className="px-3 py-1 bg-indigo-50 text-[#35079A] text-xs font-bold rounded-full">
                {user?.role || 'User'}
              </span>
            </div>
            
            <div className="p-8">
              <div className="flex items-center mb-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-orange-400 to-[#F24416] flex items-center justify-center text-white text-2xl font-bold shadow-md">
                  {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                </div>
                <div className="ml-6">
                  <button className="px-4 py-2 bg-indigo-50 text-[#35079A] text-sm font-bold rounded-xl hover:bg-indigo-100 transition-colors">
                    Upload New Avatar
                  </button>
                  <p className="text-xs text-[#798A99] mt-2">JPG, GIF or PNG. Max size of 2MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#2E2C32] mb-2">First Name</label>
                  <input type="text" defaultValue={user?.firstName} className="w-full px-4 py-2.5 bg-[#FAFAFC] border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#35079A] focus:outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#2E2C32] mb-2">Last Name</label>
                  <input type="text" defaultValue={user?.lastName} className="w-full px-4 py-2.5 bg-[#FAFAFC] border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#35079A] focus:outline-none text-sm" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-[#2E2C32] mb-2">Email Address</label>
                  <input type="email" defaultValue={user?.email} className="w-full px-4 py-2.5 bg-[#FAFAFC] border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#35079A] focus:outline-none text-sm" />
                </div>
              </div>
            </div>
          </div>

          {/* Save Action */}
          <div className="flex justify-end">
            <button className="flex items-center px-6 py-3 bg-[#F24416] text-white font-semibold rounded-xl hover:bg-[#D93D13] shadow-md shadow-orange-200 transition-all hover:-translate-y-0.5">
              <Save className="w-5 h-5 mr-2" />
              Save Changes
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}