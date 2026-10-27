'use client';

import { useEffect, useState } from 'react';

const codeLines = [
  { key: 'role', val: "'Full-Stack Dev'", color: 'text-emerald-300' },
  { key: 'stack', val: "['Next.js', 'TypeScript', 'PostgreSQL']", color: 'text-cyan-300' },
  { key: 'status', val: "'Buscando oportunidades'", color: 'text-amber-300' },
];

export default function CodeCard() {
  const [visible, setVisible] = useState(false);
  const [typing, setTyping] = useState(false);
  const [displayed, setDisplayed] = useState<string[]>(['', '', '']);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [hovered, setHovered] = useState(false);

  // Paso 1: card se despliega al cargar
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  // Paso 2: después de que aparece, empieza el typing
  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setTyping(true), 600);
      return () => clearTimeout(t);
    }
  }, [visible]);

  // Paso 3: typewriter efecto para los valores
  useEffect(() => {
    if (!typing || currentLine >= codeLines.length) return;
    const target = codeLines[currentLine].val;
    const timeout = setTimeout(() => {
      if (currentChar < target.length) {
        setDisplayed(prev => {
          const next = [...prev];
          next[currentLine] = target.slice(0, currentChar + 1);
          return next;
        });
        setCurrentChar(c => c + 1);
      } else {
        setCurrentLine(l => l + 1);
        setCurrentChar(0);
      }
    }, currentChar === 0 && currentLine > 0 ? 280 : 35);
    return () => clearTimeout(timeout);
  }, [typing, currentLine, currentChar]);

  return (
    <div
      className="hidden md:block absolute top-[12%] right-[3%] z-20"
      style={{ width: '360px', height: '270px' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Overlay invisible que captura el hover */}
      <div className="absolute inset-0 z-10" />
      
      {/* Card visual */}
      <div
        className="absolute top-0 right-0 w-[325px] h-full p-5 rounded-2xl flex flex-col justify-between"
        style={{
          background: 'rgba(12, 8, 4, 0.65)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 92, 0, 0.3)',
          boxShadow: hovered
            ? '0 0 45px rgba(255,92,0,0.3), 0 0 90px rgba(255,92,0,0.12), inset 0 1px 0 rgba(255,255,255,0.12), -6px 0 25px rgba(255,92,0,0.2)'
            : '0 0 25px rgba(255,92,0,0.18), 0 0 60px rgba(255,92,0,0.08), inset 0 1px 0 rgba(255,255,255,0.06), -4px 0 15px rgba(255,92,0,0.12)',
          transform: visible
            ? hovered
              ? 'perspective(800px) rotateY(-6deg) rotateX(2deg) scale(1.03)'
              : 'perspective(800px) rotateY(-18deg) rotateX(4deg)'
            : 'perspective(800px) rotateY(-18deg) rotateX(4deg) translateY(-30px)',
          opacity: visible ? 1 : 0,
          transition: 'transform 0.5s ease, box-shadow 0.4s ease, opacity 0.6s ease',
        }}
      >
        {/* Borde izquierdo con glow naranja */}
        <div
          className="absolute left-0 top-4 bottom-4 w-[2px] rounded-full"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,92,0,0.7), transparent)' }}
        />

        {/* Header estilo terminal / editor */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
            <span className="text-gray-400 text-xs font-mono ml-1.5">developer.ts</span>
          </div>

          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-mono text-emerald-400 font-semibold tracking-wide uppercase">
              Disponible
            </span>
          </div>
        </div>

        {/* Código con sintaxis destacada y typewriter */}
        <div className="font-mono text-[11.5px] leading-relaxed flex flex-col gap-1.5 my-auto">
          <div>
            <span className="text-[#FF5C00] font-semibold">const</span>{' '}
            <span className="text-amber-200">enzo</span> = &#123;
          </div>

          {codeLines.map((line, i) => (
            <div key={line.key} className="pl-3.5 flex items-center min-h-[20px] whitespace-nowrap">
              <span className="text-gray-400">{line.key}:</span>{' '}
              <span className={`ml-1.5 font-medium ${line.color}`}>
                {displayed[i]}
                {typing && currentLine === i && currentChar < line.val.length && (
                  <span className="animate-pulse text-[#FF5C00] ml-0.5 font-bold">|</span>
                )}
              </span>
              {displayed[i] === line.val && i < codeLines.length - 1 && (
                <span className="text-gray-500">,</span>
              )}
            </div>
          ))}

          <div>&#125;;</div>
        </div>

        {/* Footer de la card: stack resumido y acento naranja */}
        <div className="pt-2.5 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-gray-400">
            <span className="text-[#FF5C00] font-bold">&gt;</span> Full-Stack Engineer
          </div>
          <div className="w-8 h-[2px] bg-[#FF5C00] rounded-full shadow-[0_0_8px_#FF5C00]" />
        </div>
      </div>
    </div>
  );
}
