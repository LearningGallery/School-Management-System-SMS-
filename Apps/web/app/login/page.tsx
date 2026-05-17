'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/lib/api';
import { GraduationCap, ArrowRight, ShieldCheck, Sparkles, BookOpen, Users } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.login(email, password);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response));
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  return (
    <div className="min-h-screen flex bg-white font-sans overflow-hidden">
      
      {/* LEFT COLUMN: Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 sm:p-16 xl:p-24 relative z-10">
        {/* Soft background glow */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 opacity-60"></div>
        
        <div className="max-w-md w-full mx-auto relative z-20">
          
          {/* Brand Logo */}
          <div className="flex items-center mb-12">
            <div className="w-12 h-12 bg-gradient-to-br from-[#35079A] to-[#5327AE] rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-200 mr-4">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-extrabold text-[#2E2C32] tracking-tight">Edusync</span>
          </div>

          {/* Headers */}
          <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-4xl font-extrabold text-[#2E2C32] mb-3 tracking-tight">Welcome back.</h2>
            <p className="text-[#798A99] font-medium text-lg">Sign in to manage your campus operations and empower your students.</p>
          </div>
          
          {/* Form */}
          <form className="space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-700" onSubmit={handleSubmit}>
            {error && (
              <div className="flex items-center p-4 mb-4 text-sm text-rose-800 border border-rose-200 rounded-2xl bg-rose-50">
                <ShieldCheck className="flex-shrink-0 inline w-5 h-5 mr-3 text-rose-600" />
                <span className="font-semibold">{error}</span>
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-[#2E2C32] mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  className="w-full px-5 py-4 bg-[#FAFAFC] border border-gray-200 text-[#2E2C32] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#35079A] focus:bg-white transition-all font-medium placeholder-gray-400"
                  placeholder="name@school.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#2E2C32] mb-2 flex justify-between">
                  <span>Password</span>
                  <a href="#" className="text-[#35079A] hover:underline text-xs">Forgot password?</a>
                </label>
                <input
                  type="password"
                  required
                  className="w-full px-5 py-4 bg-[#FAFAFC] border border-gray-200 text-[#2E2C32] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#35079A] focus:bg-white transition-all font-medium placeholder-gray-400"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center items-center py-4 px-4 font-bold rounded-2xl text-white bg-[#F24416] hover:bg-[#D93D13] focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all shadow-lg shadow-orange-200 disabled:opacity-70 mt-4 overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                {loading ? 'Authenticating...' : 'Sign In to Edusync'}
                {!loading && <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />}
              </span>
            </button>
          </form>

          {/* Quick Demo Credentials */}
          <div className="mt-12 pt-8 border-t border-gray-100 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <p className="text-xs font-bold text-[#798A99] uppercase tracking-wider mb-4">Quick Demo Access</p>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => fillDemo('admin@schoolsms.com', 'Admin@123')} className="px-4 py-2 bg-indigo-50 text-[#35079A] text-xs font-bold rounded-xl hover:bg-indigo-100 transition-colors border border-indigo-100">
                Admin
              </button>
              <button onClick={() => fillDemo('teacher@schoolsms.com', 'Teacher@123')} className="px-4 py-2 bg-orange-50 text-[#F24416] text-xs font-bold rounded-xl hover:bg-orange-100 transition-colors border border-orange-100">
                Teacher
              </button>
              <button onClick={() => fillDemo('student@schoolsms.com', 'Student@123')} className="px-4 py-2 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-xl hover:bg-emerald-100 transition-colors border border-emerald-100">
                Student
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* RIGHT COLUMN: Brand Showcase (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#35079A] items-center justify-center p-12 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#5327AE] to-[#280575] rounded-full blur-[80px] translate-x-1/3 -translate-y-1/3 opacity-80"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#F24416] rounded-full blur-[120px] -translate-x-1/2 translate-y-1/3 opacity-20"></div>
        
        {/* Floating Showcase Card */}
        <div className="relative z-10 w-full max-w-lg">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-[32px] shadow-2xl">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md border border-white/30">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-4xl font-extrabold text-white mb-6 leading-tight">
              The smartest way to manage your institution.
            </h3>
            
            <div className="space-y-5">
              <div className="flex items-center text-indigo-100">
                <div className="bg-white/20 p-2 rounded-lg mr-4">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium text-lg">Centralized Student Records</span>
              </div>
              <div className="flex items-center text-indigo-100">
                <div className="bg-white/20 p-2 rounded-lg mr-4">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium text-lg">Automated Academic Tracking</span>
              </div>
              <div className="flex items-center text-indigo-100">
                <div className="bg-white/20 p-2 rounded-lg mr-4">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium text-lg">Enterprise-grade Security</span>
              </div>
            </div>

            {/* Testimonial snippet */}
            <div className="mt-12 pt-8 border-t border-white/20">
              <p className="text-white/80 italic font-medium leading-relaxed">
                "Edusync completely transformed how we handle our daily administration. Everything just works beautifully."
              </p>
              <div className="flex items-center mt-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-300 to-orange-500 mr-3"></div>
                <div>
                  <p className="text-white font-bold text-sm">Dr. Amanda Hayes</p>
                  <p className="text-indigo-200 text-xs">Principal, Horizon Academy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}