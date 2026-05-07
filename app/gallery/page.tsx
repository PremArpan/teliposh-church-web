"use client"; 
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import GalleryImage from '@/components/GalleryImage';
import Footer from '@/components/Footer';
import { X, ChevronLeft, ChevronRight } from 'lucide-react'; 

export default function FullGallery() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  
  // LIGHTBOX STATE: Now tracking the index
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    async function fetchGallery() {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching gallery:", error.message);
      } else if (data) {
        setPhotos(data);
        const uniqueCategories = ['All', ...Array.from(new Set(data.map((p: any) => p.category).filter(Boolean)))];
        setCategories(uniqueCategories as string[]);
      }
      setLoading(false);
    }
    fetchGallery();
  }, []);

  const filteredPhotos = filter === 'All' 
    ? photos 
    : photos.filter(photo => photo.category === filter);

  // NAVIGATION LOGIC
  const showNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % filteredPhotos.length);
    }
  };

  const showPrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#CAF0F8]">
      <Navbar />
      
      {/* FULLSCREEN LIGHTBOX MODAL WITH NAVIGATION */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#03045E]/95 backdrop-blur-md p-4 transition-all"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Close Button */}
          <button 
            className="absolute top-10 right-10 text-white/70 hover:text-white transition-colors"
            onClick={() => setSelectedIndex(null)}
          >
            <X size={40} />
          </button>

          {/* Previous Button */}
          <button 
            className="absolute left-4 md:left-10 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all border border-white/20"
            onClick={showPrev}
          >
            <ChevronLeft size={48} />
          </button>
          
          {/* The Image */}
          <div className="max-w-5xl max-h-[80vh] flex flex-col items-center">
            <img 
              src={filteredPhotos[selectedIndex].image_url} 
              alt="Fullscreen" 
              className="max-w-full max-h-full rounded-2xl shadow-2xl border-4 border-white/10 object-contain animate-in zoom-in-95 duration-300"
            />
            {/* Caption (Category/Event) */}
            <p className="text-white mt-6 font-bold uppercase tracking-widest text-sm bg-white/10 px-6 py-2 rounded-full border border-white/10">
              {filteredPhotos[selectedIndex].category || "Church Event"}
            </p>
          </div>

          {/* Next Button */}
          <button 
            className="absolute right-4 md:right-10 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all border border-white/20"
            onClick={showNext}
          >
            <ChevronRight size={48} />
          </button>
        </div>
      )}

      {/* Main Page Content */}
      <div className="flex-grow pt-40 pb-20 px-4 md:px-8">
        {/* ... (Your Header Island and Sort Buttons remain exactly the same) ... */}
        
        {/* Header Island */}
        <div className="max-w-7xl mx-auto mb-10 p-12 bg-white rounded-[40px] shadow-[0_20px_50px_rgba(3,4,94,0.15)] border border-white/60 text-center">
          <h1 className="text-5xl font-black text-[#03045E] mb-4 tracking-tighter">Photo Gallery</h1>
          <p className="text-[#0077B6] font-medium text-lg">Capturing the life and spirit of Teliposh Church.</p>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Sorting Buttons */}
          <div className="bg-white p-6 rounded-full shadow-[0_10px_30px_rgba(3,4,94,0.05)] border border-white/60 mb-12 flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 active:scale-95 ${
                  filter === cat 
                  ? 'bg-[#03045E] text-white shadow-lg' 
                  : 'bg-[#CAF0F8]/50 text-[#0077B6] hover:bg-[#CAF0F8]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#03045E]"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredPhotos.map((photo, index) => (
                <div 
                  key={photo.id} 
                  className="cursor-zoom-in transition-all duration-500 hover:scale-[1.03] active:scale-95"
                  onClick={() => setSelectedIndex(index)} // Open based on index
                >
                  <GalleryImage 
                    src={photo.image_url} 
                    category={photo.category || "Church Event"} 
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </main>
  );
}