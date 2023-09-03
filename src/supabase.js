import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://klwwijcknjnbleldtgty.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtsd3dpamNrbmpuYmxlbGR0Z3R5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE5MjE0NTIsImV4cCI6MjAwNzQ5NzQ1Mn0.C24F9kZBg96NZamplfL08LP5Aeq80AiukjjB1xUJBjE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
