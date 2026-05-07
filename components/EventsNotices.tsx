"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function EventsNotices() {
  const [notices, setNotices] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      // Fetch Notices
      const { data: noticeData } = await supabase
        .from('announcements')
        .select('*')
        .eq('type', 'notice')
        .order('created_at', { ascending: false });

      // Fetch Events
      const { data: eventData } = await supabase
        .from('announcements')
        .select('*')
        .eq('type', 'event')
        .order('event_date', { ascending: true });

      if (noticeData) setNotices(noticeData);
      if (eventData) setEvents(eventData);
    }
    fetchData();
  }, []);

  return (
    <section id="events" className="py-20 px-4 md:px-8 bg-[#CAF0F8]/30">
      <div className="max-w-7xl mx-auto h-[85vh] flex flex-col md:flex-row bg-white rounded-[40px] overflow-hidden shadow-2xl border border-[#90E0EF]/40">
        
        {/* LEFT SIDE: Real Notices */}
        <div className="w-full md:w-1/3 h-full flex flex-col border-r border-[#CAF0F8]">
          <div className="p-10 pb-6"><h2 className="text-2xl font-black text-[#03045E]">Community Notices</h2></div>
          <div className="flex-1 overflow-y-auto p-10 pt-0 space-y-6">
            {notices.map((item) => (
              <div key={item.id} className="border-b border-[#CAF0F8]/50 pb-6 p-4 rounded-2xl hover:bg-[#CAF0F8]/20 transition-all">
                <span className="text-[10px] font-black text-[#0077B6] uppercase">
                  {new Date(item.created_at).toLocaleDateString()}
                </span>
                <h3 className="font-bold text-lg text-[#03045E]">{item.title}</h3>
                <p className="text-[#0077B6] text-sm mt-2">{item.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE: Real Events */}
        <div className="w-full md:w-2/3 h-full flex flex-col bg-[#CAF0F8]/20">
          <div className="p-10 pb-6"><h2 className="text-2xl font-black text-[#03045E]">Upcoming Events</h2></div>
          <div className="flex-1 overflow-y-auto p-10 pt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {events.map((event) => (
                <div key={event.id} className="bg-white rounded-[32px] shadow-lg border border-[#90E0EF]/30 overflow-hidden group">
                  {/* Image from Supabase Storage */}
                  <div className="h-48 bg-[#0077B6] relative">
                    <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-8">
                    <h3 className="font-bold text-xl text-[#03045E]">{event.title}</h3>
                    <p className="text-[#0077B6] text-sm mb-6">{event.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}