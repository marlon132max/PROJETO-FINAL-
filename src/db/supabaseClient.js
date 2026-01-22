import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// força o Node a achar o .env na raiz do projeto
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log("SUPABASE_URL carregada?", !!supabaseUrl);

if (!supabaseUrl || !supabaseKey) {
  throw new Error("❌ Variáveis de ambiente do Supabase não foram carregadas.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);