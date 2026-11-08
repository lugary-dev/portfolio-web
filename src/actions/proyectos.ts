'use server';

import { createClient } from '@/lib/supabase/server';
import { createPublicClient } from '@/lib/supabase/public';
import { revalidatePath } from 'next/cache';

export type Proyecto = {
    id: string;
    titulo: string;
    subtitulo: string;
    descripcion: string;
    imagen_url: string;
    github_url: string;
    demo_url: string;
    categoria: string[];
    tecnologias: string[];
    destacado: boolean;
    orden: number;
};

const MOCK_PROYECTOS: Proyecto[] = [
    {
        id: 'devflow-task-manager',
        titulo: 'DevFlow - Task & Sprint Manager',
        subtitulo: 'Plataforma colaborativa tipo Jira para equipos ágiles',
        descripcion: '<p>Aplicación full-stack diseñada para la gestión ágil de proyectos y sprints. Incluye tableros Kanban interactivos con drag-and-drop, asignación de tareas por roles, métricas de rendimiento del equipo y persistencia en base de datos PostgreSQL optimizada.</p>',
        imagen_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
        github_url: 'https://github.com',
        demo_url: 'https://demo.com',
        categoria: ['Full-Stack', 'Web Apps'],
        tecnologias: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind', 'Docker'],
        destacado: false,
        orden: 1,
    },
    {
        id: 'nexus-api-gateway',
        titulo: 'Nexus API - Microservicio & Auth',
        subtitulo: 'API RESTful modular con Clean Architecture',
        descripcion: '<p>Backend robusto desarrollado bajo principios de Arquitectura Limpia y SOLID. Cuenta con autenticación JWT, rate limiting, control de acceso basado en roles (RBAC), documentación interactiva con OpenAPI/Swagger y contenedorización en Docker.</p>',
        imagen_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
        github_url: 'https://github.com',
        demo_url: 'https://demo.com',
        categoria: ['APIs', 'Backend'],
        tecnologias: ['Node.js', 'TypeScript', 'PostgreSQL', 'Docker'],
        destacado: false,
        orden: 2,
    },
    {
        id: 'cryptopulse-dashboard',
        titulo: 'CryptoPulse - Analytics Dashboard',
        subtitulo: 'Monitoreo de activos y métricas en tiempo real',
        descripcion: '<p>Dashboard analítico enfocado en la visualización interactiva de cotizaciones y métricas financieras. Integra WebSockets para streaming de datos en vivo, filtros dinámicos, gráficos reactivos y un modo oscuro de alto contraste.</p>',
        imagen_url: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=800&auto=format&fit=crop&q=80',
        github_url: 'https://github.com',
        demo_url: 'https://demo.com',
        categoria: ['Frontend', 'Web Apps'],
        tecnologias: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
        destacado: false,
        orden: 3,
    },
    {
        id: 'lugary-marketplace',
        titulo: 'Lugary - Marketplace de Alquileres',
        subtitulo: 'Plataforma para reserva de propiedades y eventos',
        descripcion: '<p>Marketplace integral para alquileres temporarios y salones de eventos. Diseñado para ofrecer una experiencia fluida tanto a anfitriones como a huéspedes, con gestión de disponibilidad en calendario interactivo, panel de administración y arquitectura escalable.</p>',
        imagen_url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80',
        github_url: 'https://github.com',
        demo_url: 'https://demo.com',
        categoria: ['Full-Stack', 'Web Apps'],
        tecnologias: ['Java', 'Spring Boot', 'React', 'PostgreSQL', 'Tailwind'],
        destacado: false,
        orden: 4,
    },
];

export async function getProyectos() {
    try {
        const supabase = createPublicClient();
        const { data, error } = await supabase
            .from('proyectos')
            .select('*')
            .order('orden', { ascending: true });

        if (error || !data || data.length === 0) {
            return MOCK_PROYECTOS;
        }
        return data as Proyecto[];
    } catch {
        return MOCK_PROYECTOS;
    }
}

export async function createProyecto(proyecto: Omit<Proyecto, 'id'>) {
    const supabase = await createClient();
    const { error } = await supabase.from('proyectos').insert([proyecto]);
    if (error) throw error;
    revalidatePath('/proyectos');
    revalidatePath('/admin');
}

export async function updateProyecto(id: string, proyecto: Partial<Proyecto>) {
    const supabase = await createClient();
    const { error } = await supabase.from('proyectos').update(proyecto).eq('id', id);
    if (error) throw error;
    revalidatePath('/proyectos');
    revalidatePath('/admin');
}

export async function deleteProyecto(id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from('proyectos').delete().eq('id', id);
    if (error) throw error;
    revalidatePath('/proyectos');
    revalidatePath('/admin');
}

export async function getProyectoById(id: string) {
    const mock = MOCK_PROYECTOS.find(p => p.id === id);
    if (mock) return mock;

    try {
        const supabase = createPublicClient();
        const { data, error } = await supabase
            .from('proyectos')
            .select('*')
            .eq('id', id)
            .single();
        if (error || !data) {
            return null;
        }
        return data as Proyecto;
    } catch {
        return null;
    }
}
