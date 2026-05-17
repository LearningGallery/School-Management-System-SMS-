'use client';

import { useEffect, useState } from 'react';
import { studentService, api } from '@/lib/api';
import { Plus, Search, X, UserPlus, CheckCircle2 } from 'lucide-react';

export default function StudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    gender: 'Male',
    address: '',
    phoneNumber: '',
    classroomId: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [studentsData, classesData] = await Promise.all([
        studentService.getAll(),
        api.get('/classrooms').then(res => res.data)
      ]);
      setStudents(studentsData);
      setClasses(classesData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await studentService.create({
        ...formData,
        classroomId: formData.classroomId ? parseInt(formData.classroomId) : null,
        dateOfBirth: new Date(formData.dateOfBirth).toISOString()
      });
      setIsModalOpen(false);
      setFormData({ firstName: '', lastName: '', email: '', dateOfBirth: '', gender: 'Male', address: '', phoneNumber: '', classroomId: '' });
      await fetchData(); // Refresh the table
    } catch (error) {
      console.error('Failed to create student:', error);
      alert('Failed to create student. Please check your inputs.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredStudents = students.filter(student =>
    student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && students.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#35079A]"></div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-[#2E2C32] tracking-tight">Student Directory</h1>
          <p className="mt-1 text-sm text-[#798A99]">Manage and view all enrolled student records.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-5 py-2.5 bg-[#35079A] text-white font-semibold rounded-xl hover:bg-[#280575] transition-all shadow-md shadow-indigo-200 hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Student
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#BAA6D8]" />
          <input
            type="text"
            placeholder="Search by name or student ID..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#35079A] focus:border-transparent shadow-sm text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Modernized Students Table */}
      <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-[#FAFAFC]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#798A99] uppercase tracking-wider">Student Profile</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#798A99] uppercase tracking-wider">ID Number</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#798A99] uppercase tracking-wider">Class Assigned</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#798A99] uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#798A99] uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-[#FAFAFC] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-[#35079A] font-bold border border-indigo-100">
                        {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-bold text-[#2E2C32]">{student.firstName} {student.lastName}</div>
                        <div className="text-xs text-[#798A99]">{student.gender}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#5327AE]">
                    {student.studentNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-[#2E2C32] bg-gray-100 px-3 py-1 rounded-lg">
                      {student.classroomName || 'Unassigned'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#798A99]">
                    {student.phoneNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs font-bold rounded-full items-center ${
                      student.isActive ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'
                    }`}>
                      {student.isActive && <CheckCircle2 className="w-3 h-3 mr-1" />}
                      {student.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Student Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#2E2C32]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-[#FAFAFC]">
              <div className="flex items-center">
                <div className="bg-[#35079A] p-2 rounded-xl mr-3">
                  <UserPlus className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-[#2E2C32]">Enroll New Student</h2>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-[#798A99] hover:text-[#F24416] transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#2E2C32] mb-2">First Name</label>
                  <input type="text" required value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#35079A] focus:outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#2E2C32] mb-2">Last Name</label>
                  <input type="text" required value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#35079A] focus:outline-none text-sm" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-[#2E2C32] mb-2">Email Address</label>
                  <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#35079A] focus:outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#2E2C32] mb-2">Date of Birth</label>
                  <input type="date" required value={formData.dateOfBirth} onChange={e => setFormData({...formData, dateOfBirth: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#35079A] focus:outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#2E2C32] mb-2">Gender</label>
                  <select value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#35079A] focus:outline-none text-sm">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#2E2C32] mb-2">Phone Number</label>
                  <input type="tel" required value={formData.phoneNumber} onChange={e => setFormData({...formData, phoneNumber: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#35079A] focus:outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#2E2C32] mb-2">Assign to Class</label>
                  <select value={formData.classroomId} onChange={e => setFormData({...formData, classroomId: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#35079A] focus:outline-none text-sm">
                    <option value="">Select a Class...</option>
                    {classes.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-[#2E2C32] mb-2">Residential Address</label>
                  <textarea required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#35079A] focus:outline-none text-sm" rows={2}></textarea>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-3 pt-6 border-t border-gray-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 font-semibold text-[#798A99] hover:bg-gray-100 rounded-xl transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting} className="px-6 py-2.5 bg-[#F24416] text-white font-semibold rounded-xl hover:bg-[#D93D13] shadow-md shadow-orange-200 transition-colors disabled:opacity-50 flex items-center">
                  {isSubmitting ? 'Enrolling...' : 'Confirm Enrollment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}