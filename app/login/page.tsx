"use client";
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      setError(error.message);
    } else {
      router.push('/admin'); // Redirect to dashboard on success
    }
  };

  return (
    <main className="min-h-screen bg-[#CAF0F8] flex items-center justify-center px-4">
      <Navbar />
      <div className="max-w-md w-full bg-white p-10 rounded-[40px] shadow-2xl border border-white/60">
        <h1 className="text-3xl font-black text-[#03045E] mb-2 tracking-tighter text-center">Admin Portal</h1>
        <p className="text-[#0077B6] text-center mb-8 text-sm">Authorized Personnel Only</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="email" 
            placeholder="Admin Email" 
            className="admin-input" 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="admin-input" 
            onChange={(e) => setPassword(e.target.value)} 
          />
          {error && <p className="text-red-500 text-xs font-bold text-center">{error}</p>}
          <button className="w-full bg-[#03045E] text-white py-4 rounded-2xl font-black uppercase hover:bg-[#00B4D8] transition-all">
            Sign In
          </button>
        </form>
      </div>
    </main>
  );
}