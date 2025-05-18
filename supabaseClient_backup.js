import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uijyekrmrqnjvrpvquni.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpanlla3JtcnFuanZycHZxdW5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0MjkxODEsImV4cCI6MjA2MzAwNTE4MX0.sRSqaOuyjd5hzF4ZMCClhag9BiBjawlKyi5DEKfovHI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 