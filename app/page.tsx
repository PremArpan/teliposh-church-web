"use client";
import { useEffect, useState } from "react";
import { supabase } from '@/lib/supabase';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import EventsNotices from "@/components/EventsNotices";
import MemberCard from "@/components/MemberCard";
import GalleryImage from '@/components/GalleryImage';
import ContactUs from "@/components/ContactUs";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  const [groupedMembers, setGroupedMembers] = useState<{ [key: string]: any[] }>({});
  const [gallery, setGallery] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Home page target committees
  const targetCommittees = ["Pastorate Committee", "Mandli Committee"];

  useEffect(() => {
    async function fetchData() {
      // 1. Fetch Committee Members filtered by specific types
      const { data: memberData } = await supabase
        .from('members')
        .select('*')
        .in('committee_type', targetCommittees)
        .order('created_at', { ascending: true });

      if (memberData) {
        const grouped = memberData.reduce((acc: any, member: any) => {
          const type = member.committee_type;
          if (!acc[type]) acc[type] = [];
          acc[type].push(member);
          return acc;
        }, {});
        setGroupedMembers(grouped);
      }

      // 2. Fetch All Gallery Images and Shuffle for Randomness
      const { data: galleryData } = await supabase
        .from('gallery')
        .select('*');

      if (galleryData) {
        // Simple Fisher-Yates shuffle or sort random
        const randomGallery = [...galleryData]
          .sort(() => 0.5 - Math.random())
          .slice(0, 6); // Take only 6 for home page
        setGallery(randomGallery);
      }
      
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <main className="min-h-screen flex flex-col bg-[#CAF0F8] space-y-4">
      <Navbar />

      <div className="pt-32">
        <Hero />
      </div>

      {/* ABOUT SECTION */}
      <section id="about" className="px-4 md:px-8 py-10">
        <div className="max-w-7xl mx-auto py-20 px-10 text-center bg-white rounded-[40px] shadow-[0_20px_50px_rgba(3,4,94,0.15)] border border-white/60">
          <h2 className="text-4xl font-black mb-8 text-[#03045E] tracking-tighter">Our History</h2>
          <p className="text-[#0077B6] text-lg leading-relaxed font-light max-w-4xl mx-auto">
            Teliposh Church has been a cornerstone of the community for generations, providing a sanctuary for faith and a hub for service in the Rourkela region.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="h-1 w-20 bg-[#00B4D8] rounded-full"></div>
          </div>
        </div>
      </section>

      <EventsNotices />

      {/* COMMITTEE SECTION - Grouped specifically for Home Page */}
      <section id="committee" className="px-4 md:px-8 py-10">
        <div className="max-w-7xl mx-auto bg-white rounded-[40px] shadow-[0_20px_50px_rgba(3,4,94,0.15)] border border-white/60 overflow-hidden">
          <div className="p-10 md:p-16 flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <h2 className="text-4xl font-black text-[#03045E] tracking-tighter">Church Leadership</h2>
              <p className="text-[#0077B6] mt-2 font-medium">Meet the hearts serving our community.</p>
            </div>
            <Link href="/committee" className="bg-[#03045E] text-[#CAF0F8] px-8 py-4 rounded-full font-bold hover:bg-[#0077B6] transition-all shadow-lg active:scale-95">
              View All Committees
            </Link>
          </div>

          <div className="p-10 md:p-16 pt-0 space-y-16">
            {loading ? (
              <div className="flex justify-center py-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#03045E]"></div></div>
            ) : (
              targetCommittees.map((type) => (
                groupedMembers[type] && (
                  <div key={type}>
                    <div className="flex items-center space-x-6 mb-10">
                      <h3 className="text-xl font-black text-[#03045E] uppercase tracking-widest">{type}</h3>
                      <div className="h-[2px] flex-1 bg-[#CAF0F8]"></div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                      {groupedMembers[type].map((person) => (
                        <MemberCard
                          key={person.id}
                          name={person.name}
                          role={person.designation}
                          period={person.service_period}
                          imageUrl={person.image_url}
                        />
                      ))}
                    </div>
                  </div>
                )
              ))
            )}
          </div>
        </div>
      </section>

      {/* GALLERY SECTION - Randomly Loaded */}
      <section id="gallery" className="px-4 md:px-8 py-10">
        <div className="max-w-7xl mx-auto text-center py-20 px-10 bg-white rounded-[40px] shadow-[0_20px_50px_rgba(3,4,94,0.15)] border border-white/60">
          <h2 className="text-4xl font-black text-[#03045E] mb-4 tracking-tighter">Our Moments</h2>
          <p className="text-[#0077B6] mb-12 font-medium">Capturing the life and spirit of Teliposh Church.</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
            {gallery.map((photo) => (
              <GalleryImage 
                key={photo.id} 
                src={photo.image_url} 
                event={photo.event_name || "Church Event"} 
              />
            ))}
          </div>

          <Link href="/gallery" className="inline-block border-2 border-[#03045E] text-[#03045E] px-10 py-4 rounded-full font-black hover:bg-[#03045E] hover:text-white transition-all active:scale-95">
            Explore Full Gallery
          </Link>
        </div>
      </section>

      <div className="px-4 md:px-8 py-10">
        <div className="max-w-7xl mx-auto bg-white rounded-[40px] shadow-[0_20px_50px_rgba(3,4,94,0.15)] border border-white/60 overflow-hidden">
          <ContactUs />
        </div>
      </div>

      <Footer />
    </main>
  );
}