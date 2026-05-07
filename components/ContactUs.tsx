"use client";
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Send, MapPin, Phone, Mail, Navigation } from 'lucide-react';

export default function ContactUs() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('messages')
      .insert([formData]);

    if (!error) {
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSuccess(false), 5000); 
    }
    setLoading(false);
  };

  return (
    <section id="contactus" className="scroll-mt-20">
    <div className="grid grid-cols-1 lg:grid-cols-2">
      {/* Left Side: Map & Contact Info */}
      <div className="bg-[#03045E] flex flex-col text-[#CAF0F8]">
        
        {/* GOOGLE MAP INTEGRATION */}
        <div className="w-full h-80 md:h-96 relative group overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14761.378036284457!2d84.79374025!3d22.340618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a201990c889f07f%3A0xc3f07a7e6c1e9e7b!2sTeliposh%2C%20Odisha!5e0!3m2!1sen!2sin!4v1715070000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Teliposh Church Location"
            className="opacity-80 contrast-125 grayscale-[0.3] group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
          ></iframe>
          
          {/* Floating 'Get Directions' Button */}
          <a 
            href="https://www.google.com/maps/dir//Teliposh,+Odisha" 
            target="_blank" 
            className="absolute bottom-6 right-6 bg-[#00B4D8] text-white p-4 rounded-2xl shadow-2xl flex items-center gap-2 font-bold text-sm hover:bg-[#90E0EF] hover:text-[#03045E] transition-all active:scale-95"
          >
            <Navigation size={18} /> Directions
          </a>
        </div>

        <div className="p-10 md:p-16 space-y-8">
          <h2 className="text-4xl font-black tracking-tighter">Visit Us</h2>
          
          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="p-3 bg-white/10 rounded-2xl"><MapPin className="text-[#00B4D8]" /></div>
              <div>
                <p className="font-bold">Location</p>
                <p className="text-[#90E0EF]/70 text-sm">Teliposh Church Road, Rourkela, Odisha</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="p-3 bg-white/10 rounded-2xl"><Phone className="text-[#00B4D8]" /></div>
              <div>
                <p className="font-bold">Call Us</p>
                <p className="text-[#90E0EF]/70 text-sm">+91 00000 00000</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="p-3 bg-white/10 rounded-2xl"><Mail className="text-[#00B4D8]" /></div>
              <div>
                <p className="font-bold">Email Us</p>
                <p className="text-[#90E0EF]/70 text-sm">contact@teliposhchurch.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: The Form */}
      <div className="p-10 md:p-20 bg-white flex items-center">
        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#03045E]">Name</label>
              <input 
                required
                type="text" 
                className="w-full bg-[#CAF0F8]/30 border-none rounded-xl p-4 text-[#03045E] focus:ring-2 focus:ring-[#00B4D8] outline-none transition-all"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#03045E]">Email</label>
              <input 
                required
                type="email" 
                className="w-full bg-[#CAF0F8]/30 border-none rounded-xl p-4 text-[#03045E] focus:ring-2 focus:ring-[#00B4D8] outline-none transition-all"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#03045E]">Subject</label>
            <input 
              type="text" 
              className="w-full bg-[#CAF0F8]/30 border-none rounded-xl p-4 text-[#03045E] focus:ring-2 focus:ring-[#00B4D8] outline-none transition-all"
              placeholder="Prayer Request"
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#03045E]">Message</label>
            <textarea 
              required
              rows={4}
              className="w-full bg-[#CAF0F8]/30 border-none rounded-xl p-4 text-[#03045E] focus:ring-2 focus:ring-[#00B4D8] outline-none transition-all resize-none"
              placeholder="Your message here..."
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            />
          </div>

          <button 
            disabled={loading}
            className="w-full bg-[#03045E] text-white py-5 rounded-2xl font-black uppercase tracking-tighter flex items-center justify-center gap-3 hover:bg-[#0077B6] transition-all disabled:opacity-50 active:scale-95 shadow-xl shadow-[#03045E]/20"
          >
            {loading ? "Sending..." : <>Send Message <Send size={18} /></>}
          </button>

          {success && (
            <p className="text-green-600 font-bold text-center animate-bounce">
              ✓ Message sent successfully!
            </p>
          )}
        </form>
      </div>
    </div>
    </section>
  );
}