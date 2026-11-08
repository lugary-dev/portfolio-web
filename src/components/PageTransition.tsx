'use client';

import { motion, AnimatePresence, useReducedMotion, type Variants } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useRef, useContext } from 'react';
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const ROUTE_ORDER: { pattern: RegExp; order: number }[] = [
  { pattern: /^\/$/, order: 0 },
  { pattern: /^\/proyectos(\/.*)?$/, order: 1 },
  { pattern: /^\/detalleproyecto(\/.*)?$/, order: 1 },
  { pattern: /^\/sobre-mi$/, order: 2 },
  { pattern: /^\/contacto$/, order: 3 },
  { pattern: /^\/admin(\/.*)?$/, order: 4 },
];

function getRouteOrder(path: string): number {
  for (const route of ROUTE_ORDER) {
    if (route.pattern.test(path)) return route.order;
  }
  return 1;
}

// Congela el router para que la pantalla que se despide mantenga su contenido intacto mientras es empujada
function FrozenRouter({ children }: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext ?? {});
  const frozen = useRef(context).current;

  if (!frozen) {
    return <>{children}</>;
  }

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {children}
    </LayoutRouterContext.Provider>
  );
}

// Transición tipo "Push Carousel" limpia, suave y ordenada:
// Al avanzar (izq a der): la pantalla actual se empuja a la izquierda (-100%) y entra la de la derecha (100% -> 0%)
// Al retroceder (der a izq): la pantalla actual se empuja a la derecha (100%) y entra la de la izquierda (-100% -> 0%)
const variants: Variants = {
  initial: (dir: number) => ({
    x: dir > 0 ? '100%' : '-100%',
    opacity: 0.7,
    filter: 'blur(3px)',
  }),
  animate: {
    x: 0,
    opacity: 1,
    filter: 'none',
    transitionEnd: {
      transform: 'none',
      filter: 'none',
    },
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1] as const, // Inercia suave y elástica de consola/carousel
    },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? '-100%' : '100%',
    opacity: 0.7,
    filter: 'blur(3px)',
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  const prevPathRef = useRef<string>(pathname);
  const directionRef = useRef<number>(1);

  if (prevPathRef.current !== pathname) {
    const prevOrder = getRouteOrder(prevPathRef.current);
    const currOrder = getRouteOrder(pathname);
    directionRef.current = currOrder >= prevOrder ? 1 : -1;
    prevPathRef.current = pathname;
  }

  const direction = directionRef.current;

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <div className="relative w-full min-h-screen overflow-x-clip">
      <AnimatePresence mode="popLayout" initial={false} custom={direction}>
        <motion.div
          key={pathname}
          custom={direction}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full min-h-screen"
        >
          <FrozenRouter>{children}</FrozenRouter>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
