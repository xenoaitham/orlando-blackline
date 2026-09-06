export const themeParkLogos = [
  {
    name: "Walt Disney World",
    src: "https://upload.wikimedia.org/wikipedia/commons/b/be/Walt_Disney_World_Resort_logo.svg",
    className: "h-12 md:h-16 w-auto object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300"
  },
  {
    name: "Universal Orlando",
    src: "/images/universal-globe.svg",
    className: "h-10 md:h-14 w-auto object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300"
  },
  {
    name: "SeaWorld Orlando",
    src: "/images/seaworld-logo.svg",
    className: "h-10 md:h-14 w-auto object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300"
  },
  {
    name: "LEGOLAND Florida",
    src: "/images/Legoland_Parks_logo.svg",
    className: "h-8 md:h-12 w-auto object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300"
  },
  {
    name: "Orlando International Airport (MCO)",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/MCO_airport_logo.svg/500px-MCO_airport_logo.svg.png",
    className: "h-12 md:h-16 w-auto object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300"
  },
  {
    name: "Port Canaveral",
    src: "https://www.portcanaveral.com/images/default-source/logos/group-9115.svg",
    className: "h-12 md:h-16 w-auto object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300"
  },
  {
    name: "Disney Cruise Line",
    src: "https://upload.wikimedia.org/wikipedia/en/6/6f/Disney_Cruise_Line_logo.svg",
    className: "h-12 md:h-16 w-auto object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300"
  },
  {
    name: "Orlando Sanford International Airport (SFB)",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Orlando_Sanford_International_Airport_logo.svg/500px-Orlando_Sanford_International_Airport_logo.svg.png",
    className: "h-10 md:h-14 w-auto object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300"
  },
  {
    name: "Royal Caribbean",
    src: "https://upload.wikimedia.org/wikipedia/commons/1/15/Royal_Caribbean_logo_%282024%29.svg",
    className: "h-12 md:h-16 w-auto object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300"
  },
  {
    name: "Orange County Convention Center",
    src: "https://www.occc.net/Portals/0/Images/OCCCLogo.png",
    className: "h-12 md:h-16 w-auto object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300"
  },
  {
    name: "Brightline",
    src: "/images/brightline-logo.svg",
    className: "h-8 md:h-12 w-auto object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300"
  }
];

export default function PartnerLogos() {
  return (
    <section className="py-12 bg-[#050505] border-t border-white/5 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 mb-8">
        <p className="text-center font-mono text-[#D4AF37] text-xs tracking-[0.2em] uppercase">
          Destinations We Serve
        </p>
      </div>
      
      {/* Marquee Container */}
      <div className="relative flex overflow-x-hidden group">
        {/* Gradient Masks */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
        
        {/* Animated Track */}
        <div className="flex animate-marquee group-hover:[animation-play-state:paused] w-max">
          {/* First set of logos */}
          <div className="flex items-center gap-16 md:gap-24 px-8 md:px-12">
            {themeParkLogos.map((logo, i) => (
              <img key={`first-${i}`} src={logo.src} alt={logo.name} className={`${logo.className} max-w-none`} />
            ))}
          </div>
          {/* Second set of logos for seamless loop */}
          <div className="flex items-center gap-16 md:gap-24 px-8 md:px-12">
            {themeParkLogos.map((logo, i) => (
              <img key={`second-${i}`} src={logo.src} alt={logo.name} className={`${logo.className} max-w-none`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
