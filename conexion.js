const { createClient } = require('@supabase/supabase-js');

// ⚠️ Usa variables de entorno (mejor práctica)
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;