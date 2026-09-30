import React, { useState, useEffect } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Search, 
  Filter,
  Layers,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { PROJECTS, DEPARTMENTS } from '../data/companyData';
import { Project } from '../types';
import { Modal } from '../components/Modal';
import { api } from '../lib/api';
import { useTheme } from '../context/ThemeContext';

interface ProjectsProps {
  onNavigate: (page: string, param?: string) => void;
  initialProjectId?: string;
}

export const Projects: React.FC<ProjectsProps> = ({ onNavigate, initialProjectId }) => {
  const { isDark } = useTheme();
  const [projectList, setProjectList] = useState<Project[]>(PROJECTS);
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(() => {
    if (initialProjectId) {
      return PROJECTS.find(p => String(p.id) === initialProjectId) || null;
    }
    return null;
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await api.getProjects();
      if (data && data.length > 0) {
        setProjectList(data);
        if (initialProjectId) {
          const match = data.find(p => String(p.id) === initialProjectId);
          if (match) setActiveProject(match);
        }
      }
    } catch (err) {
      console.warn('Using offline static projects', err);
    } finally {
      setLoading(false);
    }
  };

  const statuses = ['All', 'Completed', 'In Progress', 'Prototype', 'Planned'];

  const filteredProjects = projectList.filter((p) => {
    if (selectedStatus !== 'All' && p.status !== selectedStatus) return false;
    if (selectedDept !== 'All' && p.departmentName !== selectedDept) return false;
    return true;
  });

  const getStatusBadge = (status: Project['status']) => {
    switch (status) {
      case 'Completed':
        return isDark ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40' : 'bg-emerald-50 text-emerald-700 border-emerald-300';
      case 'In Progress':
        return isDark ? 'bg-purple-950/60 text-purple-300 border-purple-500/40' : 'bg-purple-50 text-purple-700 border-purple-300';
      case 'Prototype':
        return isDark ? 'bg-fuchsia-950/60 text-fuchsia-300 border-fuchsia-500/40' : 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-300';
      case 'Planned':
        return isDark ? 'bg-amber-950/60 text-amber-300 border-amber-500/40' : 'bg-amber-50 text-amber-700 border-amber-300';
    }
  };

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-left transition-colors duration-200 ${
      isDark ? 'text-slate-100' : 'text-slate-800'
    }`}>
      
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-purple-500">
          Our Portfolio & Labs
        </span>
        <h1 className={`text-4xl sm:text-5xl font-black font-display tracking-tight ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          Projects & Systems
        </h1>
        <p className={`text-base leading-relaxed ${
          isDark ? 'text-slate-300' : 'text-slate-600'
        }`}>
          Every project below is cataloged with absolute transparency. We clearly distinguish between fully delivered client platforms, active builds, and research prototypes.
        </p>
      </div>

      {/* Filter Bar */}
      <div className={`flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5 rounded-3xl border transition-all ${
        isDark 
          ? 'bg-[#0b0c24]/90 border-purple-900/40 shadow-xl shadow-purple-950/30' 
          : 'bg-white border-slate-200 shadow-lg shadow-slate-200/50'
      }`}>
        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedStatus === status
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : isDark 
                    ? 'bg-[#111333] text-purple-200 hover:bg-[#181b48] border border-purple-900/40' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Department Filter */}
        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className={`px-3.5 py-2 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
            isDark 
              ? 'bg-[#08091a] border border-purple-900/50 text-purple-200' 
              : 'bg-slate-50 border border-slate-200 text-slate-800'
          }`}
        >
          <option value="All">All Departments</option>
          {DEPARTMENTS.map((dept) => (
            <option key={dept.id} value={dept.name}>
              {dept.name}
            </option>
          ))}
        </select>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className={`rounded-3xl p-6 border transition-all flex flex-col justify-between group ${
              isDark 
                ? 'bg-[#0b0c24]/90 border-purple-900/40 shadow-xl shadow-purple-950/30 hover:border-purple-500/60 hover:shadow-2xl hover:shadow-purple-950/50' 
                : 'bg-white border-slate-200 shadow-md shadow-slate-200/50 hover:border-purple-300 hover:shadow-lg'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={`text-xs font-semibold truncate ${
                  isDark ? 'text-purple-300' : 'text-purple-600'
                }`}>
                  {project.departmentName}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${getStatusBadge(project.status)}`}>
                  {project.status}
                </span>
              </div>

              <h3 className={`font-bold text-lg font-display mb-2 group-hover:text-purple-500 transition-colors ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {project.title}
              </h3>

              <p className={`text-xs leading-relaxed mb-4 ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {project.summary}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold border ${
                      isDark 
                        ? 'bg-[#111333] text-purple-200 border-purple-900/40' 
                        : 'bg-purple-50 text-purple-700 border-purple-200'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className={`pt-4 border-t flex items-center justify-between gap-2 ${
              isDark ? 'border-purple-900/40' : 'border-slate-200'
            }`}>
              <button
                onClick={() => setActiveProject(project)}
                className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-2 ${
                  isDark 
                    ? 'bg-[#111333] hover:bg-purple-950/60 text-purple-200 hover:text-white border-purple-900/40 hover:border-purple-500/40' 
                    : 'bg-slate-100 hover:bg-purple-50 text-slate-700 hover:text-purple-900 border-slate-200 hover:border-purple-300'
                }`}
              >
                <span>View Full Case Study</span>
                <ArrowRight className="w-3.5 h-3.5 text-purple-500" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Case Study Modal */}
      <Modal
        isOpen={!!activeProject}
        onClose={() => setActiveProject(null)}
        title={activeProject?.title || 'Project Case Study'}
        maxWidth="2xl"
      >
        {activeProject && (
          <div className={`space-y-6 text-left ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
            <div className={`flex flex-wrap items-center justify-between gap-3 pb-3 border-b ${
              isDark ? 'border-purple-900/40' : 'border-slate-200'
            }`}>
              <div>
                <p className={`text-xs ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>Department</p>
                <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{activeProject.departmentName}</p>
              </div>
              <div>
                <p className={`text-xs ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>Current Status</p>
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold uppercase border ${getStatusBadge(activeProject.status)}`}>
                  {activeProject.status}
                </span>
              </div>
              {activeProject.completionDate && (
                <div>
                  <p className={`text-xs ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>Date / Milestone</p>
                  <p className={`text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{activeProject.completionDate}</p>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <h4 className={`text-xs font-bold uppercase tracking-wider mb-1 ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>
                  The Problem
                </h4>
                <p className={`text-xs sm:text-sm leading-relaxed p-3.5 rounded-2xl border ${
                  isDark ? 'text-rose-200 bg-rose-950/40 border-rose-500/30' : 'text-rose-900 bg-rose-50 border-rose-200'
                }`}>
                  {activeProject.problem}
                </p>
              </div>

              <div>
                <h4 className={`text-xs font-bold uppercase tracking-wider mb-1 ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>
                  Our Engineered Solution
                </h4>
                <p className={`text-xs sm:text-sm leading-relaxed p-3.5 rounded-2xl border ${
                  isDark ? 'text-emerald-200 bg-emerald-950/40 border-emerald-500/30' : 'text-emerald-900 bg-emerald-50 border-emerald-200'
                }`}>
                  {activeProject.solution}
                </p>
              </div>
            </div>

            <div>
              <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>
                Technologies & Architecture Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeProject.technologies.map((t, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1 rounded-xl text-xs font-medium border ${
                      isDark 
                        ? 'bg-[#111333] text-purple-200 border-purple-900/40' 
                        : 'bg-purple-50 text-purple-700 border-purple-200'
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className={`pt-4 border-t flex flex-col sm:flex-row gap-3 ${
              isDark ? 'border-purple-900/40' : 'border-slate-200'
            }`}>
              <button
                onClick={() => {
                  const p = activeProject;
                  setActiveProject(null);
                  onNavigate('book', `${p.departmentName} - Similar Project`);
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white text-xs font-bold transition-all text-center shadow-lg shadow-purple-600/30"
              >
                Request a Similar Solution
              </button>
              <button
                onClick={() => setActiveProject(null)}
                className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-colors border ${
                  isDark 
                    ? 'bg-[#111333] hover:bg-[#181b48] text-purple-200 border-purple-900/40' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                }`}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};
