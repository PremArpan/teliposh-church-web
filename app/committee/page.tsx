"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import MemberCard from '@/components/MemberCard';
import Footer from '@/components/Footer';

export default function CommitteePage() {
  const [committees, setCommittees] = useState<{ [key: string]: any[] }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllMembers() {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error("Error fetching committee data:", error.message);
      } else if (data) {
        // GROUPING LOGIC: Organizes members by their committee_type
        const grouped = data.reduce((acc: any, member: any) => {
          const type = member.committee_type || 'General Members';
          if (!acc[type]) acc[type] = [];
          acc[type].push(member);
          return acc;
        }, {});
        
        setCommittees(grouped);
      }
      setLoading(false);
    }
    fetchAllMembers();
  }, []);

  return (
    <main className="min-h-screen flex flex-col bg-[#CAF0F8]">
      <Navbar />
      
      <div className="flex-grow pt-40 pb-20 px-4 md:px-8">
        {/* Header Island */}
        <div className="max-w-7xl mx-auto mb-10 p-12 bg-white rounded-[40px] shadow-[0_20px_50px_rgba(3,4,94,0.15)] border border-white/60 text-center">
          <h1 className="text-5xl font-black text-[#03045E] mb-4 tracking-tighter">
            Our Church Leadership
          </h1>
          <p className="text-[#0077B6] text-lg font-medium max-w-2xl mx-auto">
            A dedicated community of members serving across various ministries at Teliposh Church.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#03045E]"></div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto space-y-12">
            {Object.keys(committees).map((type) => (
              /* Each Committee Type gets its own Floating Island */
              <section key={type} className="bg-white p-10 md:p-16 rounded-[40px] shadow-[0_20px_50px_rgba(3,4,94,0.15)] border border-white/60">
                <div className="flex items-center space-x-6 mb-12">
                  <h2 className="text-2xl md:text-3xl font-black text-[#03045E] uppercase tracking-widest whitespace-nowrap">
                    {type}
                  </h2>
                  <div className="h-[2px] flex-1 bg-[#CAF0F8]"></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
                  {committees[type].map((member) => (
                    <MemberCard 
                      key={member.id} 
                      name={member.name} 
                      role={member.designation} 
                      period={member.service_period}
                      imageUrl={member.image_url} 
                    />
                  ))}
                </div>
              </section>
            ))}

            {Object.keys(committees).length === 0 && (
              <div className="bg-white p-20 rounded-[40px] text-center">
                <p className="text-[#0077B6] font-bold">No committee data found in the database.</p>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}