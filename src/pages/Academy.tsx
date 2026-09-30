import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Award, 
  Phone, 
  BookOpen, 
  Sparkles, 
  Users, 
  ArrowRight,
  ShieldCheck,
  Check,
  Send
} from 'lucide-react';
import { AcademyCourse } from '../types';
import { api } from '../lib/api';
import { buildGeneralWhatsAppUrl } from '../lib/whatsapp';
import { APP_IMAGES } from '../assets/images';
import { useTheme } from '../context/ThemeContext';

interface AcademyProps {
  onNavigate: (page: string, param?: string) => void;
}

export const Academy: React.FC<AcademyProps> = ({ onNavigate }) => {
  const { isDark } = useTheme();
  const [courses, setCourses] = useState<AcademyCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<AcademyCourse | null>(null);
  
  // Enrollment form state
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [comments, setComments] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    setLoading(true);
    try {
      const data = await api.getAcademyCourses();
      setCourses(data);
    } catch (err) {
      console.error('Failed to load courses', err);
    } finally {
      setLoading(false);
    }
  };

  const openEnrollModal = (course: AcademyCourse) => {
    setSelectedCourse(course);
    setSubmitSuccess(null);
    setSubmitError(null);
    setEnrollModalOpen(true);
  };

  const handleEnrollSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !studentPhone.trim() || !selectedCourse) {
      setSubmitError('Please enter your name and phone number.');
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await api.enrollAcademyCourse({
        courseId: selectedCourse.id,
        courseTitle: selectedCourse.title,
        studentName: studentName.trim(),
        studentPhone: studentPhone.trim(),
        studentEmail: studentEmail.trim() || undefined,
        comments: comments.trim() || undefined
      });

      setSubmitSuccess(res.message);
      // Refresh course list to update enrolled count
      loadCourses();
      // Clear form after 3s
      setTimeout(() => {
        setStudentName('');
        setStudentPhone('');
        setStudentEmail('');
        setComments('');
      }, 1000);
    } catch (err: any) {
      setSubmitError(err.message || 'Failed to submit enrollment. Please try again or message on WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`space-y-16 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 transition-colors duration-200 ${
      isDark ? 'text-slate-100' : 'text-slate-800'
    }`}>
      {/* 1. Header Banner with Enlarged Academy Artwork & Flex Box */}
      <section className={`relative rounded-3xl border p-8 sm:p-12 overflow-hidden transition-all ${
        isDark 
          ? 'bg-[#090b22]/95 border-purple-900/40 shadow-2xl shadow-purple-950/40' 
          : 'bg-white border-slate-200 shadow-xl shadow-slate-200/60'
      }`}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/15 blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border ${
              isDark 
                ? 'bg-purple-950/70 border-purple-500/40 text-purple-300' 
                : 'bg-purple-50 border-purple-200 text-purple-700'
            }`}>
              <GraduationCap className="w-4 h-4 text-purple-500" />
              <span>PETZEUSTECH IT Academy • Cameroon & Online</span>
            </div>

            <h1 className={`text-4xl sm:text-5xl font-black font-display tracking-tight leading-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Practical Tech Skills for <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-500">Africa's Future</span>.
            </h1>

            <p className={`text-base sm:text-lg max-w-2xl leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Hands-on, mentor-guided cohorts in software development, web engineering, cloud servers, smartphone maintenance, and graphic branding. No fluff, no endless theory — build real projects from day one.
            </p>

            <div className={`flex flex-wrap items-center gap-6 pt-2 text-xs font-medium ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Physical & Online Batches</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Real Capstone Projects</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Direct Mentorship from Petuel</span>
              </div>
            </div>
          </div>

          {/* Enlarged Academy Visual Showcase with Shadow */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border-2 border-purple-500/50 shadow-2xl shadow-purple-950/60 group">
              <img
                src={APP_IMAGES.itAcademy}
                alt="PETZEUSTECH IT Academy Classroom & Code Mentorship"
                referrerPolicy="no-referrer"
                className="w-full h-64 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <div>
                  <p className="text-xs font-bold text-purple-300 uppercase tracking-wide">Next Cohort Starting Soon</p>
                  <p className="text-xs text-slate-200">Limited Seats Per Class for Maximum Attention</p>
                </div>
                <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-emerald-500/90 text-white shadow-md">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Course Catalog */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-left">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-500">
              Curriculum & Programs
            </span>
            <h2 className={`text-3xl font-black mt-1 font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Featured Academy Programs
            </h2>
            <p className={`text-sm mt-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Select a program to review the syllabus, duration, and reserve your place.
            </p>
          </div>

          <a
            href={buildGeneralWhatsAppUrl('Academy Inquiry')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md flex-shrink-0"
          >
            <Phone className="w-4 h-4" />
            <span>Speak to Academy Advisor</span>
          </a>
        </div>

        {loading ? (
          <div className="py-20 text-center text-purple-400">
            <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm">Loading Academy curriculum...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className={`rounded-3xl border p-6 transition-all flex flex-col justify-between text-left group ${
                  isDark 
                    ? 'bg-[#0b0c24]/90 border-purple-900/40 shadow-xl shadow-purple-950/30 hover:border-purple-500/60 hover:shadow-2xl hover:shadow-purple-900/30' 
                    : 'bg-white border-slate-200 shadow-md shadow-slate-200/50 hover:border-purple-300 hover:shadow-lg'
                }`}
              >
                <div>
                  {/* Category & Status */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-xl text-xs font-bold border ${
                      isDark 
                        ? 'bg-purple-950/70 text-purple-300 border-purple-500/30' 
                        : 'bg-purple-50 text-purple-700 border-purple-200'
                    }`}>
                      {course.category}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                      isDark 
                        ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30' 
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}>
                      {course.status}
                    </span>
                  </div>

                  {/* Course Title */}
                  <h3 className={`text-xl font-bold font-display group-hover:text-purple-500 transition-colors ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    {course.title}
                  </h3>

                  <p className={`text-xs leading-relaxed my-3 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {course.description}
                  </p>

                  {/* Key Metadata Flex Box */}
                  <div className={`grid grid-cols-2 gap-2.5 py-3 border-y my-3 text-xs ${
                    isDark 
                      ? 'border-purple-900/30 text-slate-300' 
                      : 'border-slate-200 text-slate-600'
                  }`}>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-purple-500" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{course.enrolledStudents} enrolled</span>
                    </div>
                    <div className={`flex items-center gap-1.5 col-span-2 font-semibold ${
                      isDark ? 'text-purple-300' : 'text-purple-700'
                    }`}>
                      <Award className="w-3.5 h-3.5 text-cyan-500" />
                      <span>Tuition: {course.priceHint}</span>
                    </div>
                  </div>

                  {/* Syllabus Modules */}
                  {course.syllabus && course.syllabus.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <p className={`text-[11px] font-bold uppercase tracking-wider ${
                        isDark ? 'text-purple-400' : 'text-purple-700'
                      }`}>
                        What You Will Learn:
                      </p>
                      <ul className={`space-y-1 text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        {course.syllabus.slice(0, 4).map((mod, mIdx) => (
                          <li key={mIdx} className="flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span className="truncate">{mod}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className={`pt-6 mt-4 border-t flex items-center gap-3 ${
                  isDark ? 'border-purple-900/30' : 'border-slate-200'
                }`}>
                  <button
                    onClick={() => openEnrollModal(course)}
                    className="flex-1 py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all shadow-md shadow-purple-950/40 text-center"
                  >
                    Enroll / Reserve Seat
                  </button>

                  <a
                    href={buildGeneralWhatsAppUrl(`Course Inquiry: ${course.title}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2.5 rounded-xl border transition-all ${
                      isDark 
                        ? 'bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white border-emerald-500/40' 
                        : 'bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border-emerald-200'
                    }`}
                    title="WhatsApp Questions"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 3. Enrollment Modal */}
      {enrollModalOpen && selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className={`border rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl text-left relative overflow-hidden transition-all ${
            isDark 
              ? 'bg-[#0b0d28] border-purple-500/50 text-slate-100 shadow-purple-950/80' 
              : 'bg-white border-slate-200 text-slate-800 shadow-slate-300'
          }`}>
            <div className={`flex items-center justify-between pb-4 border-b ${
              isDark ? 'border-purple-900/40' : 'border-slate-200'
            }`}>
              <div>
                <span className={`text-xs font-bold uppercase ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>Academy Admission</span>
                <h3 className={`text-xl font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>{selectedCourse.title}</h3>
              </div>
              <button
                onClick={() => setEnrollModalOpen(false)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  isDark ? 'bg-purple-900/40 text-purple-300 hover:text-white' : 'bg-slate-100 text-slate-500 hover:text-slate-900'
                }`}
              >
                ✕
              </button>
            </div>

            {submitSuccess ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Enrollment Registered!</h4>
                <p className={`text-xs max-w-sm mx-auto leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {submitSuccess}
                </p>
                <div className="pt-3">
                  <button
                    onClick={() => setEnrollModalOpen(false)}
                    className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md shadow-purple-900/30"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleEnrollSubmit} className="space-y-4 pt-4">
                {submitError && (
                  <div className={`p-3 rounded-xl border text-xs ${
                    isDark ? 'bg-rose-950/60 border-rose-500/40 text-rose-300' : 'bg-rose-50 border-rose-200 text-rose-800'
                  }`}>
                    {submitError}
                  </div>
                )}

                <div>
                  <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-purple-200' : 'text-slate-700'}`}>
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="e.g. John Fonkem"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 border ${
                      isDark 
                        ? 'bg-[#070817] border-purple-900/50 text-white placeholder:text-slate-500' 
                        : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-purple-200' : 'text-slate-700'}`}>
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={studentPhone}
                      onChange={(e) => setStudentPhone(e.target.value)}
                      placeholder="+237 6xx xxx xxx"
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 border ${
                        isDark 
                          ? 'bg-[#070817] border-purple-900/50 text-white placeholder:text-slate-500' 
                          : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-purple-200' : 'text-slate-700'}`}>
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      placeholder="john@example.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 border ${
                        isDark 
                          ? 'bg-[#070817] border-purple-900/50 text-white placeholder:text-slate-500' 
                          : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-purple-200' : 'text-slate-700'}`}>
                    Comments / Prior Experience
                  </label>
                  <textarea
                    rows={2}
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Tell us what you would like to achieve or any questions..."
                    className={`w-full px-3.5 py-2 rounded-xl text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 border ${
                      isDark 
                        ? 'bg-[#070817] border-purple-900/50 text-white placeholder:text-slate-500' 
                        : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
                    }`}
                  />
                </div>

                <div className={`p-3 rounded-xl border text-[11px] ${
                  isDark 
                    ? 'bg-purple-950/40 border-purple-900/40 text-slate-300' 
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}>
                  <p>
                    <strong>Tuition:</strong> {selectedCourse.priceHint} • <strong>Duration:</strong> {selectedCourse.duration}
                  </p>
                  <p className={`mt-0.5 ${isDark ? 'text-purple-300/80' : 'text-purple-700'}`}>
                    Submitting this form connects you directly with our Admissions desk on WhatsApp.
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEnrollModalOpen(false)}
                    className={`px-4 py-2.5 rounded-xl border text-xs font-semibold transition-colors ${
                      isDark 
                        ? 'border-purple-900/40 text-slate-300 hover:bg-purple-950/50' 
                        : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-md disabled:opacity-50 flex items-center gap-1.5"
                  >
                    {submitting ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Confirm Enrollment</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
