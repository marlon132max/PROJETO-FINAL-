import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// 🔐 carrega o .env AQUI (antes de tudo)
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// 🔎 debug de segurança
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Variáveis do Supabase não carregadas (.env)');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
