import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Cliente público sin cookies para lecturas públicas (permite precarga estática en segundo plano y respuesta en 0ms)
export function createPublicClient() {
    return createSupabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            auth: {
                persistSession: false,
                autoRefreshToken: false,
            },
        }
    );
}
