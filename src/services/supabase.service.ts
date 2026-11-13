import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { env } from '../config/env.js';

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!client) {
    const key = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_ANON_KEY;
    client = createClient(env.SUPABASE_URL, key);
  }
  return client;
}

export const supabaseService = {
  // Campeonatos
  async getChampionships() {
    const { data, error } = await getSupabase()
      .from('championships')
      .select('*')
      .order('created_at', { ascending: true });
    if (error) throw error;
    return data || [];
  },

  async getChampionshipBySlug(slug: string) {
    const { data, error } = await getSupabase()
      .from('championships')
      .select('*')
      .eq('slug', slug)
      .single();
    if (error) return null;
    return data;
  },

  // Calendario / Fechas
  async getRounds(championshipSlug: string) {
    const { data, error } = await getSupabase()
      .from('rounds')
      .select('*')
      .eq('championship_slug', championshipSlug)
      .order('round_number', { ascending: true });
    if (error) throw error;
    return data || [];
  },

  // Clasificación / Standings
  async getStandings(championshipSlug: string, category?: string) {
    let query = getSupabase()
      .from('standings')
      .select('*')
      .eq('championship_slug', championshipSlug);

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query.order('points', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  // Resultados de una fecha
  async getResults(championshipSlug: string, roundNumber: number) {
    const { data, error } = await getSupabase()
      .from('results')
      .select('*')
      .eq('championship_slug', championshipSlug)
      .eq('round_number', roundNumber)
      .order('position', { ascending: true });
    if (error) throw error;
    return data || [];
  },

  // Inscripciones
  async registerDriver(registration: {
    championship_slug: string;
    driver_name: string;
    steam_id?: string;
    discord_tag: string;
    car_choice: string;
    race_number: number;
    team_name?: string;
    category?: 'PRO' | 'Rookie';
    country?: string;
  }) {
    const { data, error } = await getSupabase()
      .from('registrations')
      .insert([registration])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getRegistrations(championshipSlug?: string) {
    let query = getSupabase().from('registrations').select('*');
    if (championshipSlug) {
      query = query.eq('championship_slug', championshipSlug);
    }
    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  // Noticias / Posts
  async getPosts(limit = 10) {
    const { data, error } = await getSupabase()
      .from('posts')
      .select('*')
      .order('published_at', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data || [];
  },

  // Reglamentos
  async getRegulations(championshipSlug: string) {
    const { data, error } = await getSupabase()
      .from('regulations')
      .select('*')
      .eq('championship_slug', championshipSlug);
    if (error) throw error;
    return data || [];
  },
};
