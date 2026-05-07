"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import { 
  Upload, 
  UserPlus, 
  Image as ImageIcon, 
  Megaphone, 
  Monitor,
  LogOut 
} from 'lucide-react';

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const [activeTab, setActiveTab] = useState('members');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Form States
  const [memberForm, setMemberForm] = useState({ name: '', designation: '', committee_type: '', service_period: '' });
  const [galleryForm, setGalleryForm] = useState({ category: '' });
  const [heroForm, setHeroForm] = useState({ display_order: '0' });
  const [announcementForm, setAnnouncementForm] = useState({ title: '', type: 'notice', content: '', event_date: '' });

  // Authentication Guard
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
      } else {
        setUser(session.user);
      }
    };
    checkUser();
  }, [router]);

  // Logout Handler
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push('/login');
    } else {
      alert("Error signing out: " + error.message);
    }
  };

  const uploadToSupabase = async (file: File, folder: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;
    const { error: uploadError } = await supabase.storage.from('church-media').upload(filePath, file);
    if (uploadError) throw uploadError;
    const { data: urlData } = supabase.storage.from('church-media').getPublicUrl(filePath);
    return urlData.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    try {
      let publicUrl = "";
      if (selectedFile) {
        publicUrl = await uploadToSupabase(selectedFile, activeTab);
      }

      let error;
      if (activeTab === 'members') {
        ({ error } = await supabase.from('members').insert([{ ...memberForm, image_url: publicUrl }]));
      } else if (activeTab === 'gallery') {
        ({ error } = await supabase.from('gallery').insert([{ ...galleryForm, image_url: publicUrl }]));
      } else if (activeTab === 'hero') {
        ({ error } = await supabase.from('hero_settings').insert([{ image_url: publicUrl, display_order: parseInt(heroForm.display_order) }]));
      } else if (activeTab === 'announcements') {
        ({ error } = await supabase.from('announcements').insert([{ ...announcementForm, image_url: publicUrl }]));
      }

      if (error) throw error;
      setStatus(`Successfully added to ${activeTab}!`);
      setSelectedFile(null);
      // Optional: Reset forms here
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return (
    <div className="min-h-screen bg-[#CAF0F8] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#03045E]"></div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#CAF0F8] pt-32 pb-20 px-4">
      <Navbar />
      
      {/* Top Bar with Logout */}
      <div className="max-w-5xl mx-auto mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-[#03045E] tracking-tighter uppercase">Admin Portal</h1>
          <p className="text-[#0077B6] text-sm font-medium">Logged in as {user.email}</p>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-6 py-2.5 bg-white text-red-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-md border border-red-100 active:scale-95"
        >
          <LogOut size={14} />
          Sign Out
        </button>
      </div>

      <div className="max-w-5xl mx-auto bg-white rounded-[40px] shadow-2xl border border-white/60 overflow-hidden">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap border-b border-[#CAF0F8] bg-white">
          {[
            { id: 'members', label: 'Members', icon: <UserPlus size={16}/> },
            { id: 'gallery', label: 'Gallery', icon: <ImageIcon size={16}/> },
            { id: 'announcements', label: 'Events & Notices', icon: <Megaphone size={16}/> },
            { id: 'hero', label: 'Hero Slider', icon: <Monitor size={16}/> }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setStatus(''); }}
              className={`flex-1 min-w-[150px] py-6 font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 transition-all ${activeTab === tab.id ? 'bg-[#03045E] text-white' : 'text-[#0077B6] hover:bg-[#CAF0F8]/30'}`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        <div className="p-10 md:p-16">
          {status && <p className="mb-8 p-4 bg-green-100 text-green-700 rounded-xl font-bold text-center animate-bounce">{status}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* MEMBERS TAB */}
            {activeTab === 'members' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input required placeholder="Full Name" className="admin-input" onChange={e => setMemberForm({...memberForm, name: e.target.value})} />
                <input required placeholder="Designation" className="admin-input" onChange={e => setMemberForm({...memberForm, designation: e.target.value})} />
                <select required className="admin-input" onChange={e => setMemberForm({...memberForm, committee_type: e.target.value})}>
                  <option value="">Select Committee</option>
                  <option value="Pastorate Committee">Pastorate Committee</option>
                  <option value="Mandli Committee">Mandli Committee</option>
                </select>
                <input placeholder="Service Period" className="admin-input" onChange={e => setMemberForm({...memberForm, service_period: e.target.value})} />
              </div>
            )}

            {/* ANNOUNCEMENTS TAB */}
            {activeTab === 'announcements' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input required placeholder="Title" className="admin-input" onChange={e => setAnnouncementForm({...announcementForm, title: e.target.value})} />
                  <select className="admin-input" onChange={e => setAnnouncementForm({...announcementForm, type: e.target.value})}>
                    <option value="notice">Notice (Text Only)</option>
                    <option value="event">Event (Card with Image)</option>
                  </select>
                </div>
                <textarea placeholder="Description" className="admin-input h-32 resize-none" onChange={e => setAnnouncementForm({...announcementForm, content: e.target.value})} />
                <input type="date" className="admin-input" onChange={e => setAnnouncementForm({...announcementForm, event_date: e.target.value})} />
              </div>
            )}

            {/* GALLERY TAB */}
            {activeTab === 'gallery' && (
              <input required placeholder="Category (e.g. Christmas, Youth)" className="admin-input" onChange={e => setGalleryForm({...galleryForm, category: e.target.value})} />
            )}

            {/* HERO TAB */}
            {activeTab === 'hero' && (
              <input type="number" placeholder="Display Order (1, 2, 3...)" className="admin-input" onChange={e => setHeroForm({...heroForm, display_order: e.target.value})} />
            )}

            {/* UNIVERSAL FILE UPLOAD */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#03045E] ml-2">Attach Image</label>
              <label className="w-full flex items-center justify-between bg-[#CAF0F8]/30 p-6 rounded-2xl cursor-pointer border-2 border-dashed border-[#90E0EF] hover:bg-[#CAF0F8]/50 transition-all">
                <span className="text-[#0077B6] font-bold">{selectedFile ? selectedFile.name : "Select from computer..."}</span>
                <Upload size={24} className="text-[#00B4D8]" />
                <input type="file" accept="image/*" className="hidden" onChange={e => setSelectedFile(e.target.files ? e.target.files[0] : null)} />
              </label>
            </div>

            <button disabled={loading} className="w-full bg-[#03045E] text-white py-6 rounded-2xl font-black uppercase shadow-xl hover:bg-[#00B4D8] transition-all disabled:opacity-50 active:scale-95">
              {loading ? "Uploading & Processing..." : `Save to ${activeTab}`}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}