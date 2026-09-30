import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  Search, 
  ArrowRight, 
  User as UserIcon,
  Tag,
  Share2
} from 'lucide-react';
import { BLOG_POSTS } from '../data/companyData';
import { BlogPost } from '../types';
import { Modal } from '../components/Modal';
import { useTheme } from '../context/ThemeContext';

interface BlogProps {
  onNavigate: (page: string, param?: string) => void;
}

export const Blog: React.FC<BlogProps> = ({ onNavigate }) => {
  const { isDark } = useTheme();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const categories = ['All', 'Web Development', 'Cloud & Hosting', 'Hardware Repair', 'Career & Training'];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    if (selectedCategory !== 'All' && post.category !== selectedCategory) return false;
    if (search && !post.title.toLowerCase().includes(search.toLowerCase()) && !post.content.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-left transition-colors duration-200 ${
      isDark ? 'text-slate-100' : 'text-slate-800'
    }`}>
      
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-purple-500">
          Knowledge & Technical Guides
        </span>
        <h1 className={`text-4xl sm:text-5xl font-black font-display tracking-tight ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          PETZEUSTECH Knowledge Hub
        </h1>
        <p className={`text-base leading-relaxed ${
          isDark ? 'text-slate-300' : 'text-slate-600'
        }`}>
          Clear, jargon-free technology explanations written in plain English. Learn how hosting works, how to maintain your devices, and how to build digital products in Cameroon.
        </p>
      </div>

      {/* Filter and Search */}
      <div className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-3xl border transition-all ${
        isDark 
          ? 'bg-[#0b0c24]/90 border-purple-900/40 shadow-xl shadow-purple-950/30' 
          : 'bg-white border-slate-200 shadow-md'
      }`}>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : isDark 
                    ? 'bg-[#111333] text-purple-200 hover:bg-[#181b48] border border-purple-900/40' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative min-w-[220px]">
          <Search className="w-4 h-4 text-purple-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search guides..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full pl-9 pr-4 py-2 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors border ${
              isDark 
                ? 'bg-[#08091a] border-purple-900/50 text-white placeholder:text-slate-500' 
                : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
            }`}
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className={`rounded-3xl p-6 border transition-all flex flex-col justify-between group ${
              isDark 
                ? 'bg-[#0b0c24]/90 border-purple-900/40 shadow-xl shadow-purple-950/30 hover:border-purple-500/60 hover:shadow-2xl hover:shadow-purple-950/50' 
                : 'bg-white border-slate-200 shadow-md hover:shadow-lg hover:border-purple-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                  isDark 
                    ? 'bg-purple-950/60 text-purple-300 border-purple-500/40' 
                    : 'bg-purple-50 text-purple-700 border-purple-200'
                }`}>
                  {post.category}
                </span>
                <span className={`text-[11px] flex items-center gap-1 ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  <Clock className="w-3 h-3 text-purple-500" />
                  <span>{post.readTimeMinutes} min read</span>
                </span>
              </div>

              <h2 className={`font-bold text-lg font-display mb-2 group-hover:text-purple-500 transition-colors ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {post.title}
              </h2>

              <p className={`text-xs leading-relaxed mb-4 ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {post.summary}
              </p>
            </div>

            <div className={`pt-4 border-t flex items-center justify-between text-xs ${
              isDark ? 'border-purple-900/40 text-slate-400' : 'border-slate-100 text-slate-600'
            }`}>
              <span className="font-medium">
                By {post.authorName}
              </span>
              <button
                onClick={() => setActivePost(post)}
                className={`font-bold flex items-center gap-1 transition-colors ${
                  isDark ? 'text-purple-400 hover:text-purple-300' : 'text-purple-700 hover:text-purple-900'
                }`}
              >
                <span>Read Guide</span>
                <ArrowRight className="w-3.5 h-3.5 text-purple-500" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Read Article Modal */}
      <Modal
        isOpen={!!activePost}
        onClose={() => setActivePost(null)}
        title={activePost?.title || 'Article'}
        maxWidth="2xl"
      >
        {activePost && (
          <div className={`space-y-6 text-left ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
            <div className={`flex flex-wrap items-center gap-4 text-xs pb-3 border-b ${
              isDark ? 'text-slate-400 border-purple-900/40' : 'text-slate-500 border-slate-200'
            }`}>
              <span className={`font-semibold px-2.5 py-1 rounded-md border ${
                isDark 
                  ? 'bg-purple-950/60 text-purple-300 border-purple-500/40' 
                  : 'bg-purple-50 text-purple-800 border-purple-200'
              }`}>
                {activePost.category}
              </span>
              <span>Published: {activePost.publishedAt}</span>
              <span>Author: {activePost.authorName}</span>
              <span>Read Time: {activePost.readTimeMinutes} mins</span>
            </div>

            <div className={`max-w-none text-xs sm:text-sm leading-relaxed space-y-4 ${
              isDark ? 'text-slate-200' : 'text-slate-700'
            }`}>
              {activePost.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className={`pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 ${
              isDark ? 'border-purple-900/40' : 'border-slate-200'
            }`}>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Found this helpful? Reach out if you have questions!
              </p>
              <button
                onClick={() => {
                  const p = activePost;
                  setActivePost(null);
                  onNavigate('book', `Consultation regarding ${p.title}`);
                }}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md shadow-purple-900/40"
              >
                Discuss This With Our Team
              </button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};
