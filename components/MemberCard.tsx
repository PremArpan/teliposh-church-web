export default function MemberCard({ 
  name, 
  role, 
  period, 
  imageUrl 
}: { 
  name: string, 
  role: string, 
  period: string, 
  imageUrl?: string // Added optional imageUrl prop
}) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
      <div className="w-24 h-24 bg-slate-200 rounded-full mb-4 overflow-hidden flex items-center justify-center">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback if image fails to load
              (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + name;
            }}
          />
        ) : (
          /* Fallback icon or initials if no image exists */
          <span className="text-slate-400 text-2xl font-bold">{name.charAt(0)}</span>
        )}
      </div>
      <h3 className="font-bold text-lg text-slate-900">{name}</h3>
      <p className="text-blue-600 text-sm font-medium">{role}</p>
      <p className="text-slate-500 text-xs mt-1">{period}</p>
    </div>
  );
}