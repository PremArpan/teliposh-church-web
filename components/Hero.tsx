"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase"; // Ensure this path is correct

export default function Hero() {
  const [images, setImages] = useState<string[]>([]); // Dynamic state for images
  const [index, setIndex] = useState(0);

  // Fetch images from Supabase instead of hardcoded array
useEffect(() => {
  async function fetchHeroImages() {
    try {
      const { data, error } = await supabase
        .from("hero_settings")
        .select("image_url")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (error) {
        console.error("Supabase Error:", error.message);
        return;
      }

      if (data && data.length > 0) {
        const urls = data.map((item) => item.image_url).filter(Boolean); // Filter out any null URLs
        setImages(urls);
      }
    } catch (err) {
      console.error("Unexpected Error:", err);
    }
  }
  fetchHeroImages();
}, []);

  // Slideshow logic
  useEffect(() => {
    if (images.length === 0) return; // Wait until images are loaded
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images]);
  
  return (
    <div className="px-4 md:px-8 pt-16 pb-10">
      <div
        className="relative h-[75vh] w-full overflow-hidden bg-[#03045E] rounded-[40px] 
      shadow-[0_30px_70px_rgba(3,4,94,0.3)] border border-[#90E0EF]/20"
      >
        <AnimatePresence mode="wait">
          {images.length > 0 ? (
            <motion.img
              key={index}
              src={images[index]}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.5, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            // This shows while Supabase is fetching or if the table is empty
            <div className="absolute inset-0 w-full h-full bg-[#03045E] flex items-center justify-center">
              <p className="text-[#90E0EF] animate-pulse font-bold">
                Loading Sanctuary...
              </p>
            </div>
          )}
        </AnimatePresence>

        {/* Content Overlay - Stays static while images change */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-[#CAF0F8] text-center px-6">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-5xl md:text-8xl font-black tracking-tighter leading-none"
          >
            Welcome to <br />
            <span className="text-[#90E0EF]">Teliposh Church</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-6 text-lg md:text-2xl font-light max-w-3xl text-[#90E0EF]/80"
          >
            A Christ-centered community dedicated to faith, fellowship, and
            service.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-10"
          >
            <button className="bg-[#00B4D8] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[#0077B6] transition-all hover:shadow-[0_0_20px_rgba(0,180,216,0.5)]">
              Join Our Service
            </button>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#03045E] to-transparent opacity-60"></div>
      </div>
    </div>
  );
}

