'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { BookOpen, Users } from 'lucide-react';

export default function ClassesPage() {
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = async () => {
    try {
      const response = await api.get('/classrooms');
      setClasses(response.data);
    } catch (error) {
      console.error('Failed to load classes:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Classes</h1>
        <p className="mt-2 text-gray-600">Manage classroom assignments and schedules</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((classroom) => (
          <div key={classroom.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-blue-100 rounded-full p-3">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                classroom.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {classroom.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{classroom.name}</h3>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center justify-between">
                <span>Grade:</span>
                <span className="font-medium">{classroom.grade}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Section:</span>
                <span className="font-medium">{classroom.section}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Teacher:</span>
                <span className="font-medium">{classroom.teacherName || 'Not assigned'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  Students:
                </span>
                <span className="font-medium">{classroom.studentCount}/{classroom.capacity}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
