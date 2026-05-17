'use client';

import { Bell } from 'lucide-react';

export default function AnnouncementsPage() {
  const announcements = [
    {
      id: 1,
      title: 'Welcome to School SMS',
      content: 'Welcome to our new School Management System. Please update your profile information.',
      priority: 'Medium',
      date: new Date().toLocaleDateString(),
    },
    {
      id: 2,
      title: 'Mid-term Examinations',
      content: 'Mid-term examinations will be conducted from March 15-20, 2024.',
      priority: 'High',
      date: new Date().toLocaleDateString(),
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
        <p className="mt-2 text-gray-600">Latest updates and notifications</p>
      </div>

      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 rounded-full p-3">
                  <Bell className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{announcement.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{announcement.content}</p>
                  <p className="mt-2 text-xs text-gray-500">{announcement.date}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(announcement.priority)}`}>
                {announcement.priority}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
