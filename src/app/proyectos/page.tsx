import { getProyectos } from '@/actions/proyectos';
import ProyectosSection from '@/components/proyectos/ProyectosSection';

export const revalidate = 3600; // Cache ISR: carga instantánea en 0ms; se purga automáticamente con revalidatePath

export default async function ProyectosPage() {
    const proyectos = await getProyectos();
    return (
        <div className="relative z-0 min-h-screen">
            <img src="/fondoPantallaProyectos.webp" alt="" className="hidden md:block fixed inset-0 w-full h-full object-cover pointer-events-none -z-10" />
            <img 
              src="/fondoPantallaProyectosMobile.webp" 
              alt="" 
              className="md:hidden fixed inset-0 w-full h-full object-cover pointer-events-none -z-10" 
              style={{ objectPosition: '-200px center' }}
            />
            <ProyectosSection proyectos={proyectos} />
        </div>
    );
}
