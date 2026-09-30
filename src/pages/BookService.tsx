import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  User as UserIcon, 
  MessageSquare, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  ExternalLink,
  Copy,
  AlertCircle
} from 'lucide-react';
import { DEPARTMENTS, COMPANY_INFO } from '../data/companyData';
import { buildBookingWhatsAppUrl, generateBookingReference } from '../lib/whatsapp';
import { api } from '../lib/api';
import { User, Booking } from '../types';
import { APP_IMAGES } from '../assets/images';
import { useTheme } from '../context/ThemeContext';

interface BookServiceProps {
  initialSelection?: string;
  currentUser: User | null;
  onNavigate: (page: string, param?: string) => void;
}

export const BookService: React.FC<BookServiceProps> = ({ 
  initialSelection, 
  currentUser,
  onNavigate 
}) => {
  const { isDark } = useTheme();
  // Form State
  const [fullName, setFullName] = useState(currentUser?.fullName || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [selectedDept, setSelectedDept] = useState<string>(DEPARTMENTS[0].name);
  const [selectedService, setSelectedService] = useState<string>(DEPARTMENTS[0].services[0].name);
  const [problemDescription, setProblemDescription] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('Morning (09:00 AM - 12:00 PM)');
  const [locationTown, setLocationTown] = useState('Cameroon');
  const [budgetRange, setBudgetRange] = useState('');
  const [heardAbout, setHeardAbout] = useState('WhatsApp Status');
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);
  const [copied, setCopied] = useState(false);

  // Pre-fill if navigated with initialSelection
  useEffect(() => {
    if (initialSelection) {
      if (initialSelection.includes(' - ')) {
        const [deptPart, servPart] = initialSelection.split(' - ');
        const foundDept = DEPARTMENTS.find(d => d.name.toLowerCase().includes(deptPart.toLowerCase()));
        if (foundDept) {
          setSelectedDept(foundDept.name);
          const foundServ = foundDept.services.find(s => s.name.toLowerCase().includes(servPart.toLowerCase()));
          if (foundServ) {
            setSelectedService(foundServ.name);
          }
        }
      } else {
        const foundDept = DEPARTMENTS.find(d => d.name.toLowerCase().includes(initialSelection.toLowerCase()));
        if (foundDept) {
          setSelectedDept(foundDept.name);
          setSelectedService(foundDept.services[0]?.name || '');
        }
      }
    }
  }, [initialSelection]);

  // Sync available services when department changes
  const currentDeptObj = DEPARTMENTS.find(d => d.name === selectedDept) || DEPARTMENTS[0];

  const handleDeptChange = (deptName: string) => {
    setSelectedDept(deptName);
    const deptObj = DEPARTMENTS.find(d => d.name === deptName);
    if (deptObj && deptObj.services.length > 0) {
      setSelectedService(deptObj.services[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!agreeTerms) {
      setSubmitError('Please accept the service agreement to continue.');
      return;
    }

    if (!fullName || !email || !phone || !problemDescription || !preferredDate) {
      setSubmitError('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);
    const refCode = generateBookingReference();

    try {
      const newBooking = await api.createBooking({
        bookingReference: refCode,
        userId: currentUser?.id,
        customerName: fullName,
        customerEmail: email,
        customerPhone: phone,
        departmentName: selectedDept,
        serviceName: selectedService,
        problemDescription,
        preferredDate,
        preferredTime,
        locationTown,
        budgetRange: budgetRange || 'Standard Consultation',
        heardAbout,
      });

      setCreatedBooking(newBooking);
    } catch (err: any) {
      setSubmitError(err.message || 'Failed to submit booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyRef = () => {
    if (createdBooking) {
      navigator.clipboard.writeText(createdBooking.bookingReference);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-left transition-colors duration-200 ${
      isDark ? 'text-slate-100' : 'text-slate-800'
    }`}>
      
      {/* If Booking was created successfully */}
      {createdBooking ? (
        <div className={`rounded-3xl p-8 sm:p-12 border shadow-2xl space-y-8 animate-in fade-in zoom-in-95 duration-200 ${
          isDark 
            ? 'bg-[#0b0c24]/95 border-purple-900/50 shadow-purple-950/50' 
            : 'bg-white border-slate-200 shadow-slate-300'
        }`}>
          <div className="text-center max-w-lg mx-auto space-y-3">
            <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center mx-auto shadow-lg ${
              isDark 
                ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-400 shadow-emerald-950/40' 
                : 'bg-emerald-50 border-emerald-300 text-emerald-600 shadow-emerald-100'
            }`}>
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h2 className={`text-3xl font-black font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Booking Received Successfully!
            </h2>
            <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Your service request has been logged in our system. Your official booking reference is:
            </p>

            {/* Reference Badge */}
            <div className={`inline-flex items-center gap-3 px-5 py-3 rounded-2xl border font-mono font-bold text-lg sm:text-xl shadow-lg ${
              isDark 
                ? 'bg-[#111333] border-purple-500/40 text-purple-300' 
                : 'bg-purple-50 border-purple-300 text-purple-800'
            }`}>
              <span>{createdBooking.bookingReference}</span>
              <button 
                onClick={handleCopyRef}
                className={`p-1.5 rounded-xl transition-colors ${
                  isDark ? 'hover:bg-purple-900/40 text-purple-300' : 'hover:bg-purple-200 text-purple-700'
                }`}
                title="Copy reference code"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            {copied && <p className="text-xs text-emerald-500 font-semibold">Reference code copied!</p>}
          </div>

          {/* Booking Summary Box */}
          <div className={`rounded-2xl p-6 border space-y-3 text-xs sm:text-sm ${
            isDark 
              ? 'bg-[#08091a] border-purple-900/40 text-slate-300' 
              : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}>
            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3 border-b ${
              isDark ? 'border-purple-900/40' : 'border-slate-200'
            }`}>
              <div>
                <span className={`block text-xs ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>Customer Name</span>
                <strong className={isDark ? 'text-white' : 'text-slate-900'}>{createdBooking.customerName}</strong>
              </div>
              <div>
                <span className={`block text-xs ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>Service</span>
                <strong className={isDark ? 'text-white' : 'text-slate-900'}>{createdBooking.serviceName}</strong>
              </div>
              <div>
                <span className={`block text-xs ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>Department</span>
                <strong className={isDark ? 'text-white' : 'text-slate-900'}>{createdBooking.departmentName}</strong>
              </div>
              <div>
                <span className={`block text-xs ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>Preferred Date & Time</span>
                <strong className={isDark ? 'text-white' : 'text-slate-900'}>{createdBooking.preferredDate} ({createdBooking.preferredTime})</strong>
              </div>
              <div>
                <span className={`block text-xs ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>Location / Town</span>
                <strong className={isDark ? 'text-white' : 'text-slate-900'}>{createdBooking.locationTown}</strong>
              </div>
              <div>
                <span className={`block text-xs ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>Initial Status</span>
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                  isDark ? 'bg-amber-950/60 text-amber-300 border-amber-500/40' : 'bg-amber-50 text-amber-800 border-amber-300'
                }`}>
                  {createdBooking.status}
                </span>
              </div>
            </div>
            <div>
              <span className={`block text-xs mb-1 ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>Problem Description</span>
              <p className={`p-3.5 rounded-xl border italic ${
                isDark 
                  ? 'bg-[#0b0c24] border-purple-900/40 text-slate-200' 
                  : 'bg-white border-slate-200 text-slate-800'
              }`}>
                "{createdBooking.problemDescription}"
              </p>
            </div>
          </div>

          {/* Next Step: WhatsApp Safe Link */}
          <div className={`p-6 rounded-2xl border space-y-4 ${
            isDark 
              ? 'bg-emerald-950/40 border-emerald-500/40' 
              : 'bg-emerald-50 border-emerald-200'
          }`}>
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className={`text-sm font-bold ${isDark ? 'text-emerald-300' : 'text-emerald-900'}`}>Next Step: Confirm on WhatsApp</h4>
                <p className={`text-xs mt-0.5 leading-relaxed ${isDark ? 'text-emerald-200/90' : 'text-emerald-800'}`}>
                  Click the button below to open WhatsApp with a pre-filled, safe booking message directly to founder Petuel Baifem at <strong className={isDark ? 'text-white' : 'text-slate-900'}>+237 677 251 088</strong>.
                </p>
              </div>
            </div>

            <a
              href={buildBookingWhatsAppUrl({
                bookingReference: createdBooking.bookingReference,
                name: createdBooking.customerName,
                service: createdBooking.serviceName,
                department: createdBooking.departmentName,
                description: createdBooking.problemDescription,
                preferredDate: createdBooking.preferredDate,
                preferredTime: createdBooking.preferredTime,
                location: createdBooking.locationTown
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              id="continue-whatsapp-btn"
            >
              <span>Continue on WhatsApp</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Action buttons */}
          <div className={`flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t ${
            isDark ? 'border-purple-900/40' : 'border-slate-200'
          }`}>
            <button
              onClick={() => {
                setCreatedBooking(null);
                setProblemDescription('');
              }}
              className={`text-xs font-semibold ${isDark ? 'text-purple-300 hover:text-white' : 'text-purple-700 hover:text-purple-900'}`}
            >
              ← Book another service
            </button>

            <button
              onClick={() => onNavigate('customer-dashboard')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-colors border ${
                isDark 
                  ? 'bg-[#111333] hover:bg-[#181b48] text-purple-200 border-purple-900/40' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
              }`}
            >
              View in Customer Portal
            </button>
          </div>
        </div>
      ) : (
        /* The Booking Form */
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border ${
              isDark 
                ? 'bg-purple-950/60 border-purple-500/40 text-purple-300' 
                : 'bg-purple-50 border-purple-200 text-purple-700'
            }`}>
              <Calendar className="w-3.5 h-3.5 text-purple-500" />
              <span>Direct Booking & WhatsApp Confirmation</span>
            </div>
            <h1 className={`text-3xl sm:text-4xl font-black font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Book a Technology Service
            </h1>
            <p className={`text-sm leading-relaxed max-w-2xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Fill out your request below. We immediately generate an official booking reference and allow you to continue seamlessly on WhatsApp with our founder at <strong className={isDark ? 'text-purple-300' : 'text-purple-700'}>+237 677 251 088</strong>.
            </p>
          </div>

          {/* Contact Banner */}
          <div className={`p-4 sm:p-5 rounded-3xl border shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
            isDark 
              ? 'bg-[#0b0c24]/90 border-purple-900/40 shadow-purple-950/30' 
              : 'bg-white border-slate-200 shadow-slate-200/60'
          }`}>
            <div className="flex items-center gap-3.5">
              <img
                src={APP_IMAGES.founderProfile}
                alt="Petuel Baifem, Founder"
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-2xl object-cover border-2 border-purple-500 shadow-md flex-shrink-0"
              />
              <div className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Petuel Baifem (Founder & Lead Engineer)</span>
                </div>
                <p className={`text-[11px] mt-0.5 ${isDark ? 'text-purple-300' : 'text-purple-700'}`}>
                  Direct WhatsApp: <strong className={isDark ? 'text-white' : 'text-slate-900'}>+237 677 251 088</strong> • Fast booking response
                </p>
              </div>
            </div>
            <span className={`text-xs px-3.5 py-1.5 rounded-xl border self-start sm:self-auto ${
              isDark 
                ? 'text-purple-200 bg-purple-950/60 border-purple-500/40' 
                : 'text-purple-700 bg-purple-50 border-purple-200 font-semibold'
            }`}>
              Cameroon • Global Support
            </span>
          </div>

          {submitError && (
            <div className="p-4 rounded-2xl bg-rose-950/50 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
              <span>{submitError}</span>
            </div>
          )}

          {/* Form Card */}
          <form onSubmit={handleSubmit} className={`rounded-3xl p-6 sm:p-10 border shadow-2xl space-y-6 transition-all ${
            isDark 
              ? 'bg-[#0b0c24]/95 border-purple-900/40 shadow-purple-950/40' 
              : 'bg-white border-slate-200 shadow-slate-200/60'
          }`}>
            
            {/* 1. Personal & Contact Details */}
            <div className="space-y-4">
              <h3 className={`text-sm font-bold uppercase tracking-wider border-b pb-2 ${
                isDark ? 'text-purple-400 border-purple-900/40' : 'text-purple-700 border-slate-200'
              }`}>
                1. Your Contact Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Full Name <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. David Ndive"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={`w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 border transition-colors ${
                        isDark 
                          ? 'bg-[#08091a] border-purple-900/50 text-white placeholder:text-slate-500' 
                          : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Email Address <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. david@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 border transition-colors ${
                        isDark 
                          ? 'bg-[#08091a] border-purple-900/50 text-white placeholder:text-slate-500' 
                          : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400'
                      }`}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    WhatsApp / Phone Number <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="+237 6XX XXX XXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 border transition-colors ${
                        isDark 
                          ? 'bg-[#08091a] border-purple-900/50 text-white placeholder:text-slate-500' 
                          : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Location / Town <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Douala, Yaoundé, Buea, Limbe"
                      value={locationTown}
                      onChange={(e) => setLocationTown(e.target.value)}
                      className={`w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 border transition-colors ${
                        isDark 
                          ? 'bg-[#08091a] border-purple-900/50 text-white placeholder:text-slate-500' 
                          : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Department & Service Selection */}
            <div className="space-y-4 pt-2">
              <h3 className={`text-sm font-bold uppercase tracking-wider border-b pb-2 ${
                isDark ? 'text-purple-400 border-purple-900/40' : 'text-purple-700 border-slate-200'
              }`}>
                2. Department & Service Needed
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Select Department <span className="text-rose-400">*</span>
                  </label>
                  <select
                    value={selectedDept}
                    onChange={(e) => handleDeptChange(e.target.value)}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 border transition-colors ${
                      isDark 
                        ? 'bg-[#08091a] border-purple-900/50 text-purple-200' 
                        : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  >
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept.id} value={dept.name}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Select Service <span className="text-rose-400">*</span>
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 border transition-colors ${
                      isDark 
                        ? 'bg-[#08091a] border-purple-900/50 text-purple-200' 
                        : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  >
                    {currentDeptObj.services.map((srv) => (
                      <option key={srv.id} value={srv.name}>
                        {srv.name} {srv.priceHint ? `(${srv.priceHint})` : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Problem description */}
              <div>
                <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Request / Problem Description <span className="text-rose-400">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your project, device issue, flyer requirement, or hosting need in detail..."
                  value={problemDescription}
                  onChange={(e) => setProblemDescription(e.target.value)}
                  className={`w-full p-3.5 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 border transition-colors ${
                    isDark 
                      ? 'bg-[#08091a] border-purple-900/50 text-white placeholder:text-slate-500' 
                      : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400'
                  }`}
                />
              </div>
            </div>

            {/* 3. Date, Time & Budget */}
            <div className="space-y-4 pt-2">
              <h3 className={`text-sm font-bold uppercase tracking-wider border-b pb-2 ${
                isDark ? 'text-purple-400 border-purple-900/40' : 'text-purple-700 border-slate-200'
              }`}>
                3. Preferred Timing & Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Preferred Date <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().slice(0, 10)}
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className={`w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 border transition-colors ${
                        isDark 
                          ? 'bg-[#08091a] border-purple-900/50 text-white' 
                          : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Preferred Time Window
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className={`w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 border transition-colors ${
                        isDark 
                          ? 'bg-[#08091a] border-purple-900/50 text-purple-200' 
                          : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    >
                      <option value="Morning (09:00 AM - 12:00 PM)">Morning (09:00 AM - 12:00 PM)</option>
                      <option value="Afternoon (01:00 PM - 04:00 PM)">Afternoon (01:00 PM - 04:00 PM)</option>
                      <option value="Late Afternoon (04:00 PM - 06:30 PM)">Late Afternoon (04:00 PM - 06:30 PM)</option>
                      <option value="Flexible / Anytime">Flexible / Anytime</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Optional Budget Range (XAF)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 50,000 - 100,000 XAF"
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 border transition-colors ${
                      isDark 
                        ? 'bg-[#08091a] border-purple-900/50 text-white placeholder:text-slate-500' 
                        : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    How did you hear about PETZEUSTECH?
                  </label>
                  <select
                    value={heardAbout}
                    onChange={(e) => setHeardAbout(e.target.value)}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 border transition-colors ${
                      isDark 
                        ? 'bg-[#08091a] border-purple-900/50 text-purple-200' 
                        : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  >
                    <option value="WhatsApp Status">WhatsApp Status</option>
                    <option value="Friend or Colleague">Friend or Colleague</option>
                    <option value="Facebook / Social Media">Facebook / Social Media</option>
                    <option value="Google Search">Google Search</option>
                    <option value="Local Community">Local Community</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Agreement Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className={`mt-1 w-4 h-4 rounded text-purple-600 focus:ring-purple-500 ${
                    isDark ? 'border-purple-900 bg-[#08091a]' : 'border-slate-300 bg-white'
                  }`}
                />
                <span className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  I agree to provide accurate information and understand that PETZEUSTECH will assign an official booking reference and follow up via WhatsApp / phone to confirm scope and scheduling.
                </span>
              </label>
            </div>

            {/* Submit Action */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-2xl bg-purple-600 hover:bg-purple-500 active:bg-purple-700 disabled:opacity-50 text-white font-bold text-base shadow-xl shadow-purple-600/30 transition-all flex items-center justify-center gap-2"
                id="submit-booking-form-btn"
              >
                {isSubmitting ? (
                  <span>Generating Booking Reference...</span>
                ) : (
                  <>
                    <span>Submit & Generate WhatsApp Message</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
