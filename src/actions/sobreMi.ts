'use server';

import { createClient } from '@/lib/supabase/server';
import { createPublicClient } from '@/lib/supabase/public';
import { revalidatePath } from 'next/cache';

export async function getSobreMi() {
    try {
        const supabase = createPublicClient();
        const { data, error } = await supabase.from('sobre_mi').select('*');
        if (error) {
            console.error('Error fetching sobre_mi:', error);
            return {};
        }
        const map: Record<string, string> = {};
        data?.forEach(row => { map[row.id] = row.valor; });
        return map;
    } catch (err) {
        console.error('Error connecting to Supabase in getSobreMi:', err);
        return {};
    }
}

export async function updateSobreMi(id: string, valor: string) {
    const supabase = await createClient();
    const { error } = await supabase.from('sobre_mi').update({ valor }).eq('id', id);
    if (error) throw error;
    revalidatePath('/sobre-mi');
}
