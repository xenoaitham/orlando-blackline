import { useState } from 'react'
import { ArrowRight, Users, Briefcase, ChevronRight } from 'lucide-react'

export interface VehicleData {
  name: string
  type: string
  seats: string | number
  bags: string | number
  image: string
  price?: string
}

interface SpotlightGarageProps {
  vehicles: VehicleData[]
}

export default function SpotlightGarage({ vehicles }: SpotlightGarageProps) {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleData | null>(null)

  const openBooking = () => {
    window.dispatchEvent(new CustomEvent('open-booking'))
  }

  if (selectedVehicle) {
    return (
      <div className="animate-in fade-in duration-1000 bg-[#050505] w-full pt-12 pb-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <button 
            onClick={() => setSelectedVehicle(null)}
            className="mb-8 inline-flex items-center gap-2 text-[#A0A0A0] hover:text-[#D4AF37] transition-colors font-mono text-xs uppercase tracking-widest"
          >
            <ChevronRight className="rotate-180" size={14} /> Back to Garage
          </button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/3] lg:aspect-[16/9] w-full rounded-lg overflow-hidden border border-[#333] shadow-[0_0_50px_rgba(0,0,0,0.8)]">
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10" />
              <img 
                src={selectedVehicle.image} 
                alt={selectedVehicle.name} 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div>
              <p className="font-mono text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-4">
                {selectedVehicle.type}
              </p>
              <h2 className="font-display text-4xl md:text-6xl text-white mb-8">
                {selectedVehicle.name}
              </h2>
              
              <div className="flex flex-wrap items-center gap-6 lg:gap-8 mb-12 border-y border-white/10 py-6">
                <div className="flex items-center gap-4">
                  <Users size={24} className="text-[#A0A0A0]" />
                  <div>
                    <p className="font-mono text-white/50 text-[10px] tracking-widest uppercase">Capacity</p>
                    <p className="font-display text-white text-xl">{selectedVehicle.seats} Passengers</p>
                  </div>
                </div>
                <div className="hidden lg:block w-[1px] h-12 bg-white/10" />
                <div className="flex items-center gap-4">
                  <Briefcase size={24} className="text-[#A0A0A0]" />
                  <div>
                    <p className="font-mono text-white/50 text-[10px] tracking-widest uppercase">Luggage</p>
                    <p className="font-display text-white text-xl">{selectedVehicle.bags} Bags</p>
                  </div>
                </div>
                {selectedVehicle.price && (
                  <>
                    <div className="hidden lg:block w-[1px] h-12 bg-white/10" />
                    <div className="flex items-center gap-4">
                      <div className="text-[#D4AF37] text-2xl font-display">$</div>
                      <div>
                        <p className="font-mono text-white/50 text-[10px] tracking-widest uppercase">Rate</p>
                        <p className="font-display text-[#D4AF37] text-xl">{selectedVehicle.price}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              <p className="font-body text-[#A0A0A0] text-lg leading-relaxed mb-12">
                Experience unparalleled comfort and prestige in the {selectedVehicle.name}. 
                Meticulously maintained and perfectly appointed, this {selectedVehicle.type.toLowerCase()} 
                offers the definitive luxury transportation experience for your journey.
              </p>
              
              <button
                onClick={openBooking}
                className="w-full sm:w-auto bg-[#D4AF37] text-[#050505] px-12 py-5 font-display text-sm uppercase tracking-[0.1em] font-bold hover:bg-white transition-colors duration-300 flex items-center justify-center gap-3"
              >
                Reserve This Vehicle <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full relative py-12">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 px-6 lg:px-16">
        {vehicles.map((vehicle, index) => (
          <div 
            key={index}
            onClick={() => setSelectedVehicle(vehicle)}
            className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded border border-white/5 bg-[#0a0a0a]"
          >
            {/* The Image - Default is dark/desaturated */}
            <img 
              src={vehicle.image} 
              alt={vehicle.name} 
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-all duration-700 ease-out filter grayscale-0 brightness-100 md:grayscale-[80%] md:brightness-50 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 md:group-hover:scale-110"
            />
            
            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent opacity-100 md:opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Top Badge */}
            <div className="absolute top-6 left-6 transform translate-y-0 opacity-100 md:-translate-y-4 md:opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <span className="bg-[#D4AF37] text-[#050505] text-[10px] font-bold tracking-widest uppercase px-3 py-1">
                {vehicle.type}
              </span>
            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="font-display text-white text-2xl md:text-3xl mb-1 transform translate-y-0 md:translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                {vehicle.name}
              </h3>
              
              {/* Specs that fade in on hover */}
              <div className="flex items-center gap-4 mt-4 overflow-hidden h-8 md:h-0 group-hover:h-8 transition-all duration-500 opacity-100 md:opacity-0 group-hover:opacity-100">
                <span className="flex items-center gap-2 font-mono text-[#A0A0A0] text-xs">
                  <Users size={14} className="text-[#D4AF37]" /> {vehicle.seats}
                </span>
                <span className="flex items-center gap-2 font-mono text-[#A0A0A0] text-xs">
                  <Briefcase size={14} className="text-[#D4AF37]" /> {vehicle.bags}
                </span>
                {vehicle.price && (
                  <span className="flex items-center gap-2 font-mono text-[#D4AF37] text-xs font-bold ml-auto">
                    {vehicle.price}
                  </span>
                )}
              </div>
            </div>
            
            {/* Hover Frame Effect */}
            <div className="absolute inset-0 border-[3px] border-transparent group-hover:border-[#D4AF37]/20 transition-colors duration-500 rounded pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  )
}
