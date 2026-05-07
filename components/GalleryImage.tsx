// Change 'event' to 'category' to match your DB column
export default function GalleryImage({ src, category }: { src: string, category: string }) {
  return (
    <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-200 group cursor-pointer">
      <img 
        src={src} 
        alt={category} 
        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" 
      />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
        <p className="text-white text-sm font-medium">{category}</p>
      </div>
    </div>
  );
}