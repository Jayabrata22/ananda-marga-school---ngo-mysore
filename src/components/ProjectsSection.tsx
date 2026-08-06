import React, { useState, useEffect } from 'react';
import { SchoolProject } from '../types';
import { MOCK_PROJECTS } from '../data/mockData';
import { AnandaMargaLogo } from './AnandaMargaLogo';
import { 
  Building2, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  PlusCircle, 
  Sparkles, 
  TrendingUp, 
  Target, 
  X, 
  Check, 
  Heart, 
  GraduationCap, 
  Cpu, 
  Sun, 
  Utensils, 
  Bus, 
  BookOpen, 
  Dumbbell,
  Pencil,
  Trash2,
  ShieldCheck,
  Lock,
  Image as ImageIcon,
  Upload,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';

interface ProjectsSectionProps {
  onDonateToProject?: (projectTitle: string) => void;
  isAdminLoggedIn?: boolean;
  onOpenAdminModal?: () => void;
}

const PRESET_IMAGES = [
  { label: 'Mysore Campus & Flag', url: '/mysore/schoolfront.jpg' },
  { label: 'Academic Award Ceremony', url: '/mysore/netaji.jpg' },
  { label: 'Morning Prayer Assembly', url: '/mysore/prayer.jpeg' },
  { label: 'Patriots & Freedom Fighters', url: '/mysore/netaji.jpg' },
  { label: 'Digital Computer Lab', url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80' },
  { label: 'Midday Meals Program', url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80' },
  { label: 'Solar Power System', url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80' },
];

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ 
  onDonateToProject,
  isAdminLoggedIn = false,
  onOpenAdminModal,
}) => {
  const [projects, setProjects] = useState<SchoolProject[]>(() => {
    try {
      const saved = localStorage.getItem('mysore_school_projects');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse saved projects', e);
    }
    return MOCK_PROJECTS;
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingProject, setEditingProject] = useState<SchoolProject | null>(null);
  const [deleteConfirmProject, setDeleteConfirmProject] = useState<SchoolProject | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<SchoolProject['category']>('Infrastructure');
  const [status, setStatus] = useState<SchoolProject['status']>('Planning Phase');
  const [estimatedCostINR, setEstimatedCostINR] = useState<string>('300000');
  const [raisedINR, setRaisedINR] = useState<string>('0');
  const [targetDate, setTargetDate] = useState('Quarter 1 2027');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('Ananda Marga School Campus, Mysore, Karnataka');
  const [imageUrl, setImageUrl] = useState(PRESET_IMAGES[0].url);
  const [highlightStr, setHighlightStr] = useState('');

  // Persist projects to localStorage whenever changed
  useEffect(() => {
    try {
      localStorage.setItem('mysore_school_projects', JSON.stringify(projects));
    } catch (e) {
      console.error('Failed to save projects to localStorage', e);
    }
  }, [projects]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const categories = ['All', 'Technology', 'Infrastructure', 'Nutrition & Health', 'Education', 'Sports & Culture'];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  const openAddModal = () => {
    setEditingProject(null);
    setTitle('');
    setCategory('Infrastructure');
    setStatus('Planning Phase');
    setEstimatedCostINR('300000');
    setRaisedINR('0');
    setTargetDate('Q1 2027');
    setDescription('');
    setLocation('Ananda Marga School Campus, Mysore');
    setImageUrl(PRESET_IMAGES[0].url);
    setHighlightStr('');
    setIsModalOpen(true);
  };

  const openEditModal = (proj: SchoolProject) => {
    setEditingProject(proj);
    setTitle(proj.title);
    setCategory(proj.category);
    setStatus(proj.status);
    setEstimatedCostINR(proj.estimatedCostINR.toString());
    setRaisedINR(proj.raisedINR.toString());
    setTargetDate(proj.targetDate);
    setDescription(proj.description);
    setLocation(proj.location);
    setImageUrl(proj.imageUrl);
    setHighlightStr(proj.highlights ? proj.highlights.join(', ') : '');
    setIsModalOpen(true);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const highlightsArray = highlightStr
      ? highlightStr.split(',').map(h => h.trim()).filter(Boolean)
      : ['Community Driven', 'Neohumanist Development'];

    if (editingProject) {
      // Update existing project
      const updatedList = projects.map((p) => {
        if (p.id === editingProject.id) {
          return {
            ...p,
            title: title.trim(),
            category,
            status,
            description: description.trim(),
            location: location.trim() || 'Ananda Marga School Campus, Mysore',
            estimatedCostINR: parseInt(estimatedCostINR) || 250000,
            raisedINR: parseInt(raisedINR) || 0,
            targetDate: targetDate.trim() || '2027',
            imageUrl: imageUrl || PRESET_IMAGES[0].url,
            highlights: highlightsArray,
          };
        }
        return p;
      });
      setProjects(updatedList);
      showToast(`Updated "${title.trim()}" successfully!`);
    } else {
      // Create new project
      const newProj: SchoolProject = {
        id: `proj-${Date.now()}`,
        title: title.trim(),
        category,
        status,
        description: description.trim(),
        location: location.trim() || 'Ananda Marga School Campus, Mysore',
        estimatedCostINR: parseInt(estimatedCostINR) || 250000,
        raisedINR: parseInt(raisedINR) || 0,
        targetDate: targetDate.trim() || '2027',
        imageUrl: imageUrl || PRESET_IMAGES[0].url,
        highlights: highlightsArray,
      };
      setProjects([newProj, ...projects]);
      showToast(`Added new project "${title.trim()}"!`);
    }

    setIsModalOpen(false);
  };

  const handleDeleteProject = (projId: string) => {
    const updated = projects.filter(p => p.id !== projId);
    setProjects(updated);
    showToast('Project deleted successfully.');
    setDeleteConfirmProject(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setImageUrl(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Technology': return <Cpu className="w-4 h-4 text-[#002B66]" />;
      case 'Infrastructure': return <Sun className="w-4 h-4 text-[#FF6600]" />;
      case 'Nutrition & Health': return <Utensils className="w-4 h-4 text-[#003399]" />;
      case 'Education': return <BookOpen className="w-4 h-4 text-[#002B66]" />;
      case 'Sports & Culture': return <Dumbbell className="w-4 h-4 text-[#FF6600]" />;
      default: return <GraduationCap className="w-4 h-4 text-[#002B66]" />;
    }
  };

  const getStatusBadge = (statusVal: SchoolProject['status']) => {
    switch (statusVal) {
      case 'In Progress':
        return <span className="px-3 py-1 bg-[#002B66] text-white text-[10px] font-bold uppercase tracking-wider rounded-full">In Progress</span>;
      case 'Upcoming':
        return <span className="px-3 py-1 bg-[#FF6600] text-white text-[10px] font-bold uppercase tracking-wider rounded-full">Upcoming</span>;
      case 'Planning Phase':
        return <span className="px-3 py-1 bg-[#003399] text-white text-[10px] font-bold uppercase tracking-wider rounded-full">Planning Phase</span>;
      case 'Completed':
        return <span className="px-3 py-1 bg-emerald-700 text-white text-[10px] font-bold uppercase tracking-wider rounded-full">Completed</span>;
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-[#F8F9FA] min-h-screen relative">
      {/* Floating Notification Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#002B66] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#CBD5E1] flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-[#FF6600]" />
          <span className="text-xs font-bold">{toastMsg}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Admin Status Banner */}
        {isAdminLoggedIn ? (
          <div className="p-4 bg-[#002B66] text-white rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-md">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#FFD700]" />
              <div>
                <p className="font-serif font-bold text-sm">Admin Control Panel Active</p>
                <p className="text-xs text-white/80">You have full permissions to Add, Edit, or Delete Mysore School Projects.</p>
              </div>
            </div>
            <button
              onClick={openAddModal}
              className="px-5 py-2.5 bg-[#FF6600] hover:bg-[#e65c00] text-white font-bold text-xs uppercase tracking-wider rounded-full transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add New School Project</span>
            </button>
          </div>
        ) : null}

        {/* Header Title with Official Emblem */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-[#E2E8F0]">
          <div className="max-w-2xl space-y-2">
            <div className="flex items-center gap-3 mb-1">
              <AnandaMargaLogo className="w-10 h-10" />
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F0F4F8] text-[#002B66] font-bold text-xs uppercase tracking-[0.2em] border border-[#CBD5E1]">
                Ananda Marga School, Mysore
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#002B66]">
              Upcoming & Ongoing School Projects
            </h1>
            <p className="text-[#4A5568] text-base leading-relaxed font-sans">
              Discover active educational, infrastructure, and nutrition development initiatives for our Ananda Marga School campus in Mysore, Karnataka.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {isAdminLoggedIn ? (
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => {
                    if (confirm('Sync & Update projects with latest Mysore School photos?')) {
                      setProjects(MOCK_PROJECTS);
                      localStorage.setItem('mysore_school_projects', JSON.stringify(MOCK_PROJECTS));
                      showToast('Synced projects with latest Mysore School photos!');
                    }
                  }}
                  className="px-4 py-3 bg-[#002B66] hover:bg-[#001D47] text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                  title="Update projects with the newly uploaded Mysore School photos"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#FFD700]" />
                  <span>Sync Mysore Photos</span>
                </button>
                <button
                  onClick={() => {
                    if (confirm('Admin: Are you sure you want to delete ALL static and custom project cards?')) {
                      setProjects([]);
                      localStorage.setItem('mysore_school_projects', JSON.stringify([]));
                      showToast('All project cards deleted.');
                    }
                  }}
                  className="px-4 py-3 bg-red-100 hover:bg-red-200 text-red-700 font-bold text-xs uppercase tracking-wider rounded-full transition-all border border-red-300 flex items-center gap-1.5 cursor-pointer"
                  title="Delete all project cards from this page"
                >
                  <Trash2 className="w-3.5 h-3.5 text-red-600" />
                  <span>Delete All Cards</span>
                </button>
                <button
                  onClick={openAddModal}
                  className="px-5 py-3 bg-[#FF6600] hover:bg-[#e65c00] text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all flex items-center gap-2 shadow-xs shrink-0 cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Add Project</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAdminModal}
                className="px-5 py-3 bg-[#F0F4F8] hover:bg-[#E2E8F0] text-[#002B66] font-bold text-xs uppercase tracking-wider rounded-full transition-all border border-[#CBD5E1] flex items-center gap-2 cursor-pointer"
              >
                <Lock className="w-4 h-4 text-[#003399]" />
                <span>Admin Login to Edit</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#002B66] text-white shadow-xs'
                  : 'bg-[#F0F4F8] text-[#002B66] hover:bg-[#E2E8F0] border border-[#CBD5E1]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((proj) => {
            const percent = Math.min(100, Math.round((proj.raisedINR / proj.estimatedCostINR) * 100));
            return (
              <div
                key={proj.id}
                className="bg-white rounded-[32px] border border-[#E2E8F0] overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between relative group"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={proj.imageUrl}
                      alt={proj.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    <div className="absolute top-4 left-4">
                      {getStatusBadge(proj.status)}
                    </div>

                    {/* Admin Action Buttons on Card */}
                    {isAdminLoggedIn && (
                      <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10 bg-black/40 backdrop-blur-xs p-1.5 rounded-2xl border border-white/20">
                        <button
                          onClick={() => openEditModal(proj)}
                          className="p-2 bg-white text-[#002B66] hover:bg-[#FF6600] hover:text-white rounded-xl transition-colors cursor-pointer"
                          title="Edit Project"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmProject(proj)}
                          className="p-2 bg-white text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-colors cursor-pointer"
                          title="Delete Project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs font-bold">
                      <span className="flex items-center gap-1 truncate">
                        <MapPin className="w-3.5 h-3.5 text-[#FFD700] shrink-0" /> {proj.location}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#002B66] uppercase tracking-wider">
                        {getCategoryIcon(proj.category)}
                        <span>{proj.category}</span>
                      </div>
                      {isAdminLoggedIn && (
                        <span className="text-[10px] font-bold text-[#002B66] bg-[#F0F4F8] border border-[#CBD5E1] px-2 py-0.5 rounded-md">
                          Admin Editable
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif font-bold text-xl text-[#002B66] leading-tight">
                      {proj.title}
                    </h3>

                    <p className="text-xs text-[#4A5568] leading-relaxed font-sans line-clamp-3">
                      {proj.description}
                    </p>

                    {/* Highlights list */}
                    {proj.highlights && proj.highlights.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        {proj.highlights.map((h, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-[#1A202C] font-sans">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6600] shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Funding Progress */}
                    <div className="bg-[#F0F4F8] p-4 rounded-2xl border border-[#CBD5E1] space-y-2 mt-2">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-[#002B66]">Raised: ₹{proj.raisedINR.toLocaleString()}</span>
                        <span className="text-[#64748B]">Goal: ₹{proj.estimatedCostINR.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-[#E2E8F0] h-2.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#FF6600] h-full rounded-full transition-all duration-500"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center text-[11px] text-[#8B8B7A]">
                        <span>{percent}% Funded</span>
                        <span className="flex items-center gap-1 font-semibold text-[#2F4F4F]">
                          <Calendar className="w-3 h-3 text-[#CC7A5C]" /> Target: {proj.targetDate}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-6 pt-0 space-y-2">
                  <button
                    onClick={() => onDonateToProject?.(proj.title)}
                    className="w-full py-3 bg-[#CC7A5C] hover:bg-[#b86d52] text-white font-bold text-xs uppercase tracking-wider rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Heart className="w-4 h-4 fill-white/30" />
                    <span>Sponsor / Support This Project</span>
                  </button>

                  {isAdminLoggedIn && (
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => openEditModal(proj)}
                        className="py-2 bg-[#E2DFD4] hover:bg-[#d4cfc1] text-[#2F4F4F] font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5 text-[#556B2F]" />
                        <span>Edit Section</span>
                      </button>

                      <button
                        onClick={() => setDeleteConfirmProject(proj)}
                        className="py-2 bg-red-100 hover:bg-red-200 text-red-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-600" />
                        <span>Delete</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Add / Edit Project Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-[#FDFBF7] rounded-[32px] max-w-2xl w-full p-6 sm:p-8 border border-[#E6E1D6] shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#E2DFD4] text-[#2F4F4F] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2 mb-6">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#CC7A5C]">
                  {editingProject ? 'Admin Edit Project' : 'Admin Add New Project'}
                </span>
                <h2 className="text-2xl font-serif font-bold text-[#2F4F4F]">
                  {editingProject ? `Edit: ${editingProject.title}` : 'Propose & Publish New Project'}
                </h2>
                <p className="text-xs text-[#6B6B5E] font-sans">
                  Manage Mysore School project details, target budgets, status, and picture.
                </p>
              </div>

              <form onSubmit={handleSaveProject} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#5A5A40] mb-1">Project Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Science Auditorium & Audio-Visual Hall"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl border border-[#E6E1D6] bg-[#F7F3EA] text-xs font-medium text-[#2F4F4F] focus:outline-hidden focus:border-[#556B2F]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#5A5A40] mb-1">Category *</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full px-4 py-2.5 rounded-2xl border border-[#E6E1D6] bg-[#F7F3EA] text-xs font-medium text-[#2F4F4F] focus:outline-hidden focus:border-[#556B2F]"
                    >
                      <option value="Infrastructure">Infrastructure</option>
                      <option value="Education">Education</option>
                      <option value="Technology">Technology</option>
                      <option value="Nutrition & Health">Nutrition & Health</option>
                      <option value="Sports & Culture">Sports & Culture</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#5A5A40] mb-1">Current Status</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as any)}
                      className="w-full px-4 py-2.5 rounded-2xl border border-[#E6E1D6] bg-[#F7F3EA] text-xs font-medium text-[#2F4F4F] focus:outline-hidden focus:border-[#556B2F]"
                    >
                      <option value="Planning Phase">Planning Phase</option>
                      <option value="Upcoming">Upcoming</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#5A5A40] mb-1">Estimated Cost (INR ₹) *</label>
                    <input
                      type="number"
                      required
                      value={estimatedCostINR}
                      onChange={(e) => setEstimatedCostINR(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-2xl border border-[#E6E1D6] bg-[#F7F3EA] text-xs font-medium text-[#2F4F4F] focus:outline-hidden focus:border-[#556B2F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#5A5A40] mb-1">Raised Amount (INR ₹)</label>
                    <input
                      type="number"
                      value={raisedINR}
                      onChange={(e) => setRaisedINR(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-2xl border border-[#E6E1D6] bg-[#F7F3EA] text-xs font-medium text-[#2F4F4F] focus:outline-hidden focus:border-[#556B2F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#5A5A40] mb-1">Target Date</label>
                    <input
                      type="text"
                      placeholder="e.g. Q1 2027"
                      value={targetDate}
                      onChange={(e) => setTargetDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-2xl border border-[#E6E1D6] bg-[#F7F3EA] text-xs font-medium text-[#2F4F4F] focus:outline-hidden focus:border-[#556B2F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#5A5A40] mb-1">Location / Campus Wing</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl border border-[#E6E1D6] bg-[#F7F3EA] text-xs font-medium text-[#2F4F4F] focus:outline-hidden focus:border-[#556B2F]"
                  />
                </div>

                {/* Picture Section */}
                <div className="space-y-2 p-4 bg-[#F7F3EA] rounded-2xl border border-[#E6E1D6]">
                  <label className="block text-xs font-bold text-[#2F4F4F] flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-[#556B2F]" /> Project Image / Picture *
                  </label>

                  {/* Preview */}
                  <div className="flex items-center gap-4">
                    <img
                      src={imageUrl}
                      alt="Project Preview"
                      className="w-20 h-20 rounded-xl object-cover border border-[#E6E1D6] shrink-0"
                    />
                    <div className="space-y-2 flex-1">
                      <input
                        type="url"
                        placeholder="Paste Image URL..."
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-[#E6E1D6] bg-white text-xs text-[#333333]"
                      />
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#E2DFD4] hover:bg-[#d4cfc1] text-[#2F4F4F] text-xs font-bold rounded-lg cursor-pointer transition-colors">
                        <Upload className="w-3.5 h-3.5 text-[#556B2F]" />
                        <span>Upload Photo from Device</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Presets */}
                  <div className="pt-2">
                    <p className="text-[10px] font-bold text-[#8B8B7A] uppercase tracking-wider mb-1">Or Pick Preset Image:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {PRESET_IMAGES.map((preset) => (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => setImageUrl(preset.url)}
                          className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border transition-colors cursor-pointer ${
                            imageUrl === preset.url
                              ? 'bg-[#556B2F] text-white border-[#556B2F]'
                              : 'bg-white text-[#2F4F4F] border-[#E6E1D6] hover:bg-[#E2DFD4]'
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#5A5A40] mb-1">Project Description *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe the project goal, beneficiaries, and impact..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl border border-[#E6E1D6] bg-[#F7F3EA] text-xs font-medium text-[#2F4F4F] focus:outline-hidden focus:border-[#556B2F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#5A5A40] mb-1">Key Highlights (Comma Separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. 500 Beneficiaries, Solar Powered, Free Access"
                    value={highlightStr}
                    onChange={(e) => setHighlightStr(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl border border-[#E6E1D6] bg-[#F7F3EA] text-xs font-medium text-[#2F4F4F] focus:outline-hidden focus:border-[#556B2F]"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 bg-[#E2DFD4] hover:bg-[#d4cfc1] text-[#2F4F4F] font-bold text-xs uppercase tracking-wider rounded-full transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="flex-1 py-3.5 bg-[#556B2F] hover:bg-[#435424] text-white font-bold text-xs uppercase tracking-wider rounded-full transition-colors cursor-pointer shadow-xs"
                  >
                    {editingProject ? 'Save Changes' : 'Publish Project'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirmProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-[#FDFBF7] rounded-[32px] max-w-md w-full p-6 sm:p-8 border border-[#E6E1D6] shadow-2xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>

              <div className="text-center space-y-2">
                <h3 className="font-serif font-bold text-xl text-[#2F4F4F]">Delete Project?</h3>
                <p className="text-xs text-[#6B6B5E]">
                  Are you sure you want to delete <span className="font-bold text-[#2F4F4F]">"{deleteConfirmProject.title}"</span>? This action cannot be undone.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setDeleteConfirmProject(null)}
                  className="flex-1 py-3 bg-[#E2DFD4] text-[#2F4F4F] font-bold text-xs uppercase tracking-wider rounded-full hover:bg-[#d4cfc1] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteProject(deleteConfirmProject.id)}
                  className="flex-1 py-3 bg-red-600 text-white font-bold text-xs uppercase tracking-wider rounded-full hover:bg-red-700 cursor-pointer shadow-xs"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
