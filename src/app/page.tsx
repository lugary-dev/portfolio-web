import Link from 'next/link';
import { ArrowRight, Send } from 'lucide-react';
import { FaReact, FaNodeJs, FaDocker, FaDatabase } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript } from 'react-icons/si';
import CodeCard from '@/components/CodeCard';

export default function Home() {
  return (
    <main className="bg-transparent relative">
      <style>{`
        .bg-mobile { top: 30px; }
        @media (min-width: 375px) { .bg-mobile { top: 25px; } }
        @media (min-width: 425px) { .bg-mobile { top: 10px; } }
      `}</style>
      <img src="/fondoDePantalla.webp" alt="" className="hidden md:block absolute inset-0 w-full h-full object-cover pointer-events-none -z-20" />
      <img src="/fondoDePantallaMobile.webp" alt="" className="bg-mobile md:hidden absolute left-1/2 -translate-x-1/2 max-w-[425px] w-full pointer-events-none -z-20" />
      
      {/* Sombreado suave en gradiente para maximizar contraste y legibilidad del texto */}
      <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#050507]/90 via-[#050507]/45 to-transparent pointer-events-none -z-10" />

      {/* Sección principal */}
      <div className="relative min-h-screen h-screen flex items-start md:items-center justify-center overflow-visible md:overflow-hidden md:py-0">
        <CodeCard />

        <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-12 px-6 max-w-6xl w-full z-10">
          {/* Columna Izquierda */}
          <div className="flex flex-col justify-center gap-2 mt-[380px] md:mt-16 pb-18 md:pb-0">
            <div>
              <h1 className="text-6xl md:text-7xl text-white leading-none" style={{ fontFamily: 'var(--font-bebas)' }}>Enzo</h1>
              <h1 className="text-[4.5rem] md:text-[6rem] text-[#FF5C00] leading-none" style={{ fontFamily: 'var(--font-bebas)' }}>Fernandez</h1>
            </div>
            
            <p className="font-semibold text-xl text-white" style={{ fontFamily: 'var(--font-barlow)' }}>
              Estudiante de Ingeniería en Sistemas | Desarrollador Full-Stack
            </p>

            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl" style={{ fontFamily: 'var(--font-barlow)' }}>
              Desarrollo aplicaciones web completas, <span className="text-white font-medium">desde la interfaz hasta la base de datos</span> con Next.js, TypeScript y PostgreSQL. Priorizo el rendimiento, la mantenibilidad y una experiencia de usuario cuidada.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Link href="/proyectos"
                prefetch={true}
                className="group bg-[#FF5C00] hover:bg-[#e05200] text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all duration-200 w-full sm:w-auto justify-center shadow-lg shadow-[#FF5C00]/25 hover:shadow-[#FF5C00]/40 hover:-translate-y-0.5 active:translate-y-0"
                style={{ fontFamily: 'var(--font-barlow)' }}>
                Ver mis proyectos <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link href="/contacto"
                prefetch={true}
                className="group border border-white/30 hover:border-[#FF5C00] hover:bg-[#FF5C00]/10 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all duration-200 w-full sm:w-auto justify-center hover:-translate-y-0.5 active:translate-y-0"
                style={{ fontFamily: 'var(--font-barlow)' }}>
                Contactar <Send size={16} className="transition-transform duration-300 group-hover:rotate-45" />
              </Link>
            </div>

            {/* Tecnologías */}
            <div className="mt-4">
              <p className="text-gray-400 text-sm mb-3">Tecnologías principales</p>
              <div className="grid grid-cols-3 sm:flex gap-3">
                {[
                  { icon: <FaReact size={24} className="text-[#61DAFB]" />, bg: 'bg-black/60', label: 'React' },
                  { icon: <SiNextdotjs size={24} className="text-white" />, bg: 'bg-black/60', label: 'Next.js' },
                  { icon: <SiTypescript size={24} className="text-[#3178C6]" />, bg: 'bg-black/60', label: 'TypeScript' },
                  { icon: <FaNodeJs size={24} className="text-[#68A063]" />, bg: 'bg-black/60', label: 'Node.js' },
                  { icon: <FaDatabase size={24} className="text-[#336791]" />, bg: 'bg-black/60', label: 'PostgreSQL' },
                  { icon: <FaDocker size={24} className="text-[#2496ED]" />, bg: 'bg-black/60', label: 'Docker' },
                ].map((tech, i) => (
                  <div key={i} className="group flex flex-col items-center gap-1">
                    <div className={`w-12 h-12 rounded-xl ${tech.bg} border border-white/10 flex items-center justify-center transition-transform duration-200 group-hover:scale-110 group-hover:border-[#FF5C00]/50`}>
                      {tech.icon}
                    </div>
                    <span className="text-white/70 text-xs sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200" style={{ fontFamily: 'var(--font-barlow)' }}>
                      {tech.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div />
        </div>
        
        {/* Scroll indicator */}
        <Link 
          href="/proyectos" 
          prefetch={true}
          aria-label="Ir a proyectos"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 md:flex hidden opacity-70 hover:opacity-100 transition-opacity cursor-pointer group"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/40 group-hover:border-[#FF5C00] flex justify-center pt-2 transition-colors">
            <div className="w-1.5 h-2.5 bg-[#FF5C00] rounded-full animate-bounce" />
          </div>
          <span className="text-[10px] tracking-widest uppercase text-gray-400 group-hover:text-white transition-colors" style={{ fontFamily: 'var(--font-dm-mono)' }}>
            Scroll
          </span>
        </Link>
      </div>
    </main>
  );
}
