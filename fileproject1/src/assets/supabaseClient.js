import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kojzfbkpnvdyiwoiiknt.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvanpmYmtwbnZkeWl3b2lpa250Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzMjk0NjMsImV4cCI6MjA3NjkwNTQ2M30.BKcEqaInXxgiGNxSIg4YYKx4eUSrZlfErqlBGyLWJC0";

export const supabase = createClient(supabaseUrl, supabaseKey);
