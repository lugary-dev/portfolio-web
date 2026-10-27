import { getProyectoById } from '@/actions/proyectos';
import { notFound } from 'next/navigation';
import DetalleProyectoSection from '@/components/detalleproyecto/DetalleProyectoSection';

export const revalidate = 3600;

export default async function DetalleProyectoPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const proyecto = await getProyectoById(id).catch(() => null);
    if (!proyecto) notFound();
    return <DetalleProyectoSection proyecto={proyecto} />;
}
