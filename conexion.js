const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://qeyuymprpmsqvukmdxfz.supabase.co';
const supabaseKey = 'sb_publishable_FonOF_-_Vk-hhCa6JOYD4Q_ZfxxnIdC'; // anon public

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;